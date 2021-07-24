import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import colors from '../utils/colors';

type Props = {
	title: string,
	goBack: () => void
}

const Header :React.FC<Props> = ({title, goBack}) => {
	
	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={goBack} style={styles.backIcon}>
				<MaterialIcons
					name="arrow-back"
					size={34}
					color="black"
				/>
			</TouchableOpacity>

			<Text style={styles.headerTitle}>{title}</Text>
		</View>
	)
}

export default Header

const styles = StyleSheet.create({
	header: {
		height: 70,
		width: '100%',
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		position: 'relative',

		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',

		elevation: 3,
		shadowColor: '#333',
		shadowOpacity: 0.4,
		shadowOffset: {width: 1, height: 2},
	},
	backIcon: {
		position: 'absolute',
		left: 20,
		top: 20,
		zIndex: 2
	},
	headerTitle: {
		color: colors.black,
		fontSize: 24,
		fontWeight: '600',
	},
})
