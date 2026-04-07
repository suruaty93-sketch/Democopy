import { createHashRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { PolicyDetailPage } from "./pages/PolicyDetailPage";

// Use hash routing so the app works when hosted under a sub-path (e.g. GitHub Pages).
export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "policy/:id", Component: PolicyDetailPage },
    ],
  },
]);
