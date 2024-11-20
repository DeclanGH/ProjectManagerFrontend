import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../styles/ProjectCard.css";

function ProjectCard({ title, description, color }) {

    return (
        <Card className="h-100 project-card">
            <Card.Img
                variant="top"
                style={{ backgroundColor: color, height: "120px" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="text-truncate">{title}</Card.Title>
                <Card.Text
                    className="flex-grow-1 text-muted"
                    style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default ProjectCard;
