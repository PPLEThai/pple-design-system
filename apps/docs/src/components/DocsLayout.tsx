import { cn, Inline, Stack } from "@pplethai/components";
import { NavLink, Outlet } from "react-router-dom";
import { componentCatalog } from "../pages/components/catalog";

export function DocsLayout() {
  return (
    <Inline gap="lg" align="start" className="flex-nowrap">
      <aside className="hidden w-56 shrink-0 md:block">
        <nav aria-label="คอมโพเนนต์" className="sticky top-6">
          <Stack gap="md">
            <NavLink
              to="/components"
              end
              className={({ isActive }) =>
                cn(
                  "block rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-muted",
                  isActive && "bg-muted text-foreground",
                )
              }
            >
              ทั้งหมด
            </NavLink>
            {componentCatalog.map((group) => (
              <div key={group.title}>
                <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.title}
                </p>
                <Stack gap="none" as="ul">
                  {group.entries.map((entry) => (
                    <li key={entry.slug}>
                      <NavLink
                        to={`/components/${entry.slug}`}
                        className={({ isActive }) =>
                          cn(
                            "block rounded-md px-2 py-1 text-sm transition-colors hover:bg-muted",
                            isActive
                              ? "bg-muted font-medium text-foreground"
                              : "text-muted-foreground",
                          )
                        }
                      >
                        {entry.label}
                      </NavLink>
                    </li>
                  ))}
                </Stack>
              </div>
            ))}
          </Stack>
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </Inline>
  );
}
