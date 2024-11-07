export const padLeft = (str: string | number, num: number = 2, fill = "0") =>
  String(str).padStart(num, fill);
