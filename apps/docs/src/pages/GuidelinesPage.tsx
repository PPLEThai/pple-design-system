import { Stack } from "@pplethai/components";

export function GuidelinesPage() {
  return (
    <Stack gap="lg">
      <div>
        <h1 className="text-3xl font-semibold">แนวทางการใช้งาน</h1>
        <p className="mt-2 text-muted-foreground">แนวทางใช้ระบบดีไซน์ให้สอดคล้องกัน</p>
      </div>

      <section className="prose prose-sm max-w-none space-y-4">
        <div>
          <h2 className="text-xl font-semibold">การใช้สี</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Primary (#FF6A13)</strong> — ปุ่มหลัก (CTA) และ
              focus ring
            </li>
            <li>
              <strong className="text-foreground">Secondary (#002B49)</strong> — เมนูนำทาง
              โครงสร้าง UI
            </li>
            <li>
              <strong className="text-foreground">Destructive (#C13200)</strong> — ข้อผิดพลาด
              การลบข้อมูล
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">ลำดับความสำคัญของปุ่ม</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            ควรมีปุ่ม primary เพียงหนึ่งปุ่มต่อหน้า ใช้ secondary หรือ outline สำหรับทางเลือกอื่น
            ใช้ destructive เฉพาะการกระทำที่ย้อนกลับไม่ได้
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">ตัวอักษรภาษาไทย</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            ใช้ <code className="rounded bg-muted px-1">font-heading</code> สำหรับหัวข้อ และ{" "}
            <code className="rounded bg-muted px-1">font-body</code> สำหรับเนื้อหา ตั้ง{" "}
            <code className="rounded bg-muted px-1">lang=&quot;th&quot;</code> ที่ root ของเอกสาร
            ขนาดขั้นต่ำ ~19px สำหรับ body (text-base) และ ~14px สำหรับ caption (type scale 1.2×)
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">ขยายสไตล์ด้วย cva</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            import ตัวช่วยเช่น <code className="rounded bg-muted px-1">buttonVariants</code> แล้วใช้{" "}
            <code className="rounded bg-muted px-1">cn()</code> เพื่อปรับสไตล์ในโค้ดแอป
          </p>
        </div>
      </section>
    </Stack>
  );
}
