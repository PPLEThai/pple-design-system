import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function CardPage() {
  return (
    <ComponentPage
      title="Card"
      description="กล่องคอนเทนเนอร์มาตรฐาน — ประกอบจาก Header, Title, Description, Content, Footer"
      demo={
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>ตั้งค่าบัญชี</CardTitle>
            <CardDescription>จัดการข้อมูลและความปลอดภัยของบัญชีคุณ</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              เนื้อหาภายในการ์ดวางใน <code>CardContent</code> ซึ่งมี padding และตัดขอบบนของหัวข้อ
            </p>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="outline">ยกเลิก</Button>
            <Button>บันทึก</Button>
          </CardFooter>
        </Card>
      }
      code={`import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter,
} from "@pplethai/components";

<Card>
  <CardHeader>
    <CardTitle>ตั้งค่าบัญชี</CardTitle>
    <CardDescription>จัดการข้อมูล</CardDescription>
  </CardHeader>
  <CardContent>เนื้อหา</CardContent>
  <CardFooter>
    <Button>บันทึก</Button>
  </CardFooter>
</Card>`}
      props={[
        {
          prop: "Card",
          type: "div",
          description: "wrapper พร้อม border, rounded, shadow",
        },
        {
          prop: "CardHeader",
          type: "div",
          description: "หัวการ์ด (padding 6, flex col, gap 1.5)",
        },
        {
          prop: "CardTitle",
          type: "div",
          description: "ใช้ font-heading, text-2xl — เป็น div (ไม่ใช่ h*) ใส่ aria heading เองได้",
        },
        {
          prop: "CardDescription",
          type: "div",
          description: "ข้อความรอง text-sm text-muted-foreground",
        },
        {
          prop: "CardContent",
          type: "div",
          description: "เนื้อหาหลัก p-6 pt-0",
        },
        {
          prop: "CardFooter",
          type: "div",
          description: "ส่วนท้าย flex items-center p-6 pt-0",
        },
      ]}
    />
  );
}
