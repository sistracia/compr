import { PlopTypes } from "@turbo/gen";
import { execSync } from "node:child_process";
import { readFile } from "node:fs/promises";

export function nextTSApp(plop: PlopTypes.NodePlopAPI) {
  plop.setGenerator("next-ts-app", {
    description: "Create new Next.js app with TypeScript",
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
      function customAction(answer) {
        const packageName = plop.renderString("{{package}}", answer);
        execSync(
          `pnpm dlx create-next-app@latest apps/${packageName} --ts --no-tailwind --no-eslint --app --src-dir --import-alias '@/*' --use-pnpm`,
        );
        return "Next.js initialized";
      },
      {
        type: "add",
        path: "apps/{{ dashCase package }}/.lintstagedrc.json",
        templateFile: "templates/lintstaged.hbs",
      },
      {
        type: "modify",
        path: "apps/{{ dashCase package }}/tsconfig.json",
        async transform() {
          const templateFile = `${plop.getPlopfilePath()}/templates/next-app-tsconfig.hbs`;
          return await readFile(templateFile, { encoding: "utf8" });
        },
      },
      {
        type: "add",
        path: "apps/{{ dashCase package }}/.eslintrc.js",
        templateFile: "templates/next-app-eslint.hbs",
      },
      {
        type: "append",
        path: "apps/{{ dashCase package }}/package.json",
        pattern: /"devDependencies": {(?<insertion>)/g,
        template:
          '    "@repo/eslint-config": "workspace:*",\n    "@repo/typescript-config": "workspace:*",\n    "eslint": "^8.57.0",',
      },
      {
        type: "append",
        path: "apps/{{ dashCase package }}/package.json",
        pattern: /"scripts": {(?<insertion>)/g,
        template: '    "type-check": "tsc --noEmit",',
      },
      function customAction() {
        execSync(`pnpm install -w`);
        return "New Next.js app with TypeScript installed";
      },
    ],
  });
}
