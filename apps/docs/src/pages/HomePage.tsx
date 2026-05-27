import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  Inline,
  Input,
  Label,
  Logo,
  Stack,
} from "@pplethai/components";
import { Lock } from "lucide-react";
import { CodeBlock } from "../components/CodeBlock";

export function HomePage() {
  return (
    <Stack gap="lg">
      <div>
        <h1 className="text-3xl font-semibold">@pplethai/components</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          ระบบดีไซน์พรรคประชาชน — คอมโพเนนต์ React บน shadcn/ui ใช้ฟอนต์ Anakotmai สำหรับหัวข้อ
          IBM Plex Sans Thai Looped สำหรับเนื้อหา และโทเคนสีแบรนด์
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ติดตั้ง</CardTitle>
          <CardDescription>
            peer dependencies: react, react-dom, react-hook-form, zod
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock>{`pnpm add @pplethai/components react react-dom react-hook-form zod

// ใน entry ของแอป:
import "@pplethai/components/styles.css";`}</CodeBlock>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ตัวอย่างสั้นๆ</CardTitle>
          <CardDescription>
            การ์ดอยู่กลางจอบนพื้นไล่สีแบรนด์ — สำหรับหน้า login/signup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={cn("overflow-hidden rounded-md border bg-gradient-brand p-8")}>
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
                    <Label htmlFor="home-auth-email">อีเมล</Label>
                    <Input id="home-auth-email" type="email" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="home-auth-pwd">รหัสผ่าน</Label>
                    <Input id="home-auth-pwd" type="password" className="mt-1" />
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
          </div>
          <CodeBlock className="mt-4">{`<div className="min-h-screen bg-gradient-brand">
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
</div>`}</CodeBlock>
        </CardContent>
      </Card>
    </Stack>
  );
}
