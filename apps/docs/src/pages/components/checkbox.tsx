import { Checkbox, Inline, Label, Stack } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function CheckboxPage() {
  return (
    <ComponentPage
      title="Checkbox"
      description="ช่องทำเครื่องหมายพร้อมแอนิเมชันวาดเครื่องหมายถูก (ปิดเมื่อ prefers-reduced-motion)"
      demo={
        <Stack gap="md">
          <Inline gap="sm">
            <Checkbox id="demo-terms" />
            <Label htmlFor="demo-terms">ยอมรับข้อกำหนด</Label>
          </Inline>
          <Inline gap="sm">
            <Checkbox id="demo-default" defaultChecked />
            <Label htmlFor="demo-default">เลือกไว้ตั้งแต่ต้น</Label>
          </Inline>
          <Inline gap="sm">
            <Checkbox id="demo-disabled" disabled />
            <Label htmlFor="demo-disabled">ปิดใช้งาน</Label>
          </Inline>
        </Stack>
      }
      code={`import { Checkbox, Label } from "@pplethai/components";

<Checkbox id="terms" />
<Label htmlFor="terms">ยอมรับข้อกำหนด</Label>`}
      props={[
        {
          prop: "checked",
          type: "boolean | 'indeterminate'",
          description: "ค่าควบคุม (controlled)",
        },
        {
          prop: "defaultChecked",
          type: "boolean | 'indeterminate'",
          description: "ค่าเริ่มต้น (uncontrolled)",
        },
        {
          prop: "onCheckedChange",
          type: "(checked: CheckedState) => void",
          description: "callback เมื่อสถานะเปลี่ยน",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "ปิดการกด",
        },
      ]}
      accessibility={
        <ul>
          <li>จับคู่กับ Label ผ่าน <code>htmlFor</code></li>
          <li>กด Space เพื่อสลับสถานะ</li>
          <li>แอนิเมชันถูกย่อเป็น 0.01ms เมื่อระบบตั้ง prefers-reduced-motion</li>
        </ul>
      }
    />
  );
}
