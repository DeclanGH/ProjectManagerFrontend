import {useNavigate, useParams} from "react-router-dom";
import ProjectPageNavBar from "../navbars/ProjectPageNavBar.jsx";
import {Nav} from "react-bootstrap";
import {LINK_LABEL, LOCAL_STORAGE_ITEM, ROUTE} from "../../common/constants.js";
import {useEffect, useState} from "react";
import BacklogsTable from "../tables/BacklogsTable.jsx";
import SprintsAccordion from "../accordions/SprintsAccordion.jsx";
import GroupPage from "./GroupPage.jsx";

function GroupPageNavigator() {
    const navigate = useNavigate();
    const {projectId} = useParams();
    const [currentDisplayPage, setCurrentDisplayPage] = useState(() => {
        return localStorage.getItem(LOCAL_STORAGE_ITEM.GROUP_PAGE_CURRENT_DISPLAY_TAB) || LINK_LABEL.GROUP_HOME;
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_ITEM.GROUP_PAGE_CURRENT_DISPLAY_TAB, currentDisplayPage);
    }, [currentDisplayPage]);

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

    return (
        <div className="project-manager-bg">
            <ProjectPageNavBar/>
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
            </Nav>
            {currentDisplayPage === LINK_LABEL.GROUP_HOME && (
                <GroupPage/>
            )}
            {currentDisplayPage === LINK_LABEL.BACKLOGS && (
                <BacklogsTable/>
            )}
            {currentDisplayPage === LINK_LABEL.SPRINTS && (
                <SprintsAccordion/>
            )}
            {currentDisplayPage === LINK_LABEL.SETTINGS && (
                <p>you&apos;re in Settings Page </p>
            )}
        </div>
    );
}

export default GroupPageNavigator;
