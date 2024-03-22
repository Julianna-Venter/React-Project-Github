import { createFileRoute } from "@tanstack/react-router";
import UserForm from "../userForm/UserForm";

export const Route = createFileRoute("/")({
  component: () => <UserForm />,
});
