export const generateMonthDates = (year, month) => {
  const dates = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(Date.UTC(year, month, day));
    date.setUTCHours(0, 0, 0, 0);
    dates.push(date);
  }

  return dates;
};

export const isWeekend = (date) => {
  const day = date.getDay();
  return day === 6 || day === 0;
};
