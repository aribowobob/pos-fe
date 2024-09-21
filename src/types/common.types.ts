export interface BaseResponseType<T> {
  code: number;
  message: string;
  data: null | T;
  error: null | string;
}

export type Option = {
  value: string | number;
  label: string;
};
