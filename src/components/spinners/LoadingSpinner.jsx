import { Spinner, Stack } from 'react-bootstrap';

function LoadingSpinner() {

    return (
        <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999
        }}>
            <Stack direction="horizontal" spacing={0}>
                <Spinner animation="grow" variant="secondary" size="lg" />
                <Spinner animation="grow" variant="primary" size="lg" />
            </Stack>
        </div>
    );
}

export default LoadingSpinner;


