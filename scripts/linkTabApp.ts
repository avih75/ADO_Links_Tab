import { GetValue, Hrefs } from "./StorageHelper";

function Init_Page() {
    GetValue("BI").then((HrefList: Hrefs) => {
        let table = $("#table");
        HrefList.Links.forEach(Href => {
            //let tr = $("<tr />");
            //let spn1 = $("<span />").text(Href.linkName)
            //let td1 = $("<td />").append(spn1);
            //let a = $("<a />").attr("href", Href.Link).attr("target","_blank").text(Href.linkName).addClass("button");
            //let td2 = $("<td />").append(a);
            //tr.append(td1);
            //tr.append(td2);
            //tr.css("margin-top","5px");
            let button = $("<button />").text(Href.linkName).addClass("button").click(()=>{
                window.open(Href.Link.toString(), '_blank');
            })
            table.append(button);
        });
        if (HrefList.DefaulfLink != "") {
            window.open(HrefList.DefaulfLink.toString(), '_blank');
        }
    })
}
VSS.register(VSS.getContribution().id, Init_Page);
Init_Page();