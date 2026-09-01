import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Stack,
} from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function DialogPage() {
  return (
    <ComponentPage
      title="Dialog"
      description="หน้าต่างโมดอลที่ขัดจังหวะการทำงาน — focus-trap, ปิดด้วย Esc/คลิก overlay, ปุ่ม X อัตโนมัติ"
      demo={
        <Dialog>
          <DialogTrigger asChild>
            <Button>เปิด Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>แก้ไขโปรไฟล์</DialogTitle>
              <DialogDescription>เปลี่ยนแปลงข้อมูลส่วนตัวของคุณ คลิกบันทึกเมื่อเสร็จ</DialogDescription>
            </DialogHeader>
            <Stack gap="md">
              <div>
                <Label htmlFor="d-name">ชื่อ</Label>
                <Input id="d-name" defaultValue="สมชาย" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="d-username">ชื่อผู้ใช้</Label>
                <Input id="d-username" defaultValue="@somchai" className="mt-1" />
              </div>
            </Stack>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">ยกเลิก</Button>
              </DialogClose>
              <Button type="submit">บันทึก</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
      code={`import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@pplethai/components";

<Dialog>
  <DialogTrigger asChild>
    <Button>เปิด Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>แก้ไขโปรไฟล์</DialogTitle>
      <DialogDescription>เปลี่ยนแปลงข้อมูล</DialogDescription>
    </DialogHeader>
    {/* form fields */}
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">ยกเลิก</Button>
      </DialogClose>
      <Button>บันทึก</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      props={[
        { prop: "open", type: "boolean", description: "controlled state" },
        { prop: "defaultOpen", type: "boolean", description: "uncontrolled initial state" },
        { prop: "onOpenChange", type: "(open: boolean) => void", description: "callback เมื่อเปิด/ปิด" },
        { prop: "modal", type: "boolean", default: "true", description: "บล็อก interaction นอก dialog เมื่อ true" },
      ]}
      examples={[
        {
          title: "เนื้อหายาว — เลื่อนภายใน dialog",
          description:
            "DialogContent จำกัดความสูงที่ calc(100dvh - 2rem) และ overflow-y-auto ดังนั้นฟอร์มหรือรายการที่ยาวจะเลื่อนได้แทนที่จะถูกตัดที่ขอบจอ",
          demo: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">เปิดรายการยาว</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>หมวดบัญชี</DialogTitle>
                  <DialogDescription>
                    รายการด้านล่างยาวเกินจอ — เลื่อนภายใน dialog เพื่อดูรายการท้ายและปุ่มยืนยัน
                  </DialogDescription>
                </DialogHeader>
                <Stack gap="sm">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className="rounded-md border px-3 py-2 text-sm">
                      หมวดที่ {i + 1}
                    </div>
                  ))}
                </Stack>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">ยกเลิก</Button>
                  </DialogClose>
                  <Button type="submit">ยืนยัน</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
          code: `<Dialog>
  <DialogTrigger asChild>
    <Button>เปิดรายการยาว</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>หมวดบัญชี</DialogTitle>
      <DialogDescription>เลื่อนภายใน dialog เพื่อดูรายการท้าย</DialogDescription>
    </DialogHeader>
    {/* many rows */}
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">ยกเลิก</Button>
      </DialogClose>
      <Button>ยืนยัน</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
        },
      ]}
      extraPropTables={[
        {
          title: "Sub-components",
          rows: [
            { prop: "DialogTrigger", type: "Slot/button", description: "ใช้ asChild เพื่อให้ปุ่มเป็น trigger" },
            { prop: "DialogContent", type: "Radix Content", description: "เนื้อหา dialog (จัดกลาง + max-h viewport + overflow-y-auto)" },
            { prop: "DialogHeader / DialogFooter", type: "div", description: "wrapper สำหรับ layout ส่วนหัว/ท้าย" },
            { prop: "DialogTitle", type: "h2", description: "หัวข้อ (required สำหรับ a11y)" },
            { prop: "DialogDescription", type: "p", description: "คำอธิบายใต้หัวข้อ" },
            { prop: "DialogClose", type: "Slot/button", description: "ปุ่มสำหรับปิด dialog" },
          ],
        },
      ]}
      accessibility={
        <ul>
          <li>Esc เพื่อปิด; โฟกัสติดอยู่ภายใน dialog (focus trap)</li>
          <li>คลิก overlay หรือปุ่ม X (มุมขวาบน) เพื่อปิด</li>
          <li>ต้องมี <code>DialogTitle</code> เสมอ — Radix จะเตือนใน console ถ้าไม่มี</li>
        </ul>
      }
      notes={
        <p>
          ใช้ Dialog สำหรับงานที่ต้อง interrupt ผู้ใช้ (ยืนยันการลบ, ฟอร์มสำคัญ); ใช้ Sheet
          เมื่อต้องการแสดงเนื้อหายาวจากขอบจอ; ใช้ Popover สำหรับเนื้อหาเล็กที่อ้างอิง trigger
        </p>
      }
    />
  );
}
