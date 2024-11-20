import {Link} from "react-router-dom";
import "../../styles/ProjectManagerLinkComponent.css";
import PropTypes from "prop-types";

function ProjectManagerLink({ children, linkTo }) {

    return (
        <Link className="project-manager-link"
              to={linkTo}
        >
            {children}
        </Link>
    );
}

ProjectManagerLink.propTypes = {
    children: PropTypes.node,
    linkTo: PropTypes.string.isRequired,
}

export default ProjectManagerLink;
