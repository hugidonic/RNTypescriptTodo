import * as React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp  } from '@react-navigation/stack';


import Home from '../screens/Home';
import TodoListScreen from '../screens/TodoListScreen';
import Header from '../components/Header';

import { ListType } from '../redux/types';


type RootStackParamList = {
	Home: undefined
	TodoList: {list: ListType}
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type TodoListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TodoList'
>;

export type TodoListScreenRouteProp = RouteProp<RootStackParamList, 'TodoList'>;


const { Screen, Navigator } = createStackNavigator<RootStackParamList>();

const HomeStack = () => (
	<Navigator
		initialRouteName='Home'
		mode='card'
	>
		<Screen name="Home" component={Home} options={{ headerShown: false }} />
		<Screen name="TodoList" component={TodoListScreen} options={{
			header: ({ scene, previous, navigation }) => (
				<Header title='Список заданий' goBack={navigation.goBack} />
			)
		}} 
		/>
	</Navigator>
)

const AppNavigator = () => (
	<NavigationContainer>
		<HomeStack />
	</NavigationContainer>
);

export default AppNavigator;