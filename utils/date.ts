/**
 * 
 * @param dateString дата в формате dd/mm/yyyy
 * @returns название дня недели
 */
export const getDayName = (dateString: string) => {
  const [day, month, year] = dateString.split(/[.\s:]/);
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const dayName = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' }).format(date);

  return dayName;
}
