import { Button, Inline, Stack } from "@pplethai/components";
import { Download, Plus, Search } from "lucide-react";
import { ComponentPage } from "../../components/ComponentPage";

const variants = [
  { variant: "default" as const, label: "ปุ่มหลัก" },
  { variant: "secondary" as const, label: "ปุ่มรอง" },
  { variant: "outline" as const, label: "ปุ่มขอบ" },
  { variant: "destructive" as const, label: "ปุ่มลบ" },
  { variant: "ghost" as const, label: "โปร่ง" },
  { variant: "link" as const, label: "ลิงก์" },
];

export default function ButtonPage() {
  return (
    <ComponentPage
      title="Button"
      description="ปุ่มหลักของระบบ มี 6 variants และ 4 ขนาด รองรับการแสดงไอคอนข้างใน"
      demo={
        <Stack gap="lg">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Variants</p>
            <Inline gap="sm">
              {variants.map(({ variant, label }) => (
                <Button key={variant} variant={variant}>
                  {label}
                </Button>
              ))}
            </Inline>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Disabled</p>
            <Inline gap="sm">
              {variants.map(({ variant, label }) => (
                <Button key={variant} variant={variant} disabled>
                  {label}
                </Button>
              ))}
            </Inline>
          </div>
        </Stack>
      }
      code={`import { Button } from "@pplethai/components";

<Button variant="default">ปุ่มหลัก</Button>
<Button variant="secondary">ปุ่มรอง</Button>
<Button variant="outline">ปุ่มขอบ</Button>
<Button variant="destructive">ปุ่มลบ</Button>
<Button variant="ghost">โปร่ง</Button>
<Button variant="link">ลิงก์</Button>`}
      examples={[
        {
          title: "ขนาด",
          demo: (
            <Inline gap="sm" align="center">
              <Button size="sm">เล็ก</Button>
              <Button size="default">ปกติ</Button>
              <Button size="lg">ใหญ่</Button>
              <Button size="icon" aria-label="ค้นหา">
                <Search />
              </Button>
            </Inline>
          ),
          code: `<Button size="sm">เล็ก</Button>
<Button size="default">ปกติ</Button>
<Button size="lg">ใหญ่</Button>
<Button size="icon" aria-label="ค้นหา">
  <Search />
</Button>`,
        },
        {
          title: "พร้อมไอคอน",
          description: "ใส่ไอคอน Lucide เป็น children — ขนาดถูกปรับตาม size อัตโนมัติ",
          demo: (
            <Inline gap="sm" align="center">
              <Button>
                <Plus />
                เพิ่มรายการ
              </Button>
              <Button variant="secondary">
                ดาวน์โหลด
                <Download />
              </Button>
              <Button variant="outline" size="sm">
                <Search />
                ค้นหา
              </Button>
            </Inline>
          ),
          code: `<Button>
  <Plus />
  เพิ่มรายการ
</Button>
<Button variant="secondary">
  ดาวน์โหลด
  <Download />
</Button>`,
        },
        {
          title: "asChild — render as link",
          description: "ใช้ asChild เพื่อให้สไตล์ปุ่มซ้อนทับ element อื่น (เช่น <a> หรือ Link จาก router)",
          demo: (
            <Button asChild>
              <a href="https://example.com" target="_blank" rel="noreferrer">
                เปิดลิงก์ภายนอก
              </a>
            </Button>
          ),
          code: `<Button asChild>
  <a href="https://example.com">เปิดลิงก์ภายนอก</a>
</Button>`,
        },
      ]}
      props={[
        {
          prop: "variant",
          type: '"default" | "secondary" | "outline" | "destructive" | "ghost" | "link"',
          default: '"default"',
          description: "รูปแบบของปุ่ม",
        },
        {
          prop: "size",
          type: '"default" | "sm" | "lg" | "icon"',
          default: '"default"',
          description: "ขนาดและ padding",
        },
        {
          prop: "asChild",
          type: "boolean",
          default: "false",
          description: "ส่งสไตล์ผ่านไปยัง child element แทน <button> (Radix Slot)",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "ปิดการกด พร้อมลด opacity",
        },
        {
          prop: "...props",
          type: "ButtonHTMLAttributes<HTMLButtonElement>",
          description: "props ของ <button> ทั้งหมด รวมถึง type, onClick, ref",
        },
      ]}
      accessibility={
        <ul>
          <li>ใช้ <code>aria-label</code> เสมอเมื่อเป็น <code>size=&quot;icon&quot;</code></li>
          <li>โฟกัสเห็นได้ผ่าน ring สีหลัก (focus-visible:ring-ring)</li>
          <li>เมื่อ disabled ปุ่มจะ pointer-events: none และไม่รับโฟกัส</li>
        </ul>
      }
    />
  );
}
