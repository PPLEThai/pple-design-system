import { Inline, Skeleton, Stack } from "@pplethai/components";
import { ComponentPage } from "../../components/ComponentPage";

export default function SkeletonPage() {
  return (
    <ComponentPage
      title="Skeleton"
      description="พื้นที่ placeholder ขณะโหลดข้อมูล — animate-pulse บนพื้น muted"
      demo={
        <Stack gap="md" className="max-w-md">
          <Inline gap="md" align="center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Stack gap="sm" className="flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </Stack>
          </Inline>
          <Skeleton className="h-32 w-full" />
        </Stack>
      }
      code={`import { Skeleton } from "@pplethai/components";

<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-3/4" />`}
      props={[
        {
          prop: "className",
          type: "string",
          description: "กำหนด width/height/rounded ผ่าน Tailwind",
        },
        {
          prop: "...props",
          type: "HTMLAttributes<HTMLDivElement>",
          description: "props ของ <div>",
        },
      ]}
      notes={
        <p>ตั้งขนาดและ shape ผ่าน <code>className</code> เพื่อให้ตรงกับ layout จริงของ content</p>
      }
    />
  );
}
