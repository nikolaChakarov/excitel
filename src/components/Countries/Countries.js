import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GobalState';

const Countries = () => {

    const { getAllCountries, countries } = useContext(GlobalContext);

    useEffect(() => {
        getAllCountries();
    }, []);

    return (
        <div>Countries</div>
    )
};

export default Countries;