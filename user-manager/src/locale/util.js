import { zh_CN } from './zh_CN';


export function formatMessage(k) {
    if(zh_CN[k] === undefined) {
        return k
    }else if(zh_CN[k].startsWith("@")) {
        const str = zh_CN[k].slice(1)
        return zh_CN[str]
    }
    return zh_CN[k]
}