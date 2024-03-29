import { RouterProvider, createRouter } from "@tanstack/react-router";
import BackgroundAssets from "./commonComponents/BackgroundAssets";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <BackgroundAssets />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
