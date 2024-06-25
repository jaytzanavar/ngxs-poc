export class AddItemAction {
  static readonly type = '[TODO page] Add item';
  constructor(public name: string) {}
}

export class ToggleItemAction {
  static readonly type = '[TODO page] Toggle item';
  constructor(public id: number) {}
}

export class UpdateItemAction {
  static readonly type = '[TODO page] Update item';
  constructor(
    public id: number,
    public text: string,
  ) {}
}

export class DeleteItemAction {
  static readonly type = '[TODO page] Delete item';
  constructor(public id: number) {}
}
