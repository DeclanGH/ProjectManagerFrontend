import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {BUTTON_LABEL as BUTTON, MAXIMUM} from "../../common/constants.js";
import {useMutation} from "@apollo/client";
import {CREATE_PROJECT} from "../../graphql/mutations.js";
import { FaPlus } from 'react-icons/fa';
import PropTypes from "prop-types";
import {GET_USER_PROJECTS} from "../../graphql/queries.js";
import {TOAST_VARIANT} from "../../common/constants.js";

function CreateProjectModal({ userEmail, showToastNotification }) {
    const [show, setShow] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectDuration, setProjectDuration] = useState("");
    const [projectNameError, setProjectNameError] = useState(null);
    const [projectDurationError, setProjectDurationError] = useState(null);
    const [createProject] = useMutation(CREATE_PROJECT);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setProjectNameError(null);
        if (projectDuration.length === 0) setProjectDurationError(null);
        setShow(false);
    }

    const clearModal = () => {
        setProjectName("");
        setProjectDescription("");
        setProjectDuration("");
        setProjectNameError(null);
        setProjectDurationError(null);
    }

    const handleDurationChange = (e) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            setProjectDuration(value);

            if (value.length > 0 && Number(value) < 1) {
                setProjectDurationError("Project duration cannot be less than 1");
                return;
            } else {
                setProjectDurationError(null);
            }

            if (Number(value) > 300) {
                setProjectDurationError("Project duration cannot be greater than 300");
            } else {
                setProjectDurationError(null);
            }
        }
    };

    const hasValidEntries = () => {
        const duration = Number(projectDuration);
        const hasProjectName = projectName.trim().length > 0;
        const hasProjectDuration = projectDuration.trim().length > 0;
        const hasProjectDurationInRange = duration > 0 && duration <= 300;

        if (!hasProjectName) {
            setProjectNameError("Project name is required");
        } else setProjectNameError(null);

        if (!hasProjectDuration) {
            setProjectDurationError("Project duration is required");
        }

        return hasProjectName && hasProjectDuration && hasProjectDurationInRange;
    }

    const handleCreate = () => {

        if (!hasValidEntries()) {
            return;
        }

        createProject({
            variables: {
                email: userEmail,
                title: projectName,
                description: projectDescription,
                duration: Number(projectDuration),
            },
            update: (cache, { data }) => {

                if (!data || !data.createProject) {
                    showToastNotification(TOAST_VARIANT.DANGER,  "Failed to create project.");
                    return;
                }

                const newProject = data.createProject;

                try {
                    const existingProjects = cache.readQuery({
                        query: GET_USER_PROJECTS,
                        variables: { email: userEmail }
                    });

                    if (existingProjects && existingProjects.getUserProjects) {
                        cache.writeQuery({
                            query: GET_USER_PROJECTS,
                            variables: { email: userEmail },
                            data: {
                                getUserProjects: [...existingProjects.getUserProjects, newProject]
                            }
                        });
                        showToastNotification(TOAST_VARIANT.SUCCESS, "Successfully created project");
                    }
                    // eslint-disable-next-line no-unused-vars
                } catch (cacheError) {
                    showToastNotification(TOAST_VARIANT.INFO, "Manually refresh your browser page");
                }
            }
            // eslint-disable-next-line no-unused-vars
        }).catch(error => {
            showToastNotification(TOAST_VARIANT.DANGER, "An error occurred while creating project");
        });

        clearModal()
        handleClose();
    };

    return (
        <>
            <Button align="end" variant="outline-light" onClick={handleShow} >
                <span className="d-none d-lg-inline">Create Project</span>
                <span className="d-lg-none"><FaPlus/></span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formProjectName">
                            <Form.Label>Project Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                maxLength={MAXIMUM.TITLE_LENGTH}
                                isInvalid={!!projectNameError}
                                autoFocus
                            />
                            <Form.Text>
                                {MAXIMUM.TITLE_LENGTH - projectName.length} characters remaining
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {projectNameError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProjectDescription">
                            <Form.Label>Project Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                maxLength={MAXIMUM.DESCRIPTION_LENGTH}
                            />
                            <Form.Text>
                                {MAXIMUM.DESCRIPTION_LENGTH - projectDescription.length} characters remaining
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProjectDuration">
                            <Form.Label>Project Duration
                                <small className="text-muted"> (Approx. weeks)</small>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={projectDuration}
                                onChange={handleDurationChange}
                                isInvalid={!!projectDurationError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {projectDurationError}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {BUTTON.CLOSE}
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        {BUTTON.CREATE}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

CreateProjectModal.propTypes = {
    userEmail: PropTypes.string,
    showToastNotification: PropTypes.func.isRequired
}

export default CreateProjectModal;
