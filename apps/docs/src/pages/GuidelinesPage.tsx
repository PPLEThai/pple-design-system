import { Alert, AlertDescription, AlertTitle, Stack } from "@pplethai/components";
import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

const conventions = [
  {
    title: "ใช้ cn() สำหรับ className",
    body: (
      <>
        รวมคลาสด้วย <code className="rounded bg-muted px-1">cn()</code> (clsx + tailwind-merge)
        เพื่อให้คลาสหลัง override คลาสก่อนได้ถูกต้อง — อย่าต่อสตริงด้วย{" "}
        <code className="rounded bg-muted px-1">+</code>
      </>
    ),
  },
  {
    title: "ขยายสไตล์ด้วย CVA",
    body: (
      <>
        คอมโพเนนต์ที่มี variant จะ export ตัวช่วยเช่น{" "}
        <code className="rounded bg-muted px-1">buttonVariants</code>,{" "}
        <code className="rounded bg-muted px-1">badgeVariants</code> — ใช้ร่วมกับ{" "}
        <code className="rounded bg-muted px-1">cn()</code> ในโค้ดแอป
      </>
    ),
  },
  {
    title: "Compound API แบบ flat export",
    body: (
      <>
        คอมโพเนนต์หลายส่วน export เป็นชื่อแยก เช่น{" "}
        <code className="rounded bg-muted px-1">Card</code>,{" "}
        <code className="rounded bg-muted px-1">CardHeader</code>,{" "}
        <code className="rounded bg-muted px-1">CardTitle</code> — ไม่ใช้ dot notation (
        <code className="rounded bg-muted px-1">Card.Header</code>)
      </>
    ),
  },
  {
    title: "รูปแบบ asChild",
    body: (
      <>
        ปุ่มและ Trigger ที่รองรับ Radix Slot ใช้{" "}
        <code className="rounded bg-muted px-1">asChild</code> เพื่อห่อ router link (
        <code className="rounded bg-muted px-1">NavLink</code>, <code className="rounded bg-muted px-1">Link</code>)
        แทนการใช้ <code className="rounded bg-muted px-1">&lt;button&gt;</code> ดิบ
      </>
    ),
  },
  {
    title: "โทเคนสีผ่าน CSS variables",
    body: (
      <>
        อย่า hardcode สี hex — ใช้คลาสเช่น <code className="rounded bg-muted px-1">bg-primary</code>,{" "}
        <code className="rounded bg-muted px-1">text-muted-foreground</code> ที่อ้างอิงตัวแปร{" "}
        <code className="rounded bg-muted px-1">--primary</code>, <code className="rounded bg-muted px-1">--secondary</code> ฯลฯ
      </>
    ),
  },
  {
    title: "ไอคอน",
    body: (
      <>
        ใช้ <code className="rounded bg-muted px-1">lucide-react</code> โดยตรง หรือห่อด้วย{" "}
        <code className="rounded bg-muted px-1">&lt;Icon&gt;</code> เมื่อต้องการ size/color แบบ typed
      </>
    ),
  },
  {
    title: "โหมดมืด",
    body: (
      <>
        ใช้ class บน root: <code className="rounded bg-muted px-1">&lt;html className=&quot;dark&quot;&gt;</code> —
        โทเคนทุกตัวมีค่าในโหมดมืดใน <code className="rounded bg-muted px-1">styles.css</code>
      </>
    ),
  },
  {
    title: "ภาษาไทย",
    body: (
      <>
        ตั้ง <code className="rounded bg-muted px-1">lang=&quot;th&quot;</code> ที่ root ของเอกสาร
        ใช้ <code className="rounded bg-muted px-1">font-heading</code> สำหรับหัวข้อ และ{" "}
        <code className="rounded bg-muted px-1">font-body</code> สำหรับเนื้อหา (type scale 1.2×)
      </>
    ),
  },
];

const antiPatterns = [
  {
    title: "อย่า hardcode สีแบรนด์เป็น hex",
    example: 'bg-[#FF6A13]',
    fix: "bg-primary",
  },
  {
    title: "อย่าข้าม cn()",
    example: 'className={"px-4 " + extra}',
    fix: 'cn("px-4", extra)',
  },
  {
    title: "อย่าลืม DialogTitle / SheetTitle",
    example: "DialogContent โดยไม่มี title",
    fix: "ใส่ title เสมอ — Radix แจ้งเตือนและ screen reader ต้องการ",
  },
  {
    title: "อย่าใช้ <button> ดิบเป็น trigger",
    example: "<DialogTrigger><button>…</button></DialogTrigger>",
    fix: "<DialogTrigger asChild><Button>…</Button></DialogTrigger>",
  },
  {
    title: "อย่า import จาก sonner โดยตรง",
    example: 'import { toast } from "sonner"',
    fix: "showToast และ Toaster จาก @pplethai/components",
  },
  {
    title: "อย่าซ้อน Container",
    example: "<Container><Container>…</Container></Container>",
    fix: "ใช้ Container เดียวต่อแถวเนื้อหา — มิฉะนั้น padding ซ้ำ",
  },
  {
    title: "อย่าลืม pathname บน Navbar",
    example: "<Navbar items={…} />",
    fix: "ส่ง pathname เพื่อ active state และปิดเมนูมือถือเมื่อเปลี่ยนเส้นทาง",
  },
  {
    title: "อย่าส่งตัวเลขให้ Slider value",
    example: "value={50}",
    fix: "value={[50]} — ค่าเป็น number[] เสมอ",
  },
  {
    title: "อย่าทำ MultiSelect แบบ uncontrolled",
    example: "ไม่ส่ง value / onValueChange",
    fix: "ต้อง controlled — ส่ง value และ onValueChange คู่กัน",
  },
  {
    title: "อย่าใช้ Label ทั้ง htmlFor และ child input",
    example: "<Label htmlFor=\"x\"><Input id=\"x\" /></Label>",
    fix: "เลือกอย่างใดอย่างหนึ่ง — htmlFor + id หรือห่อ input เป็น child",
  },
  {
    title: "อย่าใช้ Switch สำหรับฟิลด์ที่ส่งฟอร์มทีหลัง",
    example: "Switch ในฟอร์ม submit",
    fix: "ใช้ Checkbox — Switch สำหรับการตั้งค่าที่มีผลทันที",
  },
  {
    title: "อย่า render Toaster มากกว่าหนึ่งครั้ง",
    example: "<Toaster /> ในหลาย layout",
    fix: "mount ครั้งเดียวที่ root — มิฉะนั้น toast ซ้ำ",
  },
];

function GuidelineList({
  items,
}: {
  items: { title: string; body: ReactNode }[];
}) {
  return (
    <ol className="list-decimal space-y-4 pl-5 text-sm">
      {items.map((item) => (
        <li key={item.title}>
          <p className="font-medium text-foreground">{item.title}</p>
          <p className="mt-1 text-muted-foreground">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function GuidelinesPage() {
  return (
    <Stack gap="lg" className="max-w-3xl">
      <header>
        <h1 className="font-heading text-3xl font-medium">แนวทางการใช้งาน</h1>
        <p className="mt-2 text-muted-foreground">
          แนวปฏิบัติและข้อควรหลีกเลี่ยงเมื่อใช้ @pplethai/components ให้สอดคล้องกันทั้งแอป
        </p>
      </header>

      <section>
        <h2 className="mb-4 font-heading text-xl font-medium">แนวปฏิบัติ</h2>
        <GuidelineList items={conventions} />
      </section>

      <section>
        <h2 className="mb-2 font-heading text-xl font-medium">การใช้สี</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          อ้างอิงโทเคน ไม่ใช่ hex ใน className — ดูรายละเอียดสีที่หน้า{" "}
          <a href="/tokens" className="text-primary underline-offset-2 hover:underline">
            โทเคน
          </a>
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Primary</strong> — ปุ่มหลัก (CTA) และ focus ring (
            <code className="rounded bg-muted px-1">bg-primary</code>)
          </li>
          <li>
            <strong className="text-foreground">Secondary</strong> — เมนูนำทาง โครงสร้าง UI (
            <code className="rounded bg-muted px-1">bg-secondary</code>)
          </li>
          <li>
            <strong className="text-foreground">Destructive</strong> — ข้อผิดพลาด การลบ (
            <code className="rounded bg-muted px-1">bg-destructive</code>)
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-2 font-heading text-xl font-medium">ลำดับความสำคัญของปุ่ม</h2>
        <p className="text-sm text-muted-foreground">
          ควรมีปุ่ม primary เพียงหนึ่งปุ่มต่อหน้า ใช้ secondary หรือ outline สำหรับทางเลือกอื่น
          ใช้ destructive เฉพาะการกระทำที่ย้อนกลับไม่ได้
        </p>
      </section>

      <section>
        <h2 className="mb-2 font-heading text-xl font-medium">เลือก overlay ให้ถูกประเภท</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Dialog</strong> — ต้องหยุดผู้ใช้ (ยืนยัน ฟอร์มโมดัล)
          </li>
          <li>
            <strong className="text-foreground">Sheet</strong> — แผงด้านข้าง เนื้อหามาก
          </li>
          <li>
            <strong className="text-foreground">Popover</strong> — ฟอร์มเล็กลอยติด trigger
          </li>
          <li>
            <strong className="text-foreground">DropdownMenu</strong> — คำสั่ง / เมนูการกระทำ
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 font-heading text-xl font-medium">สิ่งที่ไม่ควรทำ</h2>
        <Alert className="mb-4">
          <AlertCircle />
          <AlertTitle>Anti-patterns</AlertTitle>
          <AlertDescription>
            รายการด้านล่างมักทำให้สไตล์ไม่สอดคล้อง พัง accessibility หรือพฤติกรรมผิดจากที่ออกแบบไว้
          </AlertDescription>
        </Alert>
        <ul className="space-y-4">
          {antiPatterns.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm"
            >
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="mt-2 text-muted-foreground">
                <span className="text-destructive">✕</span>{" "}
                <code className="rounded bg-muted px-1 text-xs">{item.example}</code>
              </p>
              <p className="mt-1 text-muted-foreground">
                <span className="text-primary">✓</span>{" "}
                <code className="rounded bg-muted px-1 text-xs">{item.fix}</code>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Stack>
  );
}
