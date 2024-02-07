type tags = "fiction" | "non-fiction" | "science" | "essay";

export interface IBook {
  id: string;
  title: string;
  writer: string;
  cover: string;
  point: number;
  tags: tags[];
}

export interface ICart {
  id: string;
  quantity: number;
  total: number;
  book: IBook;
  order: IOrder;
}

export interface IOrder {
  id: string;
  total: number;
  status: string;
  carts: ICart[];
  user: IUser;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  orders: IOrder[];
}
