import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../utils/colors'

const MainTitle = () => {
	return (
		<View style={{ flexDirection: 'row' }}>
			<View style={styles.divider} />

			<Text style={styles.title}>
				Todo <Text style={{fontWeight: '300', color: colors.blue}}>Lists</Text>
			</Text>

			<View style={styles.divider} />
		</View>
	)
}

export default MainTitle

const styles = StyleSheet.create({
	divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center'
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors.black,
    paddingHorizontal: 64
  },
})
