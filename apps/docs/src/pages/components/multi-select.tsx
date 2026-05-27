import { Label, MultiSelect, Stack } from "@pplethai/components";
import { useState } from "react";
import { ComponentPage } from "../../components/ComponentPage";

const provinces = [
  { value: "bkk", label: "กรุงเทพมหานคร" },
  { value: "cnx", label: "เชียงใหม่" },
  { value: "kkn", label: "ขอนแก่น" },
  { value: "pkt", label: "ภูเก็ต" },
  { value: "nrt", label: "นครราชสีมา" },
  { value: "udn", label: "อุดรธานี" },
  { value: "cbi", label: "ชลบุรี" },
];

export default function MultiSelectPage() {
  const [value, setValue] = useState<string[]>(["bkk", "cnx"]);
  return (
    <ComponentPage
      title="MultiSelect"
      description="ดรอปดาวน์เลือกได้หลายค่า แสดงเป็น chips ลบรายการได้ทีละชิ้น"
      demo={
        <Stack gap="md" className="max-w-sm">
          <Label htmlFor="ms-province">จังหวัด</Label>
          <MultiSelect
            id="ms-province"
            options={provinces}
            value={value}
            onValueChange={setValue}
            placeholder="เลือกจังหวัด"
          />
          <p className="text-xs text-muted-foreground">เลือกอยู่ {value.length} รายการ</p>
        </Stack>
      }
      code={`import { MultiSelect } from "@pplethai/components";

const [value, setValue] = useState<string[]>([]);

<MultiSelect
  options={provinces}
  value={value}
  onValueChange={setValue}
  placeholder="เลือกจังหวัด"
/>`}
      props={[
        {
          prop: "options",
          type: "MultiSelectOption[]",
          required: true,
          description: "อาร์เรย์ของ { value, label }",
        },
        {
          prop: "value",
          type: "string[]",
          required: true,
          description: "ค่าที่เลือกอยู่ (controlled เท่านั้น)",
        },
        {
          prop: "onValueChange",
          type: "(value: string[]) => void",
          required: true,
          description: "callback เมื่อรายการเปลี่ยน",
        },
        {
          prop: "placeholder",
          type: "string",
          default: '"เลือกรายการ"',
          description: "ข้อความเมื่อยังไม่เลือก",
        },
        {
          prop: "id",
          type: "string",
          description: "ใช้จับคู่กับ Label",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "ปิดการเลือก",
        },
      ]}
      notes={
        <p>
          ใช้ MultiSelect เมื่อต้องการให้ผู้ใช้เห็นทุกตัวเลือกทันที (ไม่ค้นหา); ใช้{" "}
          <code>Autocomplete multiple</code> เมื่อรายการมาก
        </p>
      }
    />
  );
}
