import useCartChange from '../../hooks/useCartChange';
import { CartContext } from '../../store';
import { useContext } from 'react';
import { clearCart } from '../../actionCreators/clearCart';
import { Title } from '../UI/Title';
import { CartTable } from '../CartTable';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const Cart = () => {
    const { dispatch } = useContext(CartContext);
    const { cart, addToCart, deleteFromCart, clearSameProducts, status } = useCartChange();
    return (
        <>
            <Container>
                <Title>Корзина</Title>
                <div>
                    {!Object.keys(cart).length
                        ?
                        <Alert key="info" variant="info">
                            Ваша корзина пустая, добавьте товары...
                        </Alert>
                        : <>
                            {
                                status.status === 'added' &&
                                <Alert className="mt-3" key="success" variant="success" >
                                    Товар {status.name} был добавлен в корзину!
                                </Alert>
                            }

                            {
                                status.status === 'deleted' &&
                                <Alert className="mt-3" key="danger" variant="danger" >
                                    Товар {status.name} был удален из корзины!
                                </Alert>
                            }

                            <CartTable cart={cart} addToCart={addToCart} deleteFromCart={deleteFromCart} clearSameProducts={clearSameProducts} />

                            <br />
                            <ButtonGroup className="pb-3">
                                <Button as={Link} to="/order" className="me-2" variant="success">Оформить заказ</Button>
                                <Button variant="warning" onClick={() => dispatch(clearCart())}>Очистить корзину</Button>
                            </ButtonGroup >
                        </>
                    }
                </div>
            </Container>
        </>

    )
}

export default Cart;