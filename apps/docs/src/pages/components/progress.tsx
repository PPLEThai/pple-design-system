import { Progress, Stack } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function ProgressPage() {
  return (
    <ComponentPage
      title="Progress"
      description="แถบความคืบหน้า — กำหนด value เพื่อแสดงเป็นกราฟ ไม่กำหนดเพื่อโหมด indeterminate ที่มี shimmer"
      demo={
        <Stack gap="sm" className="max-w-md">
          <Progress value={25} />
          <Progress value={66} />
          <Progress value={100} />
          <p className="text-xs text-muted-foreground">โหมด indeterminate (ไม่กำหนด value)</p>
          <Progress />
        </Stack>
      }
      code={`import { Progress } from "@pplethai/components";

<Progress value={66} />
<Progress /> {/* indeterminate */}`}
      props={[
        {
          prop: "value",
          type: "number | null",
          description: "ค่าปัจจุบัน (0..max); ไม่กำหนดจะเป็น indeterminate",
        },
        {
          prop: "max",
          type: "number",
          default: "100",
          description: "ค่าสูงสุด",
        },
      ]}
      notes={
        <p>
          เมื่อ <code>value &lt; max</code> หรือ value ว่าง: ใช้ <code>.progress-shimmer</code>{" "}
          แอนิเมชัน — ปิดอัตโนมัติเมื่อ prefers-reduced-motion
        </p>
      }
    />
  );
}
