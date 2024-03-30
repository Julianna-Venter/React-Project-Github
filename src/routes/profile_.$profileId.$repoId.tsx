import { createFileRoute } from "@tanstack/react-router";
import RepoPage from "../repoPage/repoPage";

export const Route = createFileRoute("/profile/$profileId/$repoId")({
  component: () => <RepoPage />,
});
