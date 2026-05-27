import "@pplethai/components/styles.css";
import { Toaster } from "@pplethai/components";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ComponentsPage } from "./pages/ComponentsPage";
import { FormsPage } from "./pages/FormsPage";
import { GuidelinesPage } from "./pages/GuidelinesPage";
import { HomePage } from "./pages/HomePage";
import { IconsPage } from "./pages/IconsPage";
import { LayoutPage } from "./pages/LayoutPage";
import { TokensPage } from "./pages/TokensPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tokens" element={<TokensPage />} />
          <Route path="components" element={<ComponentsPage />} />
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
