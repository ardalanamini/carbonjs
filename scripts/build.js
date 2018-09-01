#!/usr/bin/env node

const path = require("path");
const {
  spawn
} = require("child_process");
const rimraf = require("rimraf");
const fs = require("fs");
const readdir = require("fs-readdir-recursive");
const UglifyEs = require("uglify-es");

const startTime = new Date().getTime();

console.log("building...");

const DIR = path.resolve(__dirname, "..", "lib");

rimraf.sync(DIR);

const tsc = spawn(path.join(__dirname, "..", "node_modules", ".bin", "tsc"));

tsc.stdout.on("data", (data) => console.log(`stdout: ${data}`));

tsc.stderr.on("data", (data) => console.log(`stderr: ${data}`));

tsc.on("close", (code) => {
  const fileNames = readdir(DIR, (filename) => /(?<!\.ts)$/.test(filename));

  fileNames.forEach((filename) => {
    const filePath = path.resolve(DIR, filename)
    let content = fs.readFileSync(filePath, "utf8");

    content = UglifyEs.minify(content, {
      toplevel: true,
    });

    if (content.error) throw new Error(content.error);

    fs.writeFileSync(filePath, content.code, "utf8");
  });

  if (code === 0) console.log(`finished in ${new Date().getTime() - startTime}ms`);
  else console.log(`child process exited with code ${code}`);
});