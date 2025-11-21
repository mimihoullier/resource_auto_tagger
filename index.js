#!/usr/bin/env node
const path = require('path');

async function main() {
  const defaultMappingPath = path.resolve(__dirname, 'handlers/resource-auto-tag/mapping.json');
  const mappingFilePath = process.env.MAPPING_FILE_PATH || defaultMappingPath;

  process.env.MAPPING_FILE_PATH = mappingFilePath;

  const { handler } = await import('./handlers/resource-auto-tag/index.mjs');
  await handler({});
  console.log('タグ付け処理が完了しました');
}

main().catch((error) => {
  console.error('実行中にエラーが発生しました', error);
  process.exitCode = 1;
});
