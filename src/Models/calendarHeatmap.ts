const currentDate = new Date();
export let until = currentDate.toISOString().substring(0, 10);

export const panelAttributes = { rx: 3, ry: 3 };
export let weekLabelAttributes = {
  rotate: 0,
};
export let monthLabelAttributes = {
  style: {
    textDecoration: "none",
    fontSize: 10,
    alignmentBaseline: "central",
    fill: "#AAA",
  },
};

export let panelColors = [
  "#DDD",
  "#7fb1eb",
  "#5a9ae5",
  "#3584df",
  "#206fca",
  "#1a5ba5",
  "#144680",
  "#0f325c",
  "#091e37",
];
