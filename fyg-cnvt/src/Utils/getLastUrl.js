import { safeParse } from "./safeParse";

export default function getLastUrl ( string ) {
    const url = safeParse( string , [string] );
    return url[url.length -1]
};