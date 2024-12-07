import {Col, Row, Table} from "react-bootstrap";
import {FaSyncAlt} from "react-icons/fa";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {BACKLOG_STATE_NAME, BACKLOG_TABLE_HEADER, ROUTE, SPECIAL_CHAR} from "../../common/constants.js";
import {useQuery} from "@apollo/client";
import {GET_GROUP_BACKLOGS} from "../../graphql/queries.js";
import {useAuth0} from "@auth0/auth0-react";
import {useParams} from "react-router-dom";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";
import CreateBacklogModal from "../modals/CreateBacklogModal.jsx";
import ProjectManagerLink from "../helpers/ProjectManagerLink.jsx";

function BacklogsTable() {
    const { user } = useAuth0();
    const {projectId, groupId} = useParams();
    const [backlogStatusFilter, setBacklogStatusFilter] = useState("");
    const [memberAssignmentStatusFilter, setMemberAssignmentStatusFilter] = useState("");
    const [sprintAssignmentStatusFilter, setSprintAssignmentStatusFilter] = useState("");

    const { loading, error, data, refetch } = useQuery(GET_GROUP_BACKLOGS, {
        variables: {
            userEmail: user.email,
            projectId: projectId,
            groupId: groupId,
        }
    });

    const backlogStatusNames = [
        BACKLOG_STATE_NAME.NOT_STARTED,
        BACKLOG_STATE_NAME.IN_PROGRESS,
        BACKLOG_STATE_NAME.BLOCKED,
        BACKLOG_STATE_NAME.COMPLETED
    ];
    const MEMBER_ASSIGNMENT_STATUS = {
        ASSIGNED: "Member Assigned",
        UNASSIGNED: "Member Unassigned",
    };
    const SPRINT_ASSIGNMENT_STATUS = {
        ASSIGNED: "Sprint Assigned",
        UNASSIGNED: "Sprint Unassigned",
    };

    const handleBacklogStatusFilterSelection = (e) => {
        setBacklogStatusFilter(e.target.value);
    }

    const handleBacklogMemberAssignmentStatusFilterSelection = (e) => {
        setMemberAssignmentStatusFilter(e.target.value);
    }

    const handleBacklogSprintAssignmentStatusFilter = (e) => {
        setSprintAssignmentStatusFilter(e.target.value);
    }

    const handleRefresh = () => {
        refetch();
    };

    if (loading) return <LoadingSpinner />;
    if (error) return (<p>{error.message}</p>);

    const groupBacklogs = data?.getGroupBacklogs;

    const filteredData = groupBacklogs.filter((backlog) => {
        const statusMatch = !backlogStatusFilter || BACKLOG_STATE_NAME[backlog.state] === backlogStatusFilter;

        const memberMatch = !memberAssignmentStatusFilter ||
            (memberAssignmentStatusFilter === MEMBER_ASSIGNMENT_STATUS.ASSIGNED && backlog.assignee !== null) ||
            (memberAssignmentStatusFilter === MEMBER_ASSIGNMENT_STATUS.UNASSIGNED && backlog.assignee === null);

        const sprintMatch = !sprintAssignmentStatusFilter ||
            (sprintAssignmentStatusFilter === SPRINT_ASSIGNMENT_STATUS.ASSIGNED && backlog.sprint !== null) ||
            (sprintAssignmentStatusFilter === SPRINT_ASSIGNMENT_STATUS.UNASSIGNED && backlog.sprint === null);

        return statusMatch && memberMatch && sprintMatch;
    });

    return (
        <div className="p-3">
            <Row className="align-items-center">
                <Col xs="auto">
                    <FaSyncAlt onClick={handleRefresh} style={{cursor: "pointer"}}/>
                </Col>
                <Col>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Select
                                    value={backlogStatusFilter}
                                    onChange={handleBacklogStatusFilterSelection}
                                    aria-label="Filter by Status"
                                >
                                    <option value="">
                                        {SPECIAL_CHAR.LESS_THAN}none{SPECIAL_CHAR.GREATER_THAN}
                                    </option>
                                    {backlogStatusNames.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select
                                    value={memberAssignmentStatusFilter}
                                    onChange={handleBacklogMemberAssignmentStatusFilterSelection}
                                    aria-label="Filter by Member"
                                >
                                    <option value="">
                                        {SPECIAL_CHAR.LESS_THAN}none{SPECIAL_CHAR.GREATER_THAN}
                                    </option>
                                    {Object.values(MEMBER_ASSIGNMENT_STATUS).map((member) => (
                                        <option key={member} value={member}>{member}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Select
                                    value={sprintAssignmentStatusFilter}
                                    onChange={handleBacklogSprintAssignmentStatusFilter}
                                    aria-label="Filter by Sprint"
                                >
                                    <option value="">
                                        {SPECIAL_CHAR.LESS_THAN}none{SPECIAL_CHAR.GREATER_THAN}
                                    </option>
                                    {Object.values(SPRINT_ASSIGNMENT_STATUS).map((sprint) => (
                                        <option key={sprint} value={sprint}>{sprint}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col xs="auto">
                    <CreateBacklogModal groupId={groupId} userEmail={user?.email} projectId={projectId}/>
                </Col>
                {!error &&
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>{BACKLOG_TABLE_HEADER.NAME}</th>
                            <th>{BACKLOG_TABLE_HEADER.EFFORT}</th>
                            <th>{BACKLOG_TABLE_HEADER.STATUS}</th>
                            <th>{BACKLOG_TABLE_HEADER.ASSIGNED_MEMBER}</th>
                            <th>{BACKLOG_TABLE_HEADER.ASSIGNED_SPRINT}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((backlog) => (
                            <tr key={backlog.id}>
                                <td>
                                    <ProjectManagerLink linkTo={`${ROUTE.PROJECT}/${projectId}${ROUTE.GROUP}/${groupId}${ROUTE.BACKLOG}/${backlog.id}`}>
                                        {backlog.name}
                                    </ProjectManagerLink>
                                </td>
                                <td>{backlog.effort}</td>
                                <td>{BACKLOG_STATE_NAME[backlog.state]}</td>
                                <td>{backlog.assignee?.firstName}</td>
                                <td>{backlog.sprint?.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                }
                {error &&
                    <p>An error occurred while retrieving backlogs</p>
                }
            </Row>
        </div>
    );
}

export default BacklogsTable;
