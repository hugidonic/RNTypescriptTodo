import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { AntDesign } from "@expo/vector-icons";
import { connect } from 'react-redux';

import colors from '../utils/colors'
import { ListType } from '../redux/types';
import { createList } from "../redux/actions/dataActions";
import uuid from '../utils/uuid';

type Props = {
	closeModal: () => void
	createList: (list: ListType) => void
}

const AddTodoListModal: React.FC<Props> = ({closeModal, createList}) => {
	const backgroundColors = ['#5cd859','#24a6d9','#595bd9','#8022d9','#d159d8','#d85963', '#d88559']
	const rand = Math.trunc(Math.random() * backgroundColors.length)

	const [bgColor, setBgColor] = useState(backgroundColors[rand])
	const [listName, setListName] = useState('');

	const renderColors = () => {
		return backgroundColors.map(clr => (
			<TouchableOpacity 
				key={clr}
				style={[styles.colorsSelect, {backgroundColor: clr}]}
				onPress={() => setBgColor(clr)}
			/>
		))
	}

	const createTodoList = () => {
		const list: ListType = {
			id: uuid(),
			name:  listName,
			color: bgColor,
			todos: []
		}

		if (list.name.trim() === '') {
			return false
		}

		createList(list)
		closeModal()
	}

	return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>

			<TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
				<AntDesign name='close' size={24} color={colors.black} />
			</TouchableOpacity>

			<View style={{ marginHorizontal: 32, alignSelf: 'stretch' }}>
				<Text style={styles.title}>Создать список</Text>

				<TextInput
					value={listName}
					onChangeText={txt => setListName(txt)}
					placeholder="Название..."
					style={styles.input}
				/>

				<View style={{ flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' }}>
					{renderColors()}
				</View>

				<TouchableOpacity onPress={createTodoList} style={[styles.createBtn, {backgroundColor: bgColor}]} >
					<Text style={{fontWeight: '600', color: colors.white}}>Создать</Text>
				</TouchableOpacity>
			</View>

		</KeyboardAvoidingView>
	)
}

const mapDispatchToProps = {
	createList
}


export default connect(null, mapDispatchToProps)(AddTodoListModal)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	closeIcon: {
		position: 'absolute',
		top: 32,
		right: 25,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: colors.black,
		alignSelf: 'center',
		marginBottom: 16,
	},
	input: {
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: colors.black,
		height: 50,
		borderRadius: 6,
		marginTop: 8,
		paddingHorizontal: 16,
		fontSize: 18
	},
	createBtn: {
		marginTop: 24,
		height: 50,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center'
	},
	colorsSelect: {
		width: 30,
		height: 30,
		borderRadius: 5,
	}
})
