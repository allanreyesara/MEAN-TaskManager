import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";
import {TaskService} from '../../task.service';
import {Task} from '../../Models/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit{

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  _listId = "";
  task: any;
  ngOnInit() {
    this.route.params.subscribe((
      params: Params) => {
      this._listId = params['listId']
    })
  }


  createTask( title: string) {
     this.taskService.createTask(title, this._listId).subscribe((response: any) => {
        this.router.navigate([`/lists/${this._listId}`])
      });
    }
}
