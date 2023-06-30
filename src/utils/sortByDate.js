const parseCustomDate = (customDate) => {
  const regex = /(\d+) (\S+) в (\d+):(\d+)/;
  const [, day, month, hours, minutes] = customDate.match(regex);
  const monthNames = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  const monthIndex = monthNames.findIndex((name) => name === month) + 1;

  return {
    month: parseInt(monthIndex, 10),
    day: parseInt(day, 10),
    hours: parseInt(hours, 10),
    minutes: parseInt(minutes, 10)
  };
};

const sortByDate = (todos) => {
  const sortedTodos = [...todos].sort((a, b) => {
    const dateA = parseCustomDate(a.date);
    const dateB = parseCustomDate(b.date);

    if (dateA.month !== dateB.month) {
      return dateB.month - dateA.month;
    }
    if (dateA.day !== dateB.day) {
      return dateB.day - dateA.day;
    }
    if (dateA.hours !== dateB.hours) {
      return dateB.hours - dateA.hours;
    }
    return dateB.minutes - dateA.minutes;
  });
  return sortedTodos
};

export default sortByDate


// const regex = /(\d+) (\S+) в (\d+):(\d+)/;
// (\d+) одна или более цифр (день)
// (\S+) один или более символов, не пробел (месяц)
// (\d+) одна или более цифр (часы)
// (\d+) одна или более цифр (минуты)

// const result = customDate.match(regex); -> ['10 июня в 12:30', '10', 'июня', '12', '30']
// const [day, month, hours, minutes] = result;
// console.log(day, month, hours, minutes);
// -> '10 июня в 12:30' '10' 'июня' '12' '30'
