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

const sizeReference = [
  { size: "sm", pixels: "16px (h-4 w-4)", usage: "ในปุ่ม sm หรือ inline text" },
  { size: "md", pixels: "20px (h-5 w-5)", usage: "ค่าเริ่มต้น — เนื้อความทั่วไป" },
  { size: "lg", pixels: "24px (h-6 w-6)", usage: "หัวข้อ ปุ่ม lg หรือ alert" },
];

const colorReference = [
  { color: "default", className: "text-foreground", usage: "ข้อความปกติ" },
  { color: "muted", className: "text-muted-foreground", usage: "ข้อความรอง" },
  { color: "primary", className: "text-primary", usage: "เน้นด้วยสีหลัก" },
  { color: "destructive", className: "text-destructive", usage: "ข้อผิดพลาด/ลบ" },
];

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
          <div className="mt-6 overflow-x-auto rounded-md border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 font-medium">size</th>
                  <th className="px-3 py-2 font-medium">ขนาด</th>
                  <th className="px-3 py-2 font-medium">การใช้งาน</th>
                </tr>
              </thead>
              <tbody>
                {sizeReference.map((row) => (
                  <tr key={row.size} className="border-t">
                    <td className="px-3 py-2 font-mono text-xs font-semibold">{row.size}</td>
                    <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{row.pixels}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>สีไอคอน</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 font-medium">color</th>
                  <th className="px-3 py-2 font-medium">class</th>
                  <th className="px-3 py-2 font-medium">การใช้งาน</th>
                </tr>
              </thead>
              <tbody>
                {colorReference.map((row) => (
                  <tr key={row.color} className="border-t">
                    <td className="px-3 py-2 font-mono text-xs font-semibold">{row.color}</td>
                    <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{row.className}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ปุ่มพร้อมไอคอน</CardTitle>
        </CardHeader>
        <CardContent>
          <Inline gap="sm" align="center">
            <Button size="icon" variant="outline" aria-label="ค้นหา">
              <Search />
            </Button>
            <Button>
              <Search />
              ค้นหา
            </Button>
          </Inline>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        สำหรับไอคอนเฉพาะจุด สามารถ import จาก{" "}
        <code className="rounded bg-muted px-1">lucide-react</code> โดยตรง — ขนาดถูกปรับให้พอดีกับ
        Button อัตโนมัติผ่าน CSS <code className="rounded bg-muted px-1">[&_svg]:size-4</code>
      </p>
    </Stack>
  );
}
