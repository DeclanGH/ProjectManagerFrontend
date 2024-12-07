import {Container, Stack} from "react-bootstrap";
import GeneralCard from "../cards/GeneralCard.jsx";
import BurndownChart from "../charts/BurndownChart.jsx";
import ResponsiveTwoColumnLayout from "../helpers/ResponsiveTwoColumnLayout.jsx";
import MemberListAccordion from "../accordions/MemberListAccordion.jsx";
import {useAuth0} from "@auth0/auth0-react";
import {useQuery} from "@apollo/client";
import {GET_GROUP_BURNDOWN_CHART_DATA, GET_GROUP_MEMBERS} from "../../graphql/queries.js";
import {useParams} from "react-router-dom";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";
import UserAssignedBacklogsAccordion from "../accordions/UserAssignedBacklogsAccordion.jsx";

function GroupPage() {
    const {user} = useAuth0();
    const {projectId, groupId} = useParams();

    const {
        loading: burndownChartLoading,
        error: burndownChartError,
        data: bdChartData } = useQuery(GET_GROUP_BURNDOWN_CHART_DATA, {
        variables: {
            userEmail: user.email,
            projectId: projectId,
            groupId: groupId,
        },
        fetchPolicy: "cache-and-network",
    });

    const {
        loading: groupMembersLoading,
        error: getGroupMembersError,
        data: getGroupMembersData } = useQuery(GET_GROUP_MEMBERS, {
        variables: {
            userEmail: user.email,
            projectId: projectId,
            groupId: groupId,
        },
        fetchPolicy: "cache-and-network",
    });

    const burndownChartData = bdChartData?.getGroupBurndownChartData;
    const groupMembersData = getGroupMembersData?.getGroupMembers;

    if (burndownChartLoading || groupMembersLoading) return <LoadingSpinner/>;
    if (burndownChartError || getGroupMembersError) {
        return <p>{burndownChartError.message} {getGroupMembersError.message}</p>
    }

    return (
        <div>
            <Container className="p-4" >
                <Stack direction="vertical" gap={2}>
                    <Stack direction="horizontal" className="justify-content-between align-items-center">
                        <h2>Group Page</h2>
                    </Stack>

                    <GeneralCard>
                        <BurndownChart burndownChartData={burndownChartData}/>
                    </GeneralCard>

                    <ResponsiveTwoColumnLayout>
                        <GeneralCard>
                            <MemberListAccordion
                                memberList={groupMembersData}
                            />
                        </GeneralCard>
                        <GeneralCard>
                            <UserAssignedBacklogsAccordion />
                        </GeneralCard>
                    </ResponsiveTwoColumnLayout>
                </Stack>
            </Container>
        </div>
    )
}

export default GroupPage;
