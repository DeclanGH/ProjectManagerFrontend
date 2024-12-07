import { Modal, Button, Form, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import {useState} from "react";
import PropTypes from "prop-types";
import {CREATE_BACKLOG} from "../../graphql/mutations.js";
import {BUTTON_LABEL, FORM_LABEL, MAXIMUM, TIPS, TOAST_VARIANT} from "../../common/constants.js";
import {FaInfoCircle, FaPlus} from "react-icons/fa";
import ErrorMessageHandler from "../helpers/ErrorMessageHandler.js";
import {GET_GROUP_BACKLOGS} from "../../graphql/queries.js";
import ToastNotification from "../alerts/ToastNotification.jsx";

function CreateBacklogModal({ userEmail, projectId, groupId }) {
    const [show, setShow] = useState(false);
    const [backlogName, setBacklogName] = useState("");
    const [backlogDescription, setBacklogDescription] = useState("");
    const [backlogEffort, setBacklogEffort] = useState(1);
    const [backlogNameError, setBacklogNameError] = useState(null);
    const [backlogEffortError, setBacklogEffortError] = useState(null);
    const [toastNotification, setToastNotification] = useState({
        show: false, variant: TOAST_VARIANT.INFO, message: ""
    });

    const showToastNotification = (variant, message) => {
        setToastNotification({ show: true, variant: variant, message: message });
    };

    const [createBacklog] = useMutation(CREATE_BACKLOG);

    const handleClose = () => {
        resetState()
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleBacklogNameChange = (e) => {
        setBacklogName(e.target.value)
        if (backlogName.trim().length > 0) {
            setBacklogNameError(null);
        }
    }

    const handleBacklogEffortChange = (e) => {
        setBacklogEffort(parseInt(e.target.value, 10));
    }

    const hasBadEntries = () => {
        const hasNoBacklogName = backlogName.trim().length <= 0;
        const hasNoEffortValue = !backlogEffort
        const hasBacklogEffortLessThanOne = backlogEffort < 1;
        const hasBacklogEffortGreaterThanFifteen = backlogEffort > 15;

        if (hasNoBacklogName) {
            setBacklogNameError("Please provide a backlog name");
        } else {
            setBacklogNameError(null);
        }

        if (hasNoEffortValue) {
            setBacklogEffortError("An effort value is required to create a backlog");
        } else if (hasBacklogEffortLessThanOne) {
            setBacklogEffortError("Effort value cannot be less than one");
        } else if (hasBacklogEffortGreaterThanFifteen) {
            setBacklogEffortError("Effort value cannot be less greater than 15");
        } else {
            setBacklogEffortError(null);
        }

        return hasNoBacklogName || hasNoEffortValue || hasBacklogEffortLessThanOne || hasBacklogEffortGreaterThanFifteen;
    }

    const handleCreate = async () => {
        if (hasBadEntries()) {
            return;
        }

        try {
            await createBacklog({
                variables: {
                    userEmail,
                    projectId,
                    groupId,
                    backlogName,
                    backlogDescription,
                    backlogEffort
                },
                update: (cache, {data: createBacklogData}) => {
                    const newBacklog = createBacklogData?.createBacklog;

                    const existingBacklogsData = cache.readQuery({
                        query: GET_GROUP_BACKLOGS,
                        variables: { userEmail, projectId, groupId }
                    });

                    if (newBacklog && existingBacklogsData) {
                        cache.writeQuery({
                            query: GET_GROUP_BACKLOGS,
                            variables: { userEmail, projectId, groupId },
                            data: {
                                getGroupBacklogs: [newBacklog, ...existingBacklogsData.getGroupBacklogs]
                            },
                        })
                        handleClose();
                        showToastNotification(TOAST_VARIANT.SUCCESS, "Successfully created backlog.");
                    }
                },
            });
        } catch (error) {
            const errorMessage = ErrorMessageHandler.parseProjectMangerStatusCode(error);
            showToastNotification(TOAST_VARIANT.DANGER, errorMessage);
        }
    };

    const resetState = () => {
        setShow(false);
        setBacklogName("");
        setBacklogDescription("");
        setBacklogNameError(null);
        setBacklogEffort(1)
        setBacklogEffortError(null);
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {TIPS.BACKLOG_EFFORT}
        </Tooltip>
    );

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}>
                <span className="d-none d-lg-inline">{BUTTON_LABEL.CREATE_BACKLOG}</span>
                <span className="d-lg-none"><FaPlus/></span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Backlog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBacklogName">
                            <Form.Label>
                                {FORM_LABEL.BACKLOG_NAME}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={backlogName}
                                onChange={handleBacklogNameChange}
                                maxLength={MAXIMUM.TITLE_LENGTH}
                                placeholder="Enter backlog name"
                                isInvalid={!!backlogNameError}
                                autoFocus
                            />
                            <Form.Text>
                                {MAXIMUM.TITLE_LENGTH - backlogName.length} characters remaining
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {backlogNameError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBacklogDescription" className="mt-3">
                            <Form.Label>{FORM_LABEL.BACKLOG_DESCRIPTION}</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                maxLength={MAXIMUM.BACKLOG_DESCRIPTION_LENGTH}
                                value={backlogDescription}
                                onChange={(e) => setBacklogDescription(e.target.value)}
                                placeholder="Enter backlog description"
                            />
                            <Form.Text>
                                {MAXIMUM.BACKLOG_DESCRIPTION_LENGTH - backlogDescription.length} characters remaining
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBacklogEffort" className="mt-3">
                            <Form.Label>
                                Level of Effort
                                <OverlayTrigger placement="right" overlay={renderTooltip} trigger="click">
                                    <Button variant="link" className="p-0 ms-1 mb-1">
                                        <FaInfoCircle color={"black"} style={{ cursor: "pointer" }} />
                                    </Button>
                                </OverlayTrigger>
                            </Form.Label>

                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    max={15}
                                    value={backlogEffort}
                                    isInvalid={!!backlogEffortError}
                                    onChange={handleBacklogEffortChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {backlogEffortError}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Create
                    </Button>
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
        </>
    );
}

CreateBacklogModal.propTypes = {
    userEmail: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
}

export default CreateBacklogModal;
