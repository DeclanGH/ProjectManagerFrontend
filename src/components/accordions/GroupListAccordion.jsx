import {Accordion, ListGroup, Stack} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import CreateGroupModal from "../modals/CreateGroupModal.jsx";
import PropTypes from "prop-types";
import {ROUTE} from "../../common/constants.js";
import ProjectManagerLink from "../helpers/ProjectManagerLink.jsx";


function GroupListAccordion({ userEmail, projectId, projectGroupList, showToastNotification }) {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
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
                    <ListGroup style={{maxHeight: "200px", overflowY: "auto"}}>
                        {projectGroupList.length > 0 ? (
                            displayedGroups.map((group, index) => (
                                <ListGroup.Item key={index}>
                                    <ProjectManagerLink linkTo={`${ROUTE.PROJECT}/${projectId}${ROUTE.GROUP}/${group.id}`}>
                                        {group.name}
                                    </ProjectManagerLink>
                                </ListGroup.Item>
                            ))) : (
                                <center><p>No groups yet. Be the first to create one :)</p></center>)
                        }
                    </ListGroup>
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
}

export default GroupListAccordion;
