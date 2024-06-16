import { PlopTypes } from "@turbo/gen";
import { execSync } from "node:child_process";

export function tsPackage(plop: PlopTypes.NodePlopAPI) {
  plop.setGenerator("ts-package", {
    description: "Create new TypeScript package",
    prompts: [
      {
        type: "input",
        name: "package",
        message: "What is the name of the new package to create?",
        validate: (input: string) => {
          if (input.includes(".")) {
            return "package name cannot include an extension";
          }
          if (input.includes(" ")) {
            return "package name cannot include spaces";
          }
          if (!input) {
            return "package name is required";
          }
          return true;
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{ dashCase package }}/.lintstagedrc.json",
        templateFile: "templates/lintstaged.hbs",
      },
      {
        type: "add",
        path: "packages/{{ dashCase package }}/src/index.ts",
        templateFile: "templates/empty-file.hbs",
      },
      {
        type: "add",
        data: { configName: "base" },
        path: "packages/{{ dashCase package }}/tsconfig.json",
        templateFile: "templates/package-tsconfig.hbs",
      },
      {
        type: "add",
        data: { configName: "library" },
        path: "packages/{{ dashCase package }}/.eslintrc.js",
        templateFile: "templates/package-eslint.hbs",
      },
      {
        type: "add",
        path: "packages/{{ dashCase package }}/package.json",
        templateFile: "templates/ts-package-packagejson.hbs",
      },
      function customAction() {
        execSync(`pnpm install -w`);
        return "New TypeScript package installed";
      },
    ],
  });
}
