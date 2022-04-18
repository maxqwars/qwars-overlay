const shell = require("shelljs");
const path = require("path");
const esbuild = require("esbuild");

/* Environment */
const NODE_ENV = process.env["NODE_ENV"] || "production";

/* Path`s */
const PROJ_SRC = path.resolve("./src"); // Web extension source dir
const PROJ_EXT = path.resolve("./extension"); // Web extension release build dir
const PROJ_SCRIPTS = path.join(PROJ_SRC, "scripts");
const PROJ_HTML = path.join(PROJ_SRC, "html");

/* Files */
const EXTENSION_MANIFEST = path.join(PROJ_SRC, "manifest.json");

/* Remove old build */
shell.rm('-rf', PROJ_EXT)
shell.mkdir(PROJ_EXT)

/* Copy web extension manifest */
shell.cp(EXTENSION_MANIFEST, PROJ_EXT);


/* Compile scripts */
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
    console.log()
    process.exit(1);
  });
