import { Component } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent {

  formulario = new FormGroup({
    data: new FormControl(),
    nome: new FormControl()
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      data: ['', Validators.required]
    });
  }
}
