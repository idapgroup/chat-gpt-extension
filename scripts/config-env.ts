const fs = require('fs');
require('dotenv').config();

const envDirPath = './src/environments';
const prodFileName = 'environment.prod.ts';
const devFileName = 'environment.ts';

const openAIKey = process.env["OPENAI_KEY"] || '';
const apiUrl = process.env["API_URL"] || '';
const envConfigData = (isProd: boolean = false) => {
  return `export const environment = {
    production: ${isProd},
    openAIKey: "${openAIKey}",
    apiUrl: "${apiUrl}"
  };
`;
};

interface EnvFile {
  fileName: string;
  dirPath: string;
  data: any;
}

const writeDataToFile = (path: string, data: string | NodeJS.ArrayBufferView) => {
  fs.writeFile(path, data, (error: NodeJS.ErrnoException | null) => {
    if (error) {
      throw error;
    }
  });
};

const files: EnvFile[] = [
  {fileName: prodFileName, dirPath: envDirPath, data: envConfigData(true)},
  {fileName: devFileName, dirPath: envDirPath, data: envConfigData(false)},
];

if (!fs.existsSync(envDirPath)) {
  fs.mkdirSync(envDirPath);
}

files.forEach((file) => {
  const path = `${file.dirPath}/${file.fileName}`;
  fs.open(path, 'a', (error: NodeJS.ErrnoException | null) => {
    if (error) {
      throw error;
    }
    writeDataToFile(path, file.data);
  });
});
