import {useDrop} from "react-dnd";
import {Card, Col, ListGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import BacklogCard from "./BacklogCard.jsx";

function SprintPageColumnCard({title, backlogs, onMoveBacklog}) {
    const [,drop] = useDrop({
        accept: 'BACKLOG',
        drop: (backlog) => onMoveBacklog(backlog),
    });

    return (
        <Col ref={drop} md={3}>
            <Card className="mb-4">
                <Card.Header as="h5" className="text-center">
                    {title}
                </Card.Header>
                <ListGroup variant="flush">
                    {backlogs.map((backlog) => (
                        <BacklogCard
                            key={backlog.id}
                            backlog={backlog}
                        />
                    ))}
                </ListGroup>
            </Card>
        </Col>
    );
}

SprintPageColumnCard.propTypes = {
    title: PropTypes.string,
    backlogs: PropTypes.array.isRequired,
    onMoveBacklog: PropTypes.func.isRequired,
}

export default SprintPageColumnCard;
