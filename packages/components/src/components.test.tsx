import { render, screen } from "@testing-library/react";
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
