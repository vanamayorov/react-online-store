import { Suspense } from 'react'
import { Spinner } from 'react-bootstrap'

const SuspenseWrapper = ({ children }) => {
    return (
        <Suspense fallback={
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        }>
            {children}
        </Suspense>
    )
}

export { SuspenseWrapper };