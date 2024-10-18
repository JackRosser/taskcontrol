import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { iUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserservicesService {

  constructor(private chiamata:HttpClient) {
    this.getAllUsers()
  }

userUrl:string = "http://localhost:3000/users"

allUsers$ = new BehaviorSubject<iUser[]>([])
usersContainer: iUser[] = []

// lo so non c'era nel compito ma è triste con solo la get
private getAllUsers():void{
this.chiamata.get<iUser[]>(this.userUrl).subscribe(usersDaJson => {
  this.usersContainer = usersDaJson
  this.allUsers$.next(this.usersContainer)
})

}

newUser(user:Partial<iUser>):void {
  this.chiamata.post<iUser>(this.userUrl, user).pipe(tap(u => {
    this.usersContainer.push(u)
    this.allUsers$.next(this.usersContainer)
  })).subscribe()
}


editUser(user: Partial<iUser>): void {
  if (!user.id) return;
  this.chiamata.put<iUser>(`${this.userUrl}/${user.id}`, user).pipe(
    tap(updatedUser => {
      const index = this.usersContainer.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.usersContainer[index] = updatedUser;
      }
      this.allUsers$.next(this.usersContainer);
    })
  ).subscribe();
}

killUser(id: number): void {
  this.chiamata.delete(`${this.userUrl}/${id}`).pipe(
    tap(() => {
      this.usersContainer = this.usersContainer.filter(ucciso => ucciso.id !== id);
      this.allUsers$.next(this.usersContainer);
    })
  ).subscribe();
}

}
