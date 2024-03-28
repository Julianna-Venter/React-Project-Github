import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../../ProfilePage/ProfilePage";

export const Route = createFileRoute("/profile/$profileId")({
  component: () => <ProfilePage />,
});
