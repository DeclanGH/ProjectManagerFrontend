import {Accordion, Button, Dropdown, ListGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import MemberBadgeHandler from "../helpers/MemberBadgeHandler.jsx";
import {useParams} from "react-router-dom";
import {FaEllipsisV} from "react-icons/fa";
import {BUTTON_LABEL} from "../../common/constants.js";
import {useQuery} from "@apollo/client";
import {GET_PROJECT_MEMBER} from "../../graphql/queries.js";
import {useAuth0} from "@auth0/auth0-react";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";


function MemberListAccordion({ memberList }) {
    const { user } = useAuth0()
    const { projectId, groupId} = useParams();
    const isGroupPage = groupId !== undefined && groupId != null && groupId !== "";

    const {
        loading: projectMemberLoading,
        error: projectMemberError,
        data: projectMemberData } = useQuery(GET_PROJECT_MEMBER, {
        variables: {
            userEmail: user.email,
            projectId: projectId,
            groupId: groupId,
        },
        fetchPolicy: "cache-and-network",
    });

    const projectMember = projectMemberData?.getProjectMember;
    console.log(projectMember);

    return(
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header><h5>Members</h5></Accordion.Header>

                <Accordion.Body>
                    {projectMemberLoading && <LoadingSpinner/>}
                    {!projectMemberError && projectMember &&
                        <ListGroup style={{maxHeight: "200px", overflowY: "auto"}}>
                            {memberList.length > 0 ? (
                                memberList.map((member, index) => (
                                    <ListGroup.Item key={index}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <MemberBadgeHandler memberInfo={member}/>
                                            <Dropdown>
                                                <Button className="p-0 border-0 bg-transparent text-muted">
                                                    <FaEllipsisV/>
                                                </Button>
                                                <Dropdown.Toggle className="p-0 border-0 bg-transparent text-muted"/>
                                                <Dropdown.Menu>
                                                    {projectMember.isCreator && !member.isCreator && !member.isOwner &&
                                                        <Dropdown.Item
                                                            //onClick={() => handleDeleteGroup(group.id)}
                                                        >
                                                            {BUTTON_LABEL.PROMOTE}
                                                        </Dropdown.Item>
                                                    }
                                                    {projectMember.isCreator && !member.isCreator && member.isOwner &&
                                                        <Dropdown.Item
                                                            //onClick={() => handleDeleteGroup(group.id)}
                                                        >
                                                            {BUTTON_LABEL.DEMOTE}
                                                        </Dropdown.Item>
                                                    }
                                                    {isGroupPage && projectMember.isGroupMember && !projectMember.isGroupCreator &&
                                                        <Dropdown.Item
                                                            className="text-danger"
                                                            //onClick={() => handleDeleteGroup(group.id)}
                                                        >
                                                            {BUTTON_LABEL.REMOVE_FROM_GROUP}
                                                        </Dropdown.Item>
                                                    }
                                                    {projectMember.isCreator && !member.isCreator &&
                                                        <Dropdown.Item
                                                            //disabled={!projectMember.isCreator || !projectMember.isOwner}
                                                            className="text-danger"
                                                        >
                                                            {BUTTON_LABEL.REMOVE_FROM_PROJECT}
                                                        </Dropdown.Item>
                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </ListGroup.Item>
                                ))) : (
                                <center><p>No members yet, but how are you in here 🧐</p></center>
                            )}
                        </ListGroup>
                    }
                    {projectMemberError && <p className="text-center">Error Loading member details</p>}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

MemberListAccordion.propTypes = {
    memberList: PropTypes.array.isRequired
}

export default MemberListAccordion;
