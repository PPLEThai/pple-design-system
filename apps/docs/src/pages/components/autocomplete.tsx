import { Autocomplete, Label, Stack } from "@pplethai/components";
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
  { value: "sni", label: "สุราษฎร์ธานี" },
];

export default function AutocompletePage() {
  const [single, setSingle] = useState("bkk");
  const [multi, setMulti] = useState<string[]>(["bkk"]);

  return (
    <ComponentPage
      title="Autocomplete"
      description="ค้นหาแล้วเลือก รองรับทั้งเลือกค่าเดียวและหลายค่า เหมาะกับรายการที่มาก"
      demo={
        <Stack gap="md" className="max-w-sm">
          <div>
            <Label htmlFor="ac-single">จังหวัด (เลือกค่าเดียว)</Label>
            <Autocomplete
              id="ac-single"
              className="mt-1"
              options={provinces}
              value={single}
              onValueChange={setSingle}
              placeholder="พิมพ์ชื่อจังหวัด"
            />
          </div>
        </Stack>
      }
      code={`import { Autocomplete } from "@pplethai/components";

const [value, setValue] = useState("");

<Autocomplete
  options={provinces}
  value={value}
  onValueChange={setValue}
  placeholder="พิมพ์ชื่อจังหวัด"
/>`}
      examples={[
        {
          title: "เลือกได้หลายค่า",
          demo: (
            <Stack gap="md" className="max-w-sm">
              <Label htmlFor="ac-multi">จังหวัด</Label>
              <Autocomplete
                id="ac-multi"
                multiple
                options={provinces}
                value={multi}
                onValueChange={setMulti}
                placeholder="เลือกจังหวัด"
                searchPlaceholder="ค้นหาจังหวัด..."
              />
              <p className="text-xs text-muted-foreground">เลือกอยู่ {multi.length} รายการ</p>
            </Stack>
          ),
          code: `<Autocomplete
  multiple
  options={provinces}
  value={multi}
  onValueChange={setMulti}
  placeholder="เลือกจังหวัด"
  searchPlaceholder="ค้นหาจังหวัด..."
/>`,
        },
      ]}
      props={[
        { prop: "options", type: "AutocompleteOption[]", required: true, description: "รายการตัวเลือก" },
        { prop: "value", type: "string | string[]", required: true, description: "ค่าที่เลือก (string เมื่อ multiple=false)" },
        { prop: "onValueChange", type: "(value: string | string[]) => void", required: true, description: "callback ตาม multiple" },
        { prop: "multiple", type: "boolean", default: "false", description: "เปิดโหมดเลือกหลายค่า" },
        { prop: "placeholder", type: "string", description: "ข้อความเมื่อยังไม่เลือก" },
        { prop: "searchPlaceholder", type: "string", default: '"พิมพ์เพื่อค้นหา..."', description: "placeholder ของช่องค้นหา" },
        { prop: "emptyMessage", type: "string", default: '"ไม่พบรายการ"', description: "ข้อความเมื่อไม่พบผลลัพธ์" },
        { prop: "disabled", type: "boolean", default: "false", description: "ปิดการใช้งาน" },
      ]}
      notes={
        <p>
          เมื่อ <code>multiple=false</code>: ช่อง input คือทั้งช่องค้นหาและที่แสดงค่าที่เลือก
          เมื่อ <code>multiple=true</code>: แสดงเป็นปุ่ม chips ค้นหาใน popover แยก
        </p>
      }
    />
  );
}
