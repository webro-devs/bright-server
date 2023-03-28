const IsSameDate = (date1: Date, date2: Date): boolean => {
  const date_1 = new Date(date1);
  const date_2 = new Date(date2);
  if (
    date_1.getFullYear() === date_2.getFullYear() &&
    date_1.getMonth() === date_2.getMonth() &&
    date_1.getDate() === date_2.getDate()
  ) {
    return true;
  } else {
    return false;
  }
};

export default IsSameDate;
