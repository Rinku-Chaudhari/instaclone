import timeDifference from "datetime-difference";

const timeCalculator = (dateToConvert, short_form) => {
  const currentDate = new Date();
  let result = "";
  const diff = timeDifference(currentDate, new Date(dateToConvert));

  if (diff.days === 0 && diff.hours === 0) {
    result = short_form
      ? diff.minutes + "m"
      : diff.minutes === 1
      ? diff.minutes + " minute ago"
      : diff.minutes + " minutes ago";
  } else if (diff.days === 0 && diff.hours !== 0) {
    result = short_form
      ? diff.hours + "h"
      : diff.hours === 1
      ? diff.hours + " hour ago"
      : diff.hours + " hours ago";
  } else {
    result = short_form
      ? diff.days + "d"
      : diff.days === 1
      ? diff.days + " day ago"
      : diff.days + " days ago";
  }
  return diff.days <= 7 ? result : dateToConvert.slice(0, 10);
};

export default timeCalculator;
