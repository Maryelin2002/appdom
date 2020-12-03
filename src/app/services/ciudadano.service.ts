import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ciudadano} from '../models/ciudadano';

@Injectable({
  providedIn: 'root'
})
export class CiudadanoService {

  baseURL = environment.apiURL + 'cedula/';
  
  constructor(private http: HttpClient) { }


  getCiudadano(id: string): Observable<Ciudadano>{
    const url = this.baseURL + id;
    return this.http.get<Ciudadano>(url);
  }
}
