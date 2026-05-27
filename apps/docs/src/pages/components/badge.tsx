import { Badge, Inline } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function BadgePage() {
  return (
    <ComponentPage
      title="Badge"
      description="ป้ายสถานะขนาดเล็ก ใช้แสดงสถานะหรือจำนวนข้างเนื้อหา"
      demo={
        <Inline gap="sm">
          <Badge>ค่าเริ่มต้น</Badge>
          <Badge variant="secondary">รอง</Badge>
          <Badge variant="destructive">ผิดพลาด</Badge>
          <Badge variant="outline">ขอบ</Badge>
        </Inline>
      }
      code={`import { Badge } from "@pplethai/components";

<Badge>ค่าเริ่มต้น</Badge>
<Badge variant="secondary">รอง</Badge>
<Badge variant="destructive">ผิดพลาด</Badge>
<Badge variant="outline">ขอบ</Badge>`}
      props={[
        {
          prop: "variant",
          type: '"default" | "secondary" | "destructive" | "outline"',
          default: '"default"',
          description: "รูปแบบของ badge",
        },
        {
          prop: "...props",
          type: "HTMLAttributes<HTMLDivElement>",
          description: "props ของ <div> ทั่วไป",
        },
      ]}
    />
  );
}
