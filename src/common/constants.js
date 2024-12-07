export const APPLICATION_NAME = "Project Manager";

export const NOTIFICATION_DELAY = 4500;

export const BUTTON_LABEL = {
    ACTION: "Action",
    LOGIN: "Log In",
    LOGOUT: "Log Out",
    CREATE: "Create",
    CLOSE: "Close",
    BACK: "Back",
    UPDATE: "Update",
    EDIT: "Edit",
    SAVE: "Save",
    DELETE: "Delete",
    CANCEL: "Cancel",
    CREATE_GROUP: "Create Group",
    CREATE_BACKLOG: "Create Backlog",
    CREATE_SPRINT: "Create Sprint",
    PROMOTE: "Promote",
    DEMOTE: "Demote",
    REMOVE_FROM_GROUP: "Remove from Group",
    REMOVE_FROM_PROJECT: "Remove from Project",
}

export const LOCAL_STORAGE_ITEM = {
    GROUP_PAGE_CURRENT_DISPLAY_TAB: "groupPageCurrentDisplayTab",
}

export const FORM_LABEL = {
    SPRINT_NAME: "Sprint Name",
    START_DATE: "Start Date",
    END_DATE: "End Date",
    BACKLOG_NAME: "Backlog Name",
    BACKLOG_DESCRIPTION: "Backlog Description",
}

export const LINK_LABEL = {
    HOME: "Home",
    DASHBOARD: "Dashboard",
    PROJECT_ACTIONS: "Project Actions",
    INVITE_MEMBERS: "Invite Members",
    DELETE_PROJECT: "Delete Project",
    GROUP_HOME: "Group Home",
    GROUPS: "Groups",
    SPRINTS: "Sprints",
    BACKLOGS: "Backlogs",
    SETTINGS: "Settings",
    BACK: "Back"
}

export const PROJECT_ID = "/:projectId";
export const GROUP_ID = "/:groupId";
export const BACKLOG_ID = "/:backlogId";
export const SPRINT_ID = "/:sprintId";


export const ROUTE = {
    HOME: "/",
    DASHBOARD: "/dashboard",
    ABOUT: "/about",
    PROJECT: "/project",
    GROUP: "/group",
    BACKLOG: "/backlog",
    SPRINT: "/sprint",
    INVITE: "/invite"
}

export const TOAST_VARIANT = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    SUCCESS: "success",
    DANGER: "danger",
    WARNING: "warning",
    INFO: "info",
    LIGHT: "light",
    DARK: "dark",
}

export const ALERT_VARIANT = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    SUCCESS: "success",
    DANGER: "danger",
    WARNING: "warning",
    INFO: "info",
    LIGHT: "light",
    DARK: "dark",
}

export const PROJECT_PAGE_SELECTION = {
    PROJECT_HOME: "project_home",
    GROUP_SELECT_PAGE: "group_select_page",
    SETTINGS: "settings",
}

export const BACKLOG_STATE = {
    NOT_STARTED: "NOT_STARTED",
    IN_PROGRESS: "IN_PROGRESS",
    BLOCKED: "BLOCKED",
    COMPLETED: "COMPLETED",
}

export const BACKLOG_STATE_NAME = {
    [BACKLOG_STATE.NOT_STARTED]: "Not Started",
    [BACKLOG_STATE.IN_PROGRESS]: "In Progress",
    [BACKLOG_STATE.BLOCKED]: "Blocked",
    [BACKLOG_STATE.COMPLETED]: "Completed",
}

export const BACKLOG_TABLE_HEADER = {
    NAME: "Name",
    EFFORT: "Effort",
    STATUS: "Status",
    ASSIGNED_MEMBER: "Assigned Member",
    ASSIGNED_SPRINT: "Assigned Sprint",
}

export const BACKLOG_PAGE_FIELD_NAME = {
    ISSUED_BY: "Issued By",
    ISSUE_DATE: "Issue Date",
    CLOSED_DATE: "Closed Date",
    DESCRIPTION: "Description",
    STATUS: "Status",
    ESTIMATED_EFFORT: "Estimated Effort",
    ASSIGNED_TO: "Assigned To",
    ASSIGNED_BY: "Assigned By",
    ASSIGNED_SPRINT: "Assigned Sprint",
}

export const MAXIMUM = {
    TITLE_LENGTH: 60,
    DESCRIPTION_LENGTH: 255,
    BACKLOG_DESCRIPTION_LENGTH: 5000,
}

export const SPECIAL_CHAR = {
    LESS_THAN: "<",
    GREATER_THAN: ">",
}

export const TIPS = {
    BACKLOG_EFFORT: "Level of effort indicates the estimated work needed to complete this backlog item. " +
        "It could be measured in hours, weeks, difficulty etc; whatever your team decides."
}

export const ALERT_MESSAGE = {
    ABOUT_TO_SAVE_BACKLOG_STATE_AS_COMPLETE: `Before you go on to save this backlog as "${BACKLOG_STATE_NAME[BACKLOG_STATE.COMPLETED]}", NOTE that the action will be irreversible if no sprint has been assigned, and you will be marked as the "Assignee" if none exists.`,
}