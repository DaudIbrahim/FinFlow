export const formatDateForInput = (date: Date): string => {
  const isoString = date.toISOString();
  return isoString.split("T")[0];
};

export const formatBDT = (value: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);
