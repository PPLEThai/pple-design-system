import { Card, CardContent, CardHeader, CardTitle, Container, Inline, Stack } from "@pplethai/components";

export function LayoutPage() {
  return (
    <Stack gap="lg">
      <div>
        <h1 className="text-3xl font-semibold">เลย์เอาต์</h1>
        <p className="mt-2 text-muted-foreground">
          คอมโพเนนต์จัดวาง: Stack, Inline และ Container
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <Stack gap="md" className="rounded-lg border border-dashed p-4">
            <div className="rounded bg-primary/20 p-4">รายการ 1</div>
            <div className="rounded bg-primary/20 p-4">รายการ 2</div>
            <div className="rounded bg-primary/20 p-4">รายการ 3</div>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inline</CardTitle>
        </CardHeader>
        <CardContent>
          <Inline gap="sm" className="rounded-lg border border-dashed p-4">
            <div className="rounded bg-secondary/20 px-4 py-2">A</div>
            <div className="rounded bg-secondary/20 px-4 py-2">B</div>
            <div className="rounded bg-secondary/20 px-4 py-2">C</div>
          </Inline>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Container</CardTitle>
        </CardHeader>
        <CardContent>
          <Container size="sm" className="rounded-lg border bg-muted/50 py-4 text-center text-sm">
            size=&quot;sm&quot; (max-w-screen-sm)
          </Container>
        </CardContent>
      </Card>
    </Stack>
  );
}
