import { useParams } from "react-router-dom";
import { GET_GROUP_SPRINT } from "../../graphql/queries.js";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import {BACKLOG_STATE, BACKLOG_STATE_NAME, TOAST_VARIANT} from "../../common/constants.js";
import { BACKLOG_STATE_CHANGED_IN_SPRINT } from "../../graphql/subscriptions.js";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {Container, Row, Stack} from "react-bootstrap";
import SprintPageColumnCard from "../cards/SprintPageColumnCard.jsx";
import { UPDATE_BACKLOG_STATE } from "../../graphql/mutations.js";
import ProjectPageNavBar from "../navbars/ProjectPageNavBar.jsx";
import SprintBadgeHandler from "../helpers/SprintBadgeHandler.jsx";
import {TouchBackend} from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import ToastNotification from "../alerts/ToastNotification.jsx";
import ErrorMessageHandler from "../helpers/ErrorMessageHandler.js";

function SprintPage() {
    const backendBasedOnDevice = isMobile ? TouchBackend : HTML5Backend;
    const { user } = useAuth0();
    const { projectId, groupId, sprintId } = useParams();
    const [toastNotification, setToastNotification] = useState({
        show: false, variant: TOAST_VARIANT.INFO, message: ""
    });

    const showToastNotification = (variant, message) => {
        setToastNotification({ show: true, variant: variant, message: message });
    };

    const [backlogs, setBacklogs] = useState({
        [BACKLOG_STATE.NOT_STARTED]: [],
        [BACKLOG_STATE.IN_PROGRESS]: [],
        [BACKLOG_STATE.BLOCKED]: [],
        [BACKLOG_STATE.COMPLETED]: [],
    });

    const [updateBacklogState] = useMutation(UPDATE_BACKLOG_STATE);

    const { loading: sprintLoading, error: sprintError, data: sprintData } = useQuery(GET_GROUP_SPRINT, {
        variables: {
            userEmail: user?.email,
            projectId: projectId,
            groupId: groupId,
            sprintId: sprintId,
        },
    });

    useSubscription(BACKLOG_STATE_CHANGED_IN_SPRINT, {
        fetchPolicy: "network-only",
        variables: { sprintId },
        onData: ({ data }) => {
            const updatedBacklog = data?.backlogStateChangedInSprint;
            if (updatedBacklog) {
                setBacklogs((prevBacklogs) => {
                    const newBacklogs = { ...prevBacklogs };

                    Object.keys(newBacklogs).forEach((state) => {
                        newBacklogs[state] = newBacklogs[state].filter((b) => b.id !== updatedBacklog.id);
                    });

                    if (updatedBacklog.state) {
                        newBacklogs[updatedBacklog.state].push(updatedBacklog);
                    }

                    return newBacklogs;
                });
            }
        },
    });

    useEffect(() => {
        if (sprintData) {
            const backlogsGroupedByState = {
                [BACKLOG_STATE.NOT_STARTED]: sprintData.getGroupSprint.backlogs.filter(
                    (backlog) => backlog.state === BACKLOG_STATE.NOT_STARTED
                ),
                [BACKLOG_STATE.IN_PROGRESS]: sprintData.getGroupSprint.backlogs.filter(
                    (backlog) => backlog.state === BACKLOG_STATE.IN_PROGRESS
                ),
                [BACKLOG_STATE.BLOCKED]: sprintData.getGroupSprint.backlogs.filter(
                    (backlog) => backlog.state === BACKLOG_STATE.BLOCKED
                ),
                [BACKLOG_STATE.COMPLETED]: sprintData.getGroupSprint.backlogs.filter(
                    (backlog) => backlog.state === BACKLOG_STATE.COMPLETED
                ),
            };
            setBacklogs(backlogsGroupedByState);
        }
    }, [sprintData]);

    const handleBacklogMove = async (backlog, newState) => {
        try {
            await updateBacklogState({
                variables: {
                    userEmail: user?.email,
                    projectId: projectId,
                    groupId: groupId,
                    sprintId: sprintId,
                    backlogId: backlog.id,
                    backlogState: newState,
                },
            });
        } catch (error) {
            const errorMessage = ErrorMessageHandler.parseProjectMangerStatusCode(error);
            showToastNotification(TOAST_VARIANT.DANGER, errorMessage);
        }
    };

    if (sprintLoading) return <LoadingSpinner />;
    if (sprintError) return <p>An error occurred loading sprints</p>;

    const sprint = sprintData?.getGroupSprint;

    return (
        <div className="project-manager-bg">
            <ProjectPageNavBar/>
            <DndProvider backend={backendBasedOnDevice}>
                <Container fluid className="mt-3">
                    <Row className="mb-3">
                        <Stack direction="horizontal">
                            <h3>{sprint.name}</h3>
                            <h3>
                                <SprintBadgeHandler sprintDetail={sprint}/>
                            </h3>
                        </Stack>
                        <hr  className="my-3"/>
                    </Row>
                    <Row>
                        {Object.keys(BACKLOG_STATE).map((stateKey) => (
                            <SprintPageColumnCard
                                key={stateKey}
                                title={BACKLOG_STATE_NAME[stateKey]}
                                backlogs={backlogs[stateKey]}
                                onMoveBacklog={(backlog) => handleBacklogMove(backlog, stateKey)}
                            />
                        ))}
                    </Row>
                </Container>
            </DndProvider>

            <ToastNotification
                show={toastNotification.show}
                variant={toastNotification.variant}
                message={toastNotification.message}
                onClose={() => setToastNotification({
                    show: false,
                    variant: TOAST_VARIANT.INFO,
                    message: ""
                })}
            />
        </div>
    );
}

export default SprintPage;
