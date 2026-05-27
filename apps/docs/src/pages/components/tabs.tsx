import { Tabs, TabsContent, TabsList, TabsTrigger } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function TabsPage() {
  return (
    <ComponentPage
      title="Tabs"
      description="สลับเนื้อหาในพื้นที่เดียว — trigger ใช้ gradient เมื่อ active"
      demo={
        <Tabs defaultValue="account" className="max-w-md">
          <TabsList>
            <TabsTrigger value="account">บัญชี</TabsTrigger>
            <TabsTrigger value="security">ความปลอดภัย</TabsTrigger>
            <TabsTrigger value="billing">การชำระเงิน</TabsTrigger>
          </TabsList>
          <TabsContent value="account">เนื้อหาแท็บบัญชี</TabsContent>
          <TabsContent value="security">เนื้อหาแท็บความปลอดภัย</TabsContent>
          <TabsContent value="billing">เนื้อหาแท็บการชำระเงิน</TabsContent>
        </Tabs>
      }
      code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@pplethai/components";

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">บัญชี</TabsTrigger>
    <TabsTrigger value="security">ความปลอดภัย</TabsTrigger>
  </TabsList>
  <TabsContent value="account">...</TabsContent>
  <TabsContent value="security">...</TabsContent>
</Tabs>`}
      props={[
        {
          prop: "value / defaultValue",
          type: "string",
          description: "controlled / uncontrolled value ของ tab ที่เปิดอยู่",
        },
        {
          prop: "onValueChange",
          type: "(value: string) => void",
          description: "callback เมื่อสลับ tab",
        },
        {
          prop: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "ทิศทาง — vertical ใช้ลูกศรซ้าย/ขวาแทนขึ้น/ลง",
        },
      ]}
      extraPropTables={[
        {
          title: "TabsTrigger props",
          rows: [
            { prop: "value", type: "string", required: true, description: "ต้องตรงกับ TabsContent value" },
            { prop: "disabled", type: "boolean", default: "false", description: "ปิดการสลับ" },
          ],
        },
      ]}
      accessibility={
        <ul>
          <li>ลูกศร ←→ เลื่อน trigger; Home/End ไปต้น/ท้าย</li>
          <li>Tab key ออกจาก trigger ไปยัง content</li>
        </ul>
      }
    />
  );
}
