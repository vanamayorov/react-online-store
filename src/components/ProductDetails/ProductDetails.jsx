import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import productsData from '../../data/products.json';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import InputNumber from 'rsuite/esm/InputNumber';
import useCartChange from '../../hooks/useCartChange';

const ImgWrapper = styled.div`
  max-width: 100%;
  padding: 10px;
  height: 340px;
  box-shadow: 0 0 15px #cfcfcf;
`;

const ProductImg = styled.img`
  display: block;
  height: 100%;
  max-width: 100%;
  margin: 0 auto;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 0 0;
  height: 100%;
`;

const ProductDesc = styled.p`
  font-size: 20px;
`;

const ProductPrice = styled.p`
  font-size: 20px;
`;

const ButtonBack = styled.button.attrs(props => ({
  type: 'button'
}))`
  border: none;
  background-color: transparent;
  border-radius: 5px;
  margin-bottom: 25px;
  padding: 5px 15px 5px;
  transition: background-color 0.3s;

  &:hover {
      background-color: rgb(248,249,250);
  }
`;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { cart, addProductWithNum, status } = useCartChange();

  useEffect(() => {
    setProduct({ ...productsData.find(item => item.code === id), number: 1 });
  }, []); //eslint-disable-line

  return (
    <Container>
      <ButtonBack onClick={() => navigate(-1)}>
        <BiArrowBack size={24} /> Вернуться назад
      </ButtonBack>

      <Row>
        <Col sm={12} md={6}>
          <ImgWrapper>
            <ProductImg src={'../' + product.image} alt={product.name} />
          </ImgWrapper>
        </Col>

        <Col sm={12} md={6}>
          {
            status.status === 'added' &&
            <Alert className="mb-3" key="success" variant="success" >
              Товар {status.name} был добавлен в корзину!
            </Alert>
          }

          <ProductInfo>
            <h2>
              {product.name}
            </h2>
            <ProductDesc>
              {product.description}
            </ProductDesc>

            <ProductPrice>Цена: <b>{product.price} ₴</b></ProductPrice>

            <Row>
              {product.count
                ?
                <>
                  <Row className='mb-3 align-items-center'>
                    <Col className="me-3" sm={3} lg={2}>
                      Количество:
                    </Col>
                    <Col sm={6}>
                      <InputNumber
                        defaultValue={cart[product.code]?.number ? cart[product.code].number : 1}
                        min={1}
                        max={product.count}
                        onChange={(val) => setProduct({ ...product, number: val })}
                        readOnly={!!cart[product.code]?.number}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      {cart[product.code]
                        ?
                        <Button as={Link} to="/cart" variant="warning">
                          В корзине
                        </Button>
                        :
                        <Button
                          className="d-inline-block"
                          variant="primary"
                          onClick={() => addProductWithNum(product)}
                        >
                          Добавить в корзину
                        </Button>
                      }
                    </Col>
                  </Row>
                </>
                :
                <Col md={4}>
                  <Button variant="light" disabled>
                    Не доступен
                  </Button>
                </Col>
              }
            </Row>
          </ProductInfo>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetails;