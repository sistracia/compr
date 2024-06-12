export type ButtonLinkProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
};

export function ButtonLink({ icon, href, children }: ButtonLinkProps) {
  return (
    <a className="flex items-center" href={href}>
      {children}
      <span className="ml-[10px] h-[2.5vw] w-[2.5vw] rounded-full bg-zinc-700 p-2">
        {icon}
      </span>
    </a>
  );
}
