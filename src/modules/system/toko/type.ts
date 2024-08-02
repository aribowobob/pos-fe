export interface ICabangProps {
  namaCabang: string;
  alias: string;
}

export interface IAddCabangProps {
  title?: string;
  isBranchFormDisplayed: boolean;
  setIsBranchFormDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const cabangData: ICabangProps = {
  namaCabang: '',
  alias: '',
};
