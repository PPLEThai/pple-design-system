import { Label, Slider, Stack } from "@pplethai/components";
import { useState } from "react";
import { ComponentPage } from "../../components/ComponentPage";

export default function SliderPage() {
  const [single, setSingle] = useState([50]);
  const [range, setRange] = useState([20, 80]);

  return (
    <ComponentPage
      title="Slider"
      description="เลื่อนปรับค่าตัวเลข รองรับค่าเดี่ยวและช่วง (range)"
      demo={
        <Stack gap="lg" className="max-w-md">
          <div>
            <Label>ค่าเดี่ยว — {single[0]}</Label>
            <Slider
              className="mt-3"
              value={single}
              onValueChange={setSingle}
              max={100}
              step={1}
            />
          </div>
          <div>
            <Label>ช่วง — {range[0]} ถึง {range[1]}</Label>
            <Slider
              className="mt-3"
              value={range}
              onValueChange={setRange}
              min={0}
              max={100}
              step={5}
            />
          </div>
          <div>
            <Label>ปิดใช้งาน</Label>
            <Slider className="mt-3" defaultValue={[40]} disabled />
          </div>
        </Stack>
      }
      code={`import { Slider } from "@pplethai/components";

// ค่าเดี่ยว
const [value, setValue] = useState([50]);
<Slider value={value} onValueChange={setValue} max={100} step={1} />

// ช่วง (range)
const [range, setRange] = useState([20, 80]);
<Slider value={range} onValueChange={setRange} max={100} step={5} />`}
      props={[
        { prop: "value", type: "number[]", description: "ค่าที่เลือก (1 รายการสำหรับค่าเดี่ยว, 2 สำหรับช่วง)" },
        { prop: "defaultValue", type: "number[]", description: "ค่าเริ่มต้น (uncontrolled)" },
        { prop: "onValueChange", type: "(value: number[]) => void", description: "callback ทุกครั้งที่เลื่อน" },
        { prop: "onValueCommit", type: "(value: number[]) => void", description: "callback เมื่อปล่อยเมาส์/คีย์" },
        { prop: "min", type: "number", default: "0", description: "ค่าต่ำสุด" },
        { prop: "max", type: "number", default: "100", description: "ค่าสูงสุด" },
        { prop: "step", type: "number", default: "1", description: "ขนาดขั้นการเลื่อน" },
        { prop: "disabled", type: "boolean", default: "false", description: "ปิดการเลื่อน" },
        { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "ทิศทาง" },
      ]}
      accessibility={
        <ul>
          <li>ลูกศร ←→ (หรือ ↑↓) เลื่อนทีละ step; PageUp/PageDown เลื่อนใหญ่; Home/End ไปสุดราง</li>
          <li>thumb มี focus ring</li>
        </ul>
      }
    />
  );
}
