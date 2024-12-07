import {ProjectMangerStatusCode} from "../../common/statuscodes.js";

class ErrorMessageHandler {

    static parseProjectMangerStatusCode(projectManagerError) {
        let errorMessage = "";

        if (projectManagerError) {
            switch (projectManagerError.message) {
                case ProjectMangerStatusCode.NOT_FOUND:
                    errorMessage = "Could not find resource.";
                    break;
                case ProjectMangerStatusCode.NOT_FOUND_USER:
                    errorMessage = "Could not find user.";
                    break;
                case ProjectMangerStatusCode.NOT_FOUND_PROJECT:
                    errorMessage = "Could not find project.";
                    break;
                case ProjectMangerStatusCode.NOT_FOUND_GROUP:
                    errorMessage = "Could not find group.";
                    break;
                case ProjectMangerStatusCode.NOT_FOUND_BACKLOG:
                    errorMessage = "Could not find backlog.";
                    break;
                case ProjectMangerStatusCode.NOT_FOUND_SPRINT:
                    errorMessage = "Could not find sprint.";
                    break;
                case ProjectMangerStatusCode.FORBIDDEN:
                    errorMessage = "You are not allowed to perform this action.";
                    break;
                case ProjectMangerStatusCode.INTERNAL_SERVER_ERROR:
                    errorMessage = "An error occurred. Please report this issue.";
                    break;
                case ProjectMangerStatusCode.BAD_REQUEST:
                    errorMessage = "Your input might be malformed. Try again.";
                    break;
                default:
                    errorMessage = "An error occurred.";
            }
        }
        return errorMessage;
    }
}

export default ErrorMessageHandler;
