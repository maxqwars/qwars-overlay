const shell = require("shelljs");
const path = require("path");
const esbuild = require("esbuild");

/* Environment */
const NODE_ENV = process.env["NODE_ENV"] || "production";

/* Paths */
const PROJ_SRC = path.resolve("./src"); // Web extension source dir
const PROJ_EXT = path.resolve("./extension"); // Web extension release build dir
const PROJ_SCRIPTS = path.join(PROJ_SRC, "scripts"); // Extension scripts dir
const PROJ_HTML = path.join(PROJ_SRC, "html"); // Extension html dir
const PROJ_ASSETS = path.join(PROJ_SRC, "assets"); // Extension assets dir
const EXTENSION_MANIFEST = path.join(PROJ_SRC, "manifest.json"); // Extension manifest file

function clean() {
  shell.rm("-rf", PROJ_EXT);
  shell.mkdir(PROJ_EXT);
}

function copyManifest() {
  shell.cp(EXTENSION_MANIFEST, PROJ_EXT);
}

function copyIcons() {
  shell.cp(`${PROJ_ASSETS}/*.png`, PROJ_EXT);
}

function copyHtml() {
  shell.cp(`${PROJ_HTML}/*.html`, PROJ_EXT);
}

function compileScripts() {
  esbuild
    .build({
      entryPoints: [
        path.join(PROJ_SCRIPTS, "background.ts"),
        path.join(PROJ_SCRIPTS, "user.ts"),
      ],
      bundle: true,
      sourcemap: NODE_ENV === "development" ? true : false,
      minify: NODE_ENV !== "development" ? true : false,
      outdir: PROJ_EXT,
    })
    .catch((e) => {
      console.log();
      process.exit(1);
    });
}

clean();
copyManifest();
copyIcons();
copyHtml();
compileScripts();