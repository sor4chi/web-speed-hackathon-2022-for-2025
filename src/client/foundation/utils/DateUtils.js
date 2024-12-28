/**
 * @param {string} dateLeft
 * @param {string} dateRight
 * @returns {boolean}
 */
export const isSameDay = (dateLeft, dateRight) => {
  return (
    new Date(dateLeft).toDateString() === new Date(dateRight).toDateString()
  );
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTime = (ts) => {
  const date = new Date(ts);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};

/**
 *
 * @param {string} ts
 * @returns {string}
 */
export const formatTimeNullable = (ts) => (ts ? formatTime(ts) : "");

/**
 * @param {string} closeAt
 * @param {number | Date} now
 * @returns {string}
 */
export const formatCloseAt = (closeAt, now = new Date()) => {
  if (new Date(closeAt) < now) {
    return "投票締切";
  }

  if (new Date(closeAt) > new Date(now.getTime() + 2 * 60 * 60 * 1000)) {
    return "投票受付中";
  }

  return `締切${Math.floor((new Date(closeAt) - now) / (1000 * 60))}分前`;
};
