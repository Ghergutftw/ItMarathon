import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/api/messages';

  constructor(private http: HttpClient) { }

  sendMessage(image: File, text: string , user: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('text', text);
    formData.append('user', user);

    return this.http.post(this.apiUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

  getMessage(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Utility method to create a download link for the image
  createImageUrl(imageData: string): string {
    return `data:image/png;base64,${imageData}`;
  }
}
