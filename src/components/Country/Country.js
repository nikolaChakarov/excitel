import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import CircularStatic from "../Progress/Progress";

const Country = (props) => {
    const { capitalName, code, flag, name, population, region, subregion, id } = props;

    /* li handlers */
    let showLiTimer = useRef(null);

    const [showLiItem, setShowLiItem] = useState({});
    const [showLiItemCounter, setShowLiItemCounter] = useState(0);
    const [itemId, setItemId] = useState(null);

    const [showSpinner, setShowSpinner] = useState({});

    const handlerStartCounter = (e) => {
        // this if -> not to whait when we close the LI
        if (showLiItemCounter > 0) {
            setShowLiItem({});
            setShowLiItemCounter(0);
            return;
        }

        setShowSpinner({ [e.target.dataset.id]: true });

        showLiTimer.current = setInterval(() => {
            setShowLiItemCounter((prev) => prev + 1);
            setItemId(e.target.dataset.id);
        }, 3000);
    };

    const handlerStopCounter = () => {
        clearInterval(showLiTimer.current);
        showLiTimer.current = null;
        setItemId(null);
        setShowSpinner({});
    };

    const onItemClick = (id) => {
        const currentItemId = id;

        setShowLiItem({ [currentItemId]: !showLiItem[currentItemId] });
    };

    useEffect(() => {
        if (showLiItemCounter > 0) {
            onItemClick(itemId);
        }

        return () => handlerStopCounter();
    }, [showLiItemCounter]);

    /* end li handlers */
    return (
        <>
            <Li data-id={id}
                onMouseDown={handlerStartCounter}
                onMouseUp={handlerStopCounter}
                onMouseLeave={handlerStopCounter}>
                <div className="img-wrapper">
                    <img src={flag} alt={name} />
                </div>

                {showSpinner[id] && (
                    <div className="spinner">
                        <CircularStatic />
                    </div>
                )}
            </Li>

            {showLiItem[id] && (
                <div style={{ opacity: 1, visibility: "visible" }}>
                    <span>
                        This ID: {id} has this name: {name}
                    </span>
                </div>
            )}
        </>
    )
}

const Li = styled.li`
    border: 2px dashed red;
    cursor: pointer;

    .img-wrapper {
        width: 6rem;
        height: 3rem;
        border: 1px dashed;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
export default Country