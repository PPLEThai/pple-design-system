import { Menu, X } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils";
import { Container } from "./layout/container";
import { Inline } from "./layout/inline";
import { Stack } from "./layout/stack";
import { Logo } from "./logo";

export type NavbarItem = {
  href: string;
  label: string;
  /** When true, only mark active on exact href match (e.g. home "/"). */
  end?: boolean;
};

export function navLinkClassName(isActive: boolean) {
  return cn(
    "font-heading rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-gradient-primary text-primary-foreground shadow-sm"
      : "hover:bg-white/10",
  );
}

function isNavbarItemActive(item: NavbarItem, pathname: string): boolean {
  if (item.end) {
    return pathname === item.href;
  }
  if (item.href === "/") {
    return pathname === "/";
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export interface NavbarLinkRenderProps {
  item: NavbarItem;
  className: (isActive: boolean) => string;
  onNavigate: () => void;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  items: NavbarItem[];
  /** Current path for default anchor links and closing the mobile menu on navigation. */
  pathname?: string;
  /** Custom link renderer (e.g. React Router `NavLink`). Defaults to `<a href>`. */
  renderLink?: (props: NavbarLinkRenderProps) => React.ReactNode;
  logo?: React.ReactNode;
  mobileMenuAriaLabel?: { open: string; close: string };
  navAriaLabel?: string;
}

export function Navbar({
  title,
  items,
  pathname = "",
  renderLink,
  logo = <Logo size="sm" className="shrink-0 text-primary" />,
  mobileMenuAriaLabel = { open: "เปิดเมนู", close: "ปิดเมนู" },
  navAriaLabel = "เมนูหลัก",
  className,
  ...props
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  const defaultRenderLink = ({ item, className: linkClassName, onNavigate }: NavbarLinkRenderProps) => {
    const active = isNavbarItemActive(item, pathname);
    return (
      <a
        href={item.href}
        className={linkClassName(active)}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
      >
        {item.label}
      </a>
    );
  };

  const linkRenderer = renderLink ?? defaultRenderLink;

  const renderNavItem = (item: NavbarItem, mobile: boolean) =>
    linkRenderer({
      item,
      className: (isActive) =>
        mobile
          ? cn("block max-md:py-1 md:py-2", navLinkClassName(isActive))
          : navLinkClassName(isActive),
      onNavigate: closeMenu,
    });

  return (
    <header
      className={cn(
        "z-50 border-b bg-gradient-secondary text-secondary-foreground max-md:fixed max-md:inset-x-0 max-md:top-0 md:static",
        className,
      )}
      {...props}
    >
      <Container className="max-md:py-2 md:py-4">
        <Inline justify="between" align="center" className="w-full">
          <Stack gap="xs" className="min-w-0 flex-row items-center md:gap-2">
            {logo}
            <div className="min-w-0">
              <h1 className="truncate font-heading text-base font-medium md:text-xl">{title}</h1>
            </div>
          </Stack>
          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center rounded-md p-0 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? mobileMenuAriaLabel.close : mobileMenuAriaLabel.open}
          >
            {menuOpen ? (
              <X className="h-7 w-7" aria-hidden />
            ) : (
              <Menu className="h-7 w-7" aria-hidden />
            )}
          </button>
          <nav className="hidden md:block" aria-label={navAriaLabel}>
            <Inline gap="sm">
              {items.map((item) => (
                <React.Fragment key={item.href}>{renderNavItem(item, false)}</React.Fragment>
              ))}
            </Inline>
          </nav>
        </Inline>
      </Container>
      <nav
        id="mobile-nav"
        aria-label={navAriaLabel}
        aria-hidden={!menuOpen}
        className={cn(
          "absolute left-0 right-0 top-full grid border-t border-white/10 bg-gradient-secondary shadow-lg transition-[grid-template-rows] duration-300 ease-in-out md:hidden",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <Container className="max-md:pb-2 max-md:pt-1 md:pb-4 md:pt-2">
            <Stack gap="xs">
              {items.map((item) => (
                <React.Fragment key={item.href}>{renderNavItem(item, true)}</React.Fragment>
              ))}
            </Stack>
          </Container>
        </div>
      </nav>
    </header>
  );
}
