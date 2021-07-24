import React, { useEffect, useState } from 'react';
import { Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { connect } from 'react-redux';

// Utils
import colors from '../utils/colors';
import { ListType, StateToPropsType } from '../redux/types';
import { getAllLists } from '../redux/actions/dataActions'

// Components
import MainTitle from '../components/MainTitle';
import AddTodoListModal from '../components/AddTodoListModal';
import TodoList from '../components/TodoList';
import { HomeScreenNavigationProp } from '../routes/AppNavigator';

interface Props {
	dataLists: ListType[],
	loading: boolean,
	getAllLists: () => void,
	navigation: HomeScreenNavigationProp
}

const Home: React.FC<Props> = ({dataLists, loading, getAllLists, navigation }) => {

	const [lists, setLists] = useState<ListType[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false)

	

	useEffect(() => {
		getAllLists()
	}, [getAllLists])

	useEffect(() => {
		if (!loading) {
			setLists(dataLists)
		}
	}, [loading, dataLists])


	const toggleModal = () => setIsModalVisible(prev => !prev)

	const renderTodoItem = (list: ListType) => (<TodoList list={list} navigation={navigation} />)

	return (
		<View style={styles.container}>
			<StatusBar hidden={true} />
			<Modal animationType='slide' visible={isModalVisible} onRequestClose={toggleModal} >
				<AddTodoListModal closeModal={toggleModal} />
			</Modal>
			
			{/* Title */}
			<MainTitle />


			{/* Add List button */}
			<View style={{marginVertical: 38, alignItems: 'center'}}>
				<TouchableOpacity style={styles.addList} onPress={toggleModal}>
					<AntDesign name='plus' size={26} color={colors.blue} />
				</TouchableOpacity>

				<Text style={styles.add}>Создать</Text>
			</View>

			<View style={{ height: 275, paddingLeft: -32 }}>
				<FlatList
					data={lists}
					keyExtractor={(item) => item.name}
					renderItem={({ item }) => renderTodoItem(item)}
					horizontal
					showsHorizontalScrollIndicator={false}
					keyboardShouldPersistTaps='always'
				/>
			</View>

		</View>
	)
}

const mapStateToProps = (state: StateToPropsType) => ({
	dataLists: state.data.lists,
	loading: state.data.loading
})

const mapDispatchToProps = {
	getAllLists
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)




const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center'
	},
	addList: {
		borderWidth: 2,
		borderColor: colors.lightBlue,
		borderRadius: 4,
		padding: 16,
		alignItems: 'center',
		justifyContent: 'center'
	},
	add: {
		color: colors.lightBlue,
		fontWeight: '600',
		fontSize: 14,
		marginTop: 8
	}
})


