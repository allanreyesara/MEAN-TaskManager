import { Injectable } from '@angular/core';
import {WebRequestService} from './web-request.service';

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
}
