import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../task.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

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

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe((response: any) => {
      const listId= response.newList._id
      this.router.navigate([`/lists/${listId}`]);
    });


  }
}

