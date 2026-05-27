import { Inline, Label, Stack, Switch } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function SwitchPage() {
  return (
    <ComponentPage
      title="Switch"
      description="สวิตช์สองสถานะ (เปิด/ปิด) เหมาะกับการตั้งค่าที่มีผลทันที"
      demo={
        <Stack gap="md">
          <Inline gap="sm">
            <Switch id="s-notify" />
            <Label htmlFor="s-notify">รับการแจ้งเตือน</Label>
          </Inline>
          <Inline gap="sm">
            <Switch id="s-default" defaultChecked />
            <Label htmlFor="s-default">เปิดไว้ตั้งแต่ต้น</Label>
          </Inline>
          <Inline gap="sm">
            <Switch id="s-disabled" disabled />
            <Label htmlFor="s-disabled">ปิดใช้งาน</Label>
          </Inline>
        </Stack>
      }
      code={`import { Switch, Label } from "@pplethai/components";

<Switch id="notify" />
<Label htmlFor="notify">รับการแจ้งเตือน</Label>`}
      props={[
        {
          prop: "checked",
          type: "boolean",
          description: "ค่าควบคุม",
        },
        {
          prop: "defaultChecked",
          type: "boolean",
          description: "ค่าเริ่มต้น",
        },
        {
          prop: "onCheckedChange",
          type: "(checked: boolean) => void",
          description: "callback เมื่อเปลี่ยน",
        },
        {
          prop: "disabled",
          type: "boolean",
          default: "false",
          description: "ปิดการกด",
        },
      ]}
      notes={
        <p>
          ใช้ Switch สำหรับการตั้งค่าที่มีผลทันที (เช่น เปิดโหมดมืด); ใช้ Checkbox สำหรับการเลือกในฟอร์ม
          ที่กดส่งทีหลัง
        </p>
      }
    />
  );
}
