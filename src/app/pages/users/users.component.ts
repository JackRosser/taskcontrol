import { iUnited } from './../../models/united';
import { Component } from '@angular/core';
import { UserservicesService } from '../../services/userservices.service';
import { TaskservicesService } from '../../services/taskservices.service';
import { iTask } from '../../models/task';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  constructor(private globalUsers: UserservicesService, private globalTask: TaskservicesService) {}

  allUsersAndTasks: iUnited[] = [];
  allUserAndTasksClone: iUnited[] = [];  // qua devo clonarlo per la ricerca, spero sia giusto, sto usando un metodo un po' cervellotico
  taskEseguito: boolean = false;


  // qua uso trim per rimuovere eventuali spazi, poi gli dico di filtrare in lowercase.
  // se il dato non c'è torna all'array principale che ho clonato
  // non sono riuscito a farlo senza clonare l'array
  ricerca(dato: string) {
    if (dato.trim() !== "") {
      this.allUsersAndTasks = this.allUserAndTasksClone.filter(user =>
        user.firstName.toLowerCase().includes(dato.toLowerCase())
      );
    } else {
      this.allUsersAndTasks = [...this.allUserAndTasksClone];
    }
  }

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

        this.allUsersAndTasks.sort((a, b) => a.firstName.localeCompare(b.firstName));

        this.allUserAndTasksClone = [...this.allUsersAndTasks];  // Aggiorna il clone dopo tutte le operazioni
      });
    });
  }
}



