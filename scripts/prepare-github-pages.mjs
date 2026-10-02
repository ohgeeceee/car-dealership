#!/usr/bin/env node
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const siteRoot = path.resolve("dist/client");
const entry = path.join(siteRoot, "index.html");

for (const route of ["demo", "portal"]) {
  const routeDirectory = path.join(siteRoot, route);
  mkdirSync(routeDirectory, { recursive: true });
  copyFileSync(entry, path.join(routeDirectory, "index.html"));
}

writeFileSync(path.join(siteRoot, ".nojekyll"), "");
console.log("Prepared GitHub Pages routes: /, /demo/, and /portal/");
