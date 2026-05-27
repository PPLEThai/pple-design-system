import "@pplethai/components/styles.css";
import { Toaster } from "@pplethai/components";
import { Route, Routes } from "react-router-dom";
import type { ComponentType } from "react";
import { Layout } from "./components/Layout";
import { DocsLayout } from "./components/DocsLayout";
import { ComponentsIndex } from "./pages/components";
import { FormsPage } from "./pages/FormsPage";
import { GuidelinesPage } from "./pages/GuidelinesPage";
import { HomePage } from "./pages/HomePage";
import { IconsPage } from "./pages/IconsPage";
import { LayoutPage } from "./pages/LayoutPage";
import { PatternsPage } from "./pages/PatternsPage";
import { TokensPage } from "./pages/TokensPage";

const componentPageModules = import.meta.glob<{ default: ComponentType }>(
  "./pages/components/*.tsx",
  { eager: true },
);

const componentRoutes = Object.entries(componentPageModules)
  .filter(([path]) => !path.endsWith("/index.tsx"))
  .map(([path, module]) => {
    const slug = path.replace("./pages/components/", "").replace(/\.tsx$/, "");
    return { slug, Component: module.default };
  });

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tokens" element={<TokensPage />} />
          <Route path="components" element={<DocsLayout />}>
            <Route index element={<ComponentsIndex />} />
            {componentRoutes.map(({ slug, Component }) => (
              <Route key={slug} path={slug} element={<Component />} />
            ))}
          </Route>
          <Route path="patterns" element={<PatternsPage />} />
          <Route path="forms" element={<FormsPage />} />
          <Route path="layout" element={<LayoutPage />} />
          <Route path="icons" element={<IconsPage />} />
          <Route path="guidelines" element={<GuidelinesPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
