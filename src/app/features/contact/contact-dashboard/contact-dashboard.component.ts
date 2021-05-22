import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-dashboard',
  templateUrl: './contact-dashboard.component.html',
  styleUrls: ['./contact-dashboard.component.scss']
})
export class ContactDashboardComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullname: [null, [Validators.required]],
      email: [null, [Validators.required]],
      message: [null, [Validators.required]]
    });
  }

}
