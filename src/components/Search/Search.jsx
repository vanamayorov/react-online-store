import React from 'react'
import { Form } from 'react-bootstrap';

const Search = ({ setSearch }) => {
    return (
        <Form.Control
            onChange={e => setSearch(e.target.value)}
            type="search"
            placeholder="Введите название товара..." />
    )
}

export { Search };