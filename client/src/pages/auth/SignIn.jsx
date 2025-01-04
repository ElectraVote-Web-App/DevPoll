import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Page() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    login(token);
    navigate("/");
  };
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  )
}
