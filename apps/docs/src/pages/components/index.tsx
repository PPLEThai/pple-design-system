import { Card, CardContent, CardDescription, CardHeader, CardTitle, Stack } from "@pplethai/components";
import { Link } from "react-router-dom";
import { componentCatalog } from "./catalog";

export function ComponentsIndex() {
  const total = componentCatalog.reduce((sum, group) => sum + group.entries.length, 0);

  return (
    <Stack gap="lg" className="max-w-5xl">
      <header>
        <h1 className="font-heading text-3xl font-medium">คอมโพเนนต์</h1>
        <p className="mt-2 text-muted-foreground">
          {total} คอมโพเนนต์ในไลบรารี — เลือกจากแถบด้านข้างหรือการ์ดด้านล่าง
        </p>
      </header>

      {componentCatalog.map((group) => (
        <section key={group.title}>
          <h2 className="mb-3 font-heading text-xl font-medium">{group.title}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.entries.map((entry) => (
              <Link
                key={entry.slug}
                to={`/components/${entry.slug}`}
                className="rounded-lg outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="h-full transition-colors hover:bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{entry.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription>{entry.summary}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </Stack>
  );
}
