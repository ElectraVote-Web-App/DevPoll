import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

export default function SharedLayout() {

  return (
    <div className="bg-[#F9FBFC] min-h-screen">
      <Header />
      <main className="xl:px-[333px] pt-24 px-3">
        <Outlet />
      </main>
    </div>
  );
}
