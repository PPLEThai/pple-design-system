import { cn } from "@pplethai/components";

export interface PropRow {
  prop: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface PropTableProps {
  rows: PropRow[];
  className?: string;
}

export function PropTable({ rows, className }: PropTableProps) {
  return (
    <div className={cn("overflow-x-auto rounded-md border", className)}>
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-3 py-2 font-medium">Prop</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Default</th>
            <th className="px-3 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.prop} className="border-t align-top">
              <td className="px-3 py-2 font-mono text-xs">
                <span className="font-semibold">{row.prop}</span>
                {row.required ? (
                  <span className="ml-1 text-destructive" title="required">
                    *
                  </span>
                ) : null}
              </td>
              <td className="px-3 py-2 font-mono text-xs text-primary">{row.type}</td>
              <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                {row.default ?? "—"}
              </td>
              <td className="px-3 py-2 text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
