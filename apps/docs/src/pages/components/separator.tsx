import { Inline, Separator, Stack } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function SeparatorPage() {
  return (
    <ComponentPage
      title="Separator"
      description="เส้นแบ่งแนวนอนหรือตั้ง สร้างจาก @radix-ui/react-separator"
      demo={
        <Stack gap="md" className="max-w-md">
          <p className="text-sm">เนื้อหาด้านบน</p>
          <Separator />
          <p className="text-sm">เนื้อหาด้านล่าง</p>
          <Inline gap="md" align="center">
            <span className="text-sm">ซ้าย</span>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm">กลาง</span>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm">ขวา</span>
          </Inline>
        </Stack>
      }
      code={`import { Separator } from "@pplethai/components";

<Separator />
<Separator orientation="vertical" className="h-6" />`}
      props={[
        {
          prop: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "ทิศทางของเส้น (vertical ต้องระบุ height ผ่าน className)",
        },
        {
          prop: "decorative",
          type: "boolean",
          default: "true",
          description: "เมื่อ true ระบบจะตั้ง aria-hidden; false จะใช้ role=separator",
        },
      ]}
    />
  );
}
