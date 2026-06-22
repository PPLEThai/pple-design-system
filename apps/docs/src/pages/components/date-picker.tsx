import { Calendar, DatePicker, type DateRange, Label, Stack } from "@pplethai/components";
import { useState } from "react";
import { ComponentPage } from "../../components/ComponentPage";

export default function DatePickerPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [range, setRange] = useState<DateRange | undefined>();
  const [inline, setInline] = useState<Date | undefined>(new Date());

  return (
    <ComponentPage
      title="DatePicker"
      description="เลือกวันที่ผ่านปุ่ม + ป๊อปโอเวอร์ ประกอบจาก Popover และ Calendar (react-day-picker) — รองรับโหมดวันเดียวและช่วงวันที่"
      demo={
        <Stack gap="md" className="max-w-sm">
          <Label htmlFor="dp-single">วันเกิด</Label>
          <DatePicker id="dp-single" value={date} onValueChange={setDate} />
          <p className="text-xs text-muted-foreground">
            {date ? `เลือก: ${date.toLocaleDateString("th-TH")}` : "ยังไม่ได้เลือก"}
          </p>
        </Stack>
      }
      code={`import { DatePicker } from "@pplethai/components";

const [date, setDate] = useState<Date>();

<DatePicker value={date} onValueChange={setDate} />`}
      examples={[
        {
          title: "ช่วงวันที่ (range)",
          description: "ตั้ง mode=\"range\" — ค่าจะเป็น { from, to }",
          demo: (
            <Stack gap="md" className="max-w-md">
              <DatePicker
                mode="range"
                value={range}
                onValueChange={setRange}
                className="w-[280px]"
              />
            </Stack>
          ),
          code: `import { DatePicker, type DateRange } from "@pplethai/components";

const [range, setRange] = useState<DateRange>();

<DatePicker mode="range" value={range} onValueChange={setRange} />`,
        },
        {
          title: "Calendar แบบฝังในหน้า",
          description: "ใช้ Calendar โดยตรงเมื่อไม่ต้องการ trigger/ป๊อปโอเวอร์",
          demo: (
            <Calendar
              mode="single"
              selected={inline}
              onSelect={setInline}
              className="rounded-md border"
            />
          ),
          code: `import { Calendar } from "@pplethai/components";

const [date, setDate] = useState<Date>();

<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />`,
        },
        {
          title: "จำกัดช่วงและเลือกปี/เดือนแบบดรอปดาวน์",
          description: "ส่ง props ของ react-day-picker ผ่าน calendarProps",
          demo: (
            <DatePicker
              placeholder="เลือกวันที่ในอนาคต"
              calendarProps={{
                captionLayout: "dropdown",
                startMonth: new Date(2020, 0),
                endMonth: new Date(2030, 11),
                disabled: { before: new Date() },
              }}
            />
          ),
          code: `<DatePicker
  calendarProps={{
    captionLayout: "dropdown",
    startMonth: new Date(2020, 0),
    endMonth: new Date(2030, 11),
    disabled: { before: new Date() },
  }}
/>`,
        },
      ]}
      props={[
        {
          prop: "mode",
          type: '"single" | "range"',
          default: '"single"',
          description: "โหมดการเลือก",
        },
        {
          prop: "value",
          type: "Date | DateRange",
          description: "ค่าที่เลือก (controlled) — ชนิดขึ้นกับ mode",
        },
        {
          prop: "onValueChange",
          type: "(value) => void",
          description: "callback เมื่อค่าเปลี่ยน",
        },
        {
          prop: "defaultValue",
          type: "Date | DateRange",
          description: "ค่าเริ่มต้นเมื่อใช้แบบ uncontrolled",
        },
        {
          prop: "placeholder",
          type: "string",
          default: '"เลือกวันที่"',
          description: "ข้อความบนปุ่มเมื่อยังไม่เลือก",
        },
        {
          prop: "dateFormat",
          type: "string",
          default: '"d MMM yyyy"',
          description: "รูปแบบ date-fns สำหรับป้ายบนปุ่ม",
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
          DatePicker เป็น component สำเร็จรูปที่ห่อ Calendar ไว้ใน Popover; หากต้องการปฏิทินฝังในหน้า
          ให้ใช้ <code>Calendar</code> โดยตรง ซึ่งรับ props ทั้งหมดของ react-day-picker
        </p>
      }
    />
  );
}
