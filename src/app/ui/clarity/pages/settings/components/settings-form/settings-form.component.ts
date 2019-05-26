import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsFormComponent implements OnChanges {
    public settingsForms: FormGroup = new FormGroup({
        webSocketUrl: new FormControl('', Validators.required),
    });

    @Input() webSocketUrl: string;

    @Output() updateUrl = new EventEmitter<string>();

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.webSocketUrl && this.webSocketUrl) {
            this.settingsForms.patchValue({webSocketUrl: this.webSocketUrl});
        }
    }
}
