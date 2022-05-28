import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu } from '@mui/icons-material';

import useWidth from '../../hooks/useWidth';

import logo from '../../assets/img/logo.png'

const Nav = () => {

    const width = useWidth();

    return (
        <>
            {width > 576 ? <DesktopMenu /> : <MobileMenu />}
        </>
    )
};

/* desktop > 576 px */
const DesktopMenu = () => {
    return (
        <DesktopNav className='desktop-nav'>
            <div className="image-wrapper">
                <img src={logo} alt="excitel logo" />
            </div>
            <ul className='menu-links'>
                <li><Link to={'/'}>Countries</Link></li>
                <li><Link to={'/about'}>About</Link></li>
            </ul>
        </DesktopNav>
    )
}

/* mobile <= 576 px */
const MobileMenu = () => {

    const [menuClick, setMenuClick] = useState(false);

    return <MobileNav>
        <div className="visible-wrapper">
            <img src={logo} alt="excitel logo" />

            <Menu
                className='menu-icon'
                onClick={() => setMenuClick(!menuClick)}
            />
        </div>

        {menuClick && <ul className='menu-mobile-links'>
            <li onClick={() => setMenuClick(false)}><Link to={'/'}>Countries</Link></li>
            <li onClick={() => setMenuClick(false)}><Link to={'/about'}>About</Link></li>
        </ul>}

    </MobileNav>
}

const DesktopNav = styled.nav`
    display: flex;
    padding: 1.5rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px groove var(--grey);

    ul.menu-links {
        display: flex;

        li {
            margin-right: 2rem;
            &:hover {
                transform: scale(1.05);
            }

            &:last-of-type {
                margin-right: 0;
            }

            a {
                font-weight: bold;
                color: var(--blue-green);
            }
        }
    }
`

const MobileNav = styled.nav`
    display: flex;
    flex-direction: column;
    border-bottom: 1px groove var(--grey);
    
    .visible-wrapper {
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .menu-icon {
        font-size: 3rem;
        color: var(--blue-green);
    }

    .menu-mobile-links {
        border-top: 1px groove #fff;
        li {
            display: flex;
        }

        li a {
            font-size: 1.6rem;
            font-weight: bold;
            padding: 1rem;
            flex: 1;
            display: flex;
            justify-content: flex-end;
            border-bottom: 1px groove #fff;
            background: var(--purple);
            color: #fff;
        }
    }
`

export default Nav;