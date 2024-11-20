import {Card, CardHeader} from "react-bootstrap";
import PropTypes from "prop-types";

function GeneralCard({ children, padding, title }) {
    return (
        <div className={padding ? padding : "p-0"}>
            <Card className="m-2">
                <div style={{boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)"}}>
                    {title &&
                        <CardHeader>
                            {title && <Card.Title>{title}</Card.Title>}
                        </CardHeader>
                    }
                    <Card.Body /*className="d-flex justify-content-center align-items-center"*/>
                        {children}
                    </Card.Body>
                </div>

            </Card>
        </div>
    );
}

GeneralCard.propTypes = {
    children: PropTypes.node,
    padding: PropTypes.string,
    title: PropTypes.string,
}

export default GeneralCard;
