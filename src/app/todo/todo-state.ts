import { Injectable } from '@angular/core';
import { Action, Actions, State, StateContext } from '@ngxs/store';
import {
  AddItemAction,
  DeleteItemAction,
  ToggleItemAction,
  UpdateItemAction,
} from './todo-actions';
import { TodoModel } from './types/todo';
import { TodoModule } from './todo.module';

export interface TodoStateModel {
  items: TodoModel[];
}

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    items: [],
  },
})
@Injectable()
export class TodoState {
  @Action(AddItemAction)
  addItem(ctx: StateContext<TodoStateModel>, action: AddItemAction) {
    const { name } = action;

    if (!name) {
      return;
    }

    const state = ctx.getState();

    const todoItem: TodoModel = {
      id: Math.floor(Math.random() * 1000),
      isDone: false,
      title: name,
    };

    ctx.setState({
      ...state,
      items: [...state.items, todoItem],
    });

    console.log(ctx.getState());
  }

  @Action(ToggleItemAction)
  toggleItem(ctx: StateContext<TodoStateModel>, action: ToggleItemAction) {
    const state = ctx.getState();

    const newTodoItems = state.items.map((item: TodoModel) => {
      if (item.id === action.id) {
        return {
          ...item,
          isDone: !item.isDone,
        };
      }

      return item;
    });

    ctx.setState({
      items: [...newTodoItems],
    });
  }

  @Action(UpdateItemAction)
  updateItem(ctx: StateContext<TodoStateModel>, action: UpdateItemAction) {
    const { id, text } = action;

    const state = ctx.getState();

    const updatedState = state.items.map((item: TodoModel) => {
      if (item.id === id) {
        return {
          ...item,
          title: text,
        };
      }
      return item;
    });
    ctx.setState({
      items: [...updatedState],
    });
  }

  @Action(DeleteItemAction)
  deleteItem(ctx: StateContext<TodoStateModel>, action: DeleteItemAction) {
    const { id } = action;

    const state = ctx.getState();

    const newState = state.items.filter((item: TodoModel) => item.id !== id);
    ctx.setState({
      items: [...state.items.filter((item: TodoModel) => item.id !== id)],
    });
  }
}
