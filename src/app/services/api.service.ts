import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  gett<T = any>(url: string): Observable<T>{
    return this.http.get<T>(url)
  }

  postt(url: any, body: any){
    return this.http.post(url,body)
  }

  deletee(url: any){
    return this.http.delete(url)
  }
}
