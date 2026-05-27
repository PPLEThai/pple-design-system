# `@pplethai/components` — AI Agent Reference

A complete, self-contained reference for AI agents working with the People's Party design system. Every export is documented with a copy-paste example.

> **Target audience:** AI coding agents writing React + TypeScript apps that consume `@pplethai/components`. Examples assume React 18+, Tailwind v3, and a Vite/Next.js style bundler.

---

## Table of contents

1. [Install & setup](#1-install--setup)
2. [Conventions](#2-conventions)
3. [Utility — `cn()`](#3-utility--cn)
4. [Layout primitives](#4-layout-primitives) — Stack, Inline, Container
5. [Icon, Logo, Navbar](#5-icon-logo-navbar)
6. [Form inputs](#6-form-inputs) — Button, Input, Label, Textarea, Checkbox, RadioGroup, Switch, Select, MultiSelect, Autocomplete, Slider
7. [Overlays](#7-overlays) — Dialog, Sheet, Popover, DropdownMenu
8. [Navigation](#8-navigation) — Tabs, Accordion, Breadcrumb, NavigationMenu
9. [Feedback](#9-feedback) — Alert, Badge, Progress, Skeleton, Toast (Sonner)
10. [Data display](#10-data-display) — Card, Separator
11. [Forms with react-hook-form + zod](#11-forms-with-react-hook-form--zod)
12. [Design tokens](#12-design-tokens)
13. [Composed patterns](#13-composed-patterns)
14. [Anti-patterns / things NOT to do](#14-anti-patterns--things-not-to-do)

---

## 1. Install & setup

```bash
pnpm add @pplethai/components react react-dom react-hook-form zod
```

**Peer deps:** `react >=18`, `react-dom >=18`, `react-hook-form >=7`, `zod >=3`. Forms work only if both are present.

### 1.1 Import the stylesheet (once, at app root)

```tsx
// src/main.tsx (or _app.tsx)
import "@pplethai/components/styles.css";
```

### 1.2 Tailwind preset (required)

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import preset from "@pplethai/components/tailwind-preset";

export default {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx}",
    // include compiled library so utility classes survive purge
    "./node_modules/@pplethai/components/dist/**/*.js",
  ],
} satisfies Config;
```

### 1.3 Mount the `<Toaster />` once

```tsx
import { Toaster } from "@pplethai/components";

export default function App() {
  return (
    <>
      {/* your routes */}
      <Toaster />
    </>
  );
}
```

### 1.4 Two entry points

| Import path | What's exported |
|---|---|
| `@pplethai/components` | All UI + layout + utilities (Button, Card, Stack, cn, …) |
| `@pplethai/components/form` | `Form`, `FormField`, `FormTextField`, `FormSelectField`, `FormCheckboxField`, `useFormField` (needs `react-hook-form` + `zod`) |
| `@pplethai/components/styles.css` | Compiled CSS — import once |
| `@pplethai/components/tailwind-preset` | Tailwind preset re-exporting theme + plugins |

### 1.5 Typography

Headings use **Anakotmai** (from party CDN, medium only). Body uses **IBM Plex Sans Thai Looped** via `@fontsource` (auto-bundled). Apply with `font-heading` / `font-body` (preset provides). All `h1`–`h6` get `font-heading` automatically via `@layer base`.

---

## 2. Conventions

1. **Compose className with `cn()`** — combines `clsx` + `tailwind-merge` so later classes override earlier ones.
2. **CVA variants:** components with variants export both the component and a `*Variants` CVA factory (e.g. `buttonVariants`, `badgeVariants`, `alertVariants`). Use these to extend.
3. **Compound APIs:** multi-part components are flat named exports (`Card`, `CardHeader`, `CardTitle`, …) not dot-notation. Same for `Dialog*`, `Sheet*`, `Tabs*`, etc.
4. **`asChild` pattern:** components built on Radix Slot (Button, BreadcrumbLink, all Triggers) accept `asChild` to render-as-child instead of the default element. Use this to wrap routing `Link` components.
5. **Brand tokens via CSS variables** — never hardcode hex. All colors are HSL channels in CSS custom properties (`--primary`, `--secondary`, `--destructive`, …).
6. **Icons:** use `lucide-react`. Either directly (`<Search className="h-4 w-4" />`) or via the `<Icon>` wrapper for typed size/color variants.
7. **Dark mode:** class-based (`<html class="dark">`). All tokens have dark counterparts in `styles.css`.
8. **Thai language:** UI strings in this codebase are Thai. Use `lang="th"` at the root for proper rendering.

---

## 3. Utility — `cn()`

```tsx
import { cn } from "@pplethai/components";

cn("px-4", condition && "bg-primary", "px-2"); // → "bg-primary px-2"  (tailwind-merge wins)
```

Always use `cn()` when composing classNames in components — bare string concatenation breaks `tailwind-merge`.

---

## 4. Layout primitives

The library ships three layout primitives. Use them instead of raw `<div className="flex …">` so spacing stays on-grid.

### 4.1 Stack — vertical flex

```tsx
import { Stack } from "@pplethai/components";

<Stack gap="md" align="stretch" justify="start">
  <div>item 1</div>
  <div>item 2</div>
</Stack>

// Polymorphic via `as`
<Stack as="main" gap="lg" className="min-h-screen">…</Stack>
```

| Prop | Type | Default |
|---|---|---|
| `gap` | `"none" \| "xs" \| "sm" \| "md" \| "lg"` | `"md"` |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | `"stretch"` |
| `justify` | `"start" \| "center" \| "end" \| "between"` | `"start"` |
| `as` | `React.ElementType` | `"div"` |

Gap scale: `xs`=4px, `sm`=8px, `md`=16px, `lg`=24px.

### 4.2 Inline — horizontal flex with wrap

```tsx
import { Inline } from "@pplethai/components";

<Inline gap="sm" align="center" justify="between">
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
</Inline>
```

Same props as Stack but flex-row + wrap. Default `align="center"`.

### 4.3 Container — width-constrained

```tsx
import { Container } from "@pplethai/components";

<Container size="lg">…</Container>
```

| `size` | max-width |
|---|---|
| `sm` | `max-w-screen-sm` (640px) |
| `md` | `max-w-screen-md` (768px) |
| `lg` *(default)* | `max-w-screen-xl` (1280px) |
| `full` | `max-w-full` |

Includes responsive padding (`px-4 md:px-6`) and `mx-auto`.

---

## 5. Icon, Logo, Navbar

### 5.1 `Icon`

Typed wrapper around any `LucideIcon` with size + color variants.

```tsx
import { Icon } from "@pplethai/components";
import { Search } from "lucide-react";

<Icon icon={Search} size="md" color="primary" aria-label="ค้นหา" />
```

| Prop | Values |
|---|---|
| `size` | `"sm"` (16px) \| `"md"` (20px, default) \| `"lg"` (24px) |
| `color` | `"default"` \| `"muted"` \| `"primary"` \| `"destructive"` |
| `aria-label` | string — when provided, `aria-hidden` becomes false automatically |

For inline icons in Button etc., just import from `lucide-react` directly — Button auto-sizes them.

### 5.2 `Logo`

People's Party logo as an SVG component that inherits `currentColor`.

```tsx
import { Logo } from "@pplethai/components";

<Logo size="md" className="text-primary" />
```

`size`: `"sm" | "md" | "lg" | "xl"`. Color via `className="text-..."` (uses currentColor).

### 5.3 `Navbar`

Top navigation bar with built-in mobile hamburger menu. Supports custom link rendering for any router.

```tsx
import { Navbar, type NavbarItem } from "@pplethai/components";
import { NavLink, useLocation } from "react-router-dom";

const items: NavbarItem[] = [
  { href: "/", label: "หน้าแรก", end: true },
  { href: "/components", label: "คอมโพเนนต์" },
  { href: "/guidelines", label: "แนวทาง" },
];

function AppLayout() {
  const { pathname } = useLocation();
  return (
    <Navbar
      title="ระบบดีไซน์"
      items={items}
      pathname={pathname}
      renderLink={({ item, className, onNavigate }) => (
        <NavLink
          to={item.href}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) => className(isActive)}
        >
          {item.label}
        </NavLink>
      )}
    />
  );
}
```

**Without router** — omit `renderLink` to use plain `<a href>`:

```tsx
<Navbar
  title="ระบบ"
  items={[{ href: "/", label: "Home", end: true }]}
  pathname={typeof window !== "undefined" ? window.location.pathname : ""}
/>
```

| Prop | Type | Required | Notes |
|---|---|---|---|
| `title` | `string` | ✓ | Shown beside logo |
| `items` | `NavbarItem[]` | ✓ | `{ href, label, end? }` |
| `pathname` | `string` | — | Drives active state + closes mobile menu on nav |
| `renderLink` | `(props: NavbarLinkRenderProps) => ReactNode` | — | Custom link renderer (router) |
| `logo` | `ReactNode` | — | Defaults to `<Logo size="sm" className="text-primary" />` |
| `mobileMenuAriaLabel` | `{ open: string; close: string }` | — | Defaults to Thai labels |
| `navAriaLabel` | `string` | — | Defaults to `"เมนูหลัก"` |

`navLinkClassName(isActive)` is also exported for custom integrations.

---

## 6. Form inputs

### 6.1 Button

```tsx
import { Button } from "@pplethai/components";
import { Plus, Search } from "lucide-react";

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Search"><Search /></Button>

// With icon (auto-sized)
<Button><Plus />Add item</Button>

// As link (Radix Slot)
<Button asChild>
  <a href="/somewhere">Go</a>
</Button>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `"default" \| "secondary" \| "outline" \| "destructive" \| "ghost" \| "link"` | `"default"` |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` |
| `asChild` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

`buttonVariants` is exported as a CVA factory for extending.

### 6.2 Input

```tsx
import { Input, Label } from "@pplethai/components";

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@example.com" />
```

Accepts all `InputHTMLAttributes`. For controlled forms, prefer `FormTextField` (§11).

### 6.3 Label

```tsx
import { Label } from "@pplethai/components";

<Label htmlFor="name">Name</Label>
```

Built on `@radix-ui/react-label` — automatically dims when the paired field is `peer-disabled`.

### 6.4 Textarea

```tsx
import { Textarea } from "@pplethai/components";

<Textarea rows={4} placeholder="Bio" />
```

Min-height 80px. All `TextareaHTMLAttributes` accepted.

### 6.5 Checkbox

```tsx
import { Checkbox, Label } from "@pplethai/components";

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>

// Controlled
<Checkbox checked={value} onCheckedChange={setValue} />
```

Animated draw-in/out (auto-disabled when `prefers-reduced-motion`). Supports `"indeterminate"` for tri-state.

### 6.6 RadioGroup

```tsx
import { RadioGroup, RadioGroupItem, Label } from "@pplethai/components";

<RadioGroup defaultValue="email">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="email" id="r-email" />
    <Label htmlFor="r-email">Email</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="sms" id="r-sms" />
    <Label htmlFor="r-sms">SMS</Label>
  </div>
</RadioGroup>
```

Dot slides in/out with animation. Keyboard: ↑↓ navigate, Space selects.

### 6.7 Switch

```tsx
import { Switch, Label } from "@pplethai/components";

<div className="flex items-center gap-2">
  <Switch id="notify" />
  <Label htmlFor="notify">Notifications</Label>
</div>
```

**Use Switch for settings that apply immediately. Use Checkbox for form fields submitted later.**

### 6.8 Select (single value, no search)

```tsx
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectSeparator, SelectTrigger, SelectValue,
} from "@pplethai/components";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Pick one" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Group A</SelectLabel>
      <SelectItem value="a1">Option A1</SelectItem>
      <SelectItem value="a2">Option A2</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Group B</SelectLabel>
      <SelectItem value="b1">Option B1</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

Best for ~10 or fewer options. For more, use Autocomplete.

### 6.9 MultiSelect (multiple values, no search)

```tsx
import { MultiSelect } from "@pplethai/components";

const options = [
  { value: "bkk", label: "Bangkok" },
  { value: "cnx", label: "Chiang Mai" },
];

const [value, setValue] = useState<string[]>([]);

<MultiSelect
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="Pick provinces"
/>
```

Selected items render as removable chips. **Controlled only** — `value` and `onValueChange` are required.

### 6.10 Autocomplete (searchable, single or multiple)

```tsx
import { Autocomplete } from "@pplethai/components";

// Single
const [single, setSingle] = useState("");
<Autocomplete
  options={options}
  value={single}
  onValueChange={setSingle}
  placeholder="Type to search"
/>

// Multiple — set `multiple` to true and value becomes string[]
const [multi, setMulti] = useState<string[]>([]);
<Autocomplete
  multiple
  options={options}
  value={multi}
  onValueChange={setMulti}
  searchPlaceholder="Search..."
  emptyMessage="No results"
/>
```

Use for long option lists (>10) or when search aids discovery. The single-value variant uses one `<Input>` for both display and search; multi-value uses chips + a separate search input in the popover.

### 6.11 Slider

```tsx
import { Slider } from "@pplethai/components";

// Single value (always pass array)
const [v, setV] = useState([50]);
<Slider value={v} onValueChange={setV} max={100} step={1} />

// Range (two thumbs)
const [range, setRange] = useState([20, 80]);
<Slider value={range} onValueChange={setRange} min={0} max={100} step={5} />
```

`value` is always `number[]`. Keyboard: ←→/↑↓ step, PageUp/PageDown big step, Home/End to bounds.

---

## 7. Overlays

### 7.1 Dialog (modal, centered)

```tsx
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter, DialogClose,
  Button, Input, Label,
} from "@pplethai/components";

<Dialog>
  <DialogTrigger asChild>
    <Button>Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Update your details and save.</DialogDescription>
    </DialogHeader>
    <div className="space-y-3">
      <div>
        <Label htmlFor="d-name">Name</Label>
        <Input id="d-name" defaultValue="…" className="mt-1" />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

`DialogTitle` is required for accessibility — Radix logs a console warning if missing. Close via Esc, overlay click, or the auto-rendered X button.

### 7.2 Sheet (slide from edge)

```tsx
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader,
  SheetTitle, SheetDescription, SheetFooter, SheetClose,
  Button,
} from "@pplethai/components";

<Sheet>
  <SheetTrigger asChild>
    <Button>Open panel</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Filters</SheetTitle>
      <SheetDescription>Adjust search criteria.</SheetDescription>
    </SheetHeader>
    {/* body */}
    <SheetFooter className="mt-6">
      <SheetClose asChild><Button>Done</Button></SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

`SheetContent` accepts `side: "top" | "right" | "bottom" | "left"` (default `"right"`). Left/right are 3/4 of screen width on mobile, capped at `sm:max-w-sm`.

### 7.3 Popover (anchored float)

```tsx
import {
  Popover, PopoverTrigger, PopoverContent,
  Button, Input, Label,
} from "@pplethai/components";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Dimensions</Button>
  </PopoverTrigger>
  <PopoverContent align="start" side="bottom">
    <div className="space-y-2">
      <Label htmlFor="w">Width</Label>
      <Input id="w" defaultValue="100%" />
    </div>
  </PopoverContent>
</Popover>
```

`PopoverContent` props: `align: "start" | "center" | "end"` (default `"center"`), `side: "top" | "right" | "bottom" | "left"` (default `"bottom"`), `sideOffset: number` (default `4`).

`PopoverAnchor` is exported for cases where the trigger is separate from the anchor.

### 7.4 DropdownMenu

```tsx
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
  DropdownMenuShortcut, DropdownMenuGroup,
  Button,
} from "@pplethai/components";

const [showBar, setShowBar] = useState(true);
const [pos, setPos] = useState("bottom");

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel>My account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Invite team</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem>Email</DropdownMenuItem>
          <DropdownMenuItem>Copy link</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked={showBar} onCheckedChange={setShowBar}>
      Status bar
    </DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={pos} onValueChange={setPos}>
      <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

**Overlay decision tree:**
- Need to interrupt the user (confirm, modal form)? → **Dialog**
- Side panel with substantial content? → **Sheet**
- Small float anchored to a trigger? → **Popover** (form) or **DropdownMenu** (commands)

---

## 8. Navigation

### 8.1 Tabs

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@pplethai/components";

<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account panel</TabsContent>
  <TabsContent value="security">Security panel</TabsContent>
</Tabs>
```

Active trigger gets the primary gradient. Each `TabsContent value` must match a `TabsTrigger value`. Keyboard: ←→/Home/End.

### 8.2 Accordion

```tsx
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@pplethai/components";

<Accordion type="single" collapsible>
  <AccordionItem value="q1">
    <AccordionTrigger>What is X?</AccordionTrigger>
    <AccordionContent>Answer.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="q2">
    <AccordionTrigger>What is Y?</AccordionTrigger>
    <AccordionContent>Answer.</AccordionContent>
  </AccordionItem>
</Accordion>
```

`type: "single" | "multiple"` (required). With `"single"`, `collapsible` enables closing the currently-open item.

### 8.3 Breadcrumb

```tsx
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
  BreadcrumbEllipsis,
} from "@pplethai/components";
import { Slash } from "lucide-react";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator><Slash /></BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

Use `BreadcrumbPage` (not `BreadcrumbLink`) for the current location — it sets `aria-current="page"`. For React Router integration:

```tsx
import { Link } from "react-router-dom";
<BreadcrumbLink asChild>
  <Link to="/products">Products</Link>
</BreadcrumbLink>
```

### 8.4 NavigationMenu (mega-menu)

```tsx
import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
} from "@pplethai/components";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[420px] gap-2 p-4 md:grid-cols-2">
          <li>
            <NavigationMenuLink href="/a" className="block rounded-md p-3 hover:bg-muted">
              <div className="font-heading text-sm font-medium">A</div>
              <p className="mt-1 text-xs text-muted-foreground">Description</p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

For simple navbars use `Navbar` (§5.3). NavigationMenu is for desktop mega-menus.

---

## 9. Feedback

### 9.1 Alert (static, in-page)

```tsx
import { Alert, AlertTitle, AlertDescription } from "@pplethai/components";
import { Info, AlertCircle, Terminal } from "lucide-react";

<Alert>
  <Terminal />
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>default variant uses muted background.</AlertDescription>
</Alert>

<Alert variant="primary">
  <Info />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>primary variant uses brand orange.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

`variant: "default" | "primary" | "destructive"`. Sets `role="alert"` — screen readers announce when it appears. For ephemeral notifications use Toast instead.

### 9.2 Badge

```tsx
import { Badge } from "@pplethai/components";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

`badgeVariants` is exported as a CVA factory.

### 9.3 Progress

```tsx
import { Progress } from "@pplethai/components";

<Progress value={66} />        {/* determinate */}
<Progress value={100} />       {/* complete (no shimmer) */}
<Progress />                   {/* indeterminate — animated shimmer */}
```

When `value < max` or value omitted, the bar runs an animated shimmer (auto-disabled under `prefers-reduced-motion`).

### 9.4 Skeleton

```tsx
import { Skeleton } from "@pplethai/components";

<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-32 w-full" />
```

Style with Tailwind to match the real content's shape.

### 9.5 Toast (Sonner)

**Step 1 — once, at app root:**

```tsx
import { Toaster } from "@pplethai/components";
// in your root component:
<Toaster />
```

**Step 2 — anywhere:**

```tsx
import { showToast } from "@pplethai/components";

showToast({
  variant: "success",  // "default" | "success" | "error" | "warning" | "info" | "loading"
  title: "Saved",
  description: "Your changes were saved.",
});
```

`ShowToastOptions`:

| Field | Type | Required |
|---|---|---|
| `title` | `string` | ✓ |
| `description` | `string` | — |
| `variant` | `ToastVariant` | — (default `"default"`) |

The raw `toast` from `sonner` is also re-exported for advanced cases (promise toasts, custom JSX): `import { toast } from "@pplethai/components"`.

---

## 10. Data display

### 10.1 Card

```tsx
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter, Button,
} from "@pplethai/components";

<Card>
  <CardHeader>
    <CardTitle>Account settings</CardTitle>
    <CardDescription>Manage your profile and security.</CardDescription>
  </CardHeader>
  <CardContent>
    {/* body */}
  </CardContent>
  <CardFooter className="justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

`CardTitle` is a `div` styled with `font-heading text-2xl`. Wrap in an `<h2>` if you need semantic heading order — or render as a heading via `asChild`-style composition (Card sub-components don't support `asChild`; use a plain heading + Tailwind if semantics matter).

### 10.2 Separator

```tsx
import { Separator, Inline } from "@pplethai/components";

<Separator />                                          {/* horizontal */}
<Separator orientation="vertical" className="h-6" />   {/* vertical (set height!) */}

<Inline gap="md" align="center">
  <span>Left</span>
  <Separator orientation="vertical" className="h-6" />
  <span>Right</span>
</Inline>
```

`decorative` defaults to `true` (adds `aria-hidden`). Set to `false` for semantic separator.

---

## 11. Forms with react-hook-form + zod

The `/form` entry point provides controlled field components that wire up RHF + Radix + error display. Use these for any form — manual wiring of `<Input>` + `<Label>` + `<FormMessage>` is rarely necessary.

### 11.1 Full example

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle, Stack } from "@pplethai/components";
import {
  Form,
  FormTextField,
  FormSelectField,
  FormCheckboxField,
  type SelectOption,
} from "@pplethai/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const provinces: SelectOption[] = [
  { value: "bkk", label: "Bangkok" },
  { value: "cnx", label: "Chiang Mai" },
];

const schema = z.object({
  name: z.string().min(2, "Name must be ≥ 2 chars"),
  email: z.string().email("Invalid email"),
  province: z.string().min(1, "Required"),
  subscribe: z.boolean().default(false),
});

type Values = z.infer<typeof schema>;

export function SignupForm() {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", province: "", subscribe: false },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-4">
        <FormTextField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Your name"
        />
        <FormTextField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          description="We'll only use this to verify your account."
        />
        <FormSelectField
          control={form.control}
          name="province"
          label="Province"
          placeholder="Choose…"
          options={provinces}
        />
        <FormCheckboxField
          control={form.control}
          name="subscribe"
          label="Subscribe to newsletter"
          description="Monthly digest."
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### 11.2 Field shorthands API

All accept `control`, `name`, `label`, `description?` plus their type-specific props.

| Component | Extra props |
|---|---|
| `FormTextField` | All `Input` props (`type`, `placeholder`, `…`) |
| `FormSelectField` | `options: SelectOption[]`, `placeholder?: string` |
| `FormCheckboxField` | *(none)* |

Errors appear automatically under each field via `<FormMessage>` (built into each shorthand).

### 11.3 Custom fields with raw `FormField`

For inputs not covered by the shorthands (e.g. RadioGroup, Switch, Slider, MultiSelect), compose with the lower-level primitives:

```tsx
import {
  Form, FormControl, FormDescription, FormField,
  FormItem, FormLabel, FormMessage,
} from "@pplethai/components/form";
import { Switch } from "@pplethai/components";

<FormField
  control={form.control}
  name="enabled"
  render={({ field }) => (
    <FormItem className="flex items-center justify-between">
      <div className="space-y-0.5">
        <FormLabel>Enable feature</FormLabel>
        <FormDescription>Turn on the new behavior.</FormDescription>
      </div>
      <FormControl>
        <Switch checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

`useFormField()` is also exported for cases where you need to read field state inside a custom render.

---

## 12. Design tokens

All colors are HSL CSS variables. Reference them as `bg-primary`, `text-secondary`, `border-destructive`, etc. — Tailwind config maps `primary` → `hsl(var(--primary))`.

### 12.1 Color tokens

| Token | Tailwind class | Hex (light) | Use |
|---|---|---|---|
| `--primary` | `bg-primary` `text-primary` | `#FF6A13` | CTAs, focus rings |
| `--secondary` | `bg-secondary` | `#002B49` | Navigation, structural UI |
| `--destructive` | `bg-destructive` | `#C13200` | Errors, destructive actions |
| `--foreground` | `text-foreground` | `#212121` | Primary text |
| `--muted-foreground` | `text-muted-foreground` | `#464646` | Secondary text |
| `--background` | `bg-background` | `#FFFFFF` | Page background |
| `--muted` | `bg-muted` | `#F5F5F5` | Inactive backgrounds |
| `--border` | `border-border` | `#E6E6E6` | Borders |
| `--ring` | `ring-ring` | `#FF6A13` | Focus rings |

Each has a `*-foreground` companion for contrast. Dark mode (`html.dark`) flips these — never hardcode hex.

### 12.2 Gradient tokens (Tailwind utility classes)

```tsx
<div className="bg-gradient-primary">…</div>      {/* orange gradient */}
<div className="bg-gradient-secondary">…</div>    {/* navy gradient */}
<div className="bg-gradient-brand">…</div>        {/* navy → orange */}
<div className="bg-gradient-destructive">…</div>  {/* red gradient */}
```

Button-specific variants (`bg-gradient-primary-button`, `bg-gradient-secondary-button`) include extra-bright tones and pair with `.gradient-hover-animate`.

The `gradients` object is also exported for programmatic access:

```tsx
import { gradients, type GradientToken } from "@pplethai/components";
const css = gradients.primary; // CSS variable reference
```

### 12.3 Typography

| Class | Font | Use |
|---|---|---|
| `font-heading` | Anakotmai (medium) | Headings, button labels |
| `font-body` | IBM Plex Sans Thai Looped | Body text (applied to `<body>` automatically) |

Type scale is multiplied by 1.2× (Thai-friendly sizes). Body line-height defaults to 1.65.

### 12.4 Spacing / radius

- Border radius: `rounded-lg` = `var(--radius)` (0.5rem). `md` and `sm` are derived.
- Gap tokens: `gap-1` (4), `gap-2` (8), `gap-4` (16), `gap-6` (24). Use `Stack`/`Inline` `gap` props instead of raw `gap-*`.
- Container breakpoints: `sm` 640, `md` 768, `lg` 1280.

### 12.5 Shared CVA factories

| Factory | From | Notes |
|---|---|---|
| `buttonVariants` | `@pplethai/components` | extend Button styles |
| `badgeVariants` | `@pplethai/components` | extend Badge |
| `alertVariants` | `@pplethai/components` | extend Alert |
| `iconVariants` | `@pplethai/components` | extend Icon |
| `logoVariants` | `@pplethai/components` | extend Logo |
| `gapVariants` | `@pplethai/components` | shared gap scale (none/xs/sm/md/lg) |
| `containerVariants` | `@pplethai/components` | shared container sizes |

```tsx
import { buttonVariants, cn } from "@pplethai/components";

// Style an <a> like a button
<a href="/x" className={cn(buttonVariants({ variant: "outline" }), "no-underline")}>
  Go
</a>
```

---

## 13. Composed patterns

These are recipes — not exported components. Build them in your app from primitives.

### 13.1 Two-column page (sidebar + content)

```tsx
import { Container, Inline, Stack, Button, Input, Label, Separator } from "@pplethai/components";
import { NavLink } from "react-router-dom";

<Container size="lg" className="py-8">
  <Inline gap="lg" align="start" className="flex-nowrap">
    <aside className="hidden w-56 shrink-0 md:block">
      <Stack gap="xs" as="nav">
        <NavLink to="/settings/profile" className="rounded-md px-2 py-1 hover:bg-muted">
          Profile
        </NavLink>
        <NavLink to="/settings/security" className="rounded-md px-2 py-1 hover:bg-muted">
          Security
        </NavLink>
      </Stack>
    </aside>
    <main className="min-w-0 flex-1">
      <Stack gap="lg">
        <header>
          <h1 className="font-heading text-2xl">Profile</h1>
          <p className="text-muted-foreground">Manage your public details.</p>
        </header>
        <Separator />
        {/* fields */}
      </Stack>
    </main>
  </Inline>
</Container>
```

### 13.2 Responsive card grid

Use Tailwind `grid` (neither `Stack` nor `Inline` enforces column count).

```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription>{item.desc}</CardDescription>
      </CardContent>
    </Card>
  ))}
</div>
```

### 13.3 Form section (reusable)

```tsx
function FormSection({
  title,
  description,
  children,
}: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Stack gap="md">
      <div>
        <h3 className="font-heading text-base font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Stack gap="sm">{children}</Stack>
    </Stack>
  );
}
```

### 13.4 Settings page

```tsx
<Container size="md" className="py-6">
  <Stack gap="lg">
    <header>
      <h1 className="font-heading text-xl">Settings</h1>
      <p className="text-sm text-muted-foreground">Account and privacy.</p>
    </header>
    <Separator />
    <Inline justify="between" align="start">
      <Stack gap="xs">
        <p className="font-medium">Public profile</p>
        <p className="text-sm text-muted-foreground">Let others find you.</p>
      </Stack>
      <Switch defaultChecked />
    </Inline>
    <Separator />
    {/* more rows */}
  </Stack>
</Container>
```

### 13.5 Auth screen (centered card on brand gradient)

```tsx
<div className="min-h-screen bg-gradient-brand">
  <Container size="sm" className="flex min-h-screen items-center justify-center">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <Inline gap="sm" align="center">
          <Logo size="sm" className="text-primary" />
          <CardTitle>Sign in</CardTitle>
        </Inline>
      </CardHeader>
      <CardContent>
        <Stack gap="md">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="pwd">Password</Label>
            <Input id="pwd" type="password" className="mt-1" />
          </div>
        </Stack>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2">
        <Button className="w-full"><Lock />Sign in</Button>
        <p className="text-center text-xs text-muted-foreground">
          No account? <a href="/signup" className="text-primary">Sign up</a>
        </p>
      </CardFooter>
    </Card>
  </Container>
</div>
```

### 13.6 Dashboard header + stats

```tsx
<Stack gap="lg">
  <Inline justify="between" align="center">
    <Stack gap="xs">
      <h1 className="font-heading text-2xl">Overview</h1>
      <p className="text-sm text-muted-foreground">Updated today</p>
    </Stack>
    <Button><Plus />New</Button>
  </Inline>
  <div className="grid gap-3 sm:grid-cols-3">
    {stats.map((s) => (
      <Card key={s.label}>
        <CardContent className="pt-6">
          <p className="text-xs text-muted-foreground">{s.label}</p>
          <Inline gap="sm" align="end" className="mt-1">
            <p className="font-heading text-2xl">{s.value}</p>
            <Badge variant={s.trend.startsWith("-") ? "destructive" : "default"}>
              {s.trend}
            </Badge>
          </Inline>
        </CardContent>
      </Card>
    ))}
  </div>
</Stack>
```

---

## 14. Anti-patterns / things NOT to do

- ❌ **Don't hardcode brand colors as hex** (`bg-[#FF6A13]`). Always use tokens (`bg-primary`).
- ❌ **Don't reach past `cn()`.** Don't do `className={"px-4 " + extra}` — `tailwind-merge` won't dedupe.
- ❌ **Don't omit `DialogTitle`/`SheetTitle`.** Radix logs a console warning; screen readers need it.
- ❌ **Don't use raw `<button>` for triggers** when the component expects `asChild` — wrap your `<Button>`/`<a>` and pass `asChild`.
- ❌ **Don't import from `sonner` directly** for app code — use `showToast` and `Toaster` from `@pplethai/components` so styling is consistent. `toast` is re-exported for advanced cases only.
- ❌ **Don't nest `Container` inside `Container`** — you'll get doubled horizontal padding.
- ❌ **Don't forget `pathname` on `<Navbar>`** if you want active states or mobile-menu-on-route-change to work.
- ❌ **Don't pass a number to `<Slider value=…>`** — it's always `number[]` (single-value sliders use a one-element array).
- ❌ **Don't try to make `MultiSelect` uncontrolled.** `value` + `onValueChange` are both required.
- ❌ **Don't wrap `<Label>` with both `htmlFor` and a child input simultaneously.** Pick one.
- ❌ **Don't use `Switch` for fields that submit later** — that's `Checkbox`. Switch is for "applies on toggle" settings.
- ❌ **Don't render `<Toaster />` more than once.** It's a singleton; multiple instances duplicate toasts.

---

## Appendix: complete export list

From `@pplethai/components`:

```
// Utilities
cn, gapVariants, containerVariants, gradients
type GapVariants, type ContainerVariants, type GradientToken

// Icon & branding
Icon, iconVariants, type IconProps
Logo, logoVariants, type LogoProps
Navbar, navLinkClassName, type NavbarItem, type NavbarLinkRenderProps, type NavbarProps

// Layout
Stack, type StackProps
Inline, type InlineProps
Container, type ContainerProps

// UI components
Button, buttonVariants, type ButtonProps
Input, type InputProps
Label
Textarea, type TextareaProps
Checkbox
RadioGroup, RadioGroupItem
Switch
Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectScrollDownButton, SelectScrollUpButton, SelectSeparator,
  SelectTrigger, SelectValue
MultiSelect, type MultiSelectOption, type MultiSelectProps
Autocomplete, type AutocompleteOption, type AutocompleteProps,
  type AutocompleteSingleProps, type AutocompleteMultipleProps
Popover, PopoverAnchor, PopoverContent, PopoverTrigger
Slider
Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
Separator
Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetTitle, SheetTrigger, type SheetContentProps
Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger
DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger
Tabs, TabsContent, TabsList, TabsTrigger
Accordion, AccordionContent, AccordionItem, AccordionTrigger
Alert, AlertDescription, AlertTitle, alertVariants
Badge, badgeVariants, type BadgeProps
Toaster, showToast, toast, type ShowToastOptions, type ToastVariant
Skeleton
Progress
Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator
NavigationMenu, NavigationMenuContent, NavigationMenuIndicator,
  NavigationMenuItem, NavigationMenuLink, NavigationMenuList,
  NavigationMenuTrigger, NavigationMenuViewport
```

From `@pplethai/components/form`:

```
Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
useFormField
FormCheckboxField, FormSelectField, FormTextField, type SelectOption
```
