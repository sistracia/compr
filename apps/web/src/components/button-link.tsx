export type ButtonLinkProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
};

export function ButtonLink({ icon, href, children }: ButtonLinkProps) {
  return (
    <a className="flex items-center" href={href}>
      {children}
      <span className="ml-[10px] bg-zinc-700 rounded-full p-2 w-[2.5vw] h-[2.5vw]">
        {icon}
      </span>
    </a>
  );
}
