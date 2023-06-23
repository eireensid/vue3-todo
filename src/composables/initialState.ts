import { Todo } from '../types/todo'
import { v4 as uuidv4 } from 'uuid'

export const initialState: Todo[] = [
	{
		key: uuidv4(),
		name: 'Сделать тестовое задание',
		done: false,
		isEdit: false
	},
	{
		key: uuidv4(),
		name: 'Сходить на прогулку',
		done: false,
		isEdit: false
	},
	{
		key: uuidv4(),
		name: 'Искупать кота',
		done: false,
		isEdit: false
	}
]
