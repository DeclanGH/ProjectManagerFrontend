import {Accordion, Button, Dropdown, ListGroup, Stack} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useEffect, useRef, useState} from "react";
import CreateGroupModal from "../modals/CreateGroupModal.jsx";
import PropTypes from "prop-types";
import {BUTTON_LABEL, LOCAL_STORAGE_ITEM, ROUTE, TOAST_VARIANT} from "../../common/constants.js";
import ProjectManagerLink from "../helpers/ProjectManagerLink.jsx";
import {FaEllipsisV} from "react-icons/fa";
import {useMutation} from "@apollo/client";
import {DELETE_GROUP} from "../../graphql/mutations.js";
import ErrorMessageHandler from "../helpers/ErrorMessageHandler.js";


function GroupListAccordion({ userEmail, projectId, projectGroupList, showToastNotification, projectMember }) {
    const [deleteGroup] = useMutation(DELETE_GROUP);
    const [searchText, setSearchText] = useState("");
    const listGroupRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const listGroupElement = listGroupRef.current;
        if (listGroupElement) {
            setIsOverflowing(listGroupElement.scrollHeight > listGroupElement.clientHeight + 40 /*40px I think*/);
        }
    }, [projectGroupList]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleDeleteGroup = async (groupId) => {
        try {
            const { data } = await deleteGroup({
                variables: {userEmail: userEmail, groupId: groupId, projectId: projectId},
            });

            if (data) {
                if (data.deleteGroup) { // the mutation returns true or false
                    showToastNotification(TOAST_VARIANT.SUCCESS, "Successfully deleted group.");
                } else {
                    showToastNotification(TOAST_VARIANT.DANGER, "Failed to delete group.");
                }
            }
        } catch (error) {
            const errorMessage = ErrorMessageHandler.parseProjectMangerStatusCode(error)
            showToastNotification(TOAST_VARIANT.DANGER, errorMessage);
        }
    }

    const clearGroupPageCurrentDisplayTabInLocalStorage = () => {
        localStorage.removeItem(LOCAL_STORAGE_ITEM.GROUP_PAGE_CURRENT_DISPLAY_TAB);
    };

    const displayedGroups = searchText ? projectGroupList.filter(group =>
            group.name.toLowerCase().includes(searchText.toLowerCase())) : projectGroupList;

    return(
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header><h5>Groups</h5></Accordion.Header>
                <Accordion.Body>
                    <Stack className="mb-3" direction="horizontal" gap={4}>
                        <CreateGroupModal
                            userEmail={userEmail}
                            projectId={projectId}
                            showToastNotification={showToastNotification}
                        />
                        <Form>
                            <Form.Control
                                type="text"
                                placeholder="Search groups"
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                        </Form>
                    </Stack>
                    <ListGroup ref={listGroupRef} style={{maxHeight: "200px", overflowY: "auto"}}>
                        {projectGroupList.length > 0 ? (
                            displayedGroups.map((group, index) => (
                                <ListGroup.Item key={index}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <ProjectManagerLink
                                            linkTo={`${ROUTE.PROJECT}/${projectId}${ROUTE.GROUP}/${group.id}`}
                                            onClick={clearGroupPageCurrentDisplayTabInLocalStorage}
                                        >
                                            {group.name}
                                        </ProjectManagerLink>
                                        <Dropdown>
                                            <Button className="p-0 border-0 bg-transparent text-muted">
                                                <FaEllipsisV />
                                            </Button>
                                            <Dropdown.Toggle className="p-0 border-0 bg-transparent text-muted"/>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    disabled={!projectMember.isCreator || !projectMember.isOwner}
                                                    className="text-danger"
                                                    onClick={() => handleDeleteGroup(group.id)}
                                                >
                                                    {BUTTON_LABEL.DELETE}
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </ListGroup.Item>
                            ))) : (
                                <center><p>No groups yet. Be the first to create one :)</p></center>)
                        }
                    </ListGroup>
                    {isOverflowing && <div className="mt-3 text-muted fst-italic">scroll to see more</div>}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

GroupListAccordion.propTypes = {
    userEmail: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    projectGroupList: PropTypes.array.isRequired,
    showToastNotification: PropTypes.func.isRequired,
    projectMember: PropTypes.object.isRequired,
}

export default GroupListAccordion;
