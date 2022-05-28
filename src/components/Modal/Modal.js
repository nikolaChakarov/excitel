import React from 'react';
import styled from 'styled-components';

const Modal = (props) => {

    const { handlerStartCounter, name, capitalName, code, flag, population, region, subregion } = props;

    const onModuleClick = (e) => {
        e.stopPropagation();

        handlerStartCounter();
    }

    return (
        <ModalContainer onClick={onModuleClick} className="modal-container">
            <InfoEl imgUrl={flag}>
                <div className="bg">
                    <p>Country: <span>{name}</span></p>
                    <p>Capital name: <span>{capitalName}</span></p>
                    <p>Code: <span>{code}</span></p>
                    <p>Population: <span>{population}</span></p>
                    <p>Region: <span>{region}</span></p>
                    <p>Subregion: <span>{subregion}</span></p>
                </div>
            </InfoEl>
        </ModalContainer>
    )
}


const ModalContainer = styled.div`
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
`

const InfoEl = styled.div`
        background-image: url(${({ imgUrl }) => imgUrl});
        background-repeat: no-repeat;
        background-size:  cover;
        background-position: center;
        padding: 2rem;
        border-radius: 0.3rem;
        box-shadow: var(--shadow);
        
        .bg {
            background: rgba(255, 255, 255, .5);
            border-radius: 0.3rem;
            padding: 2rem;
            box-shadow: var(--innerShadow);
            p {
                margin-bottom: .5rem;

                &:last-of-type {
                    margin-bottom: 0;
                }

                span {
                    font-weight: bold;
                }
            }
        }
`

export default Modal