/// <reference types="vss-web-extension-sdk" />

import { dataFor } from "knockout";

export class Href {
    linkName: string;
    Link: string;
}
export class Hrefs {
    constructor() {
        this.DefaulfLink = "";
        this.Links = new Array<Href>();
    }
    Links: Array<Href>;
    DefaulfLink: String;
}
export async function GetValue(key: string) {
    let dataService: any = await VSS.getService(VSS.ServiceIds.ExtensionData);
    let result: Hrefs = await dataService.getValue(key);
    return result;
}
export async function SetValue(key: string, value: Hrefs) {
    var deferred = $.Deferred();
    let dataService: any = await VSS.getService(VSS.ServiceIds.ExtensionData);
    let result = await dataService.setValue(key, value);
    deferred.resolve();
    return deferred;
}