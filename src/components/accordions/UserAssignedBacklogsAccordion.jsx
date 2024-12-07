import {Accordion, ListGroup} from "react-bootstrap";
import ProjectManagerLink from "../helpers/ProjectManagerLink.jsx";
import {ROUTE} from "../../common/constants.js";
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_NOT_COMPLETED_ASSIGNED_BACKLOGS} from "../../graphql/queries.js";
import {useAuth0} from "@auth0/auth0-react";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";

function UserAssignedBacklogsAccordion() {
    const { user } = useAuth0();
    const {projectId, groupId} = useParams();
    const listGroupRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    const {
        loading: assignedBacklogsLoading,
        error: assignedBacklogsError,
        data: assignedBacklogsData } = useQuery(GET_NOT_COMPLETED_ASSIGNED_BACKLOGS, {
        variables: {
            userEmail: user.email,
            projectId: projectId,
            groupId: groupId,
        },
        fetchPolicy: "cache-and-network",
    });

    const assignedBacklogs = assignedBacklogsData?.getNotCompletedAssignedBacklogs;

    useEffect(() => {
        const listGroupElement = listGroupRef.current;
        if (listGroupElement) {
            setIsOverflowing(listGroupElement.scrollHeight > listGroupElement.clientHeight + 40);
        }
    }, [assignedBacklogs]);

    return(
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header><h5>Assigned Backlogs</h5></Accordion.Header>
                <Accordion.Body>
                    {assignedBacklogsLoading && <LoadingSpinner/>}
                    {assignedBacklogsError && <p className="text-center">Error loading your assigned backlogs.</p>}
                    {assignedBacklogs && !assignedBacklogsError &&
                        <ListGroup ref={listGroupRef} style={{maxHeight: "200px", overflowY: "auto"}}>
                            {assignedBacklogs.length > 0 ? (
                                assignedBacklogs.map((backlog, index) => (
                                    <ListGroup.Item key={index}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <ProjectManagerLink
                                                linkTo={`${ROUTE.PROJECT}/${projectId}${ROUTE.GROUP}/${groupId}${ROUTE.BACKLOG}/${backlog.id}`}
                                            >
                                                {backlog.name}
                                            </ProjectManagerLink>
                                        </div>
                                    </ListGroup.Item>
                                ))) : (
                                <center><p>You have no backlogs assigned to you.</p></center>)
                            }
                        </ListGroup>}
                    {isOverflowing && <div className="mt-3 text-muted fst-italic">scroll to see more</div>}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default UserAssignedBacklogsAccordion;
