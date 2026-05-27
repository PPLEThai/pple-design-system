import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

const TYPE_SCALE = 1.2;

type FontSizeValue = string | [string, { lineHeight?: string; letterSpacing?: string }];

function scaleRem(size: string): string {
  const match = size.match(/^([\d.]+)rem$/);
  if (match) return `${parseFloat(match[1]) * TYPE_SCALE}rem`;
  return size;
}

function scaleFontSizeValue(value: FontSizeValue): FontSizeValue {
  if (typeof value === "string") return scaleRem(value);
  const [fontSize, options] = value;
  return [
    scaleRem(fontSize),
    {
      ...options,
      lineHeight: options.lineHeight?.includes("rem")
        ? scaleRem(options.lineHeight)
        : options.lineHeight,
    },
  ];
}

const scaledFontSize = Object.fromEntries(
  Object.entries(defaultTheme.fontSize).map(([key, value]) => [
    key,
    scaleFontSizeValue(value as FontSizeValue),
  ]),
);

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  safelist: ["progress-shimmer"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: scaledFontSize,
      lineHeight: {
        body: "1.65",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-brand": "var(--gradient-brand)",
        "gradient-destructive": "var(--gradient-destructive)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "progress-shimmer-highlight": {
          "0%": { backgroundPosition: "-200% 0, 0 0" },
          "100%": { backgroundPosition: "200% 0, 0 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
