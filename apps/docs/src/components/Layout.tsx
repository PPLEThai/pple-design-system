import {
  Container,
  getNavbarVariant,
  Inline,
  Navbar,
  Separator,
  Stack,
  type NavbarItem,
} from "@pplethai/components";
import * as React from "react";

const footerLinkClass = "text-primary hover:underline";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const navItems: NavbarItem[] = [
  { href: "/", label: "หน้าแรก", end: true },
  { href: "/tokens", label: "โทเคน" },
  { href: "/components", label: "คอมโพเนนต์" },
  { href: "/patterns", label: "แพทเทิร์น" },
  { href: "/forms", label: "ฟอร์ม" },
  { href: "/layout", label: "เลย์เอาต์" },
  { href: "/icons", label: "ไอคอน" },
  { href: "/guidelines", label: "แนวทาง" },
];

export function Layout() {
  const { pathname } = useLocation();
  const [navbarVariant] = React.useState(() => getNavbarVariant());

  return (
    <Stack gap="none" className="min-h-screen bg-background text-foreground">
      <Navbar
        title="ระบบดีไซน์ พรรคประชาชน"
        items={navItems}
        pathname={pathname}
        renderLink={({ item, className, onNavigate }) => (
          <NavLink
            to={item.href}
            className={({ isActive }) => className(isActive)}
            end={item.end}
            onClick={onNavigate}
          >
            {item.label}
          </NavLink>
        )}
      />
      <Stack
        as="main"
        gap="none"
        className={
          navbarVariant === "light" ? "flex-1 max-md:pt-12 md:pt-0" : "flex-1 max-md:pt-16 md:pt-0"
        }
      >
        <Container className="py-10">
          <Outlet />
        </Container>
      </Stack>
      <Stack as="footer" gap="none" className="text-sm text-muted-foreground">
        <Container className="py-6">
          <Stack gap="md">
            <Separator />
            <Inline justify="between" align="start" gap="md" className="flex-wrap">
              <p>@pplethai/components — เอกสารระบบดีไซน์พรรคประชาชน</p>
              <Stack gap="sm" className="items-end text-right">
                <Inline gap="sm" className="flex-wrap justify-end">
                  <a
                    href="https://github.com/PPLEThai/pple-design-system"
                    target="_blank"
                    rel="noreferrer"
                    className={footerLinkClass}
                  >
                    GitHub
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href="https://www.npmjs.com/package/@pplethai/components"
                    target="_blank"
                    rel="noreferrer"
                    className={footerLinkClass}
                  >
                    npm
                  </a>
                </Inline>
                <p>
                  <a
                    href="https://github.com/PPLEThai/pple-design-system/blob/main/AGENTS.md"
                    target="_blank"
                    rel="noreferrer"
                    className={footerLinkClass}
                  >
                    AGENTS.md สำหรับ Coding Agents ในการใช้งานระบบดีไซน์นี้
                  </a>
                </p>
              </Stack>
            </Inline>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
}
