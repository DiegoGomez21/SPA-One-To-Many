import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}/comments`);
  }

  createComment(id: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}/comments`, data);
  }
  
}
