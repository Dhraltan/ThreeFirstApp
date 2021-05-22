import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLS } from '@app/shared/enum';
import { Marker } from '@app/shared/interfaces';

@Component({
  selector: 'app-room-selector',
  templateUrl: './room-selector.component.html',
  styleUrls: ['./room-selector.component.scss'],
})
export class RoomSelectorComponent implements OnInit {
  markers: Marker[] = [
    { isPopoverVisible: false, name: 'nii3', url: URLS.LUCIAN },
    { isPopoverVisible: false, name: 'nii1', url: URLS.GHIOZDAN },
    { isPopoverVisible: false, name: 'ni5', url: URLS.GHIOZDAN },
  ];

  @Input() displayMarkers: boolean;

  constructor(private router:Router) {}

  ngOnInit(): void {}

  redirectTo3D(index: number): void {
    this.router.navigateByUrl(this.markers[index].url);
    this.markers[index].isPopoverVisible = false;
  }
}
