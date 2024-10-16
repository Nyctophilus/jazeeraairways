import Main from "@/components/MainWrapper";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <Main>
      <Navbar />
      <main className="min-h-[calc(100svh-225px)] bg-main/10">
        <Outlet />
      </main>
      <Footer />
    </Main>
  );
}

export default HomeLayout;
