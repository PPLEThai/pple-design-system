import { Button, Card, CardContent, CardHeader, CardTitle, Stack } from "@pplethai/components";
import { Form, FormCheckboxField, FormTextField } from "@pplethai/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร"),
  email: z.string().email("อีเมลไม่ถูกต้อง"),
  subscribe: z.boolean().default(false),
});

type FormValues = z.infer<typeof schema>;

export function FormsPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subscribe: false },
  });

  return (
    <Stack gap="lg">
      <div>
        <h1 className="text-3xl font-semibold">ฟอร์ม</h1>
        <p className="mt-2 text-muted-foreground">
          ชุดฟอร์มจาก{" "}
          <code className="rounded bg-muted px-1">@pplethai/components/form</code> ใช้ร่วมกับ
          react-hook-form และ zod
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
              />
              <FormCheckboxField
                control={form.control}
                name="subscribe"
                label="รับจดหมายข่าว"
              />
              <Button type="submit">ส่งข้อมูล</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
        {`import { Form, FormTextField } from "@pplethai/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";`}
      </pre>
    </Stack>
  );
}
