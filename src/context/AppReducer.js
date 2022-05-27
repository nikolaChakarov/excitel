const AppReducer = (state, action) => {
	switch (action.type) {
		case "GET_ALL_COUNTRIES":
			return {
				...state,
				countries: [...action.payload],
			};

		case 'CLEAR_SEARCH':
			return {
				...state,
				filtered: []
			}

		case "SEARCH":
			return {
				...state,
				filtered: [...state.countries.filter(el => el.name.toLowerCase().includes(action.payload.toLowerCase()))]
			};


		default:
			return state;
	}
};

export default AppReducer;
