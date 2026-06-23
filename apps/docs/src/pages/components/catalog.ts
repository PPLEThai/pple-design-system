export interface ComponentEntry {
  slug: string;
  label: string;
  summary: string;
}

export interface ComponentGroup {
  title: string;
  entries: ComponentEntry[];
}

export const componentCatalog: ComponentGroup[] = [
  {
    title: "อินพุตและฟอร์ม",
    entries: [
      { slug: "button", label: "Button", summary: "ปุ่มหลัก รอง ลิงก์ ปุ่มไอคอน" },
      { slug: "input", label: "Input", summary: "ช่องกรอกข้อความบรรทัดเดียว" },
      { slug: "label", label: "Label", summary: "ป้ายกำกับฟิลด์ฟอร์ม" },
      { slug: "textarea", label: "Textarea", summary: "ช่องกรอกข้อความหลายบรรทัด" },
      { slug: "checkbox", label: "Checkbox", summary: "ช่องทำเครื่องหมายพร้อมแอนิเมชัน" },
      { slug: "radio-group", label: "Radio Group", summary: "เลือกหนึ่งจากหลายตัวเลือก" },
      { slug: "switch", label: "Switch", summary: "สวิตช์เปิด/ปิด" },
      { slug: "select", label: "Select", summary: "ดรอปดาวน์เลือกค่าเดียว" },
      { slug: "multi-select", label: "MultiSelect", summary: "ดรอปดาวน์เลือกได้หลายค่า" },
      { slug: "autocomplete", label: "Autocomplete", summary: "ค้นหาพร้อมเลือกค่า" },
      { slug: "slider", label: "Slider", summary: "เลื่อนปรับค่าตัวเลข" },
      { slug: "date-picker", label: "DatePicker", summary: "เลือกวันที่หรือช่วงวันที่" },
      { slug: "month-picker", label: "MonthPicker", summary: "เลือกเดือนและปี" },
      { slug: "time-picker", label: "TimePicker", summary: "เลือกเวลาแบบ 24 ชั่วโมง" },
      {
        slug: "date-time-picker",
        label: "DateTimePicker",
        summary: "เลือกวันและเวลาในกล่องเดียว",
      },
    ],
  },
  {
    title: "Overlays",
    entries: [
      { slug: "dialog", label: "Dialog", summary: "หน้าต่างโมดอลกลางจอ" },
      { slug: "sheet", label: "Sheet", summary: "แผงเลื่อนจากขอบจอ" },
      { slug: "popover", label: "Popover", summary: "เนื้อหาลอยอ้างอิงปุ่ม" },
      { slug: "dropdown-menu", label: "DropdownMenu", summary: "เมนูบริบทใต้ตัวกระตุ้น" },
    ],
  },
  {
    title: "การนำทาง",
    entries: [
      { slug: "tabs", label: "Tabs", summary: "สลับเนื้อหาในพื้นที่เดียว" },
      { slug: "accordion", label: "Accordion", summary: "ขยาย/ย่อเนื้อหา" },
      { slug: "breadcrumb", label: "Breadcrumb", summary: "เส้นทางตำแหน่งปัจจุบัน" },
      { slug: "navigation-menu", label: "NavigationMenu", summary: "เมนูนำทางพร้อมแผงเนื้อหา" },
      { slug: "navbar", label: "Navbar", summary: "แถบนำทางพร้อมเมนูมือถือ" },
      { slug: "stepper", label: "Stepper", summary: "ตัวบอกขั้นตอนสำหรับฟอร์มหลายขั้น" },
    ],
  },
  {
    title: "ฟีดแบ็ก",
    entries: [
      { slug: "alert", label: "Alert", summary: "ข้อความสถานะคงที่" },
      { slug: "badge", label: "Badge", summary: "ป้ายสถานะขนาดเล็ก" },
      { slug: "progress", label: "Progress", summary: "แถบแสดงความคืบหน้า" },
      { slug: "spinner", label: "Spinner", summary: "ตัวหมุนแสดงสถานะกำลังโหลด" },
      { slug: "skeleton", label: "Skeleton", summary: "พื้นที่โหลดข้อมูล" },
      { slug: "sonner", label: "Toast (Sonner)", summary: "แจ้งเตือนชั่วคราว" },
    ],
  },
  {
    title: "การแสดงผล",
    entries: [
      { slug: "card", label: "Card", summary: "กล่องคอนเทนเนอร์สำหรับเนื้อหา" },
      { slug: "separator", label: "Separator", summary: "เส้นแบ่งแนวนอน/ตั้ง" },
    ],
  },
];

export const allComponents: ComponentEntry[] = componentCatalog.flatMap((g) => g.entries);
