import axios from "axios";
import { IOrder } from "./interfaces";

export const getOrders = async (token: string) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data as IOrder[];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCurrentOrder = async (token: string) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/order/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data as IOrder;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addBookToCart = async (
  bookId: string,
  quantity: string,
  token: string
) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/cart/create`,
      {
        bookId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateBookInCart = async (
  cartId: string,
  bookId: string,
  quantity: string,
  token: string
) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_HOST}/cart/update`,
      {
        cartId,
        bookId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const removeBookFromCart = async (
  cartId: string,
  bookId: string,
  token: string
) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_HOST}/cart/remove`,
      {
        cartId,
        bookId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateOrder = async (
  orderId: string,
  status: string,
  token: string
) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_HOST}/order/update`,
      {
        orderId,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
