import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iTask } from '../models/task';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskservicesService {

  constructor(private chiamata:HttpClient) {
    this.getallTasks()
  }

  taskUrl:string = "http://localhost:3000/todos"

  allTasks$ = new BehaviorSubject<iTask[]>([])
  tasksContainer: iTask[] = []

  // non ho assolutamente fatto copia incolla dalla mia pagina userservices cambiando solo i parametri perchè non mi andava di riscrivere tutto
  // nossignore
  // e sono offeso se lo hai pensato

  private getallTasks():void{
  this.chiamata.get<iTask[]>(this.taskUrl).subscribe(usersDaJson => {
    this.tasksContainer = usersDaJson
    this.allTasks$.next(this.tasksContainer)
  })

  }

  newTask(user:Partial<iTask>):void {
    this.chiamata.post<iTask>(this.taskUrl, user).pipe(tap(u => {
      this.tasksContainer.push(u)
      this.allTasks$.next(this.tasksContainer)
    })).subscribe()
  }


  editTask(user: Partial<iTask>): void {
    if (!user.id) return;
    this.chiamata.put<iTask>(`${this.taskUrl}/${user.id}`, user).pipe(
      tap(updatedUser => {
        const index = this.tasksContainer.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.tasksContainer[index] = updatedUser;
        }
        this.allTasks$.next(this.tasksContainer);
      })
    ).subscribe();
  }

  deleteTask(id: number): void {
    this.chiamata.delete(`${this.taskUrl}/${id}`).pipe(
      tap(() => {
        this.tasksContainer = this.tasksContainer.filter(eliminata => eliminata.id !== id);
        this.allTasks$.next(this.tasksContainer);
      })
    ).subscribe();
  }



}
