import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Stack } from "@pplethai/components";

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
          <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
            {`pnpm add @pplethai/components react react-dom react-hook-form zod

// ใน entry ของแอป:
import "@pplethai/components/styles.css";`}
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ตัวอย่างสั้นๆ</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack gap="md">
            <Button>ปุ่มหลัก</Button>
            <Button variant="secondary">ปุ่มรอง</Button>
            <Button variant="outline">ปุ่มขอบ</Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
