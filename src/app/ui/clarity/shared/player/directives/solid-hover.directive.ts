import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appSolidHover]',
})
export class SolidHoverDirective {
    @HostBinding('class.is-solid') isSolid: boolean;

    @HostListener('mouseenter') onMouseEnter() {
        this.isSolid = true;
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.isSolid = false;
    }
}
