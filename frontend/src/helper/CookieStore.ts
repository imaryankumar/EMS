import Cookies from "js-cookie";

export const StoreCookies = (tokenName: any, token: any) => {
  Cookies.set(tokenName, token, {
    expires: 1,
  });
};

export const GetCookies = (tokenName: string) => {
  return Cookies.get(tokenName);
};

export const RemoveCookies = (tokenName: string) => {
  Cookies.remove(tokenName);
};
