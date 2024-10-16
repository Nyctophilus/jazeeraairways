import { validateIBAN, validateNumericInput } from "@/lib/helpers";
import { useEffect, useState } from "react";

const InputWithClearIcon = ({
  label,
  type,
  defaultValue,
  placeholder,
  id,
  reverse,
  prefix,
  image,
  rtl,
  max,
  setError,
}: {
  label?: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  id: string;
  reverse?: boolean;
  prefix?: string;
  image?: string;
  rtl?: boolean;
  max?: number;
  setError?: any;
}): JSX.Element => {
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    if (id === "iban") setError(validateIBAN(value));
    if (id === "otp")
      setError({
        otp:
          value === ""
            ? null
            : value.length < 4 || value.length > 6
            ? "يجب ان يكون رمز التحقق مابين 4 و 6 خانات"
            : null,
      });

    if (id === "code")
      setError({
        code:
          value === ""
            ? null
            : value.length !== 4 && value.length !== 6
            ? "رمز التحقق غير صحيح يجب أن يكون مكون من 6 خانات"
            : null,
      });
  }, [value]);

  return (
    <div>
      <label htmlFor={id} className={`${label ? "font-bold" : "sr-only"}`}>
        {label}
      </label>
      <div
        className={`bg-gray-50 border border-gray-700 rounded-lg px-2 relative flex gap-1 ${
          reverse ? "flex-row-reverse" : ""
        }`}
      >
        <div className="w-full flex gap-1 items-center">
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={(e) => setValue(validateNumericInput(e.target.value))}
            placeholder={placeholder}
            maxLength={max}
            className={`py-2 rounded-md w-full bg-inherit ${
              reverse ? "text-left" : ""
            } ${
              id === "phone" ? "text-left" : ""
            } border-gray-200 shadow-sm sm:text-sm`}
            style={{ direction: rtl ? "rtl" : "ltr" }}
            required={id === "iban" ? false : true}
          />
          {prefix && <p className="font-bold pe-1">{prefix}</p>}
        </div>

        <span
          className="grid w-10 place-content-center text-gray-500 cursor-pointer hover:text-gray-800"
          onClick={() => setValue("")}
        >
          {!image ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#736f82"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          ) : (
            <img src={image} alt="input image icon" className="w-10" />
          )}
        </span>
      </div>
    </div>
  );
};
export default InputWithClearIcon;
