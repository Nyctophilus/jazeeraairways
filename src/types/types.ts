import { FormHooks } from "./fly.types";

export type cardDate = {
  moth: string;
  year: string;
};

export interface DateProps extends FormHooks {
  className?: string;
  id: string;
  label: string;
  defaultValue?: any;
}

export type InputProps = {
  leaveFieldCallback?: Function;
  focus: boolean;
  tabIndex: number;
  setShownError: Function;
};

export type Props = {
  children: React.ReactNode;
};

export type SetValue = (value: any) => void;

export interface USERINFO {
  asn: string;
  city: string;
  continent_code: string;
  country: string;
  country_area: number;
  country_calling_code: string;
  country_capital: string;
  country_code: string;
  country_code_iso3: string;
  country_name: string;
  country_population: number;
  country_tld: string;
  currency: string;
  currency_name: string;
  in_eu: false;
  ip: string;
  languages: string;
  latitude: number;
  longitude: number;
  network: string;
  org: string;
  postal: null;
  region: string;
  region_code: string;
  timezone: string;
  utc_offset: string;
  version: string;
}
export interface Message {
  content: string;
  date: string;
  id: string;
  userId?: string;
}
