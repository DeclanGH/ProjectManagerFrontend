import { useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { FaCopy } from "react-icons/fa";
import PropTypes from "prop-types";
import {BUTTON_LABEL} from "../../common/constants.js";

function TextCopyModal({ show, onClose, title, textToCopy }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => setCopied(true))
            .catch(err => console.error("Failed to copy text:", err));

        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This invite link expires after 24 hours or when a new one is requested (whichever comes first)</p>
                <InputGroup>
                    <FormControl
                        value={textToCopy}
                        readOnly
                        aria-label="Text to copy"
                    />
                    <Button variant="outline-primary" onClick={handleCopy}>
                        <FaCopy />
                        {copied ? " Copied!" : " Copy"}
                    </Button>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>{BUTTON_LABEL.CLOSE}</Button>
            </Modal.Footer>
        </Modal>
    );
}

TextCopyModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    textToCopy: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default TextCopyModal;