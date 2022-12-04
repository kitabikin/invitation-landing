export const reduceFeature = (data) => {
  return data.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {},
  );
};

export const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};
