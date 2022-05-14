import { memo } from "react";
import Row from "react-bootstrap/Row";
import Pagination from 'react-bootstrap/Pagination';

const ProductsPagination = ({ pagesArr, currentPage, setCurrentPage }) => {
    return (
        <Row>
            <Pagination className="justify-content-center">
                <Pagination.Item
                    onClick={() => setCurrentPage((page) => page - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Pagination.Item>
                {pagesArr.map((page) => (
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
                <Pagination.Item
                    onClick={() => setCurrentPage((page) => page + 1)}
                    disabled={pagesArr.length === currentPage}
                >
                    Next
                </Pagination.Item>
            </Pagination>
        </Row>
    );
};

const memoPagination = memo(ProductsPagination);
export { memoPagination as Pagination };
