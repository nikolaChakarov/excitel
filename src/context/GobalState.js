import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initState = {
    countries: [],
    getAllCountries: () => { },
    isLoading: true
};

export const GlobalContext = createContext(initState);

export const GlobalProvider = ({ children }) => {

    const [appState, dispatch] = useReducer(AppReducer, initState);

    const getAllCountries = async () => {

        try {
            const dbResponse = await (await fetch('/countries')).json();

            console.log(dbResponse);

        } catch (err) {
            console.log(err);
        }

    }

    return <GlobalContext.Provider value={{
        countries: appState.countries,
        getAllCountries
    }}>
        {children}
    </GlobalContext.Provider>
}