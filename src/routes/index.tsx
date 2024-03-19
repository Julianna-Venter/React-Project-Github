import { createFileRoute } from "@tanstack/react-router";
import UserForm from "../UserForm/Components/UserForm";

export const Route = createFileRoute("/")({
  component: () => <UserForm />,
});
