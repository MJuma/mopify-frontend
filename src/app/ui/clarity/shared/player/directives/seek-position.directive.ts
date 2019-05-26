import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Track } from '../../../../../shared/types/mopidy';

@Directive({
    selector: '[appSeekPosition]'
})
export class SeekPositionDirective {
    @Input() currentTrack: Track;

    @Output() seek = new EventEmitter<number>();

    constructor(private elementRef: ElementRef) {}

    @HostListener('mousedown', ['$event'])
    onMouseClick(mouseEvent: MouseEvent) {
        const progressElement: HTMLProgressElement = this.elementRef.nativeElement;

        const mouseOffset: number = mouseEvent.pageX - progressElement.offsetLeft;
        const mouseProgress: number = mouseOffset / progressElement.clientWidth;
        const newTrackPosition: number = Math.round(mouseProgress * (this.currentTrack.length || 0));

        this.seek.emit(newTrackPosition);
    }
}
