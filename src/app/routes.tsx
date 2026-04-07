import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { PolicyDetailPage } from "./pages/PolicyDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "policy/:id", Component: PolicyDetailPage },
    ],
  },
]);
