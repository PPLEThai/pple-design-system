import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

const features = [
  { title: "Buttons", href: "/components/button", desc: "ปุ่ม 6 variants + ขนาด" },
  { title: "Forms", href: "/forms", desc: "ฟอร์มพร้อม react-hook-form + zod" },
  { title: "Layouts", href: "/layout", desc: "Stack, Inline, Container" },
  { title: "Tokens", href: "/tokens", desc: "สี gradients ฟอนต์" },
];

export default function NavigationMenuPage() {
  return (
    <ComponentPage
      title="NavigationMenu"
      description="เมนูนำทางพร้อมแผงเนื้อหาแบบ mega-menu — สำหรับ navbar เดสก์ท็อปที่มีรายการมาก"
      demo={
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>คอมโพเนนต์</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[420px] gap-2 p-4 md:grid-cols-2">
                  {features.map((feature) => (
                    <li key={feature.title}>
                      <NavigationMenuLink
                        href={feature.href}
                        className="block rounded-md p-3 transition-colors hover:bg-muted"
                      >
                        <div className="font-heading text-sm font-medium">{feature.title}</div>
                        <p className="mt-1 text-xs text-muted-foreground">{feature.desc}</p>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/guidelines"
                className="font-heading inline-flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-muted"
              >
                แนวทาง
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      }
      code={`import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
} from "@pplethai/components";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>คอมโพเนนต์</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[420px] p-4 md:grid-cols-2">
          {/* links */}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
      props={[
        { prop: "value / defaultValue", type: "string", description: "controlled / uncontrolled item ที่เปิด" },
        { prop: "onValueChange", type: "(value: string) => void", description: "callback เมื่อสลับ" },
        { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "ทิศทาง" },
        { prop: "delayDuration", type: "number", default: "200", description: "หน่วงเวลาก่อนเปิด (ms)" },
      ]}
      accessibility={
        <ul>
          <li>ลูกศร ←→ เลื่อนระหว่าง trigger; ↓ เปิด content</li>
          <li>Esc ปิด content; โฟกัสกลับไปที่ trigger</li>
        </ul>
      }
      notes={
        <p>
          ใช้ NavigationMenu สำหรับ mega-menu บนเดสก์ท็อป; ใช้ <a href="/components/navbar">Navbar</a>{" "}
          สำหรับลิงก์เรียบง่ายพร้อมเมนูมือถือ
        </p>
      }
    />
  );
}
