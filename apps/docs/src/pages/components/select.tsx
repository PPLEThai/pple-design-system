import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Stack,
} from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function SelectPage() {
  return (
    <ComponentPage
      title="Select"
      description="ดรอปดาวน์เลือกค่าเดียว สร้างจาก @radix-ui/react-select — สำหรับชุดตัวเลือกไม่กี่รายการที่ไม่ต้องค้นหา"
      demo={
        <Stack gap="md" className="max-w-sm">
          <div>
            <Label htmlFor="sel-province">จังหวัด</Label>
            <Select>
              <SelectTrigger id="sel-province" className="mt-1">
                <SelectValue placeholder="เลือกจังหวัด" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ภาคกลาง</SelectLabel>
                  <SelectItem value="bkk">กรุงเทพมหานคร</SelectItem>
                  <SelectItem value="aya">พระนครศรีอยุธยา</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                  <SelectLabel>ภาคเหนือ</SelectLabel>
                  <SelectItem value="cnx">เชียงใหม่</SelectItem>
                  <SelectItem value="cri">เชียงราย</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Stack>
      }
      code={`import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectSeparator, SelectTrigger, SelectValue,
} from "@pplethai/components";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="เลือกจังหวัด" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>ภาคกลาง</SelectLabel>
      <SelectItem value="bkk">กรุงเทพมหานคร</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
      props={[
        {
          prop: "value",
          type: "string",
          description: "ค่าที่เลือกอยู่ (controlled) ส่งไปที่ Select root",
        },
        {
          prop: "defaultValue",
          type: "string",
          description: "ค่าเริ่มต้น (uncontrolled)",
        },
        {
          prop: "onValueChange",
          type: "(value: string) => void",
          description: "callback เมื่อผู้ใช้เลือก",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "ปิดการเลือก",
        },
      ]}
      accessibility={
        <ul>
          <li>ลูกศร ↑↓ เลื่อนตัวเลือก; Enter ยืนยัน; Esc ปิด</li>
          <li>พิมพ์อักษรเพื่อ jump ไปรายการที่ขึ้นต้นด้วยตัวนั้น</li>
        </ul>
      }
      notes={
        <p>
          ใช้ Select เมื่อตัวเลือกน้อย (~10) และไม่ต้องค้นหา; ใช้ Autocomplete หรือ MultiSelect
          เมื่อรายการเยอะหรือเลือกหลายค่า
        </p>
      }
    />
  );
}
