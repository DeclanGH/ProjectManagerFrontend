import {gql} from "@apollo/client";

export const GET_USER_PROJECTS = gql`
    query GetUserProjects($email: String!) {
        getUserProjects(
            userEmail: $email
        ) {
            id
            title
            creatorEmail
            description
        }
    }`
;

export const GET_PROJECT_PAGE = gql`
    query GetProjectPage($projectId: ID!, $userEmail: String!) {
        getProjectPage(
            projectId: $projectId
            userEmail: $userEmail
        ) {
            projectId
            projectTitle
            projectDescription
            projectCreateDate
            projectCreator {
                firstName
                lastName
                email
            }
            projectMembersList {
                firstName
                middleName
                lastName
                email
                isCreator
                isOwner
            }
            projectGroupList {
                id
                name
            }
        }
    }`
;

export const GET_PROJECT_INVITE_LINK_PATH = gql`
    query GetProjectInviteLinkPath($projectId: ID!, $userEmail: String!) {
        getProjectInviteLinkPath(
            projectId: $projectId
            userEmail: $userEmail
        )
    }`
;

export const GET_GROUP_MEMBERS = gql`
    query GetGroupMembers($userEmail: String!, $projectId: ID!, $groupId: ID!) {
        getGroupMembers(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
        ){
            email
            firstName
            middleName
            lastName
            isCreator
            isOwner
        }
    }`
;

//getUserDetail(userEmail: String!, projectId: ID!): ProjectMember!
export const GET_USER_DETAILS = gql`
    query GetUserDetails($userEmail: String!, $projectId: ID!, $groupId: ID) {
        getUserDetails(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
        ){
            email
            firstName
            middleName
            lastName
            isCreator
            isOwner
            isGroupCreator
            isGroupMember
        }
    }`
;

export const GET_GROUP_BACKLOGS = gql`
    query GetGroupBacklogs($userEmail: String!, $projectId: ID!, $groupId: ID!) {
        getGroupBacklogs(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
        ){
            id
            name
            description
            effort
            creator {
                email
                firstName
                lastName
                isCreator
                isOwner
            }
            dateCreated
            dateCompleted
            state
            assigner {
                email
                firstName
                lastName
                isCreator
                isOwner
            }
            assignee {
                email
                firstName
                lastName
                isCreator
                isOwner
            }
            isModifiable
            sprint {
                id
                name
            }
        }
    }`
;

export const GET_GROUP_BACKLOG = gql`
    query GetGroupBacklog($userEmail: String!, $projectId: ID!, $groupId: ID!, $backlogId: ID!,) {
        getGroupBacklog(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
            backlogId: $backlogId
        ){
            id
            name
            description
            effort
            creator {
                email
                firstName
                lastName
                isCreator
                isOwner
            }
            dateCreated
            dateCompleted
            state
            assigner {
                email
                firstName
                lastName
                isCreator
                isOwner
            }
            assignee {
                email
                firstName
                lastName
                isCreator
                isOwner
            }
            isModifiable
            sprint {
                id
                name
            }
        }
    }`
;

export const GET_GROUP_SPRINTS = gql`
    query GetGroupSprints($userEmail: String!, $projectId: ID!, $groupId: ID!) {
        getGroupSprints(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
        ){
            id
            name
            startDate
            endDate
            isOpen
            isDue
            backlogs {
                id
                name
                effort
                assignee {
                    email
                    firstName
                    lastName
                    isCreator
                    isOwner
                }
            }
        }
    }`
;

export const GET_GROUP_SPRINT = gql`
    query GetGroupSprint($userEmail: String!, $projectId: ID!, $groupId: ID!, $sprintId: ID!) {
        getGroupSprint(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
            sprintId: $sprintId
        ){
            id
            name
            startDate
            endDate
            isOpen
            isDue
            backlogs {
                id
                name
                effort
                state
                assignee {
                    email
                    firstName
                    lastName
                    isCreator
                    isOwner
                }
            }
        }
    }`
;

export const GET_GROUP_BURNDOWN_CHART_DATA = gql`
    query GetGroupBurndownChartData($userEmail: String!, $projectId: ID!, $groupId: ID!) {
        getGroupBurndownChartData(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
        ){
            title
            labels
            effortPointsRemaining
            idealEffortPointsRemaining
        }
    }`
;

export const GET_PROJECT_BURNDOWN_CHART_DATA = gql`
    query GetProjectBurndownChartData($userEmail: String!, $projectId: ID!) {
        getProjectBurndownChartData(
            userEmail: $userEmail
            projectId: $projectId
        ){
            title
            labels
            effortPointsRemaining
            idealEffortPointsRemaining
        }
    }`
;

export const GET_PROJECT_MEMBER = gql`
    query GetProjectMember($userEmail: String!, $projectId: ID!, $groupId: ID) {
        getProjectMember(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
        ){
            email
            firstName
            lastName
            isCreator
            isOwner
            isGroupCreator
            isGroupMember
        }
    }`
;

export const GET_NOT_COMPLETED_ASSIGNED_BACKLOGS = gql`
    query GetNotCompletedAssignedBacklogs($userEmail: String!, $projectId: ID!, $groupId: ID!) {
        getNotCompletedAssignedBacklogs(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
        ){
            id
            name
        }
    }`
;
