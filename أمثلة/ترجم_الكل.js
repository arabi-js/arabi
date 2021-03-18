const fs = require("fs");
const path = require("path");

let examples =
  fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(p=>p.isDirectory())
  .map(d=>path.resolve(__dirname, d.name, 'ترجم'));

for(let [i, p] of examples.entries()) {
  console.log(i + 1 + " " + "*".repeat(10));
  require(p);
  console.log();
}
