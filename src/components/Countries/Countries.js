import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";

import { GlobalContext } from "../../context/GobalState";
import useWidth from "../../hooks/useWidth";
import {
    FirstPage,
    LastPage,
    ChevronLeftOutlined,
    ChevronRightOutlined,
} from "@mui/icons-material";

import Controls from "../Controls/Controls";
import Country from '../Country/Country';

const Countries = () => {
    const { getAllCountries, countries, filtered, sortByQuery, dispatch } = useContext(GlobalContext);

    const width = useWidth();

    /* pagination */
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 12;
    const pagesVisited = (activePage - 1) * itemsPerPage;
    const displayItems = filtered.length > 0 ? filtered.slice(pagesVisited, pagesVisited + itemsPerPage) : countries.slice(pagesVisited, pagesVisited + itemsPerPage);

    const changePage = (num) => {
        setActivePage(num);
    };
    /* end pagination */

    useEffect(() => {
        getAllCountries();
        // // clear sort
        sortByQuery('country name');

        return () => {
            // clear filtered array
            dispatch({
                type: 'CLEAR_SEARCH'
            });
        }
    }, []);

    return (
        <CountriesContainer className="countries-main">
            <Controls />

            <Ul className="countries-list">
                {displayItems.map((el, i) => (
                    <Country key={i} {...el} id={i} />
                ))}
            </Ul>

            <Pagination
                totalItemsCount={filtered.length > 0 ? filtered.length : countries.length}
                onChange={changePage}
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                pageRangeDisplayed={width > 576 ? 5 : 3}
                firstPageText={<FirstPage />}
                prevPageText={<ChevronLeftOutlined />}
                lastPageText={<LastPage />}
                nextPageText={<ChevronRightOutlined />}
                innerClass={"pagination-container"}
                itemClass={"pagination-item"}
                linkClass={"pagination-link"}
                itemClassFirst={"pagination-btn-end"}
                itemClassLast={"pagination-btn-end"}
                itemClassNext={"pagination-btn"}
                itemClassPrev={"pagination-btn"}
                activeLinkClass={"pagination-active"}
            />
        </CountriesContainer>
    );
};

/* styles */
const CountriesContainer = styled.section`
        flex: 1;
        display: flex;
        flex-direction: column; 

    .pagination-container {
		* {
			padding: 0;
			margin: 0;
		}
		display: flex;
		justify-content: center;
		margin-top: auto;
		margin-bottom: 2rem;
		.pagination-item {
			border: 1px groove #fff;
			width: 5rem;
			height: 3rem;
			display: flex;
			margin-right: 1rem;
			&:last-of-type {
				margin-right: 0;
			}
		}
		.pagination-link {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			text-decoration: none;
			color: #333;
		}
		.pagination-active {
			background: #333;
			color: #fff;
			transition: all 0.2s ease-in-out;
		} 
    }

    @media (max-width: 576px) {
        overflow-y: scroll;

        ul.countries-list {
            overflow-y: scroll;
        }

        .pagination-container {

            .pagination-item {
                width: 3.8rem;
            }
        }
    }
`;

const Ul = styled.ul`
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    height: 100%;
    gap: 1rem;
    margin-bottom: 20px; 
    
    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
`

export default Countries;
