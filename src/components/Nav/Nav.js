import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/logo.png'

const Nav = () => {
    return (
        <NavEl>
            <div className="image-wrapper">
                <img src={logo} alt="excitel logo" />
            </div>
            <ul className='menu-links'>
                <li><Link to={'/'}>Countries</Link></li>
                <li><Link to={'/about'}>About</Link></li>
            </ul>
        </NavEl>
    )
};

const NavEl = styled.nav`
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

export default Nav;