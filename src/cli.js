#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { checkEnvironment } from "./index.js";

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log("Uso: env-contract-check [--example .env.example] [--env .env] [--allow-empty]");
  process.exit(0);
}

const valueAfter = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : fallback;
};

const examplePath = valueAfter("--example", ".env.example");
const envPath = valueAfter("--env", ".env");

try {
  const [exampleText, envText] = await Promise.all([
    readFile(examplePath, "utf8"),
    readFile(envPath, "utf8"),
  ]);
  const result = checkEnvironment(exampleText, envText, { allowEmpty: args.includes("--allow-empty") });
  if (result.ok) {
    console.log(`✓ ${envPath} atende ao contrato de ${examplePath}`);
  } else {
    if (result.missing.length) console.error(`Ausentes: ${result.missing.join(", ")}`);
    if (result.empty.length) console.error(`Vazias: ${result.empty.join(", ")}`);
    process.exitCode = 1;
  }
} catch (error) {
  console.error(`Erro: ${error.message}`);
  process.exitCode = 2;
}
