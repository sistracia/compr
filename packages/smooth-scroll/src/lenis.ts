"use client";

export * from "lenis/react";

import type { ReactLenis } from "lenis/react";

export type LenisRef = React.ElementRef<typeof ReactLenis>;
export type Lenis = NonNullable<Required<LenisRef>["lenis"]>;
export type ReactLenisProps = React.ComponentPropsWithoutRef<typeof ReactLenis>;
