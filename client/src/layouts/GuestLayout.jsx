import { Outlet, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";

export default function GuestLayout() {
  const {user} = useAuth();

  return user ? (
    <Navigate to="/" replace={true} />
  ) : (
    <div className="bg-[#F9FBFC] min-h-screen">
      <Header />
      <main className="xl:px-[333px] pt-24 px-3">
        <Outlet />
      </main>
    </div>
  );
}
