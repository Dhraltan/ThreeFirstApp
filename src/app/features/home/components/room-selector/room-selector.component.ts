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
    { isPopoverVisible: false, name: 'nii3', url: URLS.NII3 },
    { isPopoverVisible: false, name: 'nii2', url: URLS.NII2 },
    { isPopoverVisible: false, name: 'nii8', url: URLS.NII8 },
  ];

  @Input() displayMarkers: boolean;

  constructor(private router:Router) {}

  ngOnInit(): void {}

  redirectTo3D(index: number): void {
    this.router.navigateByUrl(this.markers[index].url);
    this.markers[index].isPopoverVisible = false;
  }
}
