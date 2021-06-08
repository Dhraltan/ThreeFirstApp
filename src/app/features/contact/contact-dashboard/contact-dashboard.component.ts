import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '@app/core/api/contact.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-contact-dashboard',
  templateUrl: './contact-dashboard.component.html',
  styleUrls: ['./contact-dashboard.component.scss'],
})
export class ContactDashboardComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.buildContactForm();
  }

  buildContactForm() {
    this.contactForm = this.fb.group({
      fullname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      subject: [null, [Validators.required]],
      text: [null, [Validators.required, Validators.minLength(100)]],
    });
  }

  sendMail() {
    if (!this.contactForm.valid) return;
    this.contactService
      .sendEmail({
        fullname: this.contactForm.get('fullname').value,
        email: this.contactForm.get('email').value,
        subject: this.contactForm.get('subject').value,
        text: this.contactForm.get('text').value,
      })
      .subscribe(
        (res) => {
          this.notification.success('Success', 'An email was sent',{ nzClass: 'success-notification' });
        },
        (err) => {
          this.notification.error('Failed', err.message, {
          nzClass: 'error-notification',
        });
        }
      );
  }
}
