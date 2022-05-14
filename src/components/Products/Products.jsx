import { useCallback, useContext, useEffect, useState } from 'react';
import useCartChange from '../../hooks/useCartChange';
import usePagination from '../../hooks/usePagination';
import useModal from '../../hooks/useModal';
import getTotalPages from '../../utils/getTotalPages';
import setProductsOnPage from '../../utils/setProductsOnPage';
import { ProductCard } from '../Card';
import { Pagination } from '../Pagination';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import { Title } from '../UI/Title';
import { ProductModal } from '../UI/ProductModal/ProductModal';
import { CartContext } from '../../store';
import { Controls } from '../Controls';
import { Alert } from 'react-bootstrap';


const Products = ({ products }) => {
    const { productsToShow } = useContext(CartContext);
    const [productsByNum, setProductsByNum] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const { addToCart } = useCartChange();
    const [totalPages, setTotalPages] = useState(0);
    const pagesArr = usePagination(totalPages);
    const [open, setOpen, closeModal] = useModal();
    const [productAdded, setProductAdded] = useState(null);


    useEffect(() => {
        setTotalPages(getTotalPages(products.length, productsToShow));
        setProductsByNum(setProductsOnPage(products, productsToShow, totalPages));
    }, []); //eslint-disable-line

    const newAddToCart = product => {
        addToCart(product);
        setProductAdded(product);
        setOpen(true);
    }

    const debounce = useCallback((callback, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback.apply(this, args);
            }, delay);
        }
    }, []);

    const searchProducts = debounce((sort = "", search = "") => {
        let copyArr = [...products];

        if (sort === 'asc') copyArr = copyArr.sort((a, b) => a.price - b.price);
        if (sort === 'desc') copyArr = copyArr.sort((a, b) => b.price - a.price);

        if (search) copyArr = copyArr.filter(item => item.name.toLowerCase().includes(search.toLowerCase().trim()));

        setProductsByNum(setProductsOnPage(copyArr, productsToShow, getTotalPages(copyArr.length, productsToShow)));
        setTotalPages(getTotalPages(copyArr.length, productsToShow));
    }, 100);

    return (
        <Container>
            <Title>Каталог</Title>
            {open && <ProductModal open={open} closeModal={closeModal} product={productAdded} />}

            <Controls searchProducts={searchProducts} />
            <Row>
                {productsByNum[currentPage]?.map(product => (
                    <ProductCard
                        key={product.name}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                        count={product.count}
                        code={product.code}
                        addToCart={newAddToCart}
                    />
                ))}
            </Row>

            {
                Object.values(productsByNum).length
                    ?
                    <Pagination
                        pagesArr={pagesArr}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                    :
                    <Alert key="primary" variant="primary">No products found...</Alert>
            }
        </Container >

    )
}

export default Products;