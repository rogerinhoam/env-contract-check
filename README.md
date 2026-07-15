# env-contract-check

Verifica se um arquivo `.env` contém todas as chaves declaradas em `.env.example`. É pequeno, não lê nem envia segredos e não possui dependências externas.

## Uso

```bash
npx env-contract-check
npx env-contract-check --example config/.env.example --env config/.env
```

Por padrão, chaves vazias são consideradas inválidas. Use `--allow-empty` para permiti-las. O comando retorna código `0` quando tudo está correto, `1` para contrato inválido e `2` para erro de leitura — ideal para CI.

## Biblioteca

```js
import { checkEnvironment } from "env-contract-check";

const result = checkEnvironment("API_KEY=", "API_KEY=segredo");
console.log(result.ok); // true
```

## Desenvolvimento

Requer Node.js 18 ou superior.

```bash
npm test
```

## Segurança

Não publique seu `.env`. Este projeto só processa o conteúdo localmente e nunca imprime valores.

## Licença

MIT
