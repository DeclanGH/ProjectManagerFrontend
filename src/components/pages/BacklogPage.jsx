import {Button, Col, Container, Row} from "react-bootstrap";
import ProjectPageNavBar from "../navbars/ProjectPageNavBar.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_GROUP_BACKLOG} from "../../graphql/queries.js";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";
import MemberBadgeHandler from "../helpers/MemberBadgeHandler.jsx";
import DateHelper from "../helpers/DateHelper.js";
import {BACKLOG_PAGE_FIELD_NAME, BACKLOG_STATE_NAME, BUTTON_LABEL, ROUTE} from "../../common/constants.js";
import UpdateBacklogModal from "../modals/UpdateBacklogModal.jsx";

function BacklogPage() {
    const { user } = useAuth0();
    const {projectId, groupId, backlogId} = useParams();
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_GROUP_BACKLOG, {
        variables: {
            userEmail: user.email,
            projectId: projectId,
            groupId: groupId,
            backlogId: backlogId,
        }
    });

    const handleBackButtonClick = () => {
        navigate(`${ROUTE.PROJECT}/${projectId}${ROUTE.GROUP}/${groupId}`);
    }

    if (loading) return <LoadingSpinner />;
    if (error) return <p>{error.message}</p>;

    const backlog = data.getGroupBacklog;

    return (
        <div className="project-manager-bg">
            <ProjectPageNavBar />
            <Container className="mt-4">

                <Row>
                    <Col>
                        <h3>{backlog.name}</h3>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <p>
                            <strong>{BACKLOG_PAGE_FIELD_NAME.ISSUED_BY}: </strong>
                            <span style={{display: 'inline'}}>
                                <div style={{ display: 'inline-flex' }}>
                                    <MemberBadgeHandler memberInfo={backlog.creator}/>
                                </div>
                            </span>
                        </p>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <p>
                            <strong>{BACKLOG_PAGE_FIELD_NAME.ISSUE_DATE}: </strong>{DateHelper.convertToReadableFormat(backlog.dateCreated)}
                        </p>
                    </Col>
                </Row>

                {backlog.dateCompleted &&
                    <Row className="mt-2">
                        <Col>
                            <p>
                                <strong>{BACKLOG_PAGE_FIELD_NAME.CLOSED_DATE}: </strong>{DateHelper.convertToReadableFormat(backlog.dateCompleted)}
                            </p>
                        </Col>
                    </Row>
                }

                <Row className="mt-2">
                    <Col>
                        <p>
                            <strong>{BACKLOG_PAGE_FIELD_NAME.DESCRIPTION}: </strong>{backlog.description}
                        </p>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <p>
                            <strong>{BACKLOG_PAGE_FIELD_NAME.STATUS}: </strong>{BACKLOG_STATE_NAME[backlog.state]}
                        </p>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <p>
                            <strong>{BACKLOG_PAGE_FIELD_NAME.ESTIMATED_EFFORT}: </strong>{backlog.effort}
                        </p>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <p>
                            <strong>{BACKLOG_PAGE_FIELD_NAME.ASSIGNED_TO}:</strong>
                            <span style={{display: 'inline'}}>
                                    <div style={{display: 'inline-flex'}}>
                                        <MemberBadgeHandler memberInfo={backlog.assignee}/>
                                    </div>
                            </span>
                        </p>
                    </Col>
                </Row>

                {backlog.assigner &&
                    <Row className="mt-2">
                        <Col>
                            <p>
                                <strong>{BACKLOG_PAGE_FIELD_NAME.ASSIGNED_BY}:</strong>
                                <span style={{display: 'inline'}}>
                                    <div style={{display: 'inline-flex'}}>
                                        <MemberBadgeHandler memberInfo={backlog.assigner}/>
                                    </div>
                                </span>
                            </p>
                        </Col>
                    </Row>
                }

                <Row className="mt-2">
                    <Col>
                        <p>
                            <strong>{BACKLOG_PAGE_FIELD_NAME.ASSIGNED_SPRINT}: </strong>{backlog.sprint?.name}
                        </p>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <Button variant="secondary" onClick={handleBackButtonClick}>{BUTTON_LABEL.BACK}</Button>
                    </Col>
                    <Col className="text-end">
                        <UpdateBacklogModal
                            groupId={groupId}
                            projectId={projectId}
                            backlogId={backlogId}
                            userEmail={user.email}
                            isModifiable={backlog.isModifiable}
                            groupSprintDetails={null}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default BacklogPage;