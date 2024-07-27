import { atom } from "jotai";
import { IProduct, IAuth, ISession } from "@/types";

export const authAtom = atom<IAuth>({
  jwt: null,
  isAdmin: false,
});

export const productsAtom = atom<IProduct[]>([]);

export const sessionAtom = atom<ISession>({
  hasMore: true,
  loading: false,
  page: 1,
});
