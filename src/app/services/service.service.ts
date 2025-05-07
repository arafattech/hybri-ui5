import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  odata:boolean=true;
  api:boolean=false;


  private odataUrl=environment.ServerApi + "/odata/user";
 

  constructor(private http:HttpClient) { }

 

 /**
   * Generic GET request
   * @param url Endpoint URL
   * @param isLodata Use Lodata prefix
   * @param params Optional query parameters
   * @param headers Optional custom headers
   */
 getUser<T>(
  url: string,
  isLodata: boolean = true,
  params: HttpParams = new HttpParams(),
  headers: HttpHeaders = new HttpHeaders({ 'Cache-Control': 'no-cache' })
): Observable<T> {
  const urlPrefix = this.odataUrl;
  const modifiedUrl = `${urlPrefix}/${url}`;
  return this.http.get<T>(modifiedUrl, { headers, params });
}
}
