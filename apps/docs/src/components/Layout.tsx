import { Container, Navbar, Separator, type NavbarItem } from "@pplethai/components";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const navItems: NavbarItem[] = [
  { href: "/", label: "หน้าแรก", end: true },
  { href: "/tokens", label: "โทเคน" },
  { href: "/components", label: "คอมโพเนนต์" },
  { href: "/forms", label: "ฟอร์ม" },
  { href: "/layout", label: "เลย์เอาต์" },
  { href: "/icons", label: "ไอคอน" },
  { href: "/guidelines", label: "แนวทาง" },
];

export function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
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
      <main className="max-md:pt-12 md:pt-0">
        <Container className="py-10">
          <Outlet />
        </Container>
      </main>
      <footer>
        <Container className="py-6 text-sm text-muted-foreground">
          <Separator className="mb-4" />
          <p>@pplethai/components — เอกสารระบบดีไซน์พรรคประชาชน</p>
        </Container>
      </footer>
    </div>
  );
}
