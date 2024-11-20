import {Accordion, Badge, Col, ListGroup, Row} from "react-bootstrap";
import {FaSyncAlt} from "react-icons/fa";
import CreateSprintModal from "../modals/CreateSprintModal.jsx";
import {useParams} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {useQuery} from "@apollo/client";
import {GET_GROUP_SPRINTS} from "../../graphql/queries.js";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";
import {ROUTE} from "../../common/constants.js";
import ProjectManagerLink from "../helpers/ProjectManagerLink.jsx";
import SprintBadgeHandler from "../helpers/SprintBadgeHandler.jsx";

function SprintsAccordion() {
    const { user } = useAuth0();
    const userEmail = user?.email;
    const {projectId, groupId} = useParams()

    const { loading, error, data, refetch } = useQuery(GET_GROUP_SPRINTS, {
        variables: {
            userEmail: user.email,
            projectId: projectId,
            groupId: groupId
        }
    });

    if (loading) return (<LoadingSpinner />);
    if (error) return (<p>{error.message}</p>);

    const groupSprints = data?.getGroupSprints;
    const sprintBacklogsArray = groupSprints?.backlogs;
    console.log(sprintBacklogsArray)

    const handleRefresh = () => {
        refetch();
    }


    return (
        <div className="p-3">

            <Row className="mb-3">
                <Col xs="auto">
                    <FaSyncAlt style={{cursor: "pointer"}} onClick={handleRefresh}/>
                </Col>
                <Col className="text-end">
                    <CreateSprintModal
                        groupId={groupId}
                        projectId={projectId}
                        userEmail={userEmail}
                    />
                </Col>
            </Row>

            <Accordion defaultActiveKey="0">
                {groupSprints && groupSprints.length > 0 ? (
                    groupSprints.map((sprintDetail, index) => (
                        <Accordion.Item eventKey={String(index)} key={sprintDetail.id}>
                            <Accordion.Header>
                                <Row className="w-100 align-items-center">
                                    <Col className="d-flex align-items-center">
                                        <span>
                                            <ProjectManagerLink linkTo={`${ROUTE.PROJECT}/${projectId}${ROUTE.GROUP}/${groupId}${ROUTE.SPRINT}/${sprintDetail.id}`}>
                                                {sprintDetail.name}
                                            </ProjectManagerLink>
                                        </span>
                                        <SprintBadgeHandler sprintDetail={sprintDetail} />
                                    </Col>

                                    <Col xs="auto" className="text-muted">
                                        {sprintDetail.startDate} - {sprintDetail.endDate}
                                    </Col>
                                </Row>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {sprintDetail.backlogs && sprintDetail.backlogs.length > 0 ? (
                                        sprintDetail.backlogs.map((backlog) => (
                                            <ListGroup.Item key={backlog.id} >
                                                <ProjectManagerLink
                                                    linkTo={`${ROUTE.PROJECT}/${projectId}${ROUTE.GROUP}/${groupId}${ROUTE.BACKLOG}/${backlog.id}`}
                                                >
                                                    {backlog.name}
                                                </ProjectManagerLink>
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <div className="text-center text-muted">
                                            <p>No backlogs yet. Go to the backlog page to add one</p>
                                        </div>
                                    )}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                ) : (
                    <div className="text-center text-muted">
                        <p>No sprints yet. Be the first to create one :)</p>
                    </div>
                )}
            </Accordion>
        </div>
    );
}

export default SprintsAccordion;
