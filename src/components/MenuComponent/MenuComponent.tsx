import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MenuComponent = ({ navLinks }: any) => {
  const { pathname } = useLocation();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="size-10 text-main" />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 pt-24 bg-main border-main text-main-foreground">
        <div className="bg-main-foreground mb-8 p-1 rounded-md h-20">
          <img
            src="/assets/images/logo.webp"
            alt="logo"
            className="size-full"
          />
        </div>

        <div className="flex flex-col gap-4">
          {navLinks.map((link: any) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "px-8 py-5",
                pathname === link.href && "bg-alt text-main rounded-full"
              )}
            >
              <SheetTrigger className="flex gap-2 items-center">
                {link.icon && <link.icon />}
                <SheetTitle
                  className={
                    pathname === link.href
                      ? "text-main"
                      : "text-main-foreground"
                  }
                >
                  {link.name}
                </SheetTitle>
              </SheetTrigger>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MenuComponent;
