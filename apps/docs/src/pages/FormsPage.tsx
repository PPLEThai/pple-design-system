import { Button, Card, CardContent, CardHeader, CardTitle, Stack } from "@pplethai/components";
import { CodeBlock } from "../components/CodeBlock";
import {
  Form,
  FormCheckboxField,
  FormSelectField,
  FormTextField,
  type SelectOption,
} from "@pplethai/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const provinces: SelectOption[] = [
  { value: "bkk", label: "กรุงเทพมหานคร" },
  { value: "cnx", label: "เชียงใหม่" },
  { value: "kkn", label: "ขอนแก่น" },
  { value: "pkt", label: "ภูเก็ต" },
];

const schema = z.object({
  name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  province: z.string().min(1, "กรุณาเลือกจังหวัด"),
  subscribe: z.boolean().default(false),
});

type FormValues = z.infer<typeof schema>;

export function FormsPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", province: "", subscribe: false },
  });

  return (
    <Stack gap="lg">
      <div>
        <h1 className="text-3xl font-semibold">ฟอร์ม</h1>
        <p className="mt-2 text-muted-foreground">
          ชุดฟอร์มจาก{" "}
          <code className="rounded bg-muted px-1">@pplethai/components/form</code> ใช้ร่วมกับ
          react-hook-form และ zod — มี FormTextField, FormSelectField, FormCheckboxField
        </p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>ตัวอย่างฟอร์ม</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                alert(JSON.stringify(data, null, 2));
              })}
              className="space-y-4"
            >
              <FormTextField
                control={form.control}
                name="name"
                label="ชื่อ"
                placeholder="ชื่อของคุณ"
              />
              <FormTextField
                control={form.control}
                name="email"
                label="อีเมล"
                type="email"
                placeholder="you@example.com"
                description="ใช้สำหรับยืนยันบัญชีเท่านั้น"
              />
              <FormSelectField
                control={form.control}
                name="province"
                label="จังหวัด"
                placeholder="เลือกจังหวัด"
                options={provinces}
              />
              <FormCheckboxField
                control={form.control}
                name="subscribe"
                label="รับจดหมายข่าว"
                description="ข่าวสารและกิจกรรมจากพรรค"
              />
              <Button type="submit">ส่งข้อมูล</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <CodeBlock>{`import {
  Form, FormTextField, FormSelectField, FormCheckboxField,
} from "@pplethai/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  province: z.string().min(1),
  subscribe: z.boolean(),
});`}</CodeBlock>
    </Stack>
  );
}
