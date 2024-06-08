import { ArrowDownIcon } from "@radix-ui/react-icons";
import { TextUp } from "../TextUp";

export type PageHeaderProps = {
  title: string;
  subtitle: string;
  scrollToHash?: `#${string}`;
};

export function PageHeader({ subtitle, title, scrollToHash }: PageHeaderProps) {
  return (
    <div className="relative h-dvh flex items-center">
      <header className="w-full">
        <h3 className="text-lg sm:text-3xl mb-[2vw]">{subtitle}</h3>
        <h1 className="leading-tight text-[9vw] sm:text-[4vw] tracking-tighter sm:tracking-tight font-semibold">
          <TextUp>{title}</TextUp>
        </h1>
        <div className="absolute bottom-[5vw] w-full flex justify-center sm:justify-end">
          <a className="flex items-center" href={scrollToHash}>
            Scroll Down
            <span className="ml-[10px] bg-zinc-700 rounded-full p-2">
              <ArrowDownIcon
                width="25px"
                height="25px"
                className="text-white"
              />
            </span>
          </a>
        </div>
      </header>
    </div>
  );
}
