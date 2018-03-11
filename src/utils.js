const fs = require('fs');

function loadFile(filepath) {
  const lines = fs.readFileSync(filepath, { encoding: 'utf-8' })
    .split('\n')
    .filter( ln => !(ln === '' || ln.match(/^#/)));
  return lines;
}

function writeFile(filepath, content) {
  fs.writeFileSync(filepath, content, { encoding: 'utf-8'});
}


module.exports = {
  loadFile,
  writeFile
};
