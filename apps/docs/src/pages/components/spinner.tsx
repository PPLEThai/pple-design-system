import { Button, Inline, Spinner, Stack } from "@pplethai/components";
import { useEffect, useState } from "react";
import { ComponentPage } from "../../components/ComponentPage";

function DeterminateDemo() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Inline gap="md" align="center">
      <Spinner value={value} size="lg" />
      <span className="text-sm tabular-nums text-muted-foreground">{value}%</span>
    </Inline>
  );
}

export default function SpinnerPage() {
  return (
    <ComponentPage
      title="Spinner"
      description="ตัวบ่งชี้สถานะกำลังโหลด — ไม่กำหนด value จะหมุนวนต่อเนื่อง (indeterminate); กำหนด value 0–max จะแสดงเป็นวงกลมความคืบหน้า"
      demo={
        <Inline gap="lg" align="center">
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </Inline>
      }
      code={`import { Spinner } from "@pplethai/components";

<Spinner />            {/* indeterminate, default size */}
<Spinner size="lg" />  {/* indeterminate, large */}`}
      examples={[
        {
          title: "ขนาด",
          demo: (
            <Inline gap="lg" align="center">
              <Spinner size="sm" />
              <Spinner size="default" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </Inline>
          ),
          code: `<Spinner size="sm" />
<Spinner size="default" />
<Spinner size="lg" />
<Spinner size="xl" />`,
        },
        {
          title: "Determinate (มี value)",
          description:
            "กำหนด value 0–max เพื่อแสดงสัดส่วนความคืบหน้า เหมาะกับงาน upload/download ที่รู้เปอร์เซ็นต์",
          demo: (
            <Stack gap="md">
              <Inline gap="lg" align="center">
                <Spinner value={25} size="lg" />
                <Spinner value={50} size="lg" />
                <Spinner value={75} size="lg" />
                <Spinner value={100} size="lg" />
              </Inline>
              <DeterminateDemo />
            </Stack>
          ),
          code: `<Spinner value={25} />
<Spinner value={50} />
<Spinner value={75} />
<Spinner value={100} />`,
        },
        {
          title: "ใช้ในปุ่ม",
          description: "วาง Spinner คู่ข้อความเพื่อสื่อสารสถานะกำลังประมวลผล",
          demo: (
            <Inline gap="sm" align="center">
              <Button disabled>
                <Spinner size="sm" className="text-primary-foreground" />
                กำลังบันทึก
              </Button>
              <Button variant="outline" disabled>
                <Spinner size="sm" />
                กำลังโหลด
              </Button>
            </Inline>
          ),
          code: `<Button disabled>
  <Spinner size="sm" className="text-primary-foreground" />
  กำลังบันทึก
</Button>`,
        },
        {
          title: "สีกำหนดเอง",
          description: "Spinner ใช้ currentColor — ปรับสีผ่าน text-* ของ Tailwind",
          demo: (
            <Inline gap="lg" align="center">
              <Spinner size="lg" className="text-primary" />
              <Spinner size="lg" className="text-secondary" />
              <Spinner size="lg" className="text-destructive" />
              <Spinner size="lg" className="text-muted-foreground" />
            </Inline>
          ),
          code: `<Spinner className="text-primary" />
<Spinner className="text-secondary" />
<Spinner className="text-destructive" />`,
        },
      ]}
      props={[
        {
          prop: "value",
          type: "number | null",
          description:
            "ค่าความคืบหน้า (0..max); ไม่กำหนดจะเป็น indeterminate หมุนวนต่อเนื่อง",
        },
        {
          prop: "max",
          type: "number",
          default: "100",
          description: "ค่าสูงสุดเมื่อเป็น determinate",
        },
        {
          prop: "size",
          type: '"sm" | "default" | "lg" | "xl"',
          default: '"default"',
          description: "ขนาด: 16 / 24 / 32 / 48 px",
        },
        {
          prop: "strokeWidth",
          type: "number",
          default: "2.5",
          description: "ความหนาของเส้นใน viewBox 24×24",
        },
        {
          prop: "label",
          type: "string",
          default: '"Loading"',
          description: "ข้อความสำหรับ screen reader (aria-label)",
        },
        {
          prop: "className",
          type: "string",
          description: "ปรับสีผ่าน text-* และเพิ่มสไตล์อื่น ๆ",
        },
      ]}
      accessibility={
        <ul>
          <li>
            มี <code>role=&quot;status&quot;</code> และ <code>aria-live=&quot;polite&quot;</code>{" "}
            เพื่อให้ screen reader ประกาศการเปลี่ยนสถานะ
          </li>
          <li>
            เมื่อเป็น determinate จะมี <code>aria-valuemin/max/now</code> ครบ
          </li>
          <li>
            ใช้ <code>label</code> อธิบายสิ่งที่กำลังโหลด เช่น{" "}
            <code>&quot;กำลังโหลดรายการ&quot;</code>
          </li>
        </ul>
      }
      notes={
        <p>
          โหมด indeterminate ใช้ <code>animate-spin</code> ของ Tailwind ซึ่งเคารพ{" "}
          <code>prefers-reduced-motion</code> ตามค่าเริ่มต้นของระบบ
        </p>
      }
    />
  );
}
