import MenuComponent from "../MenuComponent/MenuComponent";
import { navLinks } from "@/data/links";
import ButtonShapeTabs from "../ui/NavTabs";

const Navbar = () => {
  return (
    <header className="p-4 flex justify-between bg-main/10">
      <div className="container flex items-center justify-between">
        <img src="/assets/images/logo.webp" alt="logo" className="h-14" />

        <div className="hidden lg:block">
          <ButtonShapeTabs />
        </div>
      </div>

      <nav className="lg:hidden text-main-foreground">
        <MenuComponent navLinks={navLinks} />
      </nav>
    </header>
  );
};
export default Navbar;
