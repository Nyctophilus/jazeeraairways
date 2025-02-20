import { isAdminError } from "@/real-time/context/signals";
import { cn } from "@/lib/utils";
import { useSignals } from "@preact/signals-react/runtime";
import { ReactNode, useState } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BsFillEyeFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { CustomInputProps } from "@/types/fly.types";
import Label from "./ui/label";

interface props {
  label?: string;
  id: string;
  disabled?: boolean;
  options?: RegisterOptions;
  register?: UseFormRegister<any>;
  value?: string;
  errors?: FieldErrors;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  multiple?: boolean;
  isAr?: boolean;
  icon?: ReactNode;
  className?: string;
  containerClassName?: string;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  errors,
  id,
  label,
  register,
  disabled,
  options,
  value,
  placeholder,
  type = "text",
  textarea,
  multiple,
  isAr,
  icon,
  className,
  containerClassName,
  max,
  onChange,
}: props) {
  useSignals();
  const [isShowen, setIsShowen] = useState(false);
  function handleShowPass() {
    setIsShowen((prev) => !prev);
  }

  return (
    <div
      className={cn(`flex flex-col gap-2 w-full`, containerClassName)}
      dir={isAr ? "rtl" : "ltr"}
    >
      {label && (
        <label
          htmlFor={id}
          className="text-sm capitalize font-medium text-gray-500"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute z-10 right-3 top-1/2 -translate-y-1/2">
            {icon}
          </span>
        )}

        {((errors?.[id] && errors[id]?.message) || isAdminError.value) && (
          <span
            className={`absolute text-xs font-medium top-full text-red-500 ${
              isAr ? "right-0" : "left-0"
            }`}
          >
            {errors?.[id]?.message?.toString()}
          </span>
        )}

        {isAdminError.value && id == "code" && (
          <span className="text-red-500 absolute -bottom-6 right-0 font-medium">
            يجب ادخال الرمز بشكل صحيح
          </span>
        )}

        <span
          className={`top-1/2 absolute  z-20 -translate-y-1/2  ${
            id === "password" || id === "passwordC"
              ? isAr
                ? "left-1/2"
                : "right-12"
              : isAr
              ? "left-4"
              : "right-4"
          }`}
        >
          {(errors?.[id] || isAdminError.value) && (
            <IoCloseSharp className="text-lg text-red-500" />
          )}
        </span>

        {(id === "password" || id === "passwordC") && (
          <div
            className={`absolute top-1/2 z-10 -translate-y-1/2 text-gray-400 text-sm cursor-pointer ${
              isAr ? "left-4" : "right-4"
            } `}
            onClick={handleShowPass}
          >
            {isShowen ? <AiFillEyeInvisible /> : <BsFillEyeFill />}
          </div>
        )}

        {textarea ? (
          <textarea
            id={id}
            disabled={disabled}
            className={`p-2 bg-black resize-none h-[130px]  border  w-full outline-none rounded-md relative transition-all   ${
              errors?.[id] ? "border-red-500" : "border-gray-300"
            }`}
            {...(register !== undefined && { ...register(id, options) })}
            autoComplete="off"
            defaultValue={value}
            name={id}
            placeholder={placeholder ? placeholder : ""}
          />
        ) : (
          <input
            id={id}
            dir={isAr ? "rtl" : "ltr"}
            maxLength={max}
            type={
              id === "password" || id === "passwordC"
                ? isShowen
                  ? "text"
                  : type
                : type
            }
            placeholder={placeholder ? placeholder : ""}
            disabled={disabled}
            className={cn(
              `p-2 bg-gray-100  w-full outline-none border rounded-lg relative transition-all ${
                icon ? "ps-10" : ""
              } ${errors?.[id] ? "border-red-500" : "border-gray-300"}`,
              className
            )}
            {...(register !== undefined && { ...register(id, options) })}
            autoComplete="off"
            defaultValue={value}
            name={id}
            multiple={multiple ? true : false}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}

export default Input;

export const CustomInput = ({
  className,
  inputClassName,
  label,
  id,
  type = "text",
  defaultValue,
  register,
  errors,
  options = {},
  placeholder,
  disabled,
}: // dir = "rtl",
CustomInputProps) => (
  <div className={className}>
    <Label label={label} id={id} className={className} />
    <Input
      errors={errors}
      id={id}
      type={type}
      isAr={true}
      placeholder={placeholder ?? `اكتب ${label}...`}
      className={cn(`bg-white`, inputClassName)}
      register={register}
      options={options}
      value={defaultValue}
      disabled={disabled}
    />

    <p
      className={cn(
        "text-xs text-red-500 h-5 transition-opacity",
        errors?.[id] ? "opacity-100" : "opacity-0"
      )}
    ></p>
  </div>
);
