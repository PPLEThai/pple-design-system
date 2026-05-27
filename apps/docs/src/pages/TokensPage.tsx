import { Stack } from "@pplethai/components";

const colors = [
  { name: "Primary", desc: "สีหลัก", hex: "#FF6A13", className: "bg-primary" },
  { name: "Secondary", desc: "สีรอง", hex: "#002B49", className: "bg-secondary" },
  { name: "Foreground", desc: "ข้อความ", hex: "#212121", className: "bg-foreground" },
  { name: "Muted", desc: "ข้อความรอง", hex: "#464646", className: "bg-muted-foreground" },
  { name: "Destructive", desc: "ลบ/ข้อผิดพลาด", hex: "#C13200", className: "bg-destructive" },
];

export function TokensPage() {
  return (
    <Stack gap="lg">
      <div>
        <h1 className="text-3xl font-semibold">โทเคน</h1>
        <p className="mt-2 text-muted-foreground">สีแบรนด์และสเกลตัวอักษร</p>
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold">สี</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map((color) => (
            <div key={color.name} className="overflow-hidden rounded-lg border">
              <div className={`h-20 ${color.className}`} />
              <div className="p-3">
                <p className="font-medium">
                  {color.name} <span className="text-muted-foreground">({color.desc})</span>
                </p>
                <p className="text-sm text-muted-foreground">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">ตัวอักษร</h2>
        <div className="space-y-4 rounded-lg border p-6">
          <div>
            <p className="text-xs text-muted-foreground">หัวข้อ — Anakotmai medium (500)</p>
            <h3 className="font-heading text-2xl font-medium">หัวข้อภาษาไทย</h3>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              เนื้อหา — IBM Plex Sans Thai Looped 400 (~19px, text-base)
            </p>
            <p className="text-base">
              เนื้อหาภาษาไทยใช้ line-height 1.65 เพื่อความอ่านง่าย ขนาด body ~19px และ ~14px สำหรับ
              caption (type scale 1.2×)
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">เน้น — weight 600</p>
            <p className="text-base font-semibold">ข้อความเน้น</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Gradient</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { name: "Primary", className: "bg-gradient-primary" },
            { name: "Secondary", className: "bg-gradient-secondary" },
            { name: "Brand", className: "bg-gradient-brand" },
            { name: "Destructive", className: "bg-gradient-destructive" },
          ].map((gradient) => (
            <div key={gradient.name} className="overflow-hidden rounded-lg border">
              <div className={`h-20 ${gradient.className}`} />
              <div className="p-3">
                <p className="font-medium">{gradient.name}</p>
                <p className="text-sm text-muted-foreground">
                  <code className="rounded bg-muted px-1">{gradient.className}</code>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">มุมโค้งและระยะห่าง</h2>
        <p className="text-sm text-muted-foreground">
          มุมโค้งเริ่มต้น: 0.5rem (--radius) ขนาด Container: sm (640px), md (768px), lg (1280px)
        </p>
      </section>
    </Stack>
  );
}
