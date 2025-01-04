import { SignUpForm } from "@/components/signup-form";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    navigate("/signin");
  };

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
      </div>
    </div>
  );
}