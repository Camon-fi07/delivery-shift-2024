import { OtpResponse, SessionResponse, SignInResponse, SingInDto, UpdateProfileDto, User } from 'shared/types/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { OTP, PROFILE, SESSION, SIGNIN } from 'shared/constants/apiUrl';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  phone?: string;
  token?: string;
  user?: User;
  private isAuth = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.phone = localStorage.getItem('phone') || undefined;
    this.token = localStorage.getItem('token') || undefined;

    this.getSession().subscribe();
  }

  getSession(): Observable<SessionResponse> {
    return this.http.get<SessionResponse>(SESSION, { headers: { Authorization: `Bearer ${this.token}` } }).pipe(
      map((res) => {
        this.user = res.user;
        this.isAuth.next(true);
        return res;
      }),
      catchError((err) => {
        this.logOut();
        throw `ivalid data: ${err.error.message}`;
      }),
    );
  }

  logOut() {
    localStorage.removeItem('phone');
    localStorage.removeItem('token');
    this.phone = undefined;
    this.token = undefined;
    this.user = undefined;
    this.isAuth.next(false);
  }

  private saveUserData({ token, user }: SignInResponse, phone: string) {
    localStorage.setItem('phone', phone);
    this.phone = phone;
    localStorage.setItem('token', token);
    this.token = token;
    this.user = user;
  }

  createOtp(phone: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(OTP, { phone });
  }

  logIn(singInDto: SingInDto): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(SIGNIN, singInDto).pipe(
      map((res) => {
        this.isAuth.next(true);
        this.saveUserData(res, singInDto.phone);
        return res;
      }),
    );
  }

  updateProfile(data: UpdateProfileDto): Observable<SessionResponse> {
    return this.http.patch<SessionResponse>(PROFILE, data, { headers: { Authorization: `Bearer ${this.token}` } }).pipe(
      map((res) => {
        this.getSession().subscribe();
        return res;
      }),
    );
  }

  getIsAuth(): Observable<boolean> {
    return this.isAuth;
  }

  translateUserToProfile(user: User): UpdateProfileDto {
    return {
      phone: user.phone,
      profile: {
        city: user.city || '',
        email: user.email || '',
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        middlename: user.middlename || '',
      },
    };
  }
}
