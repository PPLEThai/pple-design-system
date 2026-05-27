import { Input, Label, Stack } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function InputPage() {
  return (
    <ComponentPage
      title="Input"
      description="ช่องกรอกข้อความบรรทัดเดียว — รองรับทุก type ของ HTML input"
      demo={
        <Stack gap="md" className="max-w-sm">
          <div>
            <Label htmlFor="demo-email">อีเมล</Label>
            <Input id="demo-email" type="email" placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="demo-disabled">ปิดใช้งาน</Label>
            <Input id="demo-disabled" disabled defaultValue="ไม่สามารถแก้ไข" className="mt-1" />
          </div>
        </Stack>
      }
      code={`import { Input, Label } from "@pplethai/components";

<Label htmlFor="email">อีเมล</Label>
<Input id="email" type="email" placeholder="you@example.com" />`}
      props={[
        {
          prop: "type",
          type: "HTMLInputTypeAttribute",
          default: '"text"',
          description: "type ของ input (text, email, password, number, file, ...)",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "ปิดการแก้ไข",
        },
        {
          prop: "...props",
          type: "InputHTMLAttributes<HTMLInputElement>",
          description: "props ของ <input> ทั้งหมด (placeholder, value, onChange, ref, ...)",
        },
      ]}
      accessibility={
        <ul>
          <li>จับคู่กับ <code>&lt;Label htmlFor=...&gt;</code> เสมอ เพื่อ screen reader</li>
          <li>โฟกัสเห็นได้ผ่าน ring</li>
          <li>ใน react-hook-form ใช้ <code>FormTextField</code> แทนเพื่อรับ error อัตโนมัติ</li>
        </ul>
      }
    />
  );
}
