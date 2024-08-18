import AuthLayout from "../auth/AuthLayout";
import LoginForm from "./form";

export default function RegisterPage() {
  return (
    <AuthLayout variant="register">
      <LoginForm />
    </AuthLayout>
  );
}
