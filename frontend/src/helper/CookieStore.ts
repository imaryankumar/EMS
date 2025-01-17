import Cookies from "js-cookie"

export const StoreCookies = (tokenName:any ,token:any)=>{
   Cookies.set(tokenName,token)
}

export const GetCookies =  (tokenName:string)  => {
    return Cookies.get(tokenName)
}