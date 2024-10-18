import { Component } from '@angular/core';
import { iUnited } from '../../models/united';
import { iTask } from '../../models/task';
import { UserservicesService } from '../../services/userservices.service';
import { TaskservicesService } from '../../services/taskservices.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent {

constructor(private globalUsers:UserservicesService, private globalTask:TaskservicesService) {}


  allUsersAndTasks: iUnited[] = [];
  taskEseguito: boolean = false;



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

        this.allUsersAndTasks.sort((a, b) => a.firstName.localeCompare(b.firstName));
      });
    });
  }


}
