import { Time } from "@cantabile/date-helper";

export const shouldShowDailyStockReviewModal = (
  lastLoginString: string | null,
  lastReviewString: string | null
) => {
  const lastLogin = lastLoginString ? new Date(lastLoginString) : null;
  const lastReview = lastReviewString ? new Date(lastReviewString) : null;
  let timeToCheck: Date | null = null;
  if (lastLogin) {
    if (lastReview)
      timeToCheck = +lastLogin < +lastReview ? lastReview : lastLogin;
    else timeToCheck = lastLogin;
  }
  const now = new Date();
  const hour = 4;
  const minute = 0;
  const showLastReviewOn = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0
  );
  const oneDayLengthInMilliseconds = 8.64e7;
  const isTodayButNotYetShowTime = +now - +showLastReviewOn < 0;
  const lastShowShouldShownOn = isTodayButNotYetShowTime
    ? new Date(+showLastReviewOn - oneDayLengthInMilliseconds)
    : showLastReviewOn;
  return timeToCheck ? +timeToCheck < +lastShowShouldShownOn : false;
};
