const boardSize = (level) => {
  let height = level === "3" || level === "2" ? 16 : 9;
  let width = level === "3" ? 30 : level === "2" ? 16 : 9;
  return [width, height];
};

export default boardSize;
