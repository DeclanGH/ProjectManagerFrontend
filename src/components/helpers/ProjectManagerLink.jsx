import {Link} from "react-router-dom";
import "../../styles/ProjectManagerLinkComponent.css";
import PropTypes from "prop-types";

function ProjectManagerLink({ children, linkTo, onClick }) {

    return (
        <Link className="project-manager-link"
              to={linkTo}
              onClick={onClick}
        >
            {children}
        </Link>
    );
}

ProjectManagerLink.propTypes = {
    children: PropTypes.node,
    linkTo: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

export default ProjectManagerLink;
