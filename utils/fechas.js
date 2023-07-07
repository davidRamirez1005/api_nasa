export const fechas = () => {
 const today = new Date().toISOString().split('T')[0];
 const endDate = new Date();
 endDate.setDate(endDate.getDate() + 1);
 const endDateFormatted = endDate.toISOString().split('T')[0];
 return { today, endDateFormatted };
};
