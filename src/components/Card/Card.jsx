import useCartChange from "../../hooks/useCartChange";
import { Link } from 'react-router-dom';
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './Card.module.scss';


const ProductCard = ({ name, image, price, count, code, addToCart }) => {
    const { cart } = useCartChange();

    const productObj = { name, image, price, count, code };

    return (
        <Col className="mb-3 mb-md-4" sm={6} md={4}>
            <div className={styles.thumbnail}>
                <img className={styles.img} src={image} alt={name} />
                <Card.Body className={styles.caption}>
                    <h3>{name}</h3>
                    <p>{price} ₴</p>
                    <div className="mt-auto">
                        {count
                            ?
                            !cart[code] ?
                                <Button
                                    onClick={() => addToCart(productObj)}
                                    variant="primary">
                                    В корзину
                                </Button>
                                : <Button as={Link} to="/cart" variant="warning">
                                    В корзине
                                </Button>
                            :
                            <Button variant="light" disabled>
                                Не доступен
                            </Button>
                        }
                        <Button as={Link} to={`/products/${code}`} variant="link">Подробнее</Button>
                    </div>
                </Card.Body>
            </div>
        </Col>
    )
};

export { ProductCard };