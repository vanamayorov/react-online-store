import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/esm/Table';
import { Link } from 'react-router-dom';
import calculateOrderPrice from '../../utils/calculateOrderPrice';

const CartTable = ({ cart, addToCart, deleteFromCart, clearSameProducts }) => {
    return (
        <Table striped responsive="sm">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Кол-во</th>
                    <th>Цена</th>
                    <th>Стоимость</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(cart).map(product => (
                    <tr key={product.name}>
                        <td>
                            <Link to={`/products/${product.code}`}>
                                <img className='d-block d-md-inline' height={56} src={product.image} alt={product.name} />
                                {product.name}
                            </Link>
                        </td>
                        <td>
                            <span className="d-block d-md-inline badge text-dark">{product.number}</span>
                            <div className="btn-group">
                                <Button
                                    variant='danger'
                                    onClick={() => deleteFromCart(product)}>
                                    -
                                </Button>

                                <Button
                                    variant='success'
                                    onClick={() => addToCart(product)}>
                                    +
                                </Button>
                                <Button
                                    variant='warning'
                                    onClick={() => clearSameProducts(product)}>
                                    x
                                </Button>
                            </div>
                        </td>
                        <td>{product.price} ₴</td>
                        <td>{product.price * product.number} ₴</td>
                    </tr>
                ))}

                <tr>
                    <td colSpan="3">Общая стоимость:</td>
                    <td>{calculateOrderPrice(cart)} ₴</td>
                </tr>
            </tbody>
        </Table>
    )
}

export {CartTable};