import { Alert, AlertDescription, AlertTitle, Stack } from "@pplethai/components";
import { AlertCircle, Info, Terminal } from "lucide-react";
import { ComponentPage } from "../../components/ComponentPage";

export default function AlertPage() {
  return (
    <ComponentPage
      title="Alert"
      description="ข้อความสถานะคงที่ในหน้า (ไม่หายเอง) — สำหรับข้อมูลที่ผู้ใช้ต้องอ่าน"
      demo={
        <Stack gap="md">
          <Alert>
            <Terminal />
            <AlertTitle>แจ้งให้ทราบ</AlertTitle>
            <AlertDescription>variant=&quot;default&quot; ใช้พื้น muted</AlertDescription>
          </Alert>
          <Alert variant="primary">
            <Info />
            <AlertTitle>ข้อมูล</AlertTitle>
            <AlertDescription>variant=&quot;primary&quot; เน้นด้วยสีหลัก</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>เกิดข้อผิดพลาด</AlertTitle>
            <AlertDescription>variant=&quot;destructive&quot; สำหรับข้อผิดพลาด</AlertDescription>
          </Alert>
        </Stack>
      }
      code={`import { Alert, AlertTitle, AlertDescription } from "@pplethai/components";
import { Info } from "lucide-react";

<Alert variant="primary">
  <Info />
  <AlertTitle>ข้อมูล</AlertTitle>
  <AlertDescription>เนื้อหา alert</AlertDescription>
</Alert>`}
      props={[
        {
          prop: "variant",
          type: '"default" | "primary" | "destructive"',
          default: '"default"',
          description: "สีพื้นและขอบของกล่อง",
        },
      ]}
      extraPropTables={[
        {
          title: "Sub-components",
          rows: [
            { prop: "AlertTitle", type: "div", description: "หัวข้อ alert (ใช้ font-heading)" },
            { prop: "AlertDescription", type: "div", description: "เนื้อความ alert (text-sm)" },
          ],
        },
      ]}
      accessibility={
        <ul>
          <li>มี role=&quot;alert&quot; ในตัว — screen reader จะอ่านทันทีเมื่อปรากฏ</li>
          <li>สำหรับแจ้งเตือนชั่วคราว ให้ใช้ toast (Sonner) แทน</li>
        </ul>
      }
    />
  );
}
