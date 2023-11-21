export const calculateTimeDiff = (date: Date) => {
  const parseDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - parseDate.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  if (minutesDifference < 60) {
    return `${minutesDifference}분`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference}시간`;
  } else {
    const daysDifference = Math.floor(hoursDifference / 24);
    return `${daysDifference}일`;
  }
};
