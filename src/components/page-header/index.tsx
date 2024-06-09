import { ArrowDownIcon } from "@radix-ui/react-icons";
import { SectionWrapper } from "../section-wrapper";
import { TextUp } from "../text-up";

export type PageHeaderProps = {
  title: string;
  subtitle?: string;
  scrollToHash?: `#${string}`;
};

export function PageHeader({ subtitle, title, scrollToHash }: PageHeaderProps) {
  return (
    <header className="relative h-dvh flex flex-col justify-center bg-black text-white">
      <SectionWrapper>
        {subtitle && (
          <h3 className="text-lg sm:text-3xl mb-[2vw]">{subtitle}</h3>
        )}
        <h1 className="leading-tight text-[9vw] sm:text-[4vw] tracking-tighter sm:tracking-tight font-semibold">
          <TextUp>{title}</TextUp>
        </h1>
      </SectionWrapper>
      <SectionWrapper className="absolute bottom-[5vw] flex justify-center sm:justify-end">
        <a className="flex items-center" href={scrollToHash}>
          Scroll Down
          <span className="ml-[10px] bg-zinc-700 rounded-full p-2 w-[9vw] sm:w-[5vw] md:w-[2.5vw] h-[9vw] sm:h-[5vw] md:h-[2.5vw]">
            <ArrowDownIcon
              width="25"
              height="25"
              className="text-white w-full h-full"
            />
          </span>
        </a>
      </SectionWrapper>
    </header>
  );
}
