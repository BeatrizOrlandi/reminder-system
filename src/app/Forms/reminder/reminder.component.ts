import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Reminder } from '../reminder';
import { ReminderService } from '../reminder.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent {

  formulario: FormGroup;
  listaLembretes: Reminder[] = [];
  listaDatas: any[] = [];
  editando: boolean = false;

  constructor(private fb: FormBuilder,private serviceReminder: ReminderService) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      data: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.iniciaListaLembretes();
  }

  iniciaListaLembretes() {
    this.listaLembretes = [];
    this.listaDatas = [];
    this.editando = false;
    this.formulario.reset();
    this.serviceReminder.getReminders().subscribe((response) => {
      this.listaLembretes = response;
      this.atualizaDatasExistentes();
      console.log(this.listaLembretes);
    })
  }

  atualizaDatasExistentes() {
    this.listaLembretes.forEach((lembrete) => {
      let existe = false;
      this.listaDatas.forEach(data => {
        if (lembrete.data === data) {
          existe = true;
        }
      })
      if (!existe) {
        this.listaDatas.push(lembrete.data);
      }
    })
    this.listaDatas.sort((a: string, b: string) => {
      return Date.parse(a) - Date.parse(b);
    });
    console.log(this.listaDatas);
  }
  delete(reminder: Reminder) {
    this.serviceReminder.deleteReminder(reminder).subscribe((response) => {
      this.iniciaListaLembretes();
    }
    )
  }
  atualizar(reminder:Reminder){
    this.editando = true;
    reminder.data = formatDate(this.formulario.value.data, 'YYYY/MM/dd', 'en')
    this.formulario.get('data')?.setValue(reminder.data);
    this.formulario.get('nome')?.setValue(reminder.nome);
    this.formulario.get('id')?.setValue(reminder.id);
  }

  submit() {
    this.formulario.value.data = formatDate(this.formulario.value.data, 'YYYY/MM/dd', 'en');
    if(!this.editando){   
    if (!this.formulario.errors)
      this.serviceReminder.saveReminder(this.formulario.value).subscribe((response) => {
        this.iniciaListaLembretes();
      });
    }
    else{
      this.serviceReminder.updateReminder(this.formulario.value).subscribe((response)=>{
        this.iniciaListaLembretes();
      })
    }
    
  }

  dataRetroativa(): boolean{
    var agora = new Date();
    var escolhida = new Date(this.formulario.get('data')?.value);
  if (escolhida < agora ) return true;
  else return false;
  }
}

