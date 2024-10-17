import { navLinks } from "@/data/links";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

interface TabProps {
  text: string;
  href: string;
}

const Tab = ({ text, href }: TabProps) => {
  const { pathname } = useLocation();
  return (
    <Link
      // [ ] href to be added
      to={" "}
      className={`${
        pathname === href
          ? "text-main hover:text-main/70"
          : "text-main hover:text-main-foreground/70"
      } relative rounded-md px-2 py-1 text-sm font-medium transition-colors`}
    >
      <span className="relative z-10">{text}</span>
      {pathname === href && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-md bg-white"
        ></motion.span>
      )}
    </Link>
  );
};

const ButtonShapeTabs = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {navLinks.map((link) => (
        <Tab text={link.name} key={link.name} href={link.href} />
      ))}
    </div>
  );
};

export default ButtonShapeTabs;
