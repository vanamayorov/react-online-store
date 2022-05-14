import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Header = () => {
    return (
        <>
            <Navbar className='mb-4' collapseOnSelect expand="md" bg="primary" variant="dark">
                <Container>
                    <NavLink className="navbar-brand fs-6" to="/">Интернет Магазин</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/">Все товары</Nav.Link>
                            <Nav.Link as={NavLink} to="/cart">Корзина</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>

    )
}

export default Header;