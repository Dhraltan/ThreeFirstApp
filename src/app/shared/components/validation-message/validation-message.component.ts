import { Component, Input, OnInit } from '@angular/core';
import { auth_messages } from './auth.message';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input() control: any = null;
  @Input() controlName = "";

  validationMessages = auth_messages;

  ngOnInit() {}

}
