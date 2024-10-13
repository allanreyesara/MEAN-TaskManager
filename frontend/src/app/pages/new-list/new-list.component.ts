import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../task.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-new-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './new-list.component.html',
  styleUrl: './new-list.component.scss'
})
export class NewListComponent implements OnInit{
  lists: any;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);

    });


  }
}

