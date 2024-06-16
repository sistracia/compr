import { PlopTypes } from "@turbo/gen";

import { tsPackage } from "./ts-package";
import { reactTSPackage } from "./react-ts-package";
import { nextTSApp } from "./next-ts-app";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  tsPackage(plop);
  reactTSPackage(plop);
  nextTSApp(plop);
}
