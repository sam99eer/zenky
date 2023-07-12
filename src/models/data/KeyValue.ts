export interface IKeyValue {
    key: string;
    value: string;
}
export interface IKeyValueRegex extends IKeyValue {
    regex: RegExp;
}
