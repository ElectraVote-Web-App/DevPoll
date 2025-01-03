import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import { ChevronLeft } from "lucide-react"; 
const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    const hasHistory = window.history.state !== null;
    navigate(hasHistory ? -1 : "/polls");
  };

  return (
    <Button
      variant="outline"
      onClick={handleGoBack}
      size="icon"
      className="flex items-center justify-center rounded-xl mb-4 shadow-md bg-white hover:bg-gray-100"
    >
      <ChevronLeft className="w-5 h-5 text-black" />
    </Button>
  );
};

export default BackButton;
