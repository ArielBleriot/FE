import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityDto } from '../modules/dashboard/activity.dto';
import { ProjectDto } from '../modules/student-projects/project.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.bridgertu.com/api/';  // Backend API endpoint
  //private apiUrl = 'http://108.181.190.150:8008/api/';  // Backend API endpoint
  //private apiUrl='http://localhost:5222/api/'
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'student/login', { email, password });
  }
  signup(formData: any): Observable<any> {
    return this.http.post(this.apiUrl+'student/signup', formData);
  }
  getAllActivities(): Observable<ActivityDto[]> {
    const authToken = localStorage.getItem('AuthToken'); // Replace with actual storage method

 
    // Set up the headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,  // Format the token with "Bearer "
      'Content-Type': 'application/json'   // Adjust content type if you're sending form data
    });
    return this.http.get<ActivityDto[]>(this.apiUrl+'activity',{headers:headers});
  }
  getRecommendedActivities(): Observable<ActivityDto[]> {
    const authToken = localStorage.getItem('AuthToken'); // Replace with actual storage method

 
    // Set up the headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,  // Format the token with "Bearer "
      'Content-Type': 'application/json'   // Adjust content type if you're sending form data
    });
    return this.http.get<ActivityDto[]>(this.apiUrl+'activity/GetRecommendedActivities',{headers:headers});
  }
  getAllProjects(): Observable<ProjectDto[]> {
    const authToken = localStorage.getItem('AuthToken'); // Replace with actual storage method

 
    // Set up the headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,  // Format the token with "Bearer "
      'Content-Type': 'application/json'   // Adjust content type if you're sending form data
    });

    return this.http.get<ProjectDto[]>(this.apiUrl+'Projects', { headers: headers });
  }
  getRecommendedProjects(): Observable<ProjectDto[]> {
    const authToken = localStorage.getItem('AuthToken'); // Replace with actual storage method

 
    // Set up the headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,  // Format the token with "Bearer "
      'Content-Type': 'application/json'   // Adjust content type if you're sending form data
    });

    return this.http.get<ProjectDto[]>(this.apiUrl+'Projects/GetRecommendedProjects', { headers: headers });
  }
  createProject(formData: any):Observable<any> {
    // Retrieve the auth token from local storage (or wherever it's stored)
    const authToken = localStorage.getItem('AuthToken'); // Replace with actual storage method

 
      // Set up the headers with the Authorization token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,  // Format the token with "Bearer "
        'Content-Type': 'application/json'   // Adjust content type if you're sending form data
      });

      // Send the POST request with the headers and form data
      return this.http.post(this.apiUrl + 'Projects', formData, { headers: headers });
   
  }
  addComment(formData: any):Observable<any> {
    // Retrieve the auth token from local storage (or wherever it's stored)
    const authToken = localStorage.getItem('AuthToken'); // Replace with actual storage method

 
      // Set up the headers with the Authorization token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,  // Format the token with "Bearer "
        'Content-Type': 'application/json'   // Adjust content type if you're sending form data
      });

      // Send the POST request with the headers and form data
      return this.http.post(this.apiUrl + 'Comment', formData, { headers: headers });
   
  }
  getFilteredActivities(formData: any):Observable<any> {
    // Retrieve the auth token from local storage (or wherever it's stored)
    const authToken = localStorage.getItem('AuthToken'); // Replace with actual storage method

 
      // Set up the headers with the Authorization token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`,  // Format the token with "Bearer "
        'Content-Type': 'application/json'   // Adjust content type if you're sending form data
      });

      // Send the POST request with the headers and form data
      return this.http.post(this.apiUrl + 'Activity/GetFilteredActivities', formData, { headers: headers });
   
  }
  getProfile(): Observable<any> {
    const authToken = localStorage.getItem('AuthToken'); // Replace with actual storage method

 
    // Set up the headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,  // Format the token with "Bearer "
      'Content-Type': 'application/json'   // Adjust content type if you're sending form data
    });

    return this.http.get<ProjectDto[]>(this.apiUrl+'Student/Profile', { headers: headers });
  }
  forgotPassword(email:string): Observable<any> {
    return this.http.post<any>(this.apiUrl+'student/forgot-password', { email });
  }
  resetPassword(request:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'student/reset-password', request);
  }
  registerForActivity(request:any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'student/ActivityRegistration', request);
  }

  getFilteredStudents(filters: any): Observable<any> {
    const authToken = localStorage.getItem('AuthToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.apiUrl + 'Student/search', filters, { headers: headers });
  }

  sendEmail(emailData: any): Observable<any> {
    const authToken = localStorage.getItem('AuthToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.apiUrl + 'Email/send', emailData, { headers: headers });
  }
}
