import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
export function InputOTPControlled({ value, setValue, id }: any) {
  return (
    <section dir="ltr" className="space-y-2 mx-auto">
      <InputOTP
        name={id}
        id={id}
        maxLength={4}
        value={value}
        onChange={(inpV) => setValue(inpV)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
    </section>
  );
}
