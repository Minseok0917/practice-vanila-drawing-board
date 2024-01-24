import { defineConfig } from "vite";
import path from "path";

const resolveAliasToPathMap = ([key, folderPath]: [string, string]) => [key, path.resolve(__dirname, `./src${folderPath}`)];
const resolveAliasToPath = (alias: Record<string, string>) => Object.fromEntries(Object.entries(alias).map(resolveAliasToPathMap));
const resolveAlias = resolveAliasToPath({
  "@": "/",
  "@share": "/share",
});

export default defineConfig({
  resolve: {
    alias: resolveAlias,
  },
});
