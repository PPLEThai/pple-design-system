import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Icon,
  Inline,
  Logo,
  Stack,
} from "@pplethai/components";
import { Heart, Search, Settings } from "lucide-react";

export function IconsPage() {
  return (
    <Stack gap="lg">
      <div>
        <h1 className="text-3xl font-semibold">ไอคอน</h1>
        <p className="mt-2 text-muted-foreground">
          ไอคอน Lucide ผ่านคอมโพเนนต์ <code className="rounded bg-muted px-1">Icon</code> หรือ import
          โดยตรง
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>โลโก้</CardTitle>
        </CardHeader>
        <CardContent>
          <Inline gap="lg" align="center">
            <Logo size="sm" className="text-primary" />
            <Logo size="md" className="text-primary" />
            <Logo size="lg" className="text-primary" />
            <Logo size="xl" className="text-secondary" />
          </Inline>
          <p className="mt-4 text-sm text-muted-foreground">
            ตราสัญลักษณ์จาก <code className="rounded bg-muted px-1">logo.svg</code> ใช้{" "}
            <code className="rounded bg-muted px-1">className=&quot;text-primary&quot;</code> เพื่อสีส้มแบรนด์ผ่าน{" "}
            <code className="rounded bg-muted px-1">currentColor</code>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ขนาดไอคอน</CardTitle>
        </CardHeader>
        <CardContent>
          <Inline gap="lg" align="center">
            <Icon icon={Search} size="sm" color="primary" aria-label="ค้นหา" />
            <Icon icon={Heart} size="md" color="destructive" aria-label="ชื่นชอบ" />
            <Icon icon={Settings} size="lg" color="muted" aria-label="ตั้งค่า" />
          </Inline>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ปุ่มพร้อมไอคอน</CardTitle>
        </CardHeader>
        <CardContent>
          <Button size="icon" variant="outline" aria-label="ค้นหา">
            <Search className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        สำหรับไอคอนเฉพาะจุด สามารถ import จาก{" "}
        <code className="rounded bg-muted px-1">lucide-react</code> โดยตรง
      </p>
    </Stack>
  );
}
