export function getMondayAndFridayDates(): any {
  const today = new Date();

  // Calculate the day of the week (0 = Sunday, 1 = Monday, ...)
  const dayOfWeek = today.getDay();

  // Calculate the difference between today and the previous Monday
  const daysSinceMonday = (dayOfWeek + 6) % 7;

  // Subtract the days since Monday to get the Monday date, setting time to 00:00:00
  const mondayDate = new Date(today);
  mondayDate.setDate(today.getDate() - daysSinceMonday);
  mondayDate.setHours(0, 0, 0, 0);

  // Add 4 days to Monday to get the Friday date, setting time to 23:59:59
  const fridayDate = new Date(mondayDate);
  fridayDate.setDate(mondayDate.getDate() + 4);
  fridayDate.setHours(23, 59, 59, 999);

  return { monday: mondayDate, friday: fridayDate };
}
