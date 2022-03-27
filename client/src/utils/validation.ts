export const isEmpty = (v: string) => {
  return !v && v.trim() === "";
}

export const isEmail = (e: string) => {
  return !isEmpty(e) && e.includes("@");
}

export const checkPassword = (p: string) => {
  return !isEmpty(p) && p.trim().length >= 6;
}