const addDateSuffix = (date) => {
    const lastDigit = date % 10;
    let suffix = 'th';
  
    if (date < 10 || date > 20) {
      if (lastDigit === 1) {
        suffix = 'st';
      } else if (lastDigit === 2) {
        suffix = 'nd';
      } else if (lastDigit === 3) {
        suffix = 'rd';
      }
    }
  
    return `${date}${suffix}`;
  };
  const formatMonth = (month, monthLength) => {
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    return monthLength === 'short' ? monthNames[month].substr(0, 3) : monthNames[month];
  };
  const formatTimestamp = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
    const dateObj = new Date(timestamp);
    const formattedMonth = formatMonth(dateObj.getMonth(), monthLength);
    const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
    const year = dateObj.getFullYear();
  
    let hour = dateObj.getHours();
    const periodOfDay = hour >= 12 ? 'pm' : 'am';
    hour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
  
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    return formattedTimeStamp;
  };
  // export the functions
  module.exports = formatTimestamp