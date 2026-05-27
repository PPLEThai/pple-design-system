import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Stack,
} from "@pplethai/components";
import { Slash } from "lucide-react";
import { ComponentPage } from "../../components/ComponentPage";

export default function BreadcrumbPage_() {
  return (
    <ComponentPage
      title="Breadcrumb"
      description="เส้นทางบ่งบอกตำแหน่งปัจจุบันในลำดับชั้นของหน้า"
      demo={
        <Stack gap="lg">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">หน้าแรก</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">คอมโพเนนต์</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">หน้าแรก</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>หน้าปัจจุบัน</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Stack>
      }
      code={`import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
  BreadcrumbEllipsis,
} from "@pplethai/components";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">หน้าแรก</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>หน้าปัจจุบัน</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
      extraPropTables={[
        {
          title: "Sub-components",
          rows: [
            { prop: "Breadcrumb", type: "nav", description: "wrapper มี aria-label='breadcrumb'" },
            { prop: "BreadcrumbList", type: "ol", description: "รายการลิงก์ flex wrap" },
            { prop: "BreadcrumbItem", type: "li", description: "หน่วยภายใน list" },
            { prop: "BreadcrumbLink", type: "a (asChild)", description: "ลิงก์ คลิกได้ — รองรับ asChild สำหรับ Router Link" },
            { prop: "BreadcrumbPage", type: "span", description: "ตำแหน่งปัจจุบัน (aria-current=page, disabled)" },
            { prop: "BreadcrumbSeparator", type: "li (presentation)", description: "ChevronRight โดย default; ส่ง children เพื่อแทน" },
            { prop: "BreadcrumbEllipsis", type: "span", description: "แสดง MoreHorizontal สำหรับเส้นทางยาว" },
          ],
        },
      ]}
      accessibility={
        <ul>
          <li>nav มี aria-label=&quot;breadcrumb&quot;; separators เป็น aria-hidden</li>
          <li>หน้าปัจจุบันใช้ aria-current=&quot;page&quot;</li>
        </ul>
      }
      notes={
        <p>
          สำหรับ React Router ใช้ <code>&lt;BreadcrumbLink asChild&gt;&lt;Link to=&quot;...&quot; /&gt;&lt;/BreadcrumbLink&gt;</code>
        </p>
      }
    />
  );
}
