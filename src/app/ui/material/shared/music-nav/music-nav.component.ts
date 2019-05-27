import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-music-nav',
  templateUrl: './music-nav.component.html',
  styleUrls: ['./music-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
