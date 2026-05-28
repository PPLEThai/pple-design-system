import { Menu, X } from "lucide-react";
import * as React from "react";
import { cn } from "../lib/utils";
import { Container } from "./layout/container";
import { Inline } from "./layout/inline";
import { Stack } from "./layout/stack";
import { Logo } from "./logo";
import { navLinkClassName } from "./nav-link-class-name";

const MINI_APP_UA_PATTERN = /PPLETodayApp\/(\d.\d.\d) MiniApp/;

export type NavbarVariant = "light" | "dark";

export function isInMiniAppUserAgent(userAgent: string): boolean {
  return MINI_APP_UA_PATTERN.test(userAgent);
}

/** Resolves navbar surface: explicit `variant` wins over mini-app UA detection. */
export function getNavbarVariant(options?: {
  variant?: NavbarVariant;
  userAgent?: string;
}): NavbarVariant {
  if (options?.variant !== undefined) {
    return options.variant;
  }
  const ua =
    options?.userAgent ??
    (typeof navigator !== "undefined" ? navigator.userAgent : "");
  return isInMiniAppUserAgent(ua) ? "light" : "dark";
}

export type NavbarItem = {
  href: string;
  label: string;
  /** When true, only mark active on exact href match (e.g. home "/"). */
  end?: boolean;
};

export type NavbarHome = {
  href: string;
  /** When true, only mark active on exact href match (e.g. home "/"). */
  end?: boolean;
};

function isNavbarItemActive(item: Pick<NavbarItem, "href" | "end">, pathname: string): boolean {
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

export interface NavbarHomeLinkRenderProps {
  home: NavbarHome;
  className: (isActive: boolean) => string;
  children: React.ReactNode;
  onNavigate: () => void;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  items: NavbarItem[];
  /**
   * Arbitrary content rendered to the right of the links on desktop,
   * and at the top of the mobile dropdown panel (above the items).
   */
  children?: React.ReactNode;
  /**
   * Logo + title link target. Defaults to `{ href: "/", end: true }`.
   * Pass `false` to render a non-interactive brand area.
   */
  home?: NavbarHome | false;
  /** Current path for default anchor links and closing the mobile menu on navigation. */
  pathname?: string;
  /** Custom link renderer (e.g. React Router `NavLink`). Defaults to `<a href>`. */
  renderLink?: (props: NavbarLinkRenderProps) => React.ReactNode;
  /** Custom home/brand link renderer. Defaults to `<a href>`. */
  renderHomeLink?: (props: NavbarHomeLinkRenderProps) => React.ReactNode;
  logo?: React.ReactNode;
  mobileMenuAriaLabel?: { open: string; close: string };
  navAriaLabel?: string;
  /**
   * Light = white background, compact vertical padding.
   * Dark = brand gradient background, taller vertical padding.
   * When set, overrides mini-app user-agent detection.
   */
  variant?: NavbarVariant;
}

function homeLinkClassName(isLight: boolean) {
  return cn(
    "inline-flex min-w-0 max-w-full items-center gap-1 rounded-md outline-none transition-opacity md:gap-2",
    "focus-visible:ring-2 focus-visible:ring-offset-2",
    isLight
      ? "text-foreground hover:opacity-80 focus-visible:ring-ring focus-visible:ring-offset-background"
      : "text-secondary-foreground hover:opacity-90 focus-visible:ring-white/50 focus-visible:ring-offset-transparent",
  );
}

export function Navbar({
  title,
  items,
  home: homeProp,
  pathname = "",
  renderLink,
  renderHomeLink,
  logo = <Logo size="sm" className="shrink-0 text-primary" />,
  mobileMenuAriaLabel = { open: "เปิดเมนู", close: "ปิดเมนู" },
  navAriaLabel = "เมนูหลัก",
  variant: variantProp,
  className,
  children,
  ...props
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [resolvedVariant] = React.useState(() => getNavbarVariant({ variant: variantProp }));

  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isLight = resolvedVariant === "light";

  const navLinkClass = (isActive: boolean) =>
    navLinkClassName(isActive, isLight ? "light" : "dark");

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

  const resolvedHome: NavbarHome | false = homeProp === false ? false : (homeProp ?? { href: "/", end: true });

  const brand = (
    <>
      {logo}
      <h1 className="min-w-0 truncate font-heading text-base font-medium md:text-xl">{title}</h1>
    </>
  );

  const defaultRenderHomeLink = ({
    home,
    className: homeClassName,
    children,
    onNavigate,
  }: NavbarHomeLinkRenderProps) => {
    const active = isNavbarItemActive(home, pathname);
    return (
      <a
        href={home.href}
        className={homeClassName(active)}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
      >
        {children}
      </a>
    );
  };

  const homeLinkRenderer = renderHomeLink ?? defaultRenderHomeLink;

  const brandBlock =
    resolvedHome === false ? (
      <Stack gap="xs" className="min-w-0 flex-row items-center md:gap-2">
        {brand}
      </Stack>
    ) : (
      homeLinkRenderer({
        home: resolvedHome,
        className: () => homeLinkClassName(isLight),
        children: brand,
        onNavigate: closeMenu,
      })
    );

  const renderNavItem = (item: NavbarItem, mobile: boolean) =>
    linkRenderer({
      item,
      className: (isActive) =>
        mobile ? cn("block max-md:py-1 md:py-2", navLinkClass(isActive)) : navLinkClass(isActive),
      onNavigate: closeMenu,
    });

  return (
    <header
      className={cn(
        "z-50 border-b max-md:fixed max-md:inset-x-0 max-md:top-0 md:static",
        isLight
          ? "border-border bg-background text-foreground"
          : "bg-gradient-secondary text-secondary-foreground",
        className,
      )}
      {...props}
    >
      <Container
        className={isLight ? "max-md:py-2 md:py-4" : "max-md:py-4 md:py-6"}
      >
        <Inline justify="between" align="center" className="w-full">
          {brandBlock}
          <button
            type="button"
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-md p-0 focus-visible:outline-none focus-visible:ring-2 md:hidden",
              isLight
                ? "text-foreground hover:bg-muted focus-visible:ring-ring"
                : "text-white hover:bg-white/10 focus-visible:ring-white/50",
            )}
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
          <Inline gap="md" align="center" className="hidden md:flex">
            <nav aria-label={navAriaLabel}>
              <Inline gap="sm">
                {items.map((item) => (
                  <React.Fragment key={item.href}>{renderNavItem(item, false)}</React.Fragment>
                ))}
              </Inline>
            </nav>
            {children ? (
              <div className={cn("contents", !isLight && "dark")}>{children}</div>
            ) : null}
          </Inline>
        </Inline>
      </Container>
      <nav
        id="mobile-nav"
        aria-label={navAriaLabel}
        aria-hidden={!menuOpen}
        className={cn(
          "absolute left-0 right-0 top-full grid border-t shadow-lg transition-[grid-template-rows] duration-300 ease-in-out md:hidden",
          isLight
            ? "border-border bg-background"
            : "border-white/10 bg-gradient-secondary",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <Container className="max-md:py-4 md:pb-4 md:pt-2">
            <Stack gap="xs">
              {children ? (
                <div className={cn(!isLight && "dark")}>{children}</div>
              ) : null}
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
