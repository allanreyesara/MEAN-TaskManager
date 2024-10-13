import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../task.service';
import {ActivatedRoute, Params, RouterLink} from '@angular/router';

import { List } from '../../Models/list.model';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent implements OnInit{

  lists: List[] = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params)
      }
    )

   this.taskService.getLists().subscribe(
     (lists: List[]) => {
      this.lists = lists;
   })

  }

}
