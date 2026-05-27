import {
  Button,
  Card,
  CardContent,
  Inline,
  Input,
  Label,
  Stack,
  Stepper,
  StepperItem,
  Textarea,
} from "@pplethai/components";
import { useState } from "react";
import { ComponentPage } from "../../components/ComponentPage";

const STEPS = [
  { title: "บัญชี", description: "อีเมลและรหัสผ่าน" },
  { title: "โปรไฟล์", description: "ชื่อและรูปประจำตัว" },
  { title: "ยืนยัน", description: "ตรวจสอบและส่ง" },
];

function MultiStepFormDemo() {
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;
  const isDone = step >= STEPS.length;

  return (
    <Stack gap="lg">
      <Stepper value={isDone ? STEPS.length : step}>
        {STEPS.map((s) => (
          <StepperItem key={s.title} title={s.title} description={s.description} />
        ))}
      </Stepper>

      <Card>
        <CardContent className="pt-6">
          {step === 0 ? (
            <Stack gap="md" className="max-w-sm">
              <div>
                <Label htmlFor="ms-email">อีเมล</Label>
                <Input id="ms-email" type="email" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="ms-password">รหัสผ่าน</Label>
                <Input id="ms-password" type="password" className="mt-1" />
              </div>
            </Stack>
          ) : null}
          {step === 1 ? (
            <Stack gap="md" className="max-w-sm">
              <div>
                <Label htmlFor="ms-name">ชื่อ</Label>
                <Input id="ms-name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="ms-bio">เกี่ยวกับคุณ</Label>
                <Textarea id="ms-bio" className="mt-1" rows={3} />
              </div>
            </Stack>
          ) : null}
          {step === 2 ? (
            <p className="text-sm text-muted-foreground">
              ตรวจสอบข้อมูลแล้วกด <strong className="text-foreground">เสร็จสิ้น</strong>{" "}
              เพื่อสร้างบัญชี
            </p>
          ) : null}
          {isDone ? (
            <p className="text-sm text-foreground">สร้างบัญชีเรียบร้อยแล้ว ✨</p>
          ) : null}
        </CardContent>
      </Card>

      <Inline gap="sm" justify="between">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0 || isDone}
        >
          ย้อนกลับ
        </Button>
        {isDone ? (
          <Button variant="outline" onClick={() => setStep(0)}>
            เริ่มใหม่
          </Button>
        ) : (
          <Button onClick={() => setStep((s) => s + 1)}>
            {isLast ? "เสร็จสิ้น" : "ถัดไป"}
          </Button>
        )}
      </Inline>
    </Stack>
  );
}

export default function StepperPage() {
  return (
    <ComponentPage
      title="Stepper"
      description="ตัวบอกขั้นตอนสำหรับฟอร์มหลายขั้น — แสดงสถานะ completed / current / upcoming รองรับทั้งแนวนอนและแนวตั้ง"
      demo={
        <Stepper value={1}>
          <StepperItem title="บัญชี" description="อีเมลและรหัสผ่าน" />
          <StepperItem title="โปรไฟล์" description="ชื่อและรูปประจำตัว" />
          <StepperItem title="ยืนยัน" description="ตรวจสอบและส่ง" />
        </Stepper>
      }
      code={`import { Stepper, StepperItem } from "@pplethai/components";

<Stepper value={1}>
  <StepperItem title="บัญชี" description="อีเมลและรหัสผ่าน" />
  <StepperItem title="โปรไฟล์" description="ชื่อและรูปประจำตัว" />
  <StepperItem title="ยืนยัน" description="ตรวจสอบและส่ง" />
</Stepper>`}
      examples={[
        {
          title: "ไม่มีคำอธิบาย",
          description: "ใช้เฉพาะ title หากต้องการให้สั้น กระชับ",
          demo: (
            <Stepper value={2}>
              <StepperItem title="เลือกแผน" />
              <StepperItem title="ชำระเงิน" />
              <StepperItem title="ยืนยัน" />
              <StepperItem title="เสร็จสิ้น" />
            </Stepper>
          ),
          code: `<Stepper value={2}>
  <StepperItem title="เลือกแผน" />
  <StepperItem title="ชำระเงิน" />
  <StepperItem title="ยืนยัน" />
  <StepperItem title="เสร็จสิ้น" />
</Stepper>`,
        },
        {
          title: "แนวตั้ง",
          description: "เหมาะกับ sidebar หรือพื้นที่แคบ — กำหนด orientation=\"vertical\"",
          demo: (
            <div className="max-w-xs">
              <Stepper value={1} orientation="vertical">
                <StepperItem title="ข้อมูลส่วนตัว" description="ชื่อ-นามสกุล เบอร์โทร" />
                <StepperItem title="ที่อยู่จัดส่ง" description="กรอกที่อยู่และรหัสไปรษณีย์" />
                <StepperItem title="วิธีการชำระเงิน" description="บัตรเครดิตหรือโอน" />
                <StepperItem title="ยืนยันคำสั่งซื้อ" />
              </Stepper>
            </div>
          ),
          code: `<Stepper value={1} orientation="vertical">
  <StepperItem title="ข้อมูลส่วนตัว" description="..." />
  <StepperItem title="ที่อยู่จัดส่ง" description="..." />
  <StepperItem title="วิธีการชำระเงิน" description="..." />
  <StepperItem title="ยืนยันคำสั่งซื้อ" />
</Stepper>`,
        },
        {
          title: "เสร็จทั้งหมด",
          description:
            "ส่ง value ที่เท่ากับจำนวน step เพื่อทำเครื่องหมายว่าทุกขั้นเสร็จแล้ว",
          demo: (
            <Stepper value={3}>
              <StepperItem title="บัญชี" />
              <StepperItem title="โปรไฟล์" />
              <StepperItem title="ยืนยัน" />
            </Stepper>
          ),
          code: `<Stepper value={3}>  {/* steps.length === 3 */}
  <StepperItem title="บัญชี" />
  <StepperItem title="โปรไฟล์" />
  <StepperItem title="ยืนยัน" />
</Stepper>`,
        },
        {
          title: "ฟอร์มหลายขั้นแบบใช้งานจริง",
          description:
            "ตัวอย่างฟอร์ม wizard ที่ใช้ Stepper คู่ปุ่ม ย้อนกลับ / ถัดไป — state ของ step อยู่ที่ parent",
          demo: <MultiStepFormDemo />,
          code: `const STEPS = [
  { title: "บัญชี", description: "อีเมลและรหัสผ่าน" },
  { title: "โปรไฟล์", description: "ชื่อและรูปประจำตัว" },
  { title: "ยืนยัน", description: "ตรวจสอบและส่ง" },
];

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;

  return (
    <Stack gap="lg">
      <Stepper value={step}>
        {STEPS.map((s) => (
          <StepperItem key={s.title} title={s.title} description={s.description} />
        ))}
      </Stepper>

      <Card>
        <CardContent className="pt-6">{/* fields per step */}</CardContent>
      </Card>

      <Inline gap="sm" justify="between">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          ย้อนกลับ
        </Button>
        <Button onClick={() => setStep((s) => s + 1)}>
          {isLast ? "เสร็จสิ้น" : "ถัดไป"}
        </Button>
      </Inline>
    </Stack>
  );
}`,
        },
      ]}
      props={[
        {
          prop: "value",
          type: "number",
          description:
            "ลำดับ step ปัจจุบัน (0-indexed) — step ก่อนหน้าจะถือว่า completed; ส่งค่าเท่ากับจำนวน step เพื่อทำเครื่องหมายทุกขั้นเสร็จ",
        },
        {
          prop: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "ทิศทางการวาง step",
        },
        {
          prop: "children",
          type: "ReactNode (StepperItem[])",
          description: "ลำดับของ <StepperItem />",
        },
      ]}
      extraPropTables={[
        {
          title: "StepperItem props",
          rows: [
            {
              prop: "title",
              type: "ReactNode",
              description: "หัวข้อของ step",
            },
            {
              prop: "description",
              type: "ReactNode",
              description: "คำอธิบายเสริมใต้ title (optional)",
            },
            {
              prop: "...props",
              type: "LiHTMLAttributes<HTMLLIElement>",
              description: "props ของ <li> รวมถึง onClick (สำหรับการนำทาง)",
            },
          ],
        },
      ]}
      accessibility={
        <ul>
          <li>
            Root เป็น <code>&lt;ol&gt;</code> พร้อม <code>aria-orientation</code> ตาม prop
          </li>
          <li>
            Step ปัจจุบันมี <code>aria-current=&quot;step&quot;</code> ให้ screen reader
            ระบุตำแหน่งได้
          </li>
          <li>
            ตัวเลข / เครื่องหมายถูกในวงกลมมี <code>aria-hidden</code> เพราะข้อความ title
            ถ่ายทอดข้อมูลเดียวกันแล้ว
          </li>
        </ul>
      }
      notes={
        <p>
          Stepper เป็นองค์ประกอบสำหรับ <em>แสดงสถานะ</em> เท่านั้น —
          การจัดการ step state, การ validate, และการนำทาง (next/back)
          อยู่ที่ component ฝั่งคุณ
        </p>
      }
    />
  );
}
