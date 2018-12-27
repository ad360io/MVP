export const addRemove = (col) => {
  return (element) => {
    col.push(element);

    return () => remove1Mutate(col, element);
  }
}

export const remove1Mutate = (col, targetElem) => {
  if (col == null) {
    return;
  }

  let i = col.indexOf(targetElem);
  if (i === -1) {
    return;
  }
  col.splice(i, 1);
};
