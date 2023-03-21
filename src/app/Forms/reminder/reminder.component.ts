import { Component } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Reminder } from '../reminder';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent {

  formulario: FormGroup;
  listaLembretes: Reminder[] = [];

  constructor(private fb: FormBuilder,
              private serviceReminder: ReminderService
              ) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      data: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.iniciaListaLembretes();
  }

  iniciaListaLembretes(){
    this.serviceReminder.getReminders().subscribe((response)=>{
      this.listaLembretes = response;
      console.log(this.listaLembretes);
    })
  }
}

const dataReatroativa = (formGroup: AbstractControl): ValidationErrors | null  => {
   // Etapa 1
   const dataInicial = new Date();
   const valorDataFinal = formGroup.get('data')?.value;


   const dataFinal = new Date(valorDataFinal);

   // Etapa 3
   const diferencaEmDias =
       (dataFinal.getTime() - dataInicial.getTime())
       / (1000 * 60 * 60 * 24);

   // Etapa 4
   return diferencaEmDias < 0
       ? {
               intervaloData: {
                   atual: diferencaEmDias,
                   min: 7
               }
       }
       : null;

}
