const { spawn } = require("child_process");
const { Transform } = require("stream")
require("colors");

let cmds = process.argv.slice(2);
let rndColors = ['blue', 'red', 'yellow'];

let debug = (c, color)=>{
  let d = `[[${c}]]: `[color];  
  return new Transform({
    transform(chunk, encoding, callback) {
      this.push(d + chunk.toString());
      callback();
    }
  });
};

for(let c of cmds) {
  let cli = spawn('npm', ['run', c]);
  process.stdin.pipe(cli.stdin);
  let color = rndColors.shift();
  cli.stdout.pipe(debug(c, color)).pipe(process.stdout);
  cli.stderr.pipe(debug(c, color)).pipe(process.stderr);
}
