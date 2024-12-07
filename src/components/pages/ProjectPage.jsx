import {Container, Stack} from 'react-bootstrap';
import {
    GET_PROJECT_BURNDOWN_CHART_DATA, GET_PROJECT_MEMBER,
    GET_PROJECT_PAGE
} from "../../graphql/queries.js";
import {useQuery} from "@apollo/client";
import {useAuth0} from "@auth0/auth0-react";
import {useParams} from "react-router-dom";
import ProjectOffCanvas from "../offcanvas/ProjectOffCanvas.jsx";
import {useState} from "react";
import {TOAST_VARIANT} from "../../common/constants.js";
import ToastNotification from "../alerts/ToastNotification.jsx";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";
import ProjectPageNavBar from "../navbars/ProjectPageNavBar.jsx";
import BurndownChart from "../charts/BurndownChart.jsx";
import GeneralCard from "../cards/GeneralCard.jsx";
import ResponsiveTwoColumnLayout from "../helpers/ResponsiveTwoColumnLayout.jsx";
import "../../styles/ProjectManager.css";
import GroupListAccordion from "../accordions/GroupListAccordion.jsx";
import MemberListAccordion from "../accordions/MemberListAccordion.jsx";

function ProjectPage() {
    const { user } = useAuth0();
    const userEmail = user?.email;
    const { projectId } = useParams();
    const {
        loading: projectPageLoading,
        error: getProjectPageError,
        data: getProjectPageData } = useQuery(GET_PROJECT_PAGE, {
        variables: {projectId, userEmail},
        fetchPolicy: "cache-and-network",
    });
    const {
        loading: burndownChartLoading,
        error: burndownChartError,
        data: bdChartData } = useQuery(GET_PROJECT_BURNDOWN_CHART_DATA, {
        variables: {
            userEmail: user.email,
            projectId: projectId,
        },
        fetchPolicy: "cache-and-network",
    });
    const {
        loading: projectMemberLoading,
        error: projectMemberError,
        data: projectMemberData } = useQuery(GET_PROJECT_MEMBER, {
        variables: {
            userEmail: user.email,
            projectId: projectId,
        },
        fetchPolicy: "cache-and-network",
    });
    const [toastNotification, setToastNotification] = useState({
        show: false, variant: TOAST_VARIANT.INFO, message: ""
    });

    const showToastNotification = (variant, message) => {
        setToastNotification({ show: true, variant: variant, message: message });
    };

    if (projectMemberLoading || projectPageLoading || burndownChartLoading) return <LoadingSpinner/>;
    if (projectMemberError || getProjectPageError || burndownChartError) {
        return <p>{getProjectPageError.message}: Error loading projects...</p>;
    }

    const projectDetails = getProjectPageData?.getProjectPage
    const burndownChartData = bdChartData?.getProjectBurndownChartData
    const projectMember = projectMemberData?.getProjectMember

    return (
        <div className="project-manager-bg">
            <ProjectPageNavBar />
            <Container className="p-4" >
                <Stack direction="vertical" gap={2}>
                    <h1>Hello, {user.given_name ? user.given_name : user.nickname}! ✨</h1>
                    <br/>
                    <Stack direction="horizontal" className="justify-content-between align-items-center">
                        <h2>Project Page - {projectDetails?.projectTitle}</h2>
                        <ProjectOffCanvas projectDetails={projectDetails}/>
                    </Stack>

                    <GeneralCard>
                        <BurndownChart burndownChartData={burndownChartData}/>
                    </GeneralCard>

                    <ResponsiveTwoColumnLayout>
                        <GeneralCard>
                            <GroupListAccordion
                                userEmail={userEmail}
                                projectId={projectId}
                                projectGroupList={projectDetails.projectGroupList}
                                showToastNotification={showToastNotification}
                                projectMember={projectMember}
                            />
                        </GeneralCard>
                        <GeneralCard>
                            <MemberListAccordion
                                memberList={projectDetails.projectMembersList}
                            />
                        </GeneralCard>
                    </ResponsiveTwoColumnLayout>
                </Stack>
            </Container>
            <ToastNotification
                show={toastNotification.show}
                variant={toastNotification.variant}
                message={toastNotification.message}
                onClose={() => setToastNotification({
                    show: false,
                    variant: TOAST_VARIANT.INFO,
                    message: ""
                })}
            />
            {projectPageLoading && <LoadingSpinner/>}
        </div>
    );
}

export default ProjectPage;
