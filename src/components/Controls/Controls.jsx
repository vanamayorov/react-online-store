import styled from 'styled-components';
import { Col, Row, Container } from 'react-bootstrap';
import { SelectProducts } from '../SelectProducts/SelectProducts';
import { Search } from '../Search/Search';
import { useEffect, useState } from 'react';


const ControlsWrapper = styled.div`
    margin-bottom: 40px;
`;


const Controls = ({ searchProducts }) => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    useEffect(() => {
        searchProducts(sort, search);
    }, [search, sort]); //eslint-disable-line

    return (
        <ControlsWrapper>
            <Container>
                <Row>
                    <Col md={3} className="mb-2 mb-md-0">
                        <SelectProducts setSort={setSort} />
                    </Col>

                    <Col md={9}>
                        <Search setSearch={setSearch} />
                    </Col>
                </Row>
            </Container>
        </ControlsWrapper>

    )
}

export { Controls };