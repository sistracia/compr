import { cn } from "@repo/utils";
import { SectionWrapper } from "./section-wrapper";
import { TextUp } from "./text-up";

export type HomePageHeaderProps = {
  title: string;
  curtainCount?: number;
  className?: string;
  extra?: React.ReactNode;
};

export function HomePageHeader({
  title,
  curtainCount = 0,
  className,
  extra,
}: HomePageHeaderProps) {
  return (
    <header
      className={cn(
        "relative flex h-dvh flex-col justify-center bg-white",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full overflow-hidden">
        {Array.from({ length: curtainCount }, (_, index) => {
          return (
            <div
              key={index}
              className="h-full w-full animate-[slide-bottom-out] bg-neutral-800 duration-1000 ease-in fill-mode-forwards"
              style={{ animationDelay: `${1000 + 150 * index}ms` }}
            />
          );
        })}
      </div>
      <SectionWrapper className="z-1">
        <h1 className="text-[7vw] font-semibold leading-tight tracking-tighter text-white mix-blend-exclusion sm:text-[3vw] sm:tracking-tight">
          <TextUp>{title}</TextUp>
        </h1>
      </SectionWrapper>
      {extra && <SectionWrapper className="z-1">{extra}</SectionWrapper>}
    </header>
  );
}
