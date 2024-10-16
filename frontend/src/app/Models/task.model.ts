export interface Task {
  _id: string;
  title: string;
  _listId: string;
  completed: boolean;
}

export interface TaskResp {
  lists: [];
}
