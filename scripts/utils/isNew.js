export const isNew = () => {
  if (GUESSED === CACHED) return false;
  else {
    CACHED = GUESSED;
    return true;
  }
};
