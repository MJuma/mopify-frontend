import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicNavComponent } from './music-nav.component';

describe('MusicNavComponent', () => {
    let component: MusicNavComponent;
    let fixture: ComponentFixture<MusicNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MusicNavComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MusicNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
