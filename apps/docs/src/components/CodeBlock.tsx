import { cn } from "@pplethai/components";
import { useEffect, useState } from "react";

export interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

const codeBlockClassName = cn(
  "overflow-x-auto rounded-md border bg-muted p-4 text-xs leading-relaxed",
  "[&_.shiki]:!m-0 [&_.shiki]:!bg-transparent [&_.shiki]:!p-0",
  "[&_.shiki_code]:font-mono [&_.shiki_code]:text-xs [&_.shiki_code]:leading-relaxed",
);

export function CodeBlock({ children, language, className }: CodeBlockProps) {
  const code = children.trim();
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setHtml(null);
    import("../lib/shiki").then(({ highlightCode }) => highlightCode(code, language)).then((result) => {
      if (active) setHtml(result);
    });
    return () => {
      active = false;
    };
  }, [code, language]);

  if (!html) {
    return (
      <pre className={cn(codeBlockClassName, className)} data-language={language}>
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className={cn(codeBlockClassName, className)}
      data-language={language}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
