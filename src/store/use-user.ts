import { create } from 'zustand';

export type UserType = {
  id: number;
  fullName: string;
  initial: string;
  email: string;
  companyId: number;
  companyName: string;
};

interface UserState extends UserType {
  setUser: (user: UserType) => void;
}

const DEFAULT_USER: UserType = {
  id: 0,
  fullName: '',
  initial: '',
  email: '',
  companyId: 0,
  companyName: '',
};

const useUser = create<UserState>(set => ({
  ...DEFAULT_USER,
  setUser: user =>
    set({
      ...user,
    }),
}));

export default useUser;
