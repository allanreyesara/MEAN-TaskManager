import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../task.service';
import {ActivatedRoute, Params, RouterLink, RouterLinkActive} from '@angular/router';

import {List, ListResp} from '../../Models/list.model';
import {NgClass, NgForOf} from '@angular/common';
import {Task, TaskResp} from '../../Models/task.model';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent implements OnInit{

  lists: List[] = [];
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const listId = params['listId'];
        if (listId !== undefined) {
          this.taskService.getTasks(params['listId']).subscribe(
            (resp) => {
              this.tasks = <Task[]>resp;
            });
        }
      }
    )

   this.taskService.getLists().subscribe(
     (resp) => {
      let respA = <ListResp> resp  ;
      this.lists = respA.lists;
   })

    }
    onTaskClick(task: Task){
      this.taskService.complete(task).subscribe(() => {
        console.log("Completed");
        task.completed = !task.completed;

      })
  }
}
