import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Camera } from 'three';
import { UserService } from './core/api';
import { Router } from '@angular/router';
import { URLS } from './shared/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;

  constructor(private userService: UserService, private router:Router) {}

  ngOnInit() {
    // this.userService.getUserDetails().subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (error) => {
    //     this.router.navigate([URLS.LOGIN])
    //     console.error(error);
    //   }
    // );
  }
}
