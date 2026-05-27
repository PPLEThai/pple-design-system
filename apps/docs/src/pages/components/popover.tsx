import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function PopoverPage() {
  return (
    <ComponentPage
      title="Popover"
      description="เนื้อหาลอยที่อ้างอิง trigger — เหมาะกับฟอร์มสั้นหรือเครื่องมือเสริม"
      demo={
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">ตั้งค่ามิติ</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Stack gap="md">
              <div>
                <h4 className="font-heading text-sm font-medium">ขนาด</h4>
                <p className="text-xs text-muted-foreground">กำหนดความกว้างและความสูง</p>
              </div>
              <Stack gap="sm">
                <div>
                  <Label htmlFor="p-width" className="text-xs">กว้าง</Label>
                  <Input id="p-width" defaultValue="100%" className="mt-1 h-8" />
                </div>
                <div>
                  <Label htmlFor="p-height" className="text-xs">สูง</Label>
                  <Input id="p-height" defaultValue="25px" className="mt-1 h-8" />
                </div>
              </Stack>
            </Stack>
          </PopoverContent>
        </Popover>
      }
      code={`import { Popover, PopoverTrigger, PopoverContent } from "@pplethai/components";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">เปิด</Button>
  </PopoverTrigger>
  <PopoverContent>
    {/* ฟอร์มหรือเนื้อหา */}
  </PopoverContent>
</Popover>`}
      props={[
        { prop: "open / defaultOpen / onOpenChange", type: "Radix Popover API", description: "จัดการสถานะเปิด/ปิด" },
        { prop: "modal", type: "boolean", default: "false", description: "เมื่อ true จะบล็อก interaction นอก popover" },
      ]}
      extraPropTables={[
        {
          title: "PopoverContent props",
          rows: [
            { prop: "align", type: '"start" | "center" | "end"', default: '"center"', description: "การจัดวางอ้างอิง trigger" },
            { prop: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "ทิศทาง" },
            { prop: "sideOffset", type: "number", default: "4", description: "ระยะห่างจาก trigger (px)" },
          ],
        },
      ]}
      notes={
        <p>
          ใช้ Popover เมื่อต้องการให้ผู้ใช้แก้ค่าโดยไม่ทิ้งบริบทหน้าจอ; ใช้ Dialog เมื่อต้อง
          interrupt; ใช้ DropdownMenu สำหรับรายการคำสั่ง
        </p>
      }
    />
  );
}
