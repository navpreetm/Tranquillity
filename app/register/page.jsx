import AuthLayout from "../auth/AuthLayout";
import RegisterForm from "./form";

export default function RegisterPage() {
  return (
    <AuthLayout variant="register">
      <RegisterForm />
    </AuthLayout>
  );
}
