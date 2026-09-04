import { cp } from "node:fs/promises";
import { basename, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const sourceDirectory = fileURLToPath(new URL("../src", import.meta.url));
const outputDirectory = fileURLToPath(new URL("../dist", import.meta.url));

await cp(sourceDirectory, outputDirectory, {
  recursive: true,
  filter(source) {
    const parts = relative(sourceDirectory, source).split(sep);
    return !parts.includes("sass") && basename(source) !== ".gitkeep";
  },
});
