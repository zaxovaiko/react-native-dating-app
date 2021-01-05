// Gets age calculated from date
export function getAgeFromDate(date) {
  try {
    return Math.abs(
      new Date(Date.now() - date.getTime()).getUTCFullYear() - 1970,
    );
  } catch (err) {
    throw new Error('Invalid date');
  }
}
