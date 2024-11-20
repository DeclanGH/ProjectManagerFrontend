import {useAuth0} from "@auth0/auth0-react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import ProjectPageNavBar from "../navbars/ProjectPageNavBar.jsx";
import {Nav} from "react-bootstrap";
import {LINK_LABEL, ROUTE} from "../../common/constants.js";
import {useState} from "react";
import BacklogsTable from "../tables/BacklogsTable.jsx";
import SprintsAccordion from "../accordions/SprintsAccordion.jsx";
import GroupPage from "./GroupPage.jsx";

function GroupPageNavigator() {
    const navigate = useNavigate();
    const {projectId} = useParams();
    const [currentDisplayPage, setCurrentDisplayPage] = useState(LINK_LABEL.GROUP_HOME);



    const handleGoingBackToProjectPage = () => {
        navigate(`${ROUTE.PROJECT}/${projectId}`);
    }

    const handleGroupPageDisplay = () => {
        setCurrentDisplayPage(LINK_LABEL.GROUP_HOME);
    }

    const handleBacklogsPageDisplay = () => {
        setCurrentDisplayPage(LINK_LABEL.BACKLOGS);
    }

    const handleSprintsPageDisplay = () => {
        setCurrentDisplayPage(LINK_LABEL.SPRINTS);
    }

    const handleSettingsPageDisplay = () => {
        setCurrentDisplayPage(LINK_LABEL.SETTINGS);
    }

    return(
        <div className="project-manager-bg">
            <ProjectPageNavBar />
            <Nav variant="tabs" defaultActiveKey={currentDisplayPage}>
                <Nav.Item>
                    <Nav.Link onClick={handleGoingBackToProjectPage}>{LINK_LABEL.BACK}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey={LINK_LABEL.GROUP_HOME}
                        onClick={handleGroupPageDisplay}
                    >
                        {LINK_LABEL.GROUP_HOME}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey={LINK_LABEL.BACKLOGS}
                        onClick={handleBacklogsPageDisplay}
                    >
                        {LINK_LABEL.BACKLOGS}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey={LINK_LABEL.SPRINTS}
                        onClick={handleSprintsPageDisplay}
                    >{LINK_LABEL.SPRINTS}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        eventKey={LINK_LABEL.SETTINGS}
                        onClick={handleSettingsPageDisplay}
                    >
                        {LINK_LABEL.SETTINGS}
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            { currentDisplayPage === LINK_LABEL.GROUP_HOME && (
                 <GroupPage/>
            )}
            { currentDisplayPage === LINK_LABEL.BACKLOGS && (
                <BacklogsTable/>
            )}
            { currentDisplayPage === LINK_LABEL.SPRINTS && (
                <SprintsAccordion/>
            )}
            { currentDisplayPage === LINK_LABEL.SETTINGS && (
                <p>you&apos;re in Settings Page </p>
            )}
        </div>
    );
}

export default GroupPageNavigator;
