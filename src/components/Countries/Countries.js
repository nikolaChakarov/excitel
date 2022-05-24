import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

import { GlobalContext } from "../../context/GobalState";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import Controls from "../Controls/Controls";

const Countries = () => {
    const { getAllCountries, countries } = useContext(GlobalContext);

    const handlePageClick = (data) => {
    }

    useEffect(() => {
        getAllCountries();
    }, []);

    return (
        <CountriesContainer>
            <Controls />

            <ReactPaginate
                previousLabel={<ChevronLeft />}
                nextLabel={<ChevronRight />}
                pageCount={25}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={'pagination-wrapper'}
                pageClassName={'pagination-page'}
                pageLinkClassName={'pagination-link'}
                previousClassName={'pagination-btn'}
                nextClassName={'pagination-btn'}
            />
        </CountriesContainer>
    );
};

const CountriesContainer = styled.section`
    .pagination-wrapper {
        display: flex;
        background: lightgray;
        border: 2px dashed red;
    }
`;

export default Countries;
