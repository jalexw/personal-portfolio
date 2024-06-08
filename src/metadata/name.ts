export const firstName = "James" as const;
export const middleName = "Alexander" as const;
export const lastName = "Whitman" as const;
export const nickName = middleName.slice(0, 4)

export const abbreviatedFullName = `${firstName[0]}. ${nickName} ${lastName}` as const;
export const fullName: `${typeof firstName} ${typeof middleName} ${typeof lastName}` = `${firstName} ${middleName} ${lastName}`;
export const username: string = "jalexw";
