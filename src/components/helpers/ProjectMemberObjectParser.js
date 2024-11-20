class ProjectMemberObjectParser {

    static getFullName(projectMember) {
        if (!projectMember) return ""

        const firstName = projectMember.firstName
        const middleName = projectMember.middleName
        const lastName = projectMember.lastName
        const email = projectMember.email

        if (projectMember.firstName && projectMember.middleName && projectMember.lastName) {
            return `${firstName} ${middleName.charAt(0).toUpperCase()}. ${lastName} `;
        } else if (firstName && lastName) {
            return `${firstName} ${lastName} `
        } else if (firstName) {
            return `${firstName} `
        } else {
            return `${email} `
        }
    }
}

export default ProjectMemberObjectParser;
