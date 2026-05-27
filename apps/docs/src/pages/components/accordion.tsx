import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function AccordionPage() {
  return (
    <ComponentPage
      title="Accordion"
      description="ขยาย/ย่อเนื้อหาเป็นรายการ รองรับ single (เปิดได้ทีละอัน) หรือ multiple"
      demo={
        <Accordion type="single" collapsible className="max-w-lg">
          <AccordionItem value="q1">
            <AccordionTrigger>ระบบดีไซน์คืออะไร?</AccordionTrigger>
            <AccordionContent>
              ชุดคอมโพเนนต์ โทเคน และแนวทางการใช้งานที่ทำให้ผลิตภัณฑ์มี look &amp; feel สอดคล้องกัน
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>ใช้กับ React อย่างเดียวหรือเปล่า?</AccordionTrigger>
            <AccordionContent>ใช่ ปัจจุบันรองรับเฉพาะ React 18+</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>ต้องตั้งค่า Tailwind ไหม?</AccordionTrigger>
            <AccordionContent>
              ต้อง — import preset จาก <code>@pplethai/components/tailwind-preset</code>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      }
      code={`import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@pplethai/components";

<Accordion type="single" collapsible>
  <AccordionItem value="q1">
    <AccordionTrigger>คำถาม 1</AccordionTrigger>
    <AccordionContent>คำตอบ 1</AccordionContent>
  </AccordionItem>
</Accordion>`}
      props={[
        {
          prop: "type",
          type: '"single" | "multiple"',
          required: true,
          description: "เปิดได้ทีละอัน หรือเปิดพร้อมกันหลายอัน",
        },
        {
          prop: "collapsible",
          type: "boolean",
          default: "false",
          description: "(single เท่านั้น) อนุญาตให้ปิดอันที่เปิดอยู่ได้",
        },
        {
          prop: "value / defaultValue",
          type: "string | string[]",
          description: "ค่าที่เปิดอยู่ — array เมื่อ type=multiple",
        },
        {
          prop: "onValueChange",
          type: "(value: string | string[]) => void",
          description: "callback เมื่อสถานะเปลี่ยน",
        },
      ]}
      accessibility={
        <ul>
          <li>Space/Enter บน trigger เพื่อสลับ</li>
          <li>ลูกศร ↑↓ เลื่อนระหว่าง trigger</li>
          <li>แอนิเมชันใช้ <code>accordion-down/up</code> keyframes</li>
        </ul>
      }
    />
  );
}
