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
import { Navbar } from "./components/navbar";
import { Stack } from "./components/layout/stack";

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
