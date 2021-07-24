import uuid from "./utils/uuid";

const tempData = [
	{	
		id: uuid(),
		name: "Test",
		color: "#595bd9",
		todos: [
			{
				id: uuid(),
				title: "Book Flight",
				completed: false
			},
		]
	},
	{	
		id: uuid(),
		name: "Todo course",
		color: "#24a6d9",
		todos: [
			{
				id: uuid(),
				title: "Book Flight",
				completed: false
			},
			{
				id: uuid(),
				title: "Drink some coffee",
				completed: true
			},
			{
				id: uuid(),
				title: "Grab some ice",
				completed: false
			},
		]
	},
	{
		id: uuid(),
		name: "Errands",
		color: "#8022d9",
		todos: [
			{
				id: uuid(),
				title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
				completed: true
			},
			{
				id: uuid(),
				title: "qui ullam ratione quibusdam voluptatem quia omnis",
				completed: true
			},
			{
				id: uuid(),
				title: "illo expedita consequatur quia in",
				completed: false
			},
		]
	},
	{
		id: uuid(),
		name: "Party",
		color: "#595bd9",
		todos: [
			{
				id: uuid(),
				title: "ipsa repellendus fugit nisi",
				completed: true
			},
			{
				id: uuid(),
				title: "et doloremque nulla",
				completed: false
			},
			{
				id: uuid(),
				title: "repellendus sunt dolores architecto voluptatum",
				completed: true
			},
		]
	},
]

export default tempData