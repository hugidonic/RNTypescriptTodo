import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ListType } from '../redux/types'
import { HomeScreenNavigationProp } from '../routes/AppNavigator'
import colors from '../utils/colors'

type Props = {
	list: ListType,
	navigation: HomeScreenNavigationProp
}

const TodoList: React.FC<Props> = ({ list, navigation }) => {

	const completedCount = list.todos.filter(todo => todo.completed).length;
	const remainingCount = list.todos.length - completedCount;

	return (
		<TouchableOpacity
			style={[ styles.listContainer, {backgroundColor: list.color} ]}
			onPress={() => navigation.navigate('TodoList', { list })}
		>
			<Text style={styles.listTitle}>{list.name}</Text>

			<View>
				<View style={{alignItems: 'center'}}>
					<Text style={styles.count}>{remainingCount}</Text>
					<Text style={styles.subtitle}>Осталось</Text>
				</View>

				<View style={{alignItems: 'center'}}>
					<Text style={styles.count}>{completedCount}</Text>
					<Text style={styles.subtitle}>Выполнено</Text>
				</View>
			</View>

		</TouchableOpacity>
	)
}

export default TodoList

const styles = StyleSheet.create({
	listContainer: {
		paddingVertical: 32,
		paddingHorizontal: 16,
		borderRadius: 6,
		marginHorizontal: 12,
		alignItems: 'center',
		width: 200
	},
	listTitle: {
		fontSize: 25,
		fontWeight: 'bold',
		color: colors.white,
		marginBottom: 18,
	},
	count: {
		fontSize: 48,
		fontWeight: '200',
		color: colors.white,
	},
	subtitle: {
		fontSize: 12,
		fontWeight: '700',
		color: colors.white
	}
})
