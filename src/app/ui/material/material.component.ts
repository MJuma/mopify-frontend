import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from '../../store/application/application.state';
import * as fromMaterialReducer from './store/material/material.reducer';

@Component({
    selector: 'app-material',
    templateUrl: './material.component.html',
    styleUrls: ['./material.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class MaterialComponent implements OnInit {
    public theme$: Observable<string>;

    constructor(private store: Store<ApplicationState>,
                private iconRegistry: MatIconRegistry,
                private sanitizer: DomSanitizer) {
        const spotifySvgUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/spotify.svg');
        this.iconRegistry.addSvgIcon('spotify', spotifySvgUrl);
    }

    ngOnInit() {
        this.theme$ = this.store.select(fromMaterialReducer.selectTheme);
    }
}
