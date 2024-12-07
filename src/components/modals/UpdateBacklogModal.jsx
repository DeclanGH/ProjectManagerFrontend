import {useMutation, useQuery} from "@apollo/client";
import {GET_GROUP_MEMBERS, GET_GROUP_SPRINTS} from "../../graphql/queries.js";
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown} from "react-bootstrap";
import {
    ALERT_MESSAGE,
    ALERT_VARIANT,
    BACKLOG_STATE,
    BACKLOG_STATE_NAME,
    BUTTON_LABEL,
    TOAST_VARIANT
} from "../../common/constants.js";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";
import Select from "react-select";
import ProjectMemberObjectParser from "../helpers/ProjectMemberObjectParser.js";
import {useState} from "react";
import {UPDATE_BACKLOG} from "../../graphql/mutations.js";
import SimpleAlert from "../alerts/SimpleAlert.jsx";
import ToastNotification from "../alerts/ToastNotification.jsx";
import ErrorMessageHandler from "../helpers/ErrorMessageHandler.js";

function UpdateBacklogModal({userEmail, projectId, groupId, backlogId, isModifiable }) {
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedSprint, setSelectedSprint] = useState(null);
    const [selectedBacklogStatus, setSelectedBacklogStatus] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [toastNotification, setToastNotification] = useState({
        show: false, variant: TOAST_VARIANT.INFO, message: ""
    });

    const showToastNotification = (variant, message) => {
        setToastNotification({ show: true, variant: variant, message: message });
    };

    const { data: groupMembersData } = useQuery(GET_GROUP_MEMBERS, {
        variables: {
            userEmail: userEmail,
            projectId: projectId,
            groupId: groupId,
        },
        fetchPolicy: "network-only"
    });

    const {  data: groupSprintsData } = useQuery(GET_GROUP_SPRINTS, {
        variables: {
            userEmail: userEmail,
            projectId: projectId,
            groupId: groupId
        }
    });

    const [updateBacklog, { loading: updating }] = useMutation(UPDATE_BACKLOG);

    if (updating) return <LoadingSpinner />;

    const members = groupMembersData?.getGroupMembers;
    const sprints = groupSprintsData?.getGroupSprints;

    const memberOptions = members?.map((member) => ({
        value: member.email,
        label: ProjectMemberObjectParser.getFullName(member)
    }));
    const sprintOptions = sprints?.filter(sprint => sprint.isOpen && !sprint.isDue).map((sprint) => ({
        value: sprint.id,
        label: sprint.name
    }));

    const backlogStateOptions = Object.entries(BACKLOG_STATE_NAME).map(([key, backlogStatus]) => ({
        value: key,
        label: backlogStatus
    }));

    const handleMemberSelection = (selectedMember) => {
        setSelectedMember(selectedMember.value);
    }

    const handleSprintSelection = (selectedSprint) => {
        setSelectedSprint(selectedSprint.value);
    }

    const handleBacklogStatusSelection = (selectedBacklogStatus) => {
        setSelectedBacklogStatus(selectedBacklogStatus.value);
    }

    const handleUpdateButtonClick = () => {
        setShowModal(true);
    }

    const handleModalClose = () => {
        setSelectedMember(null);
        setSelectedSprint(null);
        setSelectedBacklogStatus(null);
        setShowModal(false);
    }

    const handleSave = () => {
        if (!selectedMember && !selectedSprint && !selectedBacklogStatus) {
            handleModalClose()
            return;
        }
        updateBacklog({
            variables: {
                userEmail: userEmail,
                projectId: projectId,
                groupId: groupId,
                backlogId: backlogId,
                assigneeEmail: selectedMember,
                sprintId: selectedSprint,
                backlogState: selectedBacklogStatus,
            }
        })
            .then(() => {
                showToastNotification(TOAST_VARIANT.SUCCESS, "Backlog updated successfully.");
                handleModalClose();
            })
            .catch(error => {
                const errorMessage = ErrorMessageHandler.parseProjectMangerStatusCode(error);
                showToastNotification(TOAST_VARIANT.DANGER, errorMessage);
                handleModalClose();
            });
    };

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle disabled={!isModifiable}>
                    {BUTTON_LABEL.ACTION}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleUpdateButtonClick}>
                        {BUTTON_LABEL.UPDATE}
                    </Dropdown.Item>
                    <Dropdown.Item className="text-danger" onClick={() => console.log("deleted")}>
                        {BUTTON_LABEL.DELETE}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Update Backlog"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="dropdown1" className="mb-3">
                            <Form.Label>Assign Backlog To Member:</Form.Label>
                            <Select
                                options={memberOptions}
                                placeholder="Select a member"
                                isSearchable
                                onChange={handleMemberSelection}
                            />
                        </Form.Group>

                        <Form.Group controlId="dropdown2" className="mb-3">
                            <Form.Label>Assign Backlog To Sprint:</Form.Label>
                            <Select
                                options={sprintOptions}
                                placeholder="Select a sprint"
                                isSearchable
                                onChange={handleSprintSelection}
                            />
                        </Form.Group>

                        <Form.Group controlId="dropdown3" className="mb-3">
                            <Form.Label>Change Backlog Status:</Form.Label>
                            <Select
                                options={backlogStateOptions}
                                placeholder="Select a status"
                                isSearchable
                                onChange={handleBacklogStatusSelection}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                {selectedBacklogStatus && !selectedSprint && (selectedBacklogStatus === BACKLOG_STATE.COMPLETED) &&
                    <div className="ms-2 me-2">
                        <SimpleAlert
                            headerMessage="Hold On!"
                            bodyMessage={ALERT_MESSAGE.ABOUT_TO_SAVE_BACKLOG_STATE_AS_COMPLETE}
                            variant={ALERT_VARIANT.DANGER}
                            isDismissible={false}
                        />
                    </div>
                }
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>{BUTTON_LABEL.CANCEL}</Button>
                    <Button variant="primary" onClick={handleSave}>{BUTTON_LABEL.SAVE}</Button>
                </Modal.Footer>
            </Modal>

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

UpdateBacklogModal.propTypes = {
    userEmail: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
    backlogId: PropTypes.string.isRequired,
    isModifiable: PropTypes.bool.isRequired,
}

export default UpdateBacklogModal;
