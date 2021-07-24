export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';

export const CREATE_TODO_LIST = 'CREATE_TODO_LIST'
export const DELETE_TODO_LIST = 'DELETE_TODO_LIST'

export const UPDATE_TODO_LIST = 'UPDATE_TODO_LIST'

export const LOAD_LISTS = 'LOAD_LISTS'
export const GET_LISTS = 'GET_LISTS'


export type LoadListsActionType = {
  type: typeof LOAD_LISTS
}

export type GetListsActionType = {
  type: typeof GET_LISTS,
  payload: ListType[]
}

export type CreateTodoListType = {
	type: typeof CREATE_TODO_LIST,
	payload: ListType
}

export type UpdateTodoListType = {
	type: typeof UPDATE_TODO_LIST,
	payload: ListType
}




export type TodoType = {
	id: string,
	title: string,
	completed: boolean,
}

export type ListType = {
	id: string
	name: string,
	color: string,
	todos: TodoType[]
}

export type InitStateType = {
	lists: ListType[],
	loading: boolean
}

export type StateToPropsType = {
	data: InitStateType
}

export type ActionTypes = LoadListsActionType | GetListsActionType | CreateTodoListType | UpdateTodoListType