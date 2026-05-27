import { Inline, Label, RadioGroup, RadioGroupItem } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function RadioGroupPage() {
  return (
    <ComponentPage
      title="Radio Group"
      description="กลุ่มตัวเลือกที่เลือกได้ทีละหนึ่ง พร้อมแอนิเมชันจุดเลื่อน"
      demo={
        <RadioGroup defaultValue="email" className="max-w-sm">
          <Inline gap="sm">
            <RadioGroupItem value="email" id="r-email" />
            <Label htmlFor="r-email">อีเมล</Label>
          </Inline>
          <Inline gap="sm">
            <RadioGroupItem value="sms" id="r-sms" />
            <Label htmlFor="r-sms">SMS</Label>
          </Inline>
          <Inline gap="sm">
            <RadioGroupItem value="app" id="r-app" />
            <Label htmlFor="r-app">แอป</Label>
          </Inline>
        </RadioGroup>
      }
      code={`import { RadioGroup, RadioGroupItem, Label } from "@pplethai/components";

<RadioGroup defaultValue="email">
  <RadioGroupItem value="email" id="r-email" />
  <Label htmlFor="r-email">อีเมล</Label>
  <RadioGroupItem value="sms" id="r-sms" />
  <Label htmlFor="r-sms">SMS</Label>
</RadioGroup>`}
      props={[
        {
          prop: "value",
          type: "string",
          description: "ค่าที่เลือกอยู่ (controlled)",
        },
        {
          prop: "defaultValue",
          type: "string",
          description: "ค่าเริ่มต้น (uncontrolled)",
        },
        {
          prop: "onValueChange",
          type: "(value: string) => void",
          description: "callback เมื่อเปลี่ยนค่า",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "ปิดทั้งกลุ่ม",
        },
      ]}
      extraPropTables={[
        {
          title: "RadioGroupItem props",
          rows: [
            {
              prop: "value",
              type: "string",
              required: true,
              description: "ค่าที่ส่งกลับเมื่อถูกเลือก",
            },
            {
              prop: "disabled",
              type: "boolean",
              default: "false",
              description: "ปิดเฉพาะรายการนี้",
            },
            {
              prop: "id",
              type: "string",
              description: "ใช้จับคู่กับ Label",
            },
          ],
        },
      ]}
      accessibility={
        <ul>
          <li>ใช้ลูกศร ↑↓ เพื่อเลื่อนระหว่างตัวเลือก</li>
          <li>Space หรือคลิกเพื่อเลือก</li>
          <li>จุดเลื่อนเข้า/ออกถูกปิดเมื่อ prefers-reduced-motion</li>
        </ul>
      }
    />
  );
}
