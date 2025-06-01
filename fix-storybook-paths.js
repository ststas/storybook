import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'storybook-static', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Заменяем все "./" на "/storybook/"
content = content.replace(/"\.\//g, '"/storybook/');
content = content.replace(/'\.\//g, '\'/storybook/');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Rewrote asset paths in index.html'); 