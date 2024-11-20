import {gql} from "@apollo/client";

export const CREATE_OR_UPDATE_USER = gql`
    mutation CreateOrUpdateUser($email: String!, $firstName: String!, $middleName: String!, $lastName: String!) {
        createOrUpdateUser(
            email: $email
            firstName: $firstName
            middleName: $middleName
            lastName: $lastName
        ) {
            email
            firstName
            lastName
        }
    }`
;

export const CREATE_PROJECT = gql`
    mutation CreateProject($email: String!, $title: String!, $description: String!, $duration: Int!) {
        createProject(
            email: $email
            title: $title
            description: $description
            duration: $duration
        ) {
            id
            creatorEmail
            title
            description
        }
    }`
;

export const CREATE_GROUP = gql`
    mutation CreateGroup($email: String!, $name: String!, $projectId: ID!) {
        createGroup(
            email: $email
            name: $name
            projectId: $projectId
        ) {
            id
            name
        }
    }`
;

export const ADD_MEMBER_TO_PROJECT_USING_INVITE = gql`
    mutation AddMemberToProjectUsingInvite($userEmail: String!, $projectId: ID!, $token: String!) {
        addMemberToProjectUsingInvite(
            userEmail: $userEmail
            projectId: $projectId
            token: $token
        ) {
            id
            creatorEmail
            title
            description
        }
    }`
;

export const DELETE_PROJECT = gql`
    mutation DeleteProject($projectId: ID!, $userEmail: String!) {
        deleteProject(
            projectId: $projectId
            email: $userEmail
        )
    }`
;

export const CREATE_BACKLOG = gql`
    mutation CreateBacklog($userEmail: String!, $projectId: ID!, $groupId: ID!, $backlogName: String!, 
        $backlogDescription: String!, $backlogEffort: Int!) {
        createBacklog(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
            backlogName: $backlogName
            backlogDescription: $backlogDescription
            backlogEffort: $backlogEffort
        ) {
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

export const UPDATE_BACKLOG = gql`
    mutation UpdateBacklog(
        $userEmail: String!, $projectId: ID!, $groupId: ID!, $backlogId: ID!, $assigneeEmail: String, 
        $sprintId: ID, $backlogState: BacklogState) {
        updateBacklog(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
            backlogId: $backlogId
            assigneeEmail: $assigneeEmail
            sprintId: $sprintId
            backlogState: $backlogState
        ) {
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

export const UPDATE_BACKLOG_STATE = gql`
    mutation UpdateBacklogState($userEmail: String!, $projectId: ID!, $groupId: ID!, $backlogId: ID!, $sprintId: ID!,$backlogState: BacklogState!) {
        updateBacklogState(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
            sprintId: $sprintId
            backlogId: $backlogId
            backlogState: $backlogState
        ) {
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

export const CREATE_SPRINT = gql`
    mutation CreateSprint($userEmail: String!, $projectId: ID!, $groupId: ID!, $sprintName: String!, 
        $startDate: String!, $endDate: String!) {
        createSprint(
            userEmail: $userEmail
            projectId: $projectId
            groupId: $groupId
            sprintName: $sprintName
            startDate: $startDate
            endDate: $endDate
        ) {
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
