import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@pplethai/components";
import { useState } from "react";
import { ComponentPage } from "../../components/ComponentPage";

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [position, setPosition] = useState("bottom");

  return (
    <ComponentPage
      title="DropdownMenu"
      description="เมนูบริบทใต้ตัวกระตุ้น รองรับ checkbox / radio items และ sub-menus"
      demo={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">เปิดเมนู</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                โปรไฟล์
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                การชำระเงิน
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>เชิญทีม</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>ส่งอีเมล</DropdownMenuItem>
                  <DropdownMenuItem>คัดลอกลิงก์</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>แสดงผล</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>ตำแหน่ง panel</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">บน</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">ล่าง</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">ขวา</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              ออกจากระบบ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
      code={`import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
  DropdownMenuShortcut,
} from "@pplethai/components";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>เปิดเมนู</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>โปรไฟล์</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked={...} onCheckedChange={...}>
      Status Bar
    </DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      props={[
        { prop: "open / defaultOpen / onOpenChange", type: "Radix DropdownMenu API", description: "จัดการสถานะ" },
        { prop: "modal", type: "boolean", default: "true", description: "บล็อก interaction นอกเมนูเมื่อเปิด" },
      ]}
      extraPropTables={[
        {
          title: "Item variants",
          rows: [
            { prop: "DropdownMenuItem", type: "button-like", description: "รายการคำสั่งธรรมดา รับ onSelect" },
            { prop: "DropdownMenuCheckboxItem", type: "with checked", description: "รับ checked + onCheckedChange" },
            { prop: "DropdownMenuRadioItem", type: "in RadioGroup", description: "ต้องอยู่ใน DropdownMenuRadioGroup" },
            { prop: "DropdownMenuSub*", type: "sub-menu", description: "Sub + SubTrigger + SubContent สำหรับเมนูซ้อน" },
            { prop: "DropdownMenuShortcut", type: "span", description: "แสดง keyboard shortcut ทางขวา" },
          ],
        },
      ]}
      accessibility={
        <ul>
          <li>ลูกศร ↑↓ เลื่อน; → เปิด sub-menu; ← ปิด</li>
          <li>Enter/Space เพื่อเลือก; Esc ปิด</li>
          <li>พิมพ์อักษรเพื่อ jump ไปรายการที่ขึ้นต้นด้วยตัวนั้น</li>
        </ul>
      }
    />
  );
}
