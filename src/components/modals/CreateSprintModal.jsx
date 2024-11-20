import {useState} from "react";
import {useMutation} from "@apollo/client";
import {CREATE_SPRINT} from "../../graphql/mutations.js";
import PropTypes from "prop-types";
import {FaPlus} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import {BUTTON_LABEL, FORM_LABEL, MAXIMUM} from "../../common/constants.js";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import DateHelper from "../helpers/DateHelper.js";

function CreateSprintModal({ userEmail, projectId, groupId }) {
    const [show, setShow] = useState(false);
    const [sprintName, setSprintName] = useState("");
    const [sprintNameError, setSprintNameError] = useState(null);
    const [sprintStartDate, setSprintStartDate] = useState(new Date());
    const [sprintEndDate, setSprintEndDate] = useState(null);

    const [createSprint, {loading}] = useMutation(CREATE_SPRINT);

    const handleCreateSprint = async () => {
        // some checks before hand
        if (!(sprintName.trim().length > 0)) {
            setSprintNameError("A sprint name is required");
            return;
        } else {
            setSprintNameError(null);
        }

        const startDateInYearMonthDayFormat = DateHelper.convertJsDateToYearMonthDateFormat(sprintStartDate);
        const endDateInYearMonthDayFormat = DateHelper.convertJsDateToYearMonthDateFormat(sprintEndDate);

        try {
            await createSprint({
                variables: {
                    userEmail,
                    projectId,
                    groupId,
                    sprintName,
                    startDate: startDateInYearMonthDayFormat,
                    endDate: endDateInYearMonthDayFormat,
                }
            });
            handleClose()
        } catch (error) {
            console.error(`Error creating sprint: ${error.message}`);
        }
    }

    const handleShowModal = () => {
        setShow(true);
    }

    const handleClose = () => {
        resetStates()
        setShow(false);
    }

    const resetStates = () => {
        setSprintName("");
        setSprintNameError(null);
        setSprintStartDate(new Date());
        setSprintEndDate(null);
    }

    const handleSprintNameChange = (e) => setSprintName(e.target.value);
    const handleStartDateChange = (date) => {
        setSprintStartDate(date);
        setSprintEndDate(null);
    };
    const handleEndDateChange = (date) => {
        setSprintEndDate(date);
    }

    return (
        <>
            <Button variant="outline-dark" onClick={handleShowModal}>
                <span className="d-none d-lg-inline">{BUTTON_LABEL.CREATE_SPRINT}</span>
                <span className="d-lg-none"><FaPlus/></span>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Sprint</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formSprintName">
                            <Form.Label>
                                {FORM_LABEL.SPRINT_NAME}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={sprintName}
                                onChange={handleSprintNameChange}
                                maxLength={MAXIMUM.TITLE_LENGTH}
                                placeholder="Enter sprint name"
                                isInvalid={!!sprintNameError}
                                autoFocus
                            />
                            <Form.Text>
                                {MAXIMUM.TITLE_LENGTH - sprintName.length} characters remaining
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                {sprintNameError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formSprintStartDate" className="mt-3">
                            <div>
                                <Form.Label>
                                    {FORM_LABEL.START_DATE}
                                </Form.Label>
                            </div>
                            <DatePicker
                                selected={sprintStartDate}
                                onChange={handleStartDateChange}
                                minDate={new Date()}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                            />
                        </Form.Group>

                        <Form.Group controlId="formSprintEndDate" className="mt-3">
                            <div>
                                <Form.Label>
                                    {FORM_LABEL.END_DATE}
                                </Form.Label>
                            </div>
                            <DatePicker
                                selected={sprintEndDate}
                                onChange={handleEndDateChange}
                                minDate={sprintStartDate ? new Date(sprintStartDate.getTime() + 24 * 60 * 60 * 1000) : new Date()}
                                dateFormat="yyyy-MM-dd"
                                className="form-control"
                                disabled={!sprintStartDate}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {BUTTON_LABEL.CANCEL}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleCreateSprint}
                        disabled={!sprintName || !sprintStartDate || !sprintEndDate}
                    >
                        {BUTTON_LABEL.CREATE}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

CreateSprintModal.propTypes = {
    userEmail: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    groupId: PropTypes.string.isRequired,
}

export default CreateSprintModal;
