import { Component, OnInit } from '@angular/core';
import { Marker } from '@app/shared/interfaces';

@Component({
  selector: 'app-room-selector',
  templateUrl: './room-selector.component.html',
  styleUrls: ['./room-selector.component.scss'],
})
export class RoomSelectorComponent implements OnInit {
  markers: Marker[] = [
    { isPopoverVisible: false, name: 'nii3' },
    { isPopoverVisible: false, name: 'nii1' },
    { isPopoverVisible: false, name: 'ni5' },
  ];

  constructor() {}

  ngOnInit(): void {}

  redirectTo3D(index: number): void {
    this.markers[index].isPopoverVisible = false;
  }
}
