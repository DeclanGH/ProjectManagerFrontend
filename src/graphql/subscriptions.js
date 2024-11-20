import {gql} from "@apollo/client";

export const BACKLOG_STATE_CHANGED_IN_SPRINT = gql`
    subscription BacklogStateChangedInSprint($sprintId: ID!) {
        backlogStateChangedInSprint(sprintId: $sprintId) {
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
