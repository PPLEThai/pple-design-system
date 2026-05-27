import { Label, Stack, Textarea } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function TextareaPage() {
  return (
    <ComponentPage
      title="Textarea"
      description="ช่องกรอกข้อความหลายบรรทัด ปรับขนาดได้ (rows)"
      demo={
        <Stack gap="md" className="max-w-md">
          <div>
            <Label htmlFor="demo-bio">เกี่ยวกับคุณ</Label>
            <Textarea
              id="demo-bio"
              className="mt-1"
              rows={4}
              placeholder="แนะนำตัวสั้นๆ"
            />
          </div>
        </Stack>
      }
      code={`import { Textarea, Label } from "@pplethai/components";

<Label htmlFor="bio">เกี่ยวกับคุณ</Label>
<Textarea id="bio" rows={4} placeholder="แนะนำตัวสั้นๆ" />`}
      props={[
        {
          prop: "rows",
          type: "number",
          description: "จำนวนแถวเริ่มต้น (height ขั้นต่ำคือ 80px)",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "ปิดการแก้ไข",
        },
        {
          prop: "...props",
          type: "TextareaHTMLAttributes<HTMLTextAreaElement>",
          description: "props ของ <textarea> ทั้งหมด",
        },
      ]}
    />
  );
}
