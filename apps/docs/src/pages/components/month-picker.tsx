import { Label, MonthCalendar, MonthPicker, Stack } from "@pplethai/components";
import { useState } from "react";
import { ComponentPage } from "../../components/ComponentPage";

export default function MonthPickerPage() {
  const [month, setMonth] = useState<Date | undefined>();
  const [inline, setInline] = useState<Date | undefined>(new Date());

  return (
    <ComponentPage
      title="MonthPicker"
      description="เลือกเดือนและปีผ่านปุ่ม + ป๊อปโอเวอร์ เหมาะกับรายงานหรือการกรองข้อมูลรายเดือน"
      demo={
        <Stack gap="md" className="max-w-sm">
          <Label htmlFor="mp-single">เดือนที่ออกรายงาน</Label>
          <MonthPicker id="mp-single" value={month} onValueChange={setMonth} />
          <p className="text-xs text-muted-foreground">
            {month
              ? `เลือก: ${month.toLocaleDateString("th-TH", { month: "long", year: "numeric" })}`
              : "ยังไม่ได้เลือก"}
          </p>
        </Stack>
      }
      code={`import { MonthPicker } from "@pplethai/components";

const [month, setMonth] = useState<Date>();

<MonthPicker value={month} onValueChange={setMonth} />`}
      examples={[
        {
          title: "จำกัดช่วงด้วย minDate / maxDate",
          description: "เดือนที่อยู่นอกช่วงจะถูกปิดการเลือก",
          demo: (
            <MonthPicker
              placeholder="เลือกเดือนในปีนี้"
              minDate={new Date(new Date().getFullYear(), 0)}
              maxDate={new Date(new Date().getFullYear(), 11)}
            />
          ),
          code: `<MonthPicker
  minDate={new Date(2026, 0)}
  maxDate={new Date(2026, 11)}
/>`,
        },
        {
          title: "MonthCalendar แบบฝังในหน้า",
          description: "ใช้ตารางเดือนโดยตรงเมื่อไม่ต้องการ trigger/ป๊อปโอเวอร์",
          demo: (
            <MonthCalendar
              value={inline}
              onValueChange={setInline}
              className="rounded-md border"
            />
          ),
          code: `import { MonthCalendar } from "@pplethai/components";

const [month, setMonth] = useState<Date>();

<MonthCalendar value={month} onValueChange={setMonth} className="rounded-md border" />`,
        },
      ]}
      props={[
        {
          prop: "value",
          type: "Date",
          description: "เดือนที่เลือก (controlled) — ใช้ปีและเดือนเท่านั้น",
        },
        {
          prop: "onValueChange",
          type: "(date: Date) => void",
          description: "callback เมื่อเลือกเดือน (วันที่ = 1 เสมอ)",
        },
        {
          prop: "defaultValue",
          type: "Date",
          description: "ค่าเริ่มต้นเมื่อใช้แบบ uncontrolled",
        },
        {
          prop: "minDate / maxDate",
          type: "Date",
          description: "จำกัดเดือนที่เลือกได้ (ละเว้นวันที่)",
        },
        {
          prop: "placeholder",
          type: "string",
          default: '"เลือกเดือน"',
          description: "ข้อความบนปุ่มเมื่อยังไม่เลือก",
        },
        {
          prop: "formatLabel",
          type: "(date: Date) => string",
          description: 'กำหนดป้ายบนปุ่มเอง (ค่าเริ่มต้น "<เดือน> <ปี>")',
        },
        {
          prop: "locale",
          type: "string (BCP-47)",
          default: '"th-TH"',
          description: "โลแคลสำหรับชื่อเดือน",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "ปิดการใช้งานปุ่ม",
        },
      ]}
      notes={
        <p>
          ปีจะแสดงเป็นปีคริสต์ศักราช (ค.ศ.) เพื่อให้สอดคล้องกับ DatePicker; ใช้ <code>formatLabel</code>{" "}
          หากต้องการรูปแบบอื่น
        </p>
      }
    />
  );
}
