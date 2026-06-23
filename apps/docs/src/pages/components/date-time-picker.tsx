import { DateTimePicker, Label, Stack } from "@pplethai/components";
import { useState } from "react";
import { ComponentPage } from "../../components/ComponentPage";

export default function DateTimePickerPage() {
  const [value, setValue] = useState<Date | undefined>();
  const [withSeconds, setWithSeconds] = useState<Date | undefined>();

  return (
    <ComponentPage
      title="DateTimePicker"
      description="เลือกวันและเวลาในกล่องเดียว — รวม DatePicker และ TimePicker ไว้ในป๊อปโอเวอร์เดียว ค่าที่ได้เป็น Date ที่มีทั้งวันและเวลา"
      demo={
        <Stack gap="md" className="max-w-md">
          <Label htmlFor="dtp-basic">วันและเวลานัดหมาย</Label>
          <DateTimePicker id="dtp-basic" value={value} onValueChange={setValue} />
          <p className="text-xs text-muted-foreground">
            {value ? `เลือก: ${value.toLocaleString("th-TH")}` : "ยังไม่ได้เลือก"}
          </p>
        </Stack>
      }
      code={`import { DateTimePicker } from "@pplethai/components";

const [value, setValue] = useState<Date>();

<DateTimePicker value={value} onValueChange={setValue} />`}
      examples={[
        {
          title: "แสดงวินาที (HH:MM:SS)",
          description: "ตั้ง showSeconds เพื่อเพิ่มช่องเลือกวินาทีในส่วนเวลา",
          demo: (
            <Stack gap="md" className="max-w-md">
              <DateTimePicker showSeconds value={withSeconds} onValueChange={setWithSeconds} />
            </Stack>
          ),
          code: `<DateTimePicker showSeconds value={value} onValueChange={setValue} />`,
        },
        {
          title: "จำกัดช่วงวันที่",
          description: "ส่ง props ของ react-day-picker ผ่าน calendarProps",
          demo: (
            <DateTimePicker
              step={15}
              placeholder="เลือกวันและเวลาในอนาคต"
              calendarProps={{ disabled: { before: new Date() } }}
            />
          ),
          code: `<DateTimePicker
  step={15}
  calendarProps={{ disabled: { before: new Date() } }}
/>`,
        },
      ]}
      props={[
        {
          prop: "value",
          type: "Date",
          description: "ค่าที่เลือก (controlled) — มีทั้งวันและเวลา",
        },
        {
          prop: "onValueChange",
          type: "(value: Date | undefined) => void",
          description: "callback เมื่อค่าเปลี่ยนหรือถูกล้าง",
        },
        {
          prop: "defaultValue",
          type: "Date",
          description: "ค่าเริ่มต้นเมื่อใช้แบบ uncontrolled",
        },
        {
          prop: "showSeconds",
          type: "boolean",
          default: "false",
          description: "แสดงช่องเลือกวินาที (HH:MM:SS)",
        },
        {
          prop: "step",
          type: "number",
          default: "1",
          description: "ก้าวของนาที (และวินาที)",
        },
        {
          prop: "dateFormat",
          type: "string",
          default: '"d MMM yyyy"',
          description: "รูปแบบ date-fns สำหรับส่วนวันที่บนปุ่ม",
        },
        {
          prop: "locale",
          type: "Locale",
          default: "th",
          description: "โลแคล date-fns สำหรับปฏิทินและป้าย",
        },
        {
          prop: "calendarProps",
          type: "Partial<CalendarProps>",
          description: "ส่งต่อไปยัง Calendar (เช่น disabled, captionLayout, startMonth)",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "ปิดการใช้งานปุ่ม",
        },
        {
          prop: "align",
          type: '"start" | "center" | "end"',
          default: '"start"',
          description: "การจัดวางป๊อปโอเวอร์",
        },
      ]}
      notes={
        <p>
          DateTimePicker เป็นการรวม <code>DatePicker</code> และ <code>TimePicker</code> ไว้ในกล่องเดียว;
          การเลือกวันใหม่จะคงเวลาเดิมไว้ (หรือ 00:00 เมื่อยังไม่ได้ตั้งเวลา)
        </p>
      }
    />
  );
}
