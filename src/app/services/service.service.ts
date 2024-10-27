import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http: HttpClient) { }
  addDrinks(data: any): Observable<any>{
    return this._http.post('http://127.0.0.1:8000/drinks/', data);
  }
  updateDrinks(id: number, data: any): Observable<any>{
    return this._http.put(`http://127.0.0.1:8000/drinks/${id}`, data);
  }
  getDrinksList(): Observable<any>{
    return this._http.get('http://127.0.0.1:8000/drinks/');
  }
  deleteDrink(id:number): Observable<any>{
    return this._http.delete(`http://127.0.0.1:8000/drinks/${id}`)
  }
}
