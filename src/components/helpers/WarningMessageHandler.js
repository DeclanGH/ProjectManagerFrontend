class WarningMessageHandler {

    static getWarningMessageForNonGroupMember(userDetails) {
        let alertMessage = ""
        if (userDetails && !userDetails.isGroupMember) {
            alertMessage = "You are not part of this group. You can view the data, but editing is restricted. "
            if (userDetails.isCreator && userDetails.isOwner) {
                alertMessage += "As a creator, you are allowed to add members and delete this group. "
            } else if (!userDetails.isCreator && userDetails.isOwner) {
                alertMessage += "As an owner, you are allowed to add members and delete this group. "
            }
        } // else userDetails is undefined or this function is being called in a region where it's not meant to and we do nothing

        return alertMessage;
    }
}

export default WarningMessageHandler;
