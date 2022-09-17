export const dateInPast = function (firstDate: string, secondDate: string) {
  if (
    new Date(firstDate).setHours(0, 0, 0, 0) <
    new Date(secondDate).setHours(0, 0, 0, 0)
  ) {
    return true;
  }

  return false;
};
