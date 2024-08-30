const THOUSAND_SEPARATOR = `.`;
const DECIMAL_SEPARATOR = `,`;

export function delimiter(val: number) {
  const valStr = val.toString();
  const delimitedInteger = valStr
    .replace(/\D/g, ``)
    .replace(/\B(?=(\d{3})+(?!\d))/g, THOUSAND_SEPARATOR);
  let result = delimitedInteger;

  if (valStr.indexOf(`.`) >= 0) {
    const decimal = valStr.substring(valStr.indexOf(`.`) + 1);

    result = `${delimitedInteger}${DECIMAL_SEPARATOR}${decimal}`;
  }

  return `${val < 0 ? `-` : ``}${result}`;
}

export function numberFormat(val: number) {
  const valToStr = val?.toString();
  const int = delimiter(parseInt(valToStr, 10) || 0);
  const absVal = Math.abs(val);
  const fraction = absVal - Math.floor(absVal);
  const fractionStr =
    fraction > 0
      ? fraction
          .toFixed(2) // Delimit only 2 digits based on PUEBI
          .slice(1)
          .replace(`.`, DECIMAL_SEPARATOR)
      : ``;

  return `${int}${fractionStr}`;
}

export function money(val: number, currency = `Rp`) {
  const formattedVal = numberFormat(val);

  if (formattedVal.charAt(0) === `-`) {
    return formattedVal.replace(/^-/g, `-${currency}`);
  }

  return `${currency}${formattedVal}`;
}

export function parseNumber(val: string): number {
  return Number(val.replace(/,/g, ''));
}
