import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../../profilePage/ProfilePage";

export const Route = createFileRoute("/profile/$profileId")({
  component: () => <ProfilePage />,
});
