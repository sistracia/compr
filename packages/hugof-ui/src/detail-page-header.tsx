import { ArrowDownIcon } from "@radix-ui/react-icons";
import { SectionWrapper } from "./section-wrapper";
import { TextUp } from "./text-up";

export type DetailPageHeaderProps = {
  title: string;
  subtitle?: string;
  scrollToHash?: `#${string}`;
  extra?: React.ReactNode;
};

export function DetailPageHeader({
  title,
  subtitle,
  scrollToHash,
  extra,
}: DetailPageHeaderProps) {
  return (
    <header className="relative flex h-dvh flex-col justify-center bg-black text-white">
      <SectionWrapper>
        {subtitle && (
          <h3 className="mb-[2vw] text-lg sm:text-3xl">{subtitle}</h3>
        )}
        <h1 className="text-[9vw] font-semibold leading-tight tracking-tighter sm:text-[4vw] sm:tracking-tight">
          <TextUp>{title}</TextUp>
        </h1>
      </SectionWrapper>
      {extra && <SectionWrapper>{extra}</SectionWrapper>}
      <SectionWrapper className="absolute bottom-[5vw] flex justify-center sm:justify-end">
        <a className="flex items-center" href={scrollToHash}>
          Scroll Down
          <span className="ml-[10px] h-[9vw] w-[9vw] rounded-full bg-zinc-700 p-2 sm:h-[5vw] sm:w-[5vw] md:h-[2.5vw] md:w-[2.5vw]">
            <ArrowDownIcon
              width="25"
              height="25"
              className="h-full w-full text-white"
            />
          </span>
        </a>
      </SectionWrapper>
    </header>
  );
}
