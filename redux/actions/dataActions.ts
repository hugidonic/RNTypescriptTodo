import { GET_LISTS, LOAD_LISTS, ListType, CREATE_TODO_LIST, UPDATE_TODO_LIST, LoadListsActionType, CreateTodoListType, UpdateTodoListType, GetListsActionType } from './../types';
import { Dispatch } from "react";
import tempData from '../../tempData';

export const getAllLists = () => (dispatch: Dispatch<LoadListsActionType | GetListsActionType>) => {
	dispatch({ type: LOAD_LISTS, })
	
	dispatch({ type: GET_LISTS, payload: tempData })
}

export const createList = (list: ListType) => (dispatch: Dispatch<CreateTodoListType>) => {
	dispatch({ type: CREATE_TODO_LIST, payload: list })
}

export const updateList = (updatedList: ListType) => (dispatch: Dispatch<UpdateTodoListType>) => {
	dispatch({ type: UPDATE_TODO_LIST, payload: updatedList })
}