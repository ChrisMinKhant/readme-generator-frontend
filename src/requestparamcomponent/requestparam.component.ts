import { Component, Input } from "@angular/core";

@Component({
    selector:"request-param-form",
    standalone:true,
    templateUrl:"./requestparam.component.html",
    styleUrl:"./requestparam.component.css",
})

export class RequestParamComponent{
    @Input() requestParamCount:number = 0;
}