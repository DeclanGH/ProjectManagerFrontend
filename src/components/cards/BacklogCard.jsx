import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {Badge, ListGroup, Stack} from "react-bootstrap";
import ProjectManagerLink from "../helpers/ProjectManagerLink.jsx";
import {ROUTE} from "../../common/constants.js";
import {useParams} from "react-router-dom";
import MemberBadgeHandler from "../helpers/MemberBadgeHandler.jsx";

function BacklogCard({backlog}) {
    const { projectId, groupId} = useParams()
    const [{ isDragging }, drag] = useDrag({
        type: 'BACKLOG',
        item: backlog,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <ListGroup.Item ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Stack direction={"horizontal"} spacing={2} className="mb-2">
                <ProjectManagerLink
                    linkTo={`${ROUTE.PROJECT}/${projectId}${ROUTE.GROUP}/${groupId}${ROUTE.BACKLOG}/${backlog.id}`}
                >
                    {backlog.name}
                </ProjectManagerLink>
                <Badge bg="secondary" className="ms-2" pill>{backlog.effort}</Badge>
            </Stack>

            {backlog.assignee ? (
                <MemberBadgeHandler memberInfo={backlog.assignee}/>
            ) : (
                <p className="mb-0 text-muted">Unassigned</p>
            )}
        </ListGroup.Item>
    );
}

BacklogCard.propTypes = {
    backlog: PropTypes.object.isRequired
}

export default BacklogCard;
