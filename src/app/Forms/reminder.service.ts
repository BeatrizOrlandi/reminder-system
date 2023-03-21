import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:4200';
@Injectable({
  providedIn: 'root'
})

export class ReminderService {

  constructor(private http: HttpClient) { }
}
