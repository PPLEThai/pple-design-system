import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Autocomplete,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  MultiSelect,
  RadioGroup,
  RadioGroupItem,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  showToast,
  Skeleton,
  Stack,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  type ToastVariant,
} from "@pplethai/components";
import { AlertCircle, Download, Plus, Search } from "lucide-react";
import { useState } from "react";

const toastVariants: { value: ToastVariant; label: string }[] = [
  { value: "default", label: "ค่าเริ่มต้น (default)" },
  { value: "success", label: "สำเร็จ (success)" },
  { value: "error", label: "ข้อผิดพลาด (error)" },
  { value: "warning", label: "คำเตือน (warning)" },
  { value: "info", label: "ข้อมูล (info)" },
  { value: "loading", label: "กำลังโหลด (loading)" },
];

const buttonVariantsList = [
  { variant: "default" as const, label: "ปุ่มหลัก" },
  { variant: "secondary" as const, label: "ปุ่มรอง" },
  { variant: "outline" as const, label: "ปุ่มขอบ" },
  { variant: "destructive" as const, label: "ปุ่มลบ" },
  { variant: "ghost" as const, label: "โปร่ง" },
  { variant: "link" as const, label: "ลิงก์" },
];

const provinceOptions = [
  { value: "bkk", label: "กรุงเทพมหานคร" },
  { value: "cnx", label: "เชียงใหม่" },
  { value: "kkn", label: "ขอนแก่น" },
  { value: "pkt", label: "ภูเก็ต" },
  { value: "nrt", label: "นครราชสีมา" },
  { value: "udn", label: "อุดรธานี" },
  { value: "sni", label: "สุราษฎร์ธานี" },
  { value: "cbi", label: "ชลบุรี" },
];

export function ComponentsPage() {
  const [toastVariant, setToastVariant] = useState<ToastVariant>("success");
  const [multiProvinces, setMultiProvinces] = useState<string[]>(["bkk", "cnx"]);
  const [autocompleteProvince, setAutocompleteProvince] = useState("bkk");
  const [autocompleteProvinces, setAutocompleteProvinces] = useState<string[]>(["bkk"]);

  const handleShowToast = () => {
    showToast({
      variant: toastVariant,
      title:
        toastVariant === "error"
          ? "เกิดข้อผิดพลาด"
          : toastVariant === "loading"
            ? "กำลังโหลด..."
            : "บันทึกข้อมูลเรียบร้อยแล้ว",
      description:
        toastVariant === "loading"
          ? undefined
          : "การเปลี่ยนแปลงของคุณถูกบันทึกในระบบแล้ว",
    });
  };

  return (
    <Stack gap="lg">
      <div>
        <h1 className="text-3xl font-semibold">คอมโพเนนต์</h1>
        <p className="mt-2 text-muted-foreground">ตัวอย่างการใช้งานคอมโพเนนต์ต่าง ๆ</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Button</CardTitle>
          <CardDescription>
            variants: default, secondary, outline, destructive, ghost, link — ขนาด sm,
            default, lg, icon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="lg">
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Variants</p>
              <Stack gap="sm" className="flex-row flex-wrap">
                {buttonVariantsList.map(({ variant, label }) => (
                  <Button key={variant} variant={variant}>
                    {label}
                  </Button>
                ))}
              </Stack>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Disabled</p>
              <Stack gap="sm" className="flex-row flex-wrap">
                {buttonVariantsList.map(({ variant, label }) => (
                  <Button key={variant} variant={variant} disabled>
                    {label}
                  </Button>
                ))}
              </Stack>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">ขนาด</p>
              <Stack gap="sm" className="flex-row flex-wrap items-center">
                <Button size="sm">เล็ก (sm)</Button>
                <Button size="default">ปกติ (default)</Button>
                <Button size="lg">ใหญ่ (lg)</Button>
              </Stack>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">พร้อมไอคอน</p>
              <Stack gap="sm" className="flex-row flex-wrap items-center">
                <Button>
                  <Plus />
                  เพิ่มรายการ
                </Button>
                <Button variant="secondary">
                  ดาวน์โหลด
                  <Download />
                </Button>
                <Button variant="outline" size="sm">
                  <Search />
                  ค้นหา
                </Button>
                <Button size="icon" variant="outline" aria-label="ค้นหา">
                  <Search />
                </Button>
                <Button size="icon" variant="secondary" aria-label="เพิ่ม" disabled>
                  <Plus />
                </Button>
              </Stack>
            </div>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ฟอร์มควบคุม</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack gap="md" className="max-w-sm">
            <div>
              <Label htmlFor="email">อีเมล</Label>
              <Input id="email" type="email" placeholder="you@example.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="bio">เกี่ยวกับคุณ</Label>
              <Textarea id="bio" placeholder="แนะนำตัวสั้นๆ" className="mt-1" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">ยอมรับข้อกำหนด</Label>
            </div>
            <fieldset>
              <Label>ช่องทางการติดต่อ</Label>
              <RadioGroup defaultValue="email" className="mt-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="email" id="contact-email" />
                  <Label htmlFor="contact-email">อีเมล</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="sms" id="contact-sms" />
                  <Label htmlFor="contact-sms">SMS</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="app" id="contact-app" />
                  <Label htmlFor="contact-app">แอป</Label>
                </div>
              </RadioGroup>
            </fieldset>
            <div className="flex items-center gap-2">
              <Switch id="notifications" />
              <Label htmlFor="notifications">รับการแจ้งเตือน</Label>
            </div>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ดรอปดาวน์แบบเลือกหลายรายการและ Autocomplete</CardTitle>
          <CardDescription>
            MultiSelect สำหรับเลือกหลายค่า Autocomplete รองรับทั้งเลือกค่าเดียวและหลายค่า
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Stack gap="md" className="max-w-sm">
            <div>
              <Label htmlFor="multi-province">จังหวัด (เลือกได้หลายรายการ)</Label>
              <MultiSelect
                id="multi-province"
                className="mt-1"
                options={provinceOptions}
                value={multiProvinces}
                onValueChange={setMultiProvinces}
                placeholder="เลือกจังหวัด"
              />
            </div>
            <div>
              <Label htmlFor="autocomplete-province">จังหวัด (autocomplete)</Label>
              <Autocomplete
                id="autocomplete-province"
                className="mt-1"
                options={provinceOptions}
                value={autocompleteProvince}
                onValueChange={setAutocompleteProvince}
                placeholder="พิมพ์ชื่อจังหวัด"
              />
            </div>
            <div>
              <Label htmlFor="autocomplete-multi-province">
                จังหวัด (autocomplete หลายรายการ)
              </Label>
              <Autocomplete
                id="autocomplete-multi-province"
                className="mt-1"
                multiple
                options={provinceOptions}
                value={autocompleteProvinces}
                onValueChange={setAutocompleteProvinces}
                placeholder="เลือกจังหวัด"
                searchPlaceholder="ค้นหาจังหวัด..."
              />
            </div>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ฟีดแบ็ก</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack gap="md">
            <Alert variant="primary">
              <AlertCircle />
              <AlertTitle>แจ้งให้ทราบ</AlertTitle>
              <AlertDescription>ใช้สี primary สำหรับปุ่มหลัก (CTA)</AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Badge>ค่าเริ่มต้น</Badge>
              <Badge variant="secondary">รอง</Badge>
              <Badge variant="outline">ขอบ</Badge>
            </div>
            <Stack gap="sm">
              <Progress value={66} />
              <Progress />
            </Stack>
            <Skeleton className="h-12 w-full" />
            <Separator />
            <Stack gap="md" className="max-w-sm">
              <div>
                <Label htmlFor="toast-variant">ประเภท toast</Label>
                <Select
                  value={toastVariant}
                  onValueChange={(value) => setToastVariant(value as ToastVariant)}
                >
                  <SelectTrigger id="toast-variant" className="mt-1">
                    <SelectValue placeholder="เลือกประเภท" />
                  </SelectTrigger>
                  <SelectContent>
                    {toastVariants.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="button" onClick={handleShowToast}>
                แสดง toast
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tabs และ Accordion</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">แท็บ 1</TabsTrigger>
              <TabsTrigger value="tab2">แท็บ 2</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">เนื้อหาแท็บแรก</TabsContent>
            <TabsContent value="tab2">เนื้อหาแท็บสอง</TabsContent>
          </Tabs>
          <Separator className="my-4" />
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>ส่วนที่ 1</AccordionTrigger>
              <AccordionContent>เนื้อหาใน accordion</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </Stack>
  );
}
