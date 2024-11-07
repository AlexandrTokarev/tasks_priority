import { padLeft } from "./padLeft";

export const formatDate = (date: Date | string, format: string = 'DD.MM.YYYY, hh:mm') => {
  const d = new Date(date);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const time: any = {
    YY: padLeft(d.getFullYear()).substring(2, 4),
    YYYY: padLeft(d.getFullYear()),
    MM: padLeft(d.getMonth() + 1),
    DD: padLeft(d.getDate()),
    hh: padLeft(d.getHours()),
    mm: padLeft(d.getMinutes()),
    ss: padLeft(d.getSeconds()),
    M: padLeft(d.getMilliseconds(), 3),
  };

  return format.replace(
    new RegExp(`${Object.keys(time).join("|")}`, "g"),
    (subStr: string) => {
      return time[subStr] || "";
    }
  );
}