import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; 
import { ChevronLeft } from "lucide-react"; 
const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <Button
      variant="outline"
      onClick={handleGoBack}
      className="flex items-center justify-center w-10 h-10 rounded-xl mb-4 shadow-md bg-white hover:bg-gray-100"
    >
      <ChevronLeft className="w-5 h-5 text-black" />
    </Button>
  );
};

export default BackButton;
