import { PlopTypes } from "@turbo/gen";

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
        path: "packages/{{ dashCase package }}/tsconfig.json",
        templateFile: "templates/tsconfig.hbs",
        data: { configName: "base" },
      },
      {
        type: "add",
        path: "packages/{{ dashCase package }}/.eslintrc.js",
        data: { configName: "library" },
        templateFile: "templates/eslint.hbs",
      },
      {
        type: "add",
        path: "packages/{{ dashCase package }}/package.json",
        templateFile: "templates/ts-package-packagejson.hbs",
      },
    ],
  });
}
