import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate(-1)}>
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
