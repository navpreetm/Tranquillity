import AuthLayout from "../global-components/AuthLayout";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <AuthLayout variant="login">
      <LoginForm />
    </AuthLayout>
  );
}
