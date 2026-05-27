import { Card, CardContent, Separator, Stack } from "@pplethai/components";
import type { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";
import { PropTable, type PropRow } from "./PropTable";

export interface ComponentPageProps {
  title: string;
  description?: ReactNode;
  /** Live demo rendered inside a bordered preview card. */
  demo: ReactNode;
  /** Source snippet shown below the demo. Trimmed automatically. */
  code: string;
  /** Hand-written prop reference. Pass an empty array to skip the section. */
  props?: PropRow[];
  /** Optional sub-tables (e.g. compound APIs). */
  extraPropTables?: { title: string; rows: PropRow[] }[];
  /** Keyboard / aria notes. */
  accessibility?: ReactNode;
  /** "When to use" or other guidance. */
  notes?: ReactNode;
  /** Additional variant showcases, each with its own code snippet. */
  examples?: { title: string; demo: ReactNode; code: string; description?: ReactNode }[];
}

export function ComponentPage({
  title,
  description,
  demo,
  code,
  props,
  extraPropTables,
  accessibility,
  notes,
  examples,
}: ComponentPageProps) {
  return (
    <Stack gap="lg" className="max-w-4xl">
      <header>
        <h1 className="font-heading text-3xl font-medium">{title}</h1>
        {description ? (
          <div className="mt-2 text-muted-foreground">{description}</div>
        ) : null}
      </header>

      <section>
        <h2 className="mb-3 font-heading text-xl font-medium">ตัวอย่าง</h2>
        <Card>
          <CardContent className="pt-6">{demo}</CardContent>
        </Card>
        <CodeBlock className="mt-3">{code}</CodeBlock>
      </section>

      {examples && examples.length > 0
        ? examples.map((example) => (
            <section key={example.title}>
              <h2 className="mb-1 font-heading text-xl font-medium">{example.title}</h2>
              {example.description ? (
                <p className="mb-3 text-sm text-muted-foreground">{example.description}</p>
              ) : (
                <div className="mb-3" />
              )}
              <Card>
                <CardContent className="pt-6">{example.demo}</CardContent>
              </Card>
              <CodeBlock className="mt-3">{example.code}</CodeBlock>
            </section>
          ))
        : null}

      {props && props.length > 0 ? (
        <section>
          <h2 className="mb-3 font-heading text-xl font-medium">Props</h2>
          <PropTable rows={props} />
        </section>
      ) : null}

      {extraPropTables?.map((table) => (
        <section key={table.title}>
          <h2 className="mb-3 font-heading text-xl font-medium">{table.title}</h2>
          <PropTable rows={table.rows} />
        </section>
      ))}

      {accessibility ? (
        <section>
          <Separator className="mb-6" />
          <h2 className="mb-3 font-heading text-xl font-medium">การเข้าถึง (Accessibility)</h2>
          <div className="text-sm text-muted-foreground [&>ul]:list-disc [&>ul]:space-y-1 [&>ul]:pl-5">
            {accessibility}
          </div>
        </section>
      ) : null}

      {notes ? (
        <section>
          <Separator className="mb-6" />
          <h2 className="mb-3 font-heading text-xl font-medium">หมายเหตุ</h2>
          <div className="text-sm text-muted-foreground">{notes}</div>
        </section>
      ) : null}
    </Stack>
  );
}
