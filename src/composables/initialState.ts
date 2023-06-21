import {Todo} from "../types/todo";
import {setUniqueId} from "./setUniqueId";

export const initialState: Todo[] = [
  {
    key: setUniqueId,
    name: 'Сделать тестовое задание',
    done: false,
    isEdit: false
  },
  {
    key: setUniqueId,
    name: 'Сходить на прогулку',
    done: false,
    isEdit: false
  },
  {
    key: setUniqueId,
    name: 'Искупать кота',
    done: false,
    isEdit: false
  }
]