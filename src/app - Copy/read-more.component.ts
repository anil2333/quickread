import { Component, Input, ElementRef, OnChanges, ViewChild, AfterViewInit} from '@angular/core';
import { SummaryComponent } from './summary/summary.component';
@Component({    
    selector: 'read-more',
    template: `<div #mailDiv [innerHTML]="currentText | safeHtml" [style.font-size.px]="font" [className]="isCollapsed ? 'showhighlight' : ''"><p></p></div><div class="show-more" [class.hidden]="hideToggle" (click)="toggleView()">
    <button class="readon">Read {{isCollapsed? 'more':'less'}}</button>
</div>`
    
})

export class ReadMoreComponent implements AfterViewInit {
    @Input() fulltext: string;
    @Input() newText: string;
    @Input() maxLength: number = 100;
    @Input() font: number;
    currentText: string;
    hideToggle: boolean = true;
    @ViewChild('mailDiv',{static: false}) mailDiv: ElementRef;

    public isCollapsed: boolean = true;

    constructor(private elementRef: ElementRef) {
       
    }
    ngOnInit(){
        this.determineView(); 
    }
    ngAfterViewInit() {
        this.determineView(); 
    }

    toggleView() {
        this.isCollapsed = !this.isCollapsed;
        this.determineView();
    }

    determineView() {
        if (!this.fulltext || this.fulltext.length <= this.maxLength) {
            this.currentText = this.fulltext;
            this.isCollapsed = false;
            this.hideToggle = true;
            return;
        }
        this.hideToggle = false;
        if (this.isCollapsed == true) {
            this.currentText = this.fulltext.substring(0, this.maxLength) + "...";
        } else if(this.isCollapsed == false)  {
            this.currentText = this.fulltext;
        }

    }
    ngOnChanges() {
        /*var list;
        if(this.font){
            list = this.mailDiv.nativeElement.querySelectorAll('p,span');
            for (var i = 0; i < list.length; ++i) {
            list[i].style.fontSize=this.font+"px";
            }
        }*/
             
    }
}