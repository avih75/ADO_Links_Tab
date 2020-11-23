import { tab } from "VSS/Utils/String";
import { GetValue, Href, Hrefs, SetValue } from "./StorageHelper";
let LinkList: Hrefs;

function RemoveFromList(name: string) {
    let newList: Array<Href> = new Array<Href>();
    LinkList.Links.forEach(link => {
        if (link.linkName != name) {
            newList.push(link);
        }
    });
    LinkList.Links = newList;
    SetValue("BI", LinkList);
}
function AddLink(Href: Href) {
    let table = $("#table");
    let tr = $("<tr />");
    let buttont = $("<button />").text("X");
    buttont.click(() => {
        tr.remove();
        RemoveFromList(Href.linkName)
    })
    let radio = $("<input />").attr("type", "radio").attr("name", "default").attr("value", Href.Link);
    if (Href.Link == LinkList.DefaulfLink) {
        radio.attr("checked", "checked"); 
    }
    let td1 = $("<td />").append(buttont);
    let td2 = $("<td />").append(radio);
    let td3 = $("<td />").text(Href.linkName);
    let td4 = $("<td />").text(Href.Link);
    tr.append(td1);
    tr.append(td2);
    tr.append(td3);
    tr.append(td4);
    tr.css("margin-top", "5px");
    table.append(tr);
    $('input[type=radio][name=default]').change(function () {
        LinkList.DefaulfLink = this.value;
        SetValue("BI", LinkList);
    });
}
function Init_Page() {
    $("#AddButton").click(() => {
        let href: Href = { Link: $("#Link").val(), linkName: $("#Name").val() };
        LinkList.Links.push(href);
        SetValue("BI", LinkList);
        AddLink(href);
        $("#Link").val("");
        $("#Name").val("");
    });
    $("#CancleDefault").click(() => {
        $('input[type=radio][name=default]').removeAttr("checked");
        LinkList.DefaulfLink="";
        SetValue("BI", LinkList);
    })
    // on group of radio ... set the default
    try {
        GetValue("BI").then((HrefList: Hrefs) => {
            if (HrefList && HrefList.Links.length > 0)
                LinkList = HrefList;
            else {
                LinkList = new Hrefs;
                SetValue("BI", LinkList);
            }
            HrefList.Links.forEach(Href => {
                AddLink(Href);
            });
        })
    }
    catch (ex) {
        LinkList = new Hrefs;
    }
}
VSS.register(VSS.getContribution().id, Init_Page);
Init_Page();