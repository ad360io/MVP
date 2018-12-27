export const mapValues = (obj, fn) => {
  if (obj == null) {
    return null;
  }

  const ret = {};
  for (const k in obj) {
    ret[k] = fn(obj[k], k);
  }
  return ret;
};
