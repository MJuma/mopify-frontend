import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
