import { Label, Stack, TimePicker, TimeScroller } from "@pplethai/components";
import { useState } from "react";
import { ComponentPage } from "../../components/ComponentPage";

export default function TimePickerPage() {
  const [time, setTime] = useState<Date | undefined>();
  const [withSeconds, setWithSeconds] = useState<Date | undefined>();
  const [inline, setInline] = useState<Date | undefined>();

  return (
    <ComponentPage
      title="TimePicker"
      description="เลือกเวลาแบบ 24 ชั่วโมงผ่านปุ่ม + ป๊อปโอเวอร์ — เลือกแสดงหรือซ่อนช่องวินาทีได้ (HH:MM หรือ HH:MM:SS)"
      demo={
        <Stack gap="md" className="max-w-sm">
          <Label htmlFor="tp-basic">เวลานัดหมาย</Label>
          <TimePicker id="tp-basic" value={time} onValueChange={setTime} />
          <p className="text-xs text-muted-foreground">
            {time ? `เลือก: ${time.toLocaleTimeString("th-TH")}` : "ยังไม่ได้เลือก"}
          </p>
        </Stack>
      }
      code={`import { TimePicker } from "@pplethai/components";

const [time, setTime] = useState<Date>();

<TimePicker value={time} onValueChange={setTime} />`}
      examples={[
        {
          title: "แสดงวินาที (HH:MM:SS)",
          description: 'ตั้ง showSeconds เพื่อเพิ่มช่องเลือกวินาที',
          demo: (
            <Stack gap="md" className="max-w-sm">
              <TimePicker showSeconds value={withSeconds} onValueChange={setWithSeconds} />
            </Stack>
          ),
          code: `<TimePicker showSeconds value={time} onValueChange={setTime} />`,
        },
        {
          title: "ก้าวของนาที (step)",
          description: "จำกัดนาทีให้เลือกเป็นช่วง เช่น ทุก 15 นาที",
          demo: <TimePicker step={15} placeholder="เลือกเวลา (ทุก 15 นาที)" className="w-[220px]" />,
          code: `<TimePicker step={15} />`,
        },
        {
          title: "ตัวเลือกเวลาแบบฝังในหน้า",
          description: "ใช้ TimeScroller โดยตรงเมื่อไม่ต้องการ trigger/ป๊อปโอเวอร์",
          demo: (
            <TimeScroller
              showSeconds
              value={inline}
              onValueChange={setInline}
              className="rounded-md border p-2"
            />
          ),
          code: `import { TimeScroller } from "@pplethai/components";

const [time, setTime] = useState<Date>();

<TimeScroller showSeconds value={time} onValueChange={setTime} className="rounded-md border p-2" />`,
        },
      ]}
      props={[
        {
          prop: "value",
          type: "Date",
          description: "ค่าที่เลือก (controlled) — ใช้เฉพาะส่วนเวลาของ Date",
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
          prop: "placeholder",
          type: "string",
          default: '"เลือกเวลา"',
          description: "ข้อความบนปุ่มเมื่อยังไม่เลือก",
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
          TimePicker ใช้รูปแบบเวลา 24 ชั่วโมงเสมอ และเก็บค่าเป็น <code>Date</code> (มีความหมายเฉพาะส่วนเวลา);
          หากต้องการตัวเลือกเวลาแบบฝังในหน้าให้ใช้ <code>TimeScroller</code> โดยตรง
        </p>
      }
    />
  );
}
