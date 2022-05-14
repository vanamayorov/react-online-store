import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { ModalWrapper } from "../ModalWrapper";
import InputNumber from 'rsuite/InputNumber';
import styles from './ProductModal.module.scss';
import useCartChange from '../../../hooks/useCartChange';
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

const ProductModal = ({ open, closeModal, product }) => {
  const { addProductWithNum } = useCartChange();

  return (
    <ModalWrapper title="Товар был добавлен в корзину!" open={open} closeModal={closeModal}>
      <Row className="mb-3 mb-md-0">
        <Col xs={4}>
          <img className={styles.img} src={product.image} alt={product.name} />
        </Col>
        <Col xs={8}>
          <div className={styles.title}>{product.name}</div>
          <div><b>{product.price} ₴</b></div>
          <div className={styles.qty}>
            К-ство: 
            <InputNumber
              className={styles.input}
              defaultValue={1}
              min={1}
              max={product.count}
              onChange={(val) => addProductWithNum({ ...product, number: +val })}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className={styles.bottom}>
          <Button as={Link} variant="primary" to="/cart">Перейти в корзину</Button>
        </Col>
      </Row>
    </ModalWrapper>
  )
}

export { ProductModal };