import {Accordion, ListGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import MemberBadgeHandler from "../helpers/MemberBadgeHandler.jsx";


function MemberListAccordion({ memberList }) {
    return(
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header><h5>Members</h5></Accordion.Header>
                <Accordion.Body>
                    <ListGroup style={{maxHeight: "200px", overflowY: "auto"}}>
                        {memberList.length > 0 ? (
                            memberList.map((member, index) => (
                                <ListGroup.Item key={index}>
                                    <MemberBadgeHandler memberInfo={member}/>
                                </ListGroup.Item>
                            ))) : (
                            <center><p>No members yet, but how are you in here 🧐</p></center>
                        )}
                    </ListGroup>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

MemberListAccordion.propTypes = {
    memberList: PropTypes.array.isRequired
}

export default MemberListAccordion;
