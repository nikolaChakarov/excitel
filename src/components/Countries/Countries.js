import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

import { GlobalContext } from "../../context/GobalState";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import Controls from "../Controls/Controls";
import Country from '../Country/Country';

const Countries = () => {
    const { getAllCountries, countries } = useContext(GlobalContext);

    /* pagination */
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 16;
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(countries.length / itemsPerPage);

    const displayItems = countries.slice(pagesVisited, pagesVisited + itemsPerPage);
    const onPageChange = ({ selected }) => {
        setPageNumber(selected);
    };
    /* end pagination */

    useEffect(() => {
        getAllCountries();
    }, [countries]);


    return (
        <CountriesContainer>
            <Controls />

            <Ul>
                {displayItems.map((el, i) => (
                    <Country key={i} {...el} id={i} />
                ))}
            </Ul>

            <ReactPaginate
                previousLabel={<ChevronLeft />}
                nextLabel={<ChevronRight />}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                onPageChange={onPageChange}
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
        flex: 1;
        display: flex;
        flex-direction: column; 

    .pagination-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        background: lightgray;
        border: 2px dashed red;
        margin-top: auto;
    }

    .pagination-page {
        background: red;
        width: 3rem;
        height: 2rem;
        margin: 0 .5rem;
        display: flex;
    }

    .pagination-link {
        display: block;
        background: green;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pagination-btn {
        background: var(--purple);
        color: #fff;
        min-width: 3rem;
        min-height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
`;

const Ul = styled.ul`
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: lightblue;
    height: 100%;
    gap: 1rem;
    
    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`

export default Countries;
