function getTelephoneNumber(): string {
  if (
    typeof process.env.NEXT_PUBLIC_TELEPHONE_NUMBER === "string" &&
    process.env.NEXT_PUBLIC_TELEPHONE_NUMBER.length > 0
  ) {
    return process.env.NEXT_PUBLIC_TELEPHONE_NUMBER;
  }
  return "+19028176735";
}

console.assert(
  getTelephoneNumber().startsWith("+"),
  "Expected phone number to start with + sign",
);

export function getPhoneTelHref(): `tel:${string}` {
  return `tel:${getTelephoneNumber()}`;
}

export function getFormattedPhoneNumber(): string {
  const phoneNumber = getTelephoneNumber();
  const countryCode = phoneNumber.substring(0, 2);
  const areaCode = phoneNumber.substring(2, 5);
  const localNumber = phoneNumber.substring(5);
  const localNumberPart1 = localNumber.substring(0, 3);
  const localNumberPart2 = localNumber.substring(3);

  const formattedPhoneNumber = `${countryCode} (${areaCode}) ${localNumberPart1}-${localNumberPart2}`;
  return formattedPhoneNumber;
}
