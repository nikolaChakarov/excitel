import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initState = {
	countries: [],
	filtered: [],
	getAllCountries: () => { },
	searchCountries: (query) => { },
	sortByQuery: (query) => { },
	isLoading: true,
};

export const GlobalContext = createContext(initState);

export const GlobalProvider = ({ children }) => {
	const [appState, dispatch] = useReducer(AppReducer, initState);

	const getAllCountries = async () => {
		// no need to make another call to database, after we madet once and we have our data.
		if (appState.countries.length > 0) {
			return;
		}

		try {
			const dbResponse = await (await fetch("/countries")).json();

			dispatch({
				type: "GET_ALL_COUNTRIES",
				payload: dbResponse,
			});

		} catch (err) {
			console.log(err);
		}
	};

	const searchCountries = (query) => {
		dispatch({
			type: 'SEARCH',
			payload: query
		})
	}

	const sortByQuery = (query) => {

		// we can use switch instead
		const mapped = {
			"capital name": 'capitalName',
			"code": "code",
			"country name": "name",
			"region": "region",
			"subregion": "subregion",
		}


		const sortedCountries = appState.countries.sort((a, b) => {
			return query === 'population' ? b['population'] - a['population'] : a[mapped[query]].toLowerCase().localeCompare(b[mapped[query]].toLowerCase())
		});


		dispatch({
			type: 'SORT',
			payload: {
				countries: sortedCountries,
			}
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				countries: appState.countries,
				filtered: appState.filtered,
				dispatch,
				getAllCountries,
				searchCountries,
				sortByQuery
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
