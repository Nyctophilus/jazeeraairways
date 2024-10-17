import { socialLinks } from "@/data/links";
import Parag from "../Parag/Parag";
import Divider from "../ui/divider";
import { Link } from "react-router-dom";
import { Dock, DockIcon } from "../ui/dock";

const Footer = () => {
  return (
    <footer className="pt-6 pb-4 px-4 bg-main/5 text-main font-bold">
      <img
        src="/assets/images/logo.webp"
        alt="logo"
        className="h-8 mx-auto mb-4"
      />

      <div className="container text-center flex flex-col lg:flex-row items-center justify-center gap-4">
        <Dock>
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <DockIcon key={name} className="bg-transparent">
              <Link to={href} className="text-main">
                <p className="sr-only">{name}</p>
                <Icon className="size-6" />
              </Link>
            </DockIcon>
          ))}
        </Dock>
      </div>

      <Divider className="my-4" />
      <Parag className="w-full text-center text-main font-bold">
        © جميع الحقوق محفوظة لطيران الجزيرة، 2023.
      </Parag>
    </footer>
  );
};
export default Footer;
