export const reduceFeature = (data) => {
  return data.reduce(
    (obj, item) => Object.assign(obj, { [item.code]: item }),
    {},
  );
};
