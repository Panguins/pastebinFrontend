import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public baseUrl = 'http://localhost:5000';

  constructor(
    private http: HttpClient,
    private router: Router,
    public toastController: ToastController
  ) { }



  public createUser(userForm) {
    let headers = new HttpHeaders();
    const auth_token = localStorage.getItem('access_token');
    headers = headers.set('Authorization', `Bearer ${auth_token}`);

    return this.http.post<any>(this.baseUrl+'/api/v1/users', userForm, { headers })
      .pipe(
        tap(
          res => {
            console.log(res);
            console.log('creating user');
          }
        ),
        mapTo(true),
        catchError(error => {
            console.log(error);
            this.presentToast(error);
            return of(false);
          }
        )
      )
  }


  public getUser(userId){
    let headers = new HttpHeaders();
    const auth_token = localStorage.getItem('access_token');
    headers = headers.set('Authorization', `Bearer ${auth_token}`);

    return this.http.get<any>(this.baseUrl + '/api/v1/users/' + userId, { headers })
    .pipe(
      tap(
        res=> {
          console.log(res);
          console.log('getting user');
        }
      ),
      mapTo(true),
      catchError(error => {
        console.log(error);
        this.presentToast(error);
        return of(false);
      })
    )
  }

  public getAllUsers(paginationUrl) {
    let headers = new HttpHeaders();
    const auth_token = localStorage.getItem('access_token');
    headers = headers.set('Authorization', `Bearer ${auth_token}`);

    return this.http.get(this.baseUrl+paginationUrl, { headers })
    .pipe(
      tap(
        res=> {
          console.log(res);
          console.log('getting all user');
        }
      ),
      mapTo(true),
      catchError(error => {
        console.log(error);
        this.presentToast(error);
        return of(false);
      })
    );
  }

  public updateUser(id: any, postData) {

    let headers = new HttpHeaders();
    const auth_token = localStorage.getItem('access_token');
    headers = headers.set('Authorization', `Bearer ${auth_token}`);

    return this.http.put(this.baseUrl + `/${id}`, postData, { headers })
    .pipe(
      tap(
        res=> {
          console.log(res);
          console.log('updating user');
        }
      ),
      mapTo(true),
      catchError(error => {
        console.log(error);
        this.presentToast(error);
        return of(false);
      })
    );
  }

  public deleteUser(id: any) {
    let headers = new HttpHeaders();
    const auth_token = localStorage.getItem('access_token');
    headers = headers.set('Authorization', `Bearer ${auth_token}`);

    return this.http.delete(this.baseUrl + `/${id}`, { headers })
    .pipe(
      tap(
        res=> {
          console.log(res);
          console.log('deleting user');
        }
      ),
      mapTo(true),
      catchError(error => {
        console.log(error);
        this.presentToast(error);
        return of(false);
      })
    )
  };

  async presentToast(error) {
    const toast = await this.toastController.create({
      message: error.error.msg,
      icon: 'close-circle-outline',
      color: 'dark',
      position: 'bottom',
      duration: 6000
    });
    toast.present();
  }

}