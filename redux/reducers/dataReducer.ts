import { combineReducers } from 'redux';
import {
	LOAD_LISTS,
	GET_LISTS,
	CREATE_TODO_LIST,
	UPDATE_TODO_LIST
} from './../types';

import {
	InitStateType,
	ActionTypes,
	ListType,
} from './../types'

const initialState: InitStateType = {
	lists: [],
	loading: true
};

const dataReducer = (state = initialState, action: ActionTypes): InitStateType => {
	switch (action.type) {
		case LOAD_LISTS:
			return {
				...state,
				loading: true
			};
		case GET_LISTS:
			return {
				...state,
				loading: false,
				lists: action.payload
			};

		case CREATE_TODO_LIST:
			const newList: ListType = action.payload;
			return {
				...state,
				lists: [ newList, ...state.lists ]
			};
		
		case UPDATE_TODO_LIST:
			const listToUpdateIdx = state.lists.findIndex(list => list.id === action.payload.id)
			
			return {
				...state,
				lists: [
					...state.lists.slice(0, listToUpdateIdx),
					action.payload,
					...state.lists.slice(listToUpdateIdx + 1)
				]
			}

		default:
			return state;
	}
};
const rootReducer = combineReducers({
	data: dataReducer
});

export default rootReducer;
