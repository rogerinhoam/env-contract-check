import test from "node:test";
import assert from "node:assert/strict";
import { parseEnv, checkEnvironment } from "../src/index.js";

test("interpreta comentários, export e valores entre aspas", () => {
  const env = parseEnv("# comentário\nexport API_URL='https://example.com'\nPORT=3000 # local\n");
  assert.equal(env.get("API_URL"), "https://example.com");
  assert.equal(env.get("PORT"), "3000");
});

test("informa variáveis ausentes e vazias", () => {
  const result = checkEnvironment("API_KEY=\nPORT=\n", "API_KEY=abc\nPORT=\n");
  assert.deepEqual(result, { ok: false, missing: [], empty: ["PORT"] });
});

test("aceita valores vazios quando configurado", () => {
  assert.equal(checkEnvironment("OPTIONAL=\n", "OPTIONAL=\n", { allowEmpty: true }).ok, true);
});
