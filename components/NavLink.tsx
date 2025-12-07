"use client";

import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";

interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, href, ...props }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
