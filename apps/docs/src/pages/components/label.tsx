import { Input, Label, Stack } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function LabelPage() {
  return (
    <ComponentPage
      title="Label"
      description="ป้ายกำกับฟิลด์ฟอร์ม สร้างจาก @radix-ui/react-label เพื่อรองรับ peer-disabled"
      demo={
        <Stack gap="md" className="max-w-sm">
          <div>
            <Label htmlFor="demo-name">ชื่อ</Label>
            <Input id="demo-name" className="mt-1" placeholder="ชื่อของคุณ" />
          </div>
        </Stack>
      }
      code={`import { Label, Input } from "@pplethai/components";

<Label htmlFor="name">ชื่อ</Label>
<Input id="name" />`}
      props={[
        {
          prop: "htmlFor",
          type: "string",
          description: "id ของฟิลด์ที่จับคู่",
        },
        {
          prop: "...props",
          type: "LabelHTMLAttributes<HTMLLabelElement>",
          description: "props ของ <label> ทั้งหมด",
        },
      ]}
      accessibility={
        <ul>
          <li>ใช้ <code>htmlFor</code> หรือซ้อนฟิลด์ไว้ข้างใน เพื่อให้คลิก label โฟกัสได้</li>
          <li>เมื่อฟิลด์ peer disabled ตัว label จะลด opacity อัตโนมัติ</li>
        </ul>
      }
    />
  );
}
