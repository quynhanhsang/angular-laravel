import { Directive, Renderer2, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appHideScrollbarY]'
})
export class HideScrollbarYDirective {
  constructor(private renderer: Renderer2, private element: ElementRef,
              @Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(){
   this.renderer.setStyle(this.document.body, 'overflow-y', 'hidden');  
  }
  ngOnDestroy(){
    this.renderer.removeStyle(this.document.body, 'overflow-y');
  }
}