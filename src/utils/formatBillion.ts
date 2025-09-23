// @ts-ignore
import cFunctions from '@coin98/common';

const formatBillion = (labelValue: number, mssa = 2, isAmount = false) => {
  // Nine Zeroes for Billions
  let mantissa = mssa;
  if (mssa === 0) {
    mantissa = 2;
  }

  if (isAmount) {
    const numFormat = cFunctions.formatNumberBro(labelValue, mantissa);
    return numFormat === 'N/A' ? '' : numFormat;
  }

  const numFormat =
    Math.abs(Number(labelValue)) > 999 * 1.0e15
      ? '>999Q'
      : Math.abs(Number(labelValue)) >= 1.0e15
        ? cFunctions.formatNumberBro(
            Math.abs(Number(labelValue)) / 1.0e15,
            mantissa
          ) + 'Q'
        : Math.abs(Number(labelValue)) >= 1.0e12
          ? cFunctions.formatNumberBro(
              Math.abs(Number(labelValue)) / 1.0e12,
              mantissa
            ) + 'T'
          : Math.abs(Number(labelValue)) >= 1.0e9
            ? cFunctions.formatNumberBro(
                Math.abs(Number(labelValue)) / 1.0e9,
                mantissa
              ) + 'B'
            : // Six Zeroes for Millions
              Math.abs(Number(labelValue)) >= 1.0e6
              ? cFunctions.formatNumberBro(
                  Math.abs(Number(labelValue)) / 1.0e6,
                  mantissa
                ) + 'M'
              : // Three Zeroes for Thousands
                // ko hieu viet cho nay
                Math.abs(Number(labelValue)) >= 1.0e3
                ? cFunctions.formatNumberBro(
                    Math.abs(Number(labelValue)) / 1.0e3,
                    mantissa
                  ) + 'K'
                : cFunctions.formatNumberBro(labelValue, mantissa);

  return numFormat === 'N/A' ? '' : numFormat;
};

export default formatBillion;
