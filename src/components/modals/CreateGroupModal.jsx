import {useState} from "react";
import {useMutation} from "@apollo/client";
import {CREATE_GROUP} from "../../graphql/mutations.js";
import {BUTTON_LABEL, BUTTON_LABEL as BUTTON, MAXIMUM, TOAST_VARIANT} from "../../common/constants.js";
import {GET_PROJECT_PAGE} from "../../graphql/queries.js";
import Button from "react-bootstrap/Button";
import {FaPlus} from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

function CreateGroupModal({ projectId, userEmail, showToastNotification }) {
    const [show, setShow] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [error, setError] = useState(null);
    const [createGroup] = useMutation(CREATE_GROUP);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setError(null);
        setShow(false);
    }

    const clearModal = () => {
        setGroupName("");
        setError(null);
    }

    const handleCreate = () => {

        if (!groupName.trim()) {
            setError("Group name is required");
            return;
        }

        createGroup({
            variables: {
                email: userEmail,
                name: groupName,
                projectId: projectId
            },
            update: (cache, { data }) => {
                if (!data || !data.createGroup) {
                    showToastNotification(TOAST_VARIANT.DANGER,  "Failed to create group.");
                    return;
                }

                const newGroup = data.createGroup;

                try {
                    const existingProjectPage = cache.readQuery({
                        query: GET_PROJECT_PAGE,
                        variables: { projectId: projectId, userEmail: userEmail }
                    });

                    if (existingProjectPage.getProjectPage && existingProjectPage.getProjectPage.projectGroupList) {
                        const updatedProjectGroupList = [
                            ...existingProjectPage.getProjectPage.projectGroupList, newGroup
                        ];

                        cache.writeQuery({
                            query: GET_PROJECT_PAGE,
                            variables: { projectId: projectId, userEmail: userEmail },
                            data: {
                                getProjectPage: {
                                    ...existingProjectPage.getProjectPage,
                                    projectGroupList: updatedProjectGroupList
                                }
                            }
                        });
                        showToastNotification(TOAST_VARIANT.SUCCESS, "Successfully created group");
                    } else {
                        showToastNotification(TOAST_VARIANT.INFO, "Success! Please use manual refresh");
                    }
                    // eslint-disable-next-line no-unused-vars
                } catch (cacheError) {
                    showToastNotification(TOAST_VARIANT.INFO, "Success! Please use manual refresh");
                }
            }
            // eslint-disable-next-line no-unused-vars
        }).catch(error => {
            showToastNotification(TOAST_VARIANT.DANGER, "An error occurred while creating group");
        });

        clearModal()
        handleClose();
    };

    return (
        <>
            <Button variant="outline-dark" onClick={handleShow}>
                <span className="d-none d-lg-inline">{BUTTON_LABEL.CREATE_GROUP}</span>
                <span className="d-lg-none"><FaPlus/></span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formProjectName">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                maxLength={MAXIMUM.TITLE_LENGTH}
                                isInvalid={!!error}
                                autoFocus
                            />
                            <Form.Text muted>
                                {MAXIMUM.TITLE_LENGTH - groupName.length} characters remaining
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {error}
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

CreateGroupModal.propTypes = {
    projectId: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    showToastNotification: PropTypes.func.isRequired
}

export default CreateGroupModal
