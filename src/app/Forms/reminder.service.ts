import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Reminder } from './reminder';

const API_URL = 'http://localhost:3000/lembretes';
@Injectable({
  providedIn: 'root'
})

export class ReminderService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os lembretes
  getReminders(): Observable<Reminder[]> {
    return this.httpClient.get<Reminder[]>(API_URL)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um lembrete pelo id
  getReminderById(id: number): Observable<Reminder> {
    return this.httpClient.get<Reminder>(API_URL + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um lembrete
  saveReminder(Reminder: Reminder): Observable<Reminder> {
    return this.httpClient.post<Reminder>(API_URL, JSON.stringify(Reminder), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Lembrete
  updateReminder(Reminder: Reminder): Observable<Reminder> {
    return this.httpClient.put<Reminder>(API_URL + '/' + Reminder.id, JSON.stringify(Reminder), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Lembrete
  deleteReminder(Reminder: Reminder) {
    return this.httpClient.delete<Reminder>(API_URL + '/' + Reminder.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
