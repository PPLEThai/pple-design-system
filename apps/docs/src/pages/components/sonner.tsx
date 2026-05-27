import {
  Button,
  Inline,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  showToast,
  Stack,
  type ToastVariant,
} from "@pplethai/components";
import { useState } from "react";
import { ComponentPage } from "../../components/ComponentPage";

const variants: { value: ToastVariant; label: string }[] = [
  { value: "default", label: "default" },
  { value: "success", label: "success" },
  { value: "error", label: "error" },
  { value: "warning", label: "warning" },
  { value: "info", label: "info" },
  { value: "loading", label: "loading" },
];

export default function SonnerPage() {
  const [variant, setVariant] = useState<ToastVariant>("success");

  return (
    <ComponentPage
      title="Toast (Sonner)"
      description="ระบบแจ้งเตือนชั่วคราว — เรียกผ่าน showToast() — ต้องวาง <Toaster /> ที่ root ของแอปครั้งเดียว"
      demo={
        <Stack gap="md" className="max-w-sm">
          <div>
            <Label htmlFor="t-variant">ประเภท</Label>
            <Select value={variant} onValueChange={(v) => setVariant(v as ToastVariant)}>
              <SelectTrigger id="t-variant" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {variants.map((v) => (
                  <SelectItem key={v.value} value={v.value}>
                    {v.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Inline gap="sm">
            <Button
              onClick={() =>
                showToast({
                  variant,
                  title:
                    variant === "error"
                      ? "เกิดข้อผิดพลาด"
                      : variant === "loading"
                        ? "กำลังโหลด..."
                        : "บันทึกข้อมูลเรียบร้อยแล้ว",
                  description:
                    variant === "loading"
                      ? undefined
                      : "การเปลี่ยนแปลงของคุณถูกบันทึกในระบบแล้ว",
                })
              }
            >
              แสดง toast
            </Button>
          </Inline>
        </Stack>
      }
      code={`// ในไฟล์ root (เช่น App.tsx)
import { Toaster } from "@pplethai/components";
<Toaster />

// ในที่ใดก็ได้
import { showToast } from "@pplethai/components";
showToast({
  variant: "success",
  title: "บันทึกแล้ว",
  description: "การเปลี่ยนแปลงถูกบันทึก",
});`}
      props={[
        {
          prop: "showToast",
          type: "(options: ShowToastOptions) => void",
          description: "function เรียก toast พร้อม variant ของระบบ",
        },
        {
          prop: "Toaster",
          type: "ComponentProps<sonner.Toaster>",
          description: "วางครั้งเดียวที่ root — รับ props ของ Sonner ทั้งหมด (position, expand, ...)",
        },
        {
          prop: "toast",
          type: "sonner.toast",
          description: "re-export raw toast() จาก sonner เผื่อใช้ feature ขั้นสูง (promise, custom)",
        },
      ]}
      extraPropTables={[
        {
          title: "ShowToastOptions",
          rows: [
            { prop: "title", type: "string", required: true, description: "หัวข้อ toast" },
            { prop: "description", type: "string", description: "เนื้อหารองใต้หัวข้อ" },
            {
              prop: "variant",
              type: '"default" | "success" | "error" | "warning" | "info" | "loading"',
              default: '"default"',
              description: "สี/ไอคอนตามสถานะ",
            },
          ],
        },
      ]}
    />
  );
}
