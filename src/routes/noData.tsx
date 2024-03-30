import { createFileRoute } from "@tanstack/react-router";
import NoData from "../edgeCases/NoData";

export const Route = createFileRoute("/noData")({
  component: () => <NoData />,
});
