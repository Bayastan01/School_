export const phoneNumberValidator = p =>
  typeof p === 'string' && p.startsWith('+996') && p.length === 13;
