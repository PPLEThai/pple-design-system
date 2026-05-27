import { Navbar, type NavbarItem } from "@pplethai/components";
import { NavLink } from "react-router-dom";
import { ComponentPage } from "../../components/ComponentPage";

const demoItems: NavbarItem[] = [
  { href: "/", label: "หน้าแรก", end: true },
  { href: "/components", label: "คอมโพเนนต์" },
  { href: "/forms", label: "ฟอร์ม" },
  { href: "/guidelines", label: "แนวทาง" },
];

export default function NavbarPage() {
  return (
    <ComponentPage
      title="Navbar"
      description="แถบนำทางพร้อมโลโก้ ชื่อระบบ และเมนู — มีเมนูแฮมเบอร์เกอร์อัตโนมัติบนมือถือ รองรับ render link แบบ custom"
      demo={
        <div className="overflow-hidden rounded-md border">
          <Navbar
            title="ระบบดีไซน์ตัวอย่าง"
            items={demoItems}
            pathname="/components"
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
        </div>
      }
      code={`import { Navbar, type NavbarItem } from "@pplethai/components";
import { NavLink, useLocation } from "react-router-dom";

const navItems: NavbarItem[] = [
  { href: "/", label: "หน้าแรก", end: true },
  { href: "/components", label: "คอมโพเนนต์" },
];

function MyLayout() {
  const { pathname } = useLocation();
  return (
    <Navbar
      title="ระบบดีไซน์"
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
  );
}`}
      examples={[
        {
          title: "ใช้แบบลิงก์ <a> ปกติ",
          description: "ไม่ต้องส่ง renderLink — ใช้ default ที่ render เป็น <a href=...>",
          demo: (
            <div className="overflow-hidden rounded-md border">
              <Navbar
                title="แบบเรียบง่าย"
                items={demoItems}
                pathname="/forms"
              />
            </div>
          ),
          code: `<Navbar
  title="ระบบของเรา"
  items={[
    { href: "/", label: "หน้าแรก", end: true },
    { href: "/about", label: "เกี่ยวกับเรา" },
  ]}
  pathname={typeof window !== "undefined" ? window.location.pathname : ""}
/>`,
        },
      ]}
      props={[
        { prop: "title", type: "string", required: true, description: "ชื่อระบบที่แสดงข้างโลโก้" },
        { prop: "items", type: "NavbarItem[]", required: true, description: "รายการลิงก์ในเมนู" },
        { prop: "pathname", type: "string", default: '""', description: "ใช้ระบุ active state และปิดเมนูมือถือเมื่อย้าย route" },
        {
          prop: "renderLink",
          type: "(props: NavbarLinkRenderProps) => ReactNode",
          description: "custom renderer (เช่น NavLink ของ Router) — default เป็น <a href>",
        },
        { prop: "logo", type: "ReactNode", default: "<Logo size='sm' />", description: "โลโก้ที่ใช้แทน Logo เริ่มต้น" },
        {
          prop: "mobileMenuAriaLabel",
          type: "{ open: string; close: string }",
          default: '{ open: "เปิดเมนู", close: "ปิดเมนู" }',
          description: "ป้ายปุ่มแฮมเบอร์เกอร์",
        },
        {
          prop: "navAriaLabel",
          type: "string",
          default: '"เมนูหลัก"',
          description: "aria-label ของ <nav>",
        },
      ]}
      extraPropTables={[
        {
          title: "NavbarItem",
          rows: [
            { prop: "href", type: "string", required: true, description: "URL ของลิงก์" },
            { prop: "label", type: "string", required: true, description: "ข้อความแสดง" },
            { prop: "end", type: "boolean", default: "false", description: "เปิดเฉพาะเมื่อ pathname ตรงเป๊ะ (เหมาะกับหน้าแรก)" },
          ],
        },
      ]}
      accessibility={
        <ul>
          <li>ปุ่มมือถือมี aria-expanded + aria-controls สลับตามสถานะ</li>
          <li>aria-current=&quot;page&quot; ถูกตั้งบนลิงก์ที่ active (เฉพาะ default renderer)</li>
          <li>เมนูมือถือใช้ grid-rows transition แทน opacity เพื่อรองรับ accessibility tree</li>
        </ul>
      }
    />
  );
}
