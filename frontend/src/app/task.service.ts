import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';
import {ListResp} from './Models/list.model';
import {Task} from './Models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createList(title: string){
    //Send req
    return this.webReqService.post('api/lists/createList', { title })
  }

  getLists() {
    return this.webReqService.get('api/lists/getList')
  }

  getTasks(listId: string) {
    return this.webReqService.get(`api/lists/${listId}/tasks`)
  }

  createTask(title: string, listId: string){
    return this.webReqService.post(`api/lists/${listId}/createTask`, {title})
  }

  complete(task: Task){
    return this.webReqService.put(`api/lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
  })}
}
