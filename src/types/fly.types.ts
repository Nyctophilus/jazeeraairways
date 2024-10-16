import { LucideIcon } from "lucide-react";
import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export type FormHooks = {
  register: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>;
  options?: RegisterOptions;
  errors: FieldErrors;
};

export interface CustomInputProps extends FormHooks {
  label: string;
  id: string;
  type?: string;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
}

export interface CustomSelectProps extends CustomInputProps {
  sels: {
    name: string;
    code?: string;
    icon?: any;
  }[];
}

export interface flyProps extends CustomSelectProps {
  placeholder?: string;
  Icon?: LucideIcon;
}

export interface InfoProps extends FormHooks {
  index: number;
  isAdult?: boolean;
  isChild?: boolean;
}
