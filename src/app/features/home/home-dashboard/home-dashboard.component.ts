import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
  host: {
    'class' : 'router-flex'
  }
})
export class HomeDashboardComponent implements OnInit {
  showSelection:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeDisplay(){
    this.showSelection = !this.showSelection
  }

}
