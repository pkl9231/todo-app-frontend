export interface TodoList {
  items: string;
  _id: string;
}

export interface Notify {
  message: string;
  isOpen: boolean;
  type: "error" | "success" | ""
}
