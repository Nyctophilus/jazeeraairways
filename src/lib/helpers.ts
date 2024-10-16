export function validateSAID(id: any) {
  let type = id.substr(0, 1);
  let sum = 0;
  const _idLength = 10;
  const _type1 = "1";
  const _type2 = "2";
  id = id.trim();
  if (
    isNaN(parseInt(id)) ||
    id.length !== _idLength ||
    (type !== _type2 && type !== _type1)
  ) {
    return -1;
  }
  for (let num = 0; num < 10; num++) {
    const digit = Number(id[num]);
    if (num % 2 === 0) {
      const doubled = digit * 2;
      const ZFOdd = `00${doubled}`.slice(-2);
      sum += Number(ZFOdd[0]) + Number(ZFOdd[1]);
    } else {
      sum += digit;
    }
  }
  return sum % 10 !== 0 ? -1 : type;
}

export function validateLanguage(input: any) {
  // Regular expressions to match Arabic and English characters
  const arabicRegex = /^[\u0600-\u06FF]+$/;
  const englishRegex = /^[a-zA-Z\s]*$/;
  let char;

  for (let i = 0; i < input.length; i++) {
    char = input.charAt(i);

    if (arabicRegex.test(char)) {
      return "ar";
    }

    if (englishRegex.test(char)) {
      return "en";
    }
  }

  return "Unknown";
}

export function maskPhoneNumber(phoneNumber: string) {
  // Remove non-digit characters from the phone number
  const digitsOnly = phoneNumber?.replace(/\D/g, "");
  let maskedDigits, firstFourDigits, lastFourDigits;

  // Check if the phone number has at least four digits
  if (digitsOnly?.length >= 4) {
    firstFourDigits = digitsOnly.slice(0, 4);
    maskedDigits = "*".repeat(digitsOnly.length - 8);
    lastFourDigits = digitsOnly.slice(-4);
    return firstFourDigits + maskedDigits + lastFourDigits;
  }

  // If the phone number has less than four digits, return it as is
  return phoneNumber;
}

export function validateCardnumber(inputtxt: any) {
  const cardno = /^(?:3[47][0-9]{13})$/;
  if (inputtxt.value.match(cardno)) {
    return true;
  } else {
    alert("Not a valid Amercican Express credit card number!");
    return false;
  }
}

export function validatePhoneSAnumber(No: any) {
  const saNoRegex = /^(?:\+?966|0)?(?:\d{9})$/;
  return saNoRegex.test(No);
}

export function validateIBAN(No: string) {
  const ibanRegex = /^\d{2}[A-Z\d]{14}$/;
  const next4digitsRegex = /^\d{4}./;
  const maxLengthRegex = /^\d{16}$/;

  const isValid = ibanRegex.test(No);
  const nextDigitsVaild = next4digitsRegex.test(No);
  const maxLengthVaild = maxLengthRegex.test(No);

  return {
    isValid,
    nextDigitsVaild,
    maxLengthVaild,
  };
}

export function validateNumericInput(value: any) {
  value = value.replace(/\D/g, ""); // Replace non-digit characters with an empty string
  return value;
}

export const absLenght = (value: any): number =>
  value
    .split("")
    .map((item: any) => parseInt(item))
    .filter((item: any) => !isNaN(item)).length;

export function replaceFalsyValues(obj: { [key: string]: any }) {
  for (let key in obj) {
    if (obj[key] && typeof obj[key] === "object") {
      replaceFalsyValues(obj[key]);
    } else if (!obj[key]) {
      obj[key] = "error";
    }
  }
  return obj;
}
