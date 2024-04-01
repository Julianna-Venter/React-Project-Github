export const chartSetting = {
  xAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  width: 500,
  height: 400,
};

export const valueFormatter = (value: number | null) => `${value}mm`;
