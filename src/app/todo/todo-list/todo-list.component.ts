import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AddItemAction,
  DeleteItemAction,
  ToggleItemAction,
  UpdateItemAction,
} from '../todo-actions';
import { TodoSelectors } from '../todo-selectors';
import { TodoModel } from '../types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Select(TodoSelectors.todoItems) todoItems$!: Observable<TodoModel[]>;

  newItemName!: string;
  updateItemB: number | null = null;
  items: TodoModel[] = [...new Array(10)].map((_, index) => ({
    id: index + 1,
    isDone: false,
    title: `Todo ${index + 1}`,
  }));

  constructor(private store: Store) {}

  trackById(index: number, item: TodoModel): number {
    return item.id;
  }

  toggleItem(todoItem: TodoModel) {
    this.store.dispatch(new ToggleItemAction(todoItem.id));
  }

  addItem() {
    this.store.dispatch(new AddItemAction(this.newItemName));
    this.newItemName = '';
  }

  confirmItemUpdate(todoItemId: number) {
    this.store.dispatch(new UpdateItemAction(todoItemId, this.newItemName));
    this.updateItemB = null;
    this.newItemName = '';
  }

  updateItem(todoItem: TodoModel) {
    this.updateItemB = todoItem.id;
    this.newItemName = todoItem.title;
  }

  deleteItem(todoItemId: number) {
    this.store.dispatch(new DeleteItemAction(todoItemId));
  }
}
