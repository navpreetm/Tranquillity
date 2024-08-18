import AuthLayout from "../global-components/AuthLayout";
import RegisterForm from "./form";

export default function RegisterPage() {
  return (
    <AuthLayout variant="register">
      <RegisterForm />
    </AuthLayout>
  );
}
