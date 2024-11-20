import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import {Children} from "react";

function ResponsiveTwoColumnLayout({ children }) {
    return (
        <Row>
            {Children.toArray(children).map((child, index) => (
                <Col
                    key={index}
                    lg={6}
                    className="mb-3"
                >
                    {child}
                </Col>
            ))}
        </Row>

    );
}

ResponsiveTwoColumnLayout.propTypes = {
    children: PropTypes.node,
}

export default ResponsiveTwoColumnLayout;