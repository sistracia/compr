import { PlopTypes } from "@turbo/gen";

import { tsPackage } from "./ts-package";
import { reactTSPackage } from "./react-ts-package";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  tsPackage(plop);
  reactTSPackage(plop);
}
