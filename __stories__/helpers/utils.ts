export type Option = {
  readonly label: string;
  readonly value: string | number;
};

export const numberWithCommas = (value: number): string => {
  return value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const createSelectOptions = (optionCount: number): Option[] => {
  const tempOptions: Option[] = [];
  for (let i = 0; i < optionCount; i += 1) {
    tempOptions.push({
      value: i + 1,
      label: `Option ${i + 1}`,
    });
  }
  return tempOptions;
};