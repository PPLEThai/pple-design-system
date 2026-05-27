import {
  Button,
  Inline,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

const sides = ["top", "right", "bottom", "left"] as const;

export default function SheetPage() {
  return (
    <ComponentPage
      title="Sheet"
      description="แผงเลื่อนเข้ามาจากขอบจอ (4 ด้าน) สำหรับเนื้อหาเสริมหรือฟอร์ม — โครงสร้างเหมือน Dialog"
      demo={
        <Inline gap="sm">
          {sides.map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline">เปิดจาก {side}</Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Sheet จาก {side}</SheetTitle>
                  <SheetDescription>
                    side=&quot;{side}&quot; — left/right กว้าง 3/4 ของจอ, top/bottom เต็มแนวนอน
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter className="mt-6">
                  <SheetClose asChild>
                    <Button>เสร็จสิ้น</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </Inline>
      }
      code={`import {
  Sheet, SheetTrigger, SheetContent, SheetHeader,
  SheetTitle, SheetDescription, SheetFooter, SheetClose,
} from "@pplethai/components";

<Sheet>
  <SheetTrigger asChild>
    <Button>เปิด Sheet</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>หัวข้อ</SheetTitle>
      <SheetDescription>คำอธิบาย</SheetDescription>
    </SheetHeader>
    {/* content */}
    <SheetFooter>
      <SheetClose asChild>
        <Button>ปิด</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`}
      props={[
        { prop: "open / defaultOpen / onOpenChange", type: "Dialog API", description: "เหมือน Dialog — ใช้ @radix-ui/react-dialog เป็นฐาน" },
      ]}
      extraPropTables={[
        {
          title: "SheetContent props",
          rows: [
            {
              prop: "side",
              type: '"top" | "right" | "bottom" | "left"',
              default: '"right"',
              description: "ขอบจอที่ sheet เลื่อนเข้ามา",
            },
          ],
        },
      ]}
      accessibility={
        <ul>
          <li>Esc ปิด; focus trap; ปุ่ม X อัตโนมัติที่มุมขวาบน</li>
          <li>ต้องมี <code>SheetTitle</code> เพื่อ screen reader</li>
        </ul>
      }
    />
  );
}
