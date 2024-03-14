import { createFileRoute } from "@tanstack/react-router";
import UserForm from "../UserForm/UserForm";

export const Route = createFileRoute("/")({
  component: () => <UserForm />,
});
