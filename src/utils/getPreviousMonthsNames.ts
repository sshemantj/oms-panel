export const getPreviousMonths = (num: number) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const currentMonth = today.getMonth() + 1;

  const previousMonths = [];

  for (let i = 1; i <= num; i++) {
    const monthIndex = (currentMonth - i + 12) % 12; // Calculate previous month index
    previousMonths.push(monthNames[monthIndex]);
  }

  return previousMonths.reverse();
};
