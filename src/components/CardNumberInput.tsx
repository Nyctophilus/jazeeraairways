import { useState } from "react";
import Label from "@/components/ui/label";
import { CreditCard, CheckCircle2, XCircle } from "lucide-react";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";

interface props {
  label?: string;
  id: string;
  disabled?: boolean;
  options?: RegisterOptions;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  multiple?: boolean;
  className?: string;
  containerClassName?: string;
  max?: number;
  cardType: string;
  setCardType: React.Dispatch<
    React.SetStateAction<"visa" | "master" | "mada" | null>
  >;
}

const CardNumberInput = ({
  errors,
  id,
  label,
  register,
  disabled,
  // options,
  placeholder,
  type = "text",
  className,
  containerClassName,
  cardType,
  setCardType,
}: props) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateCard = (number: string) => {
    // Remove spaces and dashes
    number = number.replace(/[\s-]/g, "");

    // Visa: Starts with 4, length 13 or 16
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    // Mastercard: Starts with 51-55 or 2221-2720, length 16
    const mastercardRegex =
      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;

    if (visaRegex.test(number)) {
      setCardType("visa");
      setIsValid(true);
      return false;
    } else if (mastercardRegex.test(number)) {
      setCardType("master");
      setIsValid(true);
      return false;
    } else {
      setIsValid(number.length > 0 ? false : null);
      return number.length > 0 ? true : false;
    }
  };

  const handleChange = (value: string) => {
    // Allow only numbers, spaces, and dashes
    const sanitizedValue = value.replace(/[^\d\s-]/g, "");
    return validateCard(sanitizedValue);
  };

  return (
    <div
      className={cn("flex flex-col gap-2 w-full relative", containerClassName)}
    >
      <div className="space-y-2">
        <Label id={id} label={label!} />
        <div className="relative">
          <input
            id={id}
            maxLength={16}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              `p-2 bg-gray-100  w-full outline-none border rounded-lg relative transition-all`,
              errors[id] ? "border-red-500" : "border-gray-300",
              className
            )}
            {...register(id, {
              required: "هذا الحقل ضروري",
              validate: (value) =>
                handleChange(value)
                  ? "رقم البطاقة غير صحيح. يجب أن يكون الرقم مكون من 16 رقم"
                  : true,
            })}
            name={id}
          />
          <div className="absolute inset-y-0 right-0 flex gap-1 items-center ps-3 pointer-events-none">
            {cardType === "visa" && (
              <CreditCard className="h-5 w-5 text-blue-500" />
            )}
            {cardType === "master" && (
              <CreditCard className="h-5 w-5 text-orange-500" />
            )}
            {isValid === true && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
            {isValid === false && <XCircle className="h-5 w-5 text-red-500" />}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 start-0 text-sm">
        {cardType && isValid && (
          <p className="text-main">
            رقم{" "}
            {cardType === "mada"
              ? "مدى"
              : cardType === "master"
              ? "ماستر كارد"
              : "فيزا"}{" "}
            صحيح
          </p>
        )}
        {isValid === false && (
          <p className="text-red-600">رقم بطاقة أئتمان غير صحيح</p>
        )}
      </div>
    </div>
  );
};

export default CardNumberInput;
