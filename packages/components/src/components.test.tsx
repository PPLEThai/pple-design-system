import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Calendar } from "./components/ui/calendar";
import { DatePicker } from "./components/ui/date-picker";
import { MonthCalendar, MonthPicker } from "./components/ui/month-picker";
import { TimePicker, formatTime } from "./components/ui/time-picker";
import { DateTimePicker } from "./components/ui/date-time-picker";
import { dateToNativeValue, nativeValueToDate } from "./lib/native-picker";
import { Logo } from "./components/logo";
import { getNavbarVariant, Navbar } from "./components/navbar";
import { Stack } from "./components/layout/stack";
import { Spinner } from "./components/ui/spinner";
import { Stepper, StepperItem } from "./components/ui/stepper";

describe("@pplethai/components", () => {
  it("renders Button", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("renders compound Card", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
      </Card>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders Dialog trigger", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
  });

  it("renders Logo", () => {
    render(<Logo data-testid="logo" className="text-primary" />);
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
    expect(logo.tagName.toLowerCase()).toBe("svg");
    expect(screen.getByText("People's Party")).toBeInTheDocument();
  });

  it("getNavbarVariant prefers explicit variant over mini-app UA", () => {
    const miniAppUa = "PPLETodayApp/1.0.0 MiniApp";
    expect(getNavbarVariant({ userAgent: miniAppUa })).toBe("light");
    expect(getNavbarVariant({ userAgent: miniAppUa, variant: "dark" })).toBe("dark");
    expect(getNavbarVariant({ userAgent: "Mozilla/5.0", variant: "light" })).toBe("light");
  });

  it("renders Navbar", () => {
    render(
      <Navbar
        title="Design system"
        items={[
          { href: "/", label: "Home", end: true },
          { href: "/tokens", label: "Tokens" },
        ]}
        pathname="/tokens"
      />,
    );
    expect(screen.getByRole("heading", { name: /design system/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /tokens/i })).toHaveAttribute("aria-current", "page");
  });

  it("renders Navbar home link around logo and title", () => {
    render(
      <Navbar
        title="Design system"
        items={[{ href: "/tokens", label: "Tokens" }]}
        pathname="/tokens"
      />,
    );
    const homeLink = screen.getByRole("link", { name: /design system/i });
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink).toContainElement(screen.getByRole("heading", { name: /design system/i }));
  });

  it("supports custom Navbar home href and renderer", () => {
    render(
      <Navbar
        title="App"
        home={{ href: "/dashboard", end: true }}
        items={[]}
        pathname="/dashboard"
        renderHomeLink={({ home, className: linkClassName, children, onNavigate }) => (
          <a
            href={home.href}
            className={linkClassName(true)}
            onClick={onNavigate}
            data-testid="home"
          >
            {children}
          </a>
        )}
      />,
    );
    expect(screen.getByTestId("home")).toHaveAttribute("href", "/dashboard");
  });

  it("can disable Navbar home link", () => {
    render(<Navbar title="App" home={false} items={[]} pathname="/" />);
    expect(screen.queryByRole("link", { name: /app/i })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /app/i })).toBeInTheDocument();
  });

  it("renders Spinner as indeterminate by default", () => {
    render(<Spinner data-testid="spinner" />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveAttribute("role", "status");
    expect(spinner).toHaveAttribute("aria-label", "Loading");
    expect(spinner).not.toHaveAttribute("aria-valuenow");
    expect(spinner.querySelector("svg")?.className.baseVal).toContain("animate-spin");
  });

  it("renders Spinner as determinate when value is provided", () => {
    render(<Spinner data-testid="spinner" value={42} label="Uploading" />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveAttribute("aria-valuenow", "42");
    expect(spinner).toHaveAttribute("aria-valuemax", "100");
    expect(spinner).toHaveAttribute("aria-label", "Uploading");
    expect(spinner.querySelector("svg")?.className.baseVal).not.toContain("animate-spin");
  });

  it("renders Stepper with completed, current, and upcoming states", () => {
    render(
      <Stepper value={1} aria-label="signup">
        <StepperItem title="Account" />
        <StepperItem title="Profile" />
        <StepperItem title="Confirm" />
      </Stepper>,
    );

    const list = screen.getByRole("list", { name: /signup/i });
    expect(list).toHaveAttribute("data-orientation", "horizontal");

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).not.toHaveAttribute("aria-current");
    expect(items[1]).toHaveAttribute("aria-current", "step");
    expect(items[2]).not.toHaveAttribute("aria-current");

    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("renders vertical Stepper", () => {
    render(
      <Stepper value={0} orientation="vertical" aria-label="wizard">
        <StepperItem title="One" description="desc" />
        <StepperItem title="Two" />
      </Stepper>,
    );
    expect(screen.getByRole("list", { name: /wizard/i })).toHaveAttribute(
      "data-orientation",
      "vertical",
    );
    expect(screen.getByText("desc")).toBeInTheDocument();
  });

  it("renders Calendar with a selected day", () => {
    const selected = new Date(2026, 5, 15);
    render(<Calendar mode="single" selected={selected} defaultMonth={selected} />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByRole("gridcell", { name: "15" })).toBeInTheDocument();
  });

  it("renders DatePicker trigger with placeholder", () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByRole("button", { name: /pick a date/i })).toBeInTheDocument();
  });

  it("renders DatePicker label from value", () => {
    render(<DatePicker value={new Date(2026, 0, 9)} dateFormat="yyyy-MM-dd" />);
    expect(screen.getByRole("button", { name: /2026-01-09/ })).toBeInTheDocument();
  });

  it("renders MonthCalendar with twelve months", () => {
    render(<MonthCalendar value={new Date(2026, 2, 1)} locale="en-US" />);
    expect(screen.getByRole("button", { name: "Mar" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Jan" })).toHaveAttribute("aria-pressed", "false");
  });

  it("renders MonthPicker trigger with formatted value", () => {
    render(<MonthPicker value={new Date(2026, 5, 1)} locale="en-US" />);
    expect(screen.getByRole("button", { name: /June 2026/ })).toBeInTheDocument();
  });

  it("formats time in 24h with and without seconds", () => {
    const value = new Date(2026, 0, 9, 14, 5, 3);
    expect(formatTime(value)).toBe("14:05");
    expect(formatTime(value, true)).toBe("14:05:03");
  });

  it("renders TimePicker trigger with formatted value", () => {
    render(<TimePicker value={new Date(2026, 0, 9, 9, 30)} />);
    expect(screen.getByRole("button", { name: /09:30 น\./ })).toBeInTheDocument();
  });

  it("renders TimePicker placeholder when empty", () => {
    render(<TimePicker placeholder="Pick a time" />);
    expect(screen.getByRole("button", { name: /pick a time/i })).toBeInTheDocument();
  });

  it("renders DateTimePicker trigger combining date and time", () => {
    render(<DateTimePicker value={new Date(2026, 0, 9, 14, 5)} dateFormat="yyyy-MM-dd" />);
    expect(
      screen.getByRole("button", { name: /2026-01-09 เวลา 14:05 น\./ }),
    ).toBeInTheDocument();
  });

  it("renders native inputs when native is forced", () => {
    const { container } = render(
      <>
        <DatePicker native value={new Date(2026, 0, 9)} />
        <MonthPicker native value={new Date(2026, 5, 1)} />
        <TimePicker native value={new Date(2026, 0, 9, 9, 30)} />
        <DateTimePicker native value={new Date(2026, 0, 9, 14, 5)} />
      </>,
    );
    expect(container.querySelector('input[type="date"]')).toHaveValue("2026-01-09");
    expect(container.querySelector('input[type="month"]')).toHaveValue("2026-06");
    expect(container.querySelector('input[type="time"]')).toHaveValue("09:30");
    expect(container.querySelector('input[type="datetime-local"]')).toHaveValue(
      "2026-01-09T14:05",
    );
    // The visible value is the Thai-formatted label, not the OS-locale native value.
    expect(container.textContent).toContain("9 ม.ค. 2026");
    expect(container.textContent).toContain("มิถุนายน 2026");
  });

  it("clears the value from the native input via the × button", () => {
    let cleared = false;
    render(
      <DatePicker
        native
        value={new Date(2026, 0, 9)}
        onValueChange={(date) => {
          if (date === undefined) cleared = true;
        }}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "ล้างค่า" }));
    expect(cleared).toBe(true);
  });

  it("keeps the popover for DatePicker range mode even when native is forced", () => {
    render(<DatePicker native mode="range" placeholder="Pick a range" />);
    expect(screen.getByRole("button", { name: /pick a range/i })).toBeInTheDocument();
  });

  it("converts between Date and native input strings", () => {
    const dt = new Date(2026, 0, 9, 14, 5, 3);
    expect(dateToNativeValue(dt, "date")).toBe("2026-01-09");
    expect(dateToNativeValue(dt, "month")).toBe("2026-01");
    expect(dateToNativeValue(dt, "time", true)).toBe("14:05:03");
    expect(dateToNativeValue(dt, "datetime-local")).toBe("2026-01-09T14:05");
    expect(nativeValueToDate("2026-01-09", "date")).toEqual(new Date(2026, 0, 9));
    expect(nativeValueToDate("2026-01-09T14:05", "datetime-local")).toEqual(
      new Date(2026, 0, 9, 14, 5),
    );
  });

  it("renders Stack layout", () => {
    render(
      <Stack data-testid="stack">
        <span>One</span>
        <span>Two</span>
      </Stack>,
    );
    expect(screen.getByTestId("stack")).toBeInTheDocument();
    expect(screen.getByText("One")).toBeInTheDocument();
  });
});
