import { iUser } from './../../models/user';
import { Component } from '@angular/core';
import { UserservicesService } from '../../services/userservices.service';
import { TaskservicesService } from '../../services/taskservices.service';
import { iUnited } from '../../models/united';
import { iTask } from '../../models/task';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private globalUsers: UserservicesService, private globalTask: TaskservicesService) {}

  allUsersAndTasks: iUnited[] = [];
  taskEseguito: boolean = false;

// questa devo spiegartela
// chiamo gli utenti globali, dentro chiamo i tasks globali, creo un array di oggetti con un'interfaccia che ho inserito creandoci un array vuoto
// apro gli users con foreach, dentro ci apro i tasks globali, se id e user id corrispondono allora li pusho nell'array e ho usato Number() perchè sono paranoico


  ngOnInit() {
    this.globalUsers.allUsers$.subscribe(allGlobalUsers => {
      this.globalTask.allTasks$.subscribe(allGlobalTasks => {
        this.allUsersAndTasks = allGlobalUsers.map(user => ({
          ...user,
          tasks: []
        }));
        this.allUsersAndTasks.forEach((user: iUnited) => {
          allGlobalTasks.forEach((task: iTask) => {
            if (Number(user.id) === Number(task.userId)) {
              user.tasks?.push(task);
            }
          });
        });
        console.log('All users and tasks:', this.allUsersAndTasks);
      });
    });
  }

}
