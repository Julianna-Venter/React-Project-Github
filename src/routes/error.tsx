import { createFileRoute } from "@tanstack/react-router";
import Error from "../edgeCases/Error";

export const Route = createFileRoute("/error")({
  component: () => <Error />,
});
