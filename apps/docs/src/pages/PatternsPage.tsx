import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  cn,
  Container,
  Inline,
  Input,
  Label,
  Logo,
  Separator,
  Stack,
  Switch,
  Textarea,
} from "@pplethai/components";
import { Activity, BarChart3, Bell, CreditCard, Lock, Plus, ShieldCheck, User } from "lucide-react";
import type { ReactNode } from "react";
import { CodeBlock } from "../components/CodeBlock";

interface PatternSectionProps {
  title: string;
  description: ReactNode;
  preview: ReactNode;
  code: string;
}

function PatternSection({ title, description, preview, code }: PatternSectionProps) {
  return (
    <section>
      <h2 className="mb-1 font-heading text-xl font-medium">{title}</h2>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <Card>
        <CardContent className="pt-6">{preview}</CardContent>
      </Card>
      <CodeBlock className="mt-3">{code}</CodeBlock>
    </section>
  );
}

function PreviewFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-md border bg-muted/30", className)}>
      {children}
    </div>
  );
}

export function PatternsPage() {
  return (
    <Stack gap="lg" className="max-w-5xl">
      <header>
        <h1 className="font-heading text-3xl font-medium">แพทเทิร์น</h1>
        <p className="mt-2 text-muted-foreground">
          ตัวอย่างเลย์เอาต์ที่ประกอบจาก Stack / Inline / Container และคอมโพเนนต์อื่น ๆ
          — คัดลอกแล้วปรับใช้ในแอปได้ทันที
        </p>
      </header>

      <PatternSection
        title="1. Two-column form page"
        description="ซ้าย: navigation sidebar, ขวา: ฟอร์มยาว แบ่ง section ด้วย Separator"
        preview={
          <PreviewFrame>
            <div className="flex">
              <aside className="hidden w-48 shrink-0 border-r bg-background p-4 md:block">
                <Stack gap="xs">
                  <p className="mb-2 px-2 text-xs font-semibold uppercase text-muted-foreground">
                    บัญชี
                  </p>
                  <button className="rounded-md bg-muted px-2 py-1 text-left text-sm font-medium">
                    โปรไฟล์
                  </button>
                  <button className="rounded-md px-2 py-1 text-left text-sm text-muted-foreground hover:bg-muted">
                    ความปลอดภัย
                  </button>
                  <button className="rounded-md px-2 py-1 text-left text-sm text-muted-foreground hover:bg-muted">
                    การชำระเงิน
                  </button>
                </Stack>
              </aside>
              <main className="min-w-0 flex-1 bg-background p-6">
                <Stack gap="lg">
                  <div>
                    <h3 className="font-heading text-lg font-medium">โปรไฟล์</h3>
                    <p className="text-sm text-muted-foreground">
                      จัดการข้อมูลที่แสดงต่อสาธารณะ
                    </p>
                  </div>
                  <Stack gap="md" className="max-w-sm">
                    <div>
                      <Label htmlFor="tw-name">ชื่อแสดง</Label>
                      <Input id="tw-name" className="mt-1" defaultValue="สมชาย" />
                    </div>
                    <div>
                      <Label htmlFor="tw-bio">เกี่ยวกับฉัน</Label>
                      <Textarea id="tw-bio" className="mt-1" rows={3} />
                    </div>
                    <Inline gap="sm">
                      <Button>บันทึก</Button>
                      <Button variant="outline">ยกเลิก</Button>
                    </Inline>
                  </Stack>
                </Stack>
              </main>
            </div>
          </PreviewFrame>
        }
        code={`<Container size="lg">
  <div className="flex gap-6">
    <aside className="hidden w-48 shrink-0 md:block">
      <Stack gap="xs" as="nav">
        <NavLink to="/settings/profile">โปรไฟล์</NavLink>
        <NavLink to="/settings/security">ความปลอดภัย</NavLink>
      </Stack>
    </aside>
    <main className="min-w-0 flex-1">
      <Stack gap="lg">
        <header>
          <h2>โปรไฟล์</h2>
          <p>จัดการข้อมูลที่แสดงต่อสาธารณะ</p>
        </header>
        <Stack gap="md" className="max-w-sm">
          {/* form fields */}
        </Stack>
      </Stack>
    </main>
  </div>
</Container>`}
      />

      <PatternSection
        title="2. Card grid"
        description="ตาราง responsive 1 → 2 → 3 คอลัมน์ (Tailwind grid ใน Stack เพราะ Inline ใช้ flex wrap ที่ไม่บังคับ column count)"
        preview={
          <PreviewFrame className="bg-background p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: BarChart3, title: "วิเคราะห์", desc: "ดูสถิติการใช้งานแบบเรียลไทม์" },
                { icon: ShieldCheck, title: "ความปลอดภัย", desc: "เปิด 2FA และจัดการเซสชัน" },
                { icon: Bell, title: "การแจ้งเตือน", desc: "ตั้งค่าช่องทางและความถี่" },
              ].map(({ icon: I, title, desc }) => (
                <Card key={title}>
                  <CardHeader className="pb-2">
                    <Inline gap="sm" align="center">
                      <I className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">{title}</CardTitle>
                    </Inline>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription>{desc}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </PreviewFrame>
        }
        code={`<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.title}>
      <CardHeader className="pb-2">
        <Inline gap="sm" align="center">
          <item.icon className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">{item.title}</CardTitle>
        </Inline>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription>{item.desc}</CardDescription>
      </CardContent>
    </Card>
  ))}
</div>`}
      />

      <PatternSection
        title="3. Form section"
        description="กลุ่มฟิลด์ที่มีหัวข้อ คำอธิบาย และฟอร์มในแนวตั้ง — เหมาะใช้เป็นบล็อกซ้ำในหน้า settings"
        preview={
          <PreviewFrame className="bg-background p-6">
            <Stack gap="md" className="max-w-md">
              <div>
                <h3 className="font-heading text-base font-medium">ตั้งค่าการแจ้งเตือน</h3>
                <p className="text-sm text-muted-foreground">
                  เลือกช่องทางที่ต้องการรับการแจ้งเตือน
                </p>
              </div>
              <Stack gap="sm">
                <Inline gap="sm">
                  <Checkbox id="fs-email" defaultChecked />
                  <Label htmlFor="fs-email">อีเมล</Label>
                </Inline>
                <Inline gap="sm">
                  <Checkbox id="fs-sms" />
                  <Label htmlFor="fs-sms">SMS</Label>
                </Inline>
                <Inline gap="sm">
                  <Checkbox id="fs-push" defaultChecked />
                  <Label htmlFor="fs-push">Push notification</Label>
                </Inline>
              </Stack>
            </Stack>
          </PreviewFrame>
        }
        code={`function FormSection({ title, description, children }: Props) {
  return (
    <Stack gap="md">
      <div>
        <h3 className="font-heading text-base font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Stack gap="sm">{children}</Stack>
    </Stack>
  );
}

<FormSection title="ตั้งค่าการแจ้งเตือน" description="...">
  <Inline gap="sm"><Checkbox id="email" /><Label htmlFor="email">อีเมล</Label></Inline>
</FormSection>`}
      />

      <PatternSection
        title="4. Settings page"
        description="หลาย section ต่อกันแนวตั้ง คั่นด้วย Separator — ใส่ใน Container size='md' ให้อ่านสบาย"
        preview={
          <PreviewFrame className="bg-background">
            <Container size="md" className="py-6">
              <Stack gap="lg">
                <div>
                  <h3 className="font-heading text-lg font-medium">การตั้งค่า</h3>
                  <p className="text-sm text-muted-foreground">จัดการบัญชีและความเป็นส่วนตัว</p>
                </div>
                <Separator />
                <Inline justify="between" align="start">
                  <Stack gap="xs">
                    <Inline gap="sm" align="center">
                      <User className="h-4 w-4" />
                      <p className="font-medium">โปรไฟล์สาธารณะ</p>
                    </Inline>
                    <p className="text-sm text-muted-foreground">
                      ให้คนอื่นค้นหาคุณด้วยชื่อหรืออีเมล
                    </p>
                  </Stack>
                  <Switch defaultChecked />
                </Inline>
                <Separator />
                <Inline justify="between" align="start">
                  <Stack gap="xs">
                    <Inline gap="sm" align="center">
                      <Activity className="h-4 w-4" />
                      <p className="font-medium">บันทึกการใช้งาน</p>
                    </Inline>
                    <p className="text-sm text-muted-foreground">
                      เก็บประวัติการเข้าระบบ 90 วัน
                    </p>
                  </Stack>
                  <Switch />
                </Inline>
                <Separator />
                <Inline justify="between" align="start">
                  <Stack gap="xs">
                    <Inline gap="sm" align="center">
                      <CreditCard className="h-4 w-4" />
                      <p className="font-medium">การชำระเงิน</p>
                    </Inline>
                    <p className="text-sm text-muted-foreground">วิธีการชำระเงินและใบเสร็จ</p>
                  </Stack>
                  <Button variant="outline" size="sm">
                    จัดการ
                  </Button>
                </Inline>
              </Stack>
            </Container>
          </PreviewFrame>
        }
        code={`<Container size="md" className="py-6">
  <Stack gap="lg">
    <header>...</header>
    <Separator />
    <Inline justify="between" align="start">
      <Stack gap="xs">
        <p className="font-medium">โปรไฟล์สาธารณะ</p>
        <p className="text-sm text-muted-foreground">คำอธิบาย</p>
      </Stack>
      <Switch defaultChecked />
    </Inline>
    <Separator />
    {/* more rows */}
  </Stack>
</Container>`}
      />

      <PatternSection
        title="5. Auth screen"
        description="การ์ดอยู่กลางจอบนพื้นไล่สีแบรนด์ — สำหรับหน้า login/signup"
        preview={
          <PreviewFrame className="bg-gradient-brand p-8">
            <Card className="mx-auto max-w-sm">
              <CardHeader>
                <Inline gap="sm" align="center" className="mb-2">
                  <Logo size="sm" className="text-primary" />
                  <CardTitle className="text-base">เข้าสู่ระบบ</CardTitle>
                </Inline>
                <CardDescription>ใช้บัญชีของคุณเพื่อเข้าใช้งาน</CardDescription>
              </CardHeader>
              <CardContent>
                <Stack gap="md">
                  <div>
                    <Label htmlFor="auth-email">อีเมล</Label>
                    <Input id="auth-email" type="email" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="auth-pwd">รหัสผ่าน</Label>
                    <Input id="auth-pwd" type="password" className="mt-1" />
                  </div>
                </Stack>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-2">
                <Button className="w-full">
                  <Lock />
                  เข้าสู่ระบบ
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  ยังไม่มีบัญชี?{" "}
                  <a href="/signup" className="text-primary hover:underline">
                    สมัครสมาชิก
                  </a>
                </p>
              </CardFooter>
            </Card>
          </PreviewFrame>
        }
        code={`<div className="min-h-screen bg-gradient-brand">
  <Container size="sm" className="flex min-h-screen items-center justify-center">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <Inline gap="sm" align="center">
          <Logo size="sm" />
          <CardTitle>เข้าสู่ระบบ</CardTitle>
        </Inline>
      </CardHeader>
      <CardContent>
        <Stack gap="md">{/* form */}</Stack>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full"><Lock />เข้าสู่ระบบ</Button>
      </CardFooter>
    </Card>
  </Container>
</div>`}
      />

      <PatternSection
        title="6. Dashboard skeleton"
        description="หัวเรื่องพร้อมปุ่ม CTA, สถิติเร็ว และ card grid — โครงพื้นฐานของหน้า dashboard"
        preview={
          <PreviewFrame className="bg-background p-6">
            <Stack gap="lg">
              <Inline justify="between" align="center">
                <Stack gap="xs">
                  <h3 className="font-heading text-lg font-medium">ภาพรวม</h3>
                  <p className="text-sm text-muted-foreground">ข้อมูล ณ วันนี้</p>
                </Stack>
                <Button>
                  <Plus />
                  สร้างใหม่
                </Button>
              </Inline>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: "สมาชิก", value: "12,438", trend: "+8%" },
                  { label: "กิจกรรม", value: "284", trend: "+2%" },
                  { label: "การมีส่วนร่วม", value: "76%", trend: "-1%" },
                ].map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="pt-6">
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <Inline gap="sm" align="center" className="mt-1">
                        <p className="font-heading text-2xl font-medium">{stat.value}</p>
                        <Badge variant={stat.trend.startsWith("-") ? "destructive" : "default"}>
                          {stat.trend}
                        </Badge>
                      </Inline>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Stack>
          </PreviewFrame>
        }
        code={`<Stack gap="lg">
  <Inline justify="between" align="center">
    <Stack gap="xs">
      <h2>ภาพรวม</h2>
      <p className="text-sm text-muted-foreground">ข้อมูล ณ วันนี้</p>
    </Stack>
    <Button><Plus />สร้างใหม่</Button>
  </Inline>
  <div className="grid gap-3 sm:grid-cols-3">
    {stats.map((stat) => (
      <Card key={stat.label}>
        <CardContent className="pt-6">
          <p className="text-xs text-muted-foreground">{stat.label}</p>
          <Inline gap="sm" align="center">
            <p className="font-heading text-2xl">{stat.value}</p>
            <Badge>{stat.trend}</Badge>
          </Inline>
        </CardContent>
      </Card>
    ))}
  </div>
</Stack>`}
      />
    </Stack>
  );
}
