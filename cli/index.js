// import esbuild from "esbuild";
// import * as flake from "../dist/index.mjs";
// import fs from "fs/promises";
const esbuild = require("esbuild");
const flake = require("../dist/index.cjs.js");
const fs = require("fs/promises");

/**
 * @param {string} file
 */
async function getCssFromEntryPoint(file) {
  const bundleStart = Date.now();
  const result = await esbuild.build({
    write: false,
    bundle: true,
    entryPoints: [file],
    external: ["@sightread/flake", "crypto"],
    loader: { ".js": "jsx" },
    sourcemap: "inline",
    sourcesContent: true,
    plugins: [
      {
        name: "__filename",
        setup(build) {
          build.onLoad({ filter: /\.js$/, namespace: "" }, async (file) => {
            const contents = await fs.readFile(file.path, "utf-8");
            console.log(file.path);
            return {
              contents: contents.replace(/css\(/g, `css("${file.path}",`),
              loader: "jsx",
            };
          });
        },
      },
    ],
    watch: {
      onRebuild(fail, result) {
        console.log("Rebuild took");
      },
    },
  });
  console.log(`Initial bundling took: ${Date.now() - bundleStart}`);
  console.log(getCss(result));
}

function getCss(result) {
  const evalStart = Date.now();
  const output = result.outputFiles[0].text.replace(
    `require("@sightread/flake")`,
    `flake`
  );
  eval(output);
  console.log(`Eval took: ${Date.now() - evalStart}`);
  console.log(JSON.stringify(flake.getGlobalStyles()));
}

/* TODO:
 * 1. Handle multiple entrypoints without duplication.
 * 2. Potentially figure out how to make this less hacky...although currently have no ideas.
 * 3.
 */
getCssFromEntryPoint("./examples/nextjs/pages/index.js");
