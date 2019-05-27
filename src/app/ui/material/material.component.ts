import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class MaterialComponent implements OnInit {
    themeClass: string;
    spotifyIcon = `
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title/>
            <g id="Spotify">
                <g data-name="&lt;Group&gt;" id="_Group_">
                    <circle cx="12" cy="12" data-name="&lt;Path&gt;" id="_Path_" r="11.5"
                            style="fill:none;stroke:#303c42;stroke-linecap:round;stroke-linejoin:round"/>
                    <path d="M5.5,15.5c3.42-.83,8.34-.72,11.5,1.5" data-name="&lt;Path&gt;" id="_Path_2"
                          style="fill:none;stroke:#303c42;stroke-linecap:round;stroke-linejoin:round"/>
                    <path d="M5,12c5.77-1,10-.53,13.5,2" data-name="&lt;Path&gt;" id="_Path_3"
                          style="fill:none;stroke:#303c42;stroke-linecap:round;stroke-linejoin:round"/>
                    <path d="M4.5,8.5C9.19,6.84,15.81,7.16,20,10" data-name="&lt;Path&gt;" id="_Path_4"
                          style="fill:none;stroke:#303c42;stroke-linecap:round;stroke-linejoin:round"/>
                </g>
            </g>
        </svg>
    `;

    constructor(private iconRegistry: MatIconRegistry,
                private sanitizer: DomSanitizer,
                private overlayContainer: OverlayContainer) {
        this.iconRegistry.addSvgIconLiteral(
            'spotify',
            this.sanitizer.bypassSecurityTrustHtml(this.spotifyIcon));
        this.overlayContainer.ngOnDestroy();
    }

    ngOnInit() {
    }
}
