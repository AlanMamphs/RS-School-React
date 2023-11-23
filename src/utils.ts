export const removeFalsyFromObject = (obj: object) =>
  Object.entries(obj).reduce((prev, [key, value]) => {
    if (value) {
      return { ...prev, [key]: value };
    }
    return prev;
  }, {});
