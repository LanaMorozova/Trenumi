/**
 * Trenumi design-token export.
 *
 * Paste this whole file as the `code` argument of the Figma MCP `use_figma`
 * tool. It runs inside Figma's plugin sandbox — it is not a Node script and
 * cannot be run with `node`.
 *
 * Returns two JSON documents separated by ===TOKENS=== and ===DARK===.
 * Write them to tokens.json and tokens.dark.json.
 *
 * Do not edit casually. Two exports are only comparable if the mapping is
 * identical, so a change here invalidates every earlier diff.
 */
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const prim = cols.find((c) => c.name === '_Primitives');
const sem = cols.find((c) => c.name === 'Semantic Colors');
const sizes = cols.find((c) => c.name === 'Sizes');
const vars = await figma.variables.getLocalVariablesAsync();
const byId = {};
vars.forEach((v) => { byId[v.id] = v; });

const pathOf = (name) => name.split('/').map((p) => p.trim());
const ref = (v) => '{' + pathOf(v.name).join('.') + '}';

function hex(c) {
  const h = (x) => ('0' + Math.round(x * 255).toString(16)).slice(-2);
  let s = '#' + h(c.r) + h(c.g) + h(c.b);
  if (c.a !== undefined && c.a < 0.999) s += h(c.a);
  return s;
}

/** Figma stores font styles as names; CSS wants numbers. */
const WEIGHT = { Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 };

/** A count is not a length. Add any other count here as it appears. */
const COUNTS = ['layout/columns'];

function typeOf(v) {
  if (v.resolvedType === 'COLOR') return 'color';
  if (v.resolvedType === 'STRING') return v.name.startsWith('font/family') ? 'fontFamily' : 'fontWeight';
  if (COUNTS.includes(v.name)) return 'number';
  if (/^(space|radius|border\/width|font\/size|font\/line-height|layout|nav\/bar|control|touch)/.test(v.name)) return 'dimension';
  return 'number';
}

function valueOf(v, raw) {
  if (raw && raw.type === 'VARIABLE_ALIAS') {
    const t = byId[raw.id];
    return t ? ref(t) : null;            // an alias to another file's variable cannot be expressed
  }
  const t = typeOf(v);
  if (t === 'color') return hex(raw);
  if (t === 'dimension') return raw + 'px';
  if (t === 'fontWeight') return WEIGHT[raw] !== undefined ? WEIGHT[raw] : raw;
  return raw;
}

function put(tree, parts, node) {
  let cur = tree;
  for (let i = 0; i < parts.length - 1; i++) {
    cur[parts[i]] = cur[parts[i]] || {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = node;
}

function build(collection, modeId) {
  const tree = {};
  vars
    .filter((v) => v.variableCollectionId === collection.id)
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((v) => {
      const raw = v.valuesByMode[modeId];
      if (raw === undefined) return;
      const val = valueOf(v, raw);
      if (val === null) return;
      const node = { $type: typeOf(v), $value: val };
      // Figma descriptions become CSS comments, which is where they get read.
      if (v.description) node.$description = v.description.replace(/&quot;/g, '"');
      put(tree, pathOf(v.name), node);
    });
  return tree;
}

const light = sem.modes.find((m) => m.name === 'Light').modeId;
const dark = sem.modes.find((m) => m.name === 'Dark').modeId;
const mobile = sizes.modes.find((m) => m.name === 'Mobile').modeId;

// tokens.json = primitives + semantic light + the mobile mode of Sizes.
// The Language collection is excluded on purpose: strings are not tokens.
const main = build(prim, prim.defaultModeId);
for (const tree of [build(sem, light), build(sizes, mobile)]) {
  Object.keys(tree).forEach((k) => {
    main[k] = main[k] ? Object.assign({}, main[k], tree[k]) : tree[k];
  });
}

return '===TOKENS===\n' + JSON.stringify(main) + '\n===DARK===\n' + JSON.stringify(build(sem, dark));
