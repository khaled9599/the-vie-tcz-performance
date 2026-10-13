export const ACCOUNT:string;export const OWNER_EMAIL:string;export const BASE:string[];export const METRICS:Record<string,[string,string]>;
export function isVie(name:string):boolean;
export function period(start:any,end:any):{start:string,end:string};
export function scopeKey(p:any):string;
export function emptyConfig():any;
export function rates(v:any):any;
export function validateConfig(input:any,campaigns:any[]):any;
export function compose(source:any,config:any,p:any,selection?:string):any;
export function csv(report:any):string;
