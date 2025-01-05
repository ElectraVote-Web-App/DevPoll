import { Navigate, Outlet } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";

export default function AuthLayout() {
  const { user } = useAuth();

  return user ? (
    <div className="bg-[#F9FBFC] h-screen">
      <Header />
      <main className="xl:px-[333px] pt-24 px-3">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/signin" replace={true} />
  );
}

