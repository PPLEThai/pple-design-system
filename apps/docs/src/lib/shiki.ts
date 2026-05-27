import langBash from "@shikijs/langs/bash";
import langCss from "@shikijs/langs/css";
import langHtml from "@shikijs/langs/html";
import langJavascript from "@shikijs/langs/javascript";
import langJson from "@shikijs/langs/json";
import langTsx from "@shikijs/langs/tsx";
import langTypescript from "@shikijs/langs/typescript";
import themeGithubLight from "@shikijs/themes/github-light";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

const langs = [langTsx, langTypescript, langJavascript, langBash, langJson, langCss, langHtml] as const;

const supportedLanguages = new Set([
  "tsx",
  "typescript",
  "javascript",
  "bash",
  "json",
  "css",
  "html",
]);

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [themeGithubLight],
      langs: [...langs],
      engine: createOnigurumaEngine(() => import("shiki/wasm")),
    });
  }
  return highlighterPromise;
}

export async function highlightCode(code: string, language?: string): Promise<string> {
  const lang = language && supportedLanguages.has(language) ? language : "tsx";
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    theme: "github-light",
  });
}
