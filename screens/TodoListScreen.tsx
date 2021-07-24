import React, { useEffect, useState } from 'react'
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { AntDesign } from '@expo/vector-icons'

import colors from '../utils/colors';
import { TodoListScreenNavigationProp, TodoListScreenRouteProp } from '../routes/AppNavigator'

// Redux
import { ListType, TodoType } from '../redux/types'
import { updateList } from '../redux/actions/dataActions'
import { connect } from 'react-redux'
import uuid from '../utils/uuid';


type Props = {
	route: TodoListScreenRouteProp,
	navigation: TodoListScreenNavigationProp,
	updateList: (updatedList: ListType) => void,
}


const TodoListScreen: React.FC<Props> = ({route, updateList, navigation}) => {
	const [list, setList] = useState<ListType>(route.params.list);
	const [todoTitle, setTodoTitle] = useState('')


	const addTodo = () => {
		if (todoTitle.trim() === '' || list.todos.some(todo => todo.title === todoTitle)) {
			return false
		} else {
			const newTodo: TodoType= {
				id: uuid(),
				title: todoTitle,
				completed: false,
			}

			setList((prev) => {
				const newList = [ ...prev.todos, newTodo ]
				return {
					...prev,
					todos: newList
				}
			})
			console.log(list);
			

			updateList(list)
			setTodoTitle('')
			Keyboard.dismiss()
		}
	}

	const toggleComplete = (idx: number) => {
    setList((prev) => {
			const newTodos = [ ...prev.todos ]
			newTodos[idx].completed = !newTodos[idx].completed
			return {
				...prev,
				todos: newTodos
			}
		})

		updateList(list)
	}

	const deleteTodo = (idx: number) => {
		setList((prev) => {
			const newTodos = [ ...prev.todos ]
			// console.log('newTodos', newTodos)
			// newTodos.splice(idx, 1)
			// console.log('newTodos', newTodos)
			return {
				...prev,
				todos: [
					...newTodos.slice(0, idx),
					...newTodos.slice(idx+1)
				]
			}
		})

		updateList(list)
	}

	const rightActionRender = (dragX: Animated.AnimatedInterpolation, idx:number) => {
		const scale = dragX.interpolate({
			inputRange: [-100, 0],
			outputRange: [1, 0.9],
			extrapolate: 'clamp'
		})

		const translateX = dragX.interpolate({
			inputRange: [-100, 0],
			outputRange: [1, 0.9],
			extrapolate: 'clamp'
		})

		const opacity = dragX.interpolate({
			inputRange: [-100, -20, 0],
			outputRange: [1, 0.9, 0],
			extrapolate: 'clamp'
		})

		return (
			<TouchableOpacity onPress={() => deleteTodo(idx)}>
				<Animated.View style={[styles.deleteBtn, {opacity}]}>
					<Animated.Text style={[styles.deleteBtnText, { transform: [{scale}, {translateX}] }]}>
						Delete
					</Animated.Text>
				</Animated.View>
			</TouchableOpacity>
		)
	}
	
	const renderTodoItem = (todo: TodoType, idx: number) => {
		return (
			<Swipeable renderRightActions={(progress, dragX) => rightActionRender(dragX, idx)}>
				<View style={styles.todoContainer}>
					<TouchableOpacity onPress={() => toggleComplete(idx)}>
						<AntDesign
							name={todo.completed ? 'checksquare' : 'checksquareo'}
							size={24}
							color={todo.completed ? list.color : colors.gray}
							style={{ width: 32, marginRight: 6 }}
						/>
					</TouchableOpacity>

					<Text style={{
						textDecorationLine: todo.completed ? 'line-through' : 'none',
						color: todo.completed ? list.color : colors.black
					}}>
						{todo.title}
					</Text>
				</View>
			</Swipeable>
		)
	}

	const taskCount = list.todos.length;
	const completedCount = list.todos.filter(todo => todo.completed).length;
	
	return (
		<KeyboardAvoidingView  behavior='padding' style={styles.container}>

			<View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
				<Text style={styles.title}>
					{list.name}
				</Text>

				<Text style={styles.taskCount}>
					{completedCount} of {taskCount}
				</Text>
			</View>

			<View style={[styles.section, {flex:8, marginVertical: 20}]}>
				<FlatList
					data={list.todos}
					renderItem={({ item, index }) => renderTodoItem(item, index)}
					keyExtractor={(item) => item.title}
					// contentContainerStyle={{paddingHorizontal:32, paddingVertical: 64}}
					showsHorizontalScrollIndicator={false}
				/>
			</View>

			<View style={styles.footer}>
				<TextInput
					value={todoTitle}
					onChangeText={txt => setTodoTitle(txt)}
					style={[styles.input, {borderColor: list.color}]}
				/>

				<TouchableOpacity onPress={addTodo} style={[styles.addTodo, {backgroundColor: list.color}]}>
					<AntDesign name='plus' size={18} color={colors.white}/>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	)
}



const mapDispatchToProps = {
	updateList
}


export default connect(null, mapDispatchToProps)(TodoListScreen)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
	},
	section: {
		alignSelf: 'stretch',
	},
	header: {
		marginLeft: 64,
		borderBottomWidth: 3,
		paddingTop: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.black,
	},
	taskCount: {
		marginTop: 4,
		marginBottom: 16,
		color: colors.gray,
		fontWeight: '600',
	},
	footer: {
		paddingHorizontal: 32,
		paddingVertical: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		flex: 3,
		height:50,
		borderWidth: 2,
		borderRadius: 6,
		marginRight: 8,
		paddingHorizontal: 8,
	},
	addTodo: {
		height: 50,
		borderRadius: 4,
		padding: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	todoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16,
		paddingLeft: 32
	},
	todo: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	deleteBtn: {
		flex: 1,
		backgroundColor: colors.red,
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
	},
	deleteBtnText: {
		color: colors.white,
		fontWeight: '600',
		fontSize: 18,
	}
})
