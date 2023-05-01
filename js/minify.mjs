import fs from "fs";
import path from "path";
import { minify } from "terser";

function readFileContent(fileName) {
  return fs.readFileSync(fileName, "utf8").match(/(.*\.innerHTML\s*=\s*`)(.+?)(`.+)/s);
}

function minifyHtmlAndCss(fileContent) {
  const regexReplaceMap = new Map([
    [/ {2,}/g, ""],
    [/" /g   , '"'],
    [/: /g   , ":"],
    [/, /g   , ","],
    [/ {/g   , "{"],
    [/\r/g   , ""],
    [/\n/g   , ""],
  ]);
  regexReplaceMap.forEach((value, key) => {
    fileContent[2] = fileContent[2].replaceAll(key, value);
  });
  return `${fileContent[1]}${fileContent[2]}${fileContent[3]}`;
}

async function minifyJavaScript(fileContent) {
  const result = await minify(fileContent, {
    sourceMap: false,
    toplevel: true,
    mangle: {
      keep_classnames: true,
    },
  });
  return result.code;
}

function writeFileContent(fileName, fileContent) {
  fs.writeFileSync(fileName, fileContent);
}

async function minifyFile(filePath) {
  const outputFile = path.parse(filePath);
  let fileContent = readFileContent(filePath);
  fileContent = minifyHtmlAndCss(fileContent);
  fileContent = await minifyJavaScript(fileContent);
  writeFileContent(path.join(outputFile.dir, outputFile.name + ".min" + outputFile.ext), fileContent)
}

function main() {
  if(process.argv.length <= 2) {
    console.error("Please specify the path of the file to minify.");
    return;
  }
  minifyFile(process.argv.pop());
}

main();
