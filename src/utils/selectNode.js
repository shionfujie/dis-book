export const selectNode = node => {
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(createSelection(node));
};

const createSelection = node => {
  const range = document.createRange();
  range.setStart(node, 1);
  range.collapse(true);
  return range;
};
