import { socialLinks } from "@/data/links";
import Parag from "../Parag/Parag";
import Divider from "../ui/divider";
import { Link } from "react-router-dom";
import { Dock, DockIcon } from "../ui/dock";

const Footer = () => {
  return (
    <footer className="pt-10 pb-4 px-4 bg-alt text-main font-bold">
      <div className="container text-center flex flex-col lg:flex-row items-center justify-center gap-4">
        <p>تابعنا</p>
        <Dock>
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <DockIcon key={name}>
              <Link to={href} className="text-main">
                <p className="sr-only">{name}</p>
                <Icon className="size-6" />
              </Link>
            </DockIcon>
          ))}
        </Dock>
      </div>

      <Divider />
      <Parag className="text-xs w-full text-center text-main font-bold">
        طيران أديل - جميع الحقوق محفوظة © 2024
      </Parag>
      <Parag className="text-xs mt-1 w-full text-center text-main font-bold">
        رقم ضريبة القيمة المضافة للمجموعة: 300000776210003
      </Parag>
    </footer>
  );
};
export default Footer;
