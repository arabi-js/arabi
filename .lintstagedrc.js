const micromatch = require('micromatch');
const prettier = require('prettier');

const addQuotes = (a) => `'${a}'`;

let allStagedFiles;

function prettierCmds() {
  const prettierSupportedExtensions = prettier
    .getSupportInfo()
    .languages.map(({ extensions }) => extensions)
    .flat();
  const files = micromatch(
    allStagedFiles,
    prettierSupportedExtensions.map((extension) => `**/*${extension}`)
  );
  return files.length ? [`prettier --write ${files.map(addQuotes).join(' ')}`] : [];
}

function eslintCmds() {
  const files = micromatch(allStagedFiles, '**/*.js');
  return files.length ? [`eslint --cache --fix ${files.map(addQuotes).join(' ')}`] : [];
}

function syncpackCmds() {
  const files = micromatch(allStagedFiles, '**/package.json');
  return files.length ? [`syncpack format --source '{${files.join(',')}}'`] : [];
}

module.exports = (files) => {
  allStagedFiles = files;
  return [...prettierCmds(), ...eslintCmds(), ...syncpackCmds()];
};
