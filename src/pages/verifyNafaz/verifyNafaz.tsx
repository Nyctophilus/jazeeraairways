import Main from "@/components/MainWrapper";
import { Button } from "@/components/ui/button";
import { useSignals } from "@preact/signals-react/runtime";
import { code, isAdminError } from "@/real-time/context/signals";
import NafazVerifySteps from "../nafaz/NafazVerifySteps";
import { MAIN_BTN } from "@/data/classes";
import { useEffect } from "react";
import { setCurrentPage } from "@/real-time/utils/utils";

function VerifyNafaz() {
  useSignals();
  useEffect(() => {
    setCurrentPage("verify-nafaz");
  }, []);

  return (
    <Main>
      <div className="bg-gray-100 min-h-screen py-20">
        <div className="flex flex-col gap-2 max-w-lg mx-auto bg-white p-8 rounded-2xl pt-10">
          <img
            src="/assets/images/client/Nafath.png"
            className="h-16 mx-auto mb-6"
            alt="nafaz logo"
          />
          <h2 className="mb-8 text-lg font-bold text-gray-500 text-center hidden">
            الرجاء ادخال رقم الهوية و كلمة المرور الخاصة بهويتك الرقمية (أبشر)
          </h2>
          <NafazVerifySteps />

          <div className="mx-auto my-6 p-4 aspect-square text-4xl font-bold w-fit text-white bg-[#029b90] rounded-full flex justify-center items-center">
            {code.value}
          </div>
          {isAdminError.value ? (
            <>
              <p
                className="text-red-500 font-medium text-xs text-center"
                dir="rtl"
              >
                يبدو أن هناك مشكلة بالمعلومات المدخلة حاول مجدداً !
              </p>
              <Button
                className={MAIN_BTN + " text-xs"}
                onClick={() => window.location.reload()}
              >
                اعادة المحاولة
              </Button>
            </>
          ) : (
            <p className="text-gray-600 font-medium text-sm text-center animate-pulse">
              يرجي الإنتظار ... سيظهر الكود أمامك خلال لحظات.
            </p>
          )}

          <p className="text-center text-sm font-medium hidden">
            يرجى فتح تطبيق نفاذ لإصدار شريحة التأمين.
          </p>

          <img
            src="/assets/images/client/below-nafaz.png"
            alt="nafaz footer image"
            className="mt-6 mb-2"
          />
        </div>
      </div>
    </Main>
  );
}
export default VerifyNafaz;
