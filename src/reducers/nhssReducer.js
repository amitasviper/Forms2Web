const new_item = {
	item_no: "1",
	domain: "Levels of Consciousness",
	specific: "Arousal Status",
	score: '',
	score_range:[0, 3]
}

const initialState = {
	items:[
		{
			item_no: "1",
			domain: "Levels of Consciousness",
			specific: "Arousal Status",
			score: '',
			score_range:[0, 3]
		}
	]
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SIMPLE_ACTION':
			let new_item_to_add = Object.assign(new_item, {item_no: 12});
			return { ...state, items: [...state.items, new_item_to_add] };

		case 'CHANGE_VALUE':
			let all_items = [...state.items];
			all_items[action.payload.item_index].score = action.payload.value;
			return { ...state, items: all_items };
		default:
		return state;
	}
}
