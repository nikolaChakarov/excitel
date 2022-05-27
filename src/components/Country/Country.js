import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import CircularStatic from "../Progress/Progress";
import Modal from '../Modal/Modal';

const Country = (props) => {
    const { flag, name, id } = props;

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
                <div className='country-cover'>{name}</div>

                {showSpinner[id] && (
                    /* spinner component */
                    <div className="spinner">
                        <CircularStatic />
                    </div>
                )}
            </Li>

            {showLiItem[id] && (
                <Modal handlerStartCounter={handlerStartCounter} {...props} />
            )}
        </>
    )
}

const Li = styled.li`
    border-radius: 0.3rem;
    padding: .5rem;
    box-shadow: var(--shadow);
    position: relative;
    cursor: pointer;

    .spinner {
        position: absolute;
        bottom: 0.5rem;
        right: 0;
    }

    &:hover {
        filter: grayscale(0);
    }


    .country-cover {
        text-align: center;
        font-weight: 600;
        color: #777;
        pointer-events: none;
        font-size: 1.4rem;
    }

    .img-wrapper {
        width: 6rem;
        height: 3rem;
        margin-bottom: 0.5rem;
        pointer-events: none;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

export default Country