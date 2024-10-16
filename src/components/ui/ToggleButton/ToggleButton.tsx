import { cn } from "@/lib/utils";
import styles from "./ToggleButton.module.css";
import { FieldValues, UseFormRegister } from "react-hook-form";

const ToggleButton = ({
  id,
  text,
  register,
}: {
  id: string;
  text: string;
  register: UseFormRegister<FieldValues>;
}) => (
  <label
    htmlFor={id}
    className={cn(
      "border py-4 px-1 flex-1 flex flex-col items-center justify-between select-none gap-y-4",
      styles.checkbox_wrapper
    )}
  >
    <input id={id} type="checkbox" {...register(id)} />
    <label>
      <div className={styles.tick_mark}></div>
    </label>
    <img
      src={
        text === "كريس متحرك"
          ? "/assets/images/paralysis-disability.svg"
          : text === "الحوامل"
          ? "/assets/images/pregnant.svg"
          : text === "ضعيفي/فاقدي السمع"
          ? "/assets/images/hearing-disability.svg"
          : text === "ضعاف البصر"
          ? "/assets/images/blind.svg"
          : ""
      }
      alt="disability image"
      className="size-16"
    />
    <p className="text-main text-center">{text}</p>
  </label>
);

export default ToggleButton;
