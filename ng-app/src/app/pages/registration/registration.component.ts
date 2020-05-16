import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'src/app/interfaces';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  modalRef: BsModalRef
  registration: User;
  error: string;

  constructor(
    private users: UsersService,
    private modal: BsModalService,
    private router: Router
  ) {
    this.registration = {
      email: undefined,
      password: undefined
    };
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm, template: TemplateRef<any>) {
    if (form.valid) {
      this.users.register(this.registration)
        .subscribe(user => {
          this.modalRef = this.modal.show(template, {class: 'modal-sm'});
        }, response => {
          this.error = response.error && response.error.toLowerCase().indexOf('duplicate') >= 0 ? 'Email already registered' : 'Internal Server Error';
        });
    }
  }

  ok() {
    this.modalRef.hide();
    this.router.navigateByUrl('/login');
  }
}
