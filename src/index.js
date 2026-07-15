export function parseEnv(text) {
  const values = new Map();
  for (const rawLine of text.replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    } else {
      value = value.replace(/\s+#.*$/, "");
    }
    values.set(match[1], value);
  }
  return values;
}

export function checkEnvironment(exampleText, envText, { allowEmpty = false } = {}) {
  const expected = parseEnv(exampleText);
  const actual = parseEnv(envText);
  const missing = [];
  const empty = [];

  for (const key of expected.keys()) {
    if (!actual.has(key)) missing.push(key);
    else if (!allowEmpty && actual.get(key) === "") empty.push(key);
  }

  return { ok: missing.length === 0 && empty.length === 0, missing, empty };
}
