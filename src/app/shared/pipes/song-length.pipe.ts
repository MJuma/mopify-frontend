import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'songLength',
})
export class SongLengthPipe implements PipeTransform {
    transform(milliseconds: number): string {
        const minutes: number = Math.floor(milliseconds / 60000);
        const seconds: number = +Math.floor((milliseconds % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds}${seconds < 10 ? '0' : ''}`;
    }
}
