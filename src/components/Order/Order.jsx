import { Title } from '../UI/Title';
import { BiArrowBack } from "react-icons/bi";
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';
import useCartChange from '../../hooks/useCartChange';
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import calculateOrderPrice from '../../utils/calculateOrderPrice';
import { useContext } from 'react';
import { CartContext } from '../../store';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { clearCart } from '../../actionCreators/clearCart';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';

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

const AlertMsg = styled.p`
    font-size: 12px;
    color: red;
`;

const StepTitle = styled.div`
    margin-bottom: 15px;
    font-size: 18px;
    background-color: rgb(248,249,250);
    border-radius: 5px;
`;

const Order = () => {
    const { data, setValues, dispatch, clearData } = useContext(CartContext);
    const navigate = useNavigate();
    const { cart } = useCartChange();
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            city: data.city,
            payment: data.payment
        }
    });

    const cities = [
        { value: 'kiev', label: 'Киев' },
        { value: 'odesa', label: 'Одесса' },
        { value: 'kharkov', label: 'Харьков' },
    ];


    const onSubmit = () => {
        let formData = new FormData();

        for (let item in data) {
            formData.append(item, data[item]);
        }

        Swal.fire(
            'Заказ оформлен!',
            `Ваш номер заказа:<br /> ${uuidv4()}`,
            'success'
        );

        clearData();
        dispatch(clearCart());
    }

    if (!Object.values(cart).length) return <Navigate to="/" replace />;

    return (
        <Container>
            <Row>
                <Title>Оформление заказа</Title>
                <div>
                    <ButtonBack onClick={() => navigate(-1)}>
                        <BiArrowBack size={24} /> Вернуться назад
                    </ButtonBack>
                </div>

                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={7} className="mb-4">
                            <Row className="mb-3">
                                <StepTitle>
                                    1. Ваши контактные данные
                                </StepTitle>
                                <Col md={6}>
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control
                                        className={!!errors.lastName && "is-invalid"}
                                        type="text"
                                        {...register("lastName", { required: true })}
                                        onChange={e => setValues({ ...data, lastName: e.target.value })}
                                    />
                                    {!!errors.lastName && <AlertMsg>{errors?.lastName?.message}</AlertMsg>}
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        className={!!errors.firstName && "is-invalid"}
                                        type="text"
                                        {...register("firstName", { required: true })}
                                        onChange={e => setValues({ ...data, firstName: e.target.value })}
                                    />
                                    {!!errors.lastName && <AlertMsg>{errors?.firstName?.message}</AlertMsg>}
                                </Col>

                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Мобильный телефон</Form.Label>
                                    <Form.Control
                                        className={!!errors.phone && "is-invalid"}
                                        as={InputMask}
                                        mask="+380999999999"
                                        maskChar={null}
                                        type="tel"
                                        {...register("phone", { required: true })}
                                        onChange={e => setValues({ ...data, phone: e.target.value })}
                                    />
                                    {!!errors.phone && <AlertMsg>{errors?.phone?.message}</AlertMsg>}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <StepTitle>
                                    2. Доставка
                                </StepTitle>
                                <Col>
                                    <Controller
                                        control={control}
                                        name="city"
                                        render={({ field: { onChange, ref, value } }) => (
                                            <Select
                                                defaultValue={cities.find(i => i.value === value)}
                                                inputRef={ref}
                                                options={cities}
                                                onChange={val => {
                                                    onChange(val.value);
                                                    setValues({ ...data, city: val.value });
                                                }}
                                                placeholder="Введите населенный пункт Украины"
                                            />
                                        )}
                                    />

                                    {!!errors.city && <AlertMsg>{errors?.city?.message}</AlertMsg>}

                                </Col>
                            </Row>

                            <Row>
                                <StepTitle>
                                    3. Оплата
                                </StepTitle>
                                <Col>
                                    <Form.Check
                                        {...register("payment")}
                                        type="radio"
                                        id="default-radio1"
                                        value="cash"
                                        label="Оплата наличными"
                                        onChange={e => setValues({ ...data, payment: e.target.value })}

                                    />
                                    <Form.Check
                                        {...register("payment")}
                                        type="radio"
                                        id="default-radio2"
                                        value="card"
                                        label="Оплата картой"
                                        onChange={e => setValues({ ...data, payment: e.target.value })}

                                    />
                                    <Form.Check
                                        {...register("payment")}
                                        type="radio"
                                        id="default-radio3"
                                        value="privat"
                                        label="PrivatPay"
                                        onChange={e => setValues({ ...data, payment: e.target.value })}
                                    />
                                    {!!errors.payment && <AlertMsg>{errors?.payment?.message}</AlertMsg>}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5}>
                            <Card
                                bg='light'
                                key='light'
                                text='dark'
                                className="mb-2 sticky-top"
                            >
                                <Card.Body>
                                    <h4>Итого </h4>
                                    <div className="mb-2">
                                        <Table className="mb-2" responsive="lg">
                                            <thead>
                                                <tr>
                                                    <th>Н-ие</th>
                                                    <th>К-тво</th>
                                                    <th>Ценa</th>
                                                    <th>С-ть</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.values(cart).map(item => (
                                                    <tr key={item.name}>
                                                        <td>{item.name}</td>
                                                        <td>{item.number}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.price * item.number}</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td colSpan="3">Общая стоимость:</td>
                                                    <td>{calculateOrderPrice(cart)} ₴</td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                    </div>
                                    <Button className="d-block w-100" variant="primary" type="submit">
                                        Заказ подтверждаю
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Form>

            </Row>
        </Container >
    )
}

export default Order;