/**
 * Truncates text to a specified length and adds ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const truncateWords = (text: string, limit: number) => {
  const words = text.split(" ");
  return words.length > limit ? `${words.slice(0, limit).join(" ")}...` : text;
};

/**
 * Formats a date string into a readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMS = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMS / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    // Today
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `Today at ${formattedHours}:${formattedMinutes} ${ampm}`;
  } else if (diffInDays === 1) {
    // Yesterday
    return "Yesterday";
  } else if (diffInDays < 7) {
    // Within a week
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  } else if (diffInDays < 365) {
    // Within a year
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  } else {
    // More than a year ago
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
};
