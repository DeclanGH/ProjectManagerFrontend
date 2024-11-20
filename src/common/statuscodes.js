export const ProjectMangerStatusCode = {

    /**
     * A client makes a request that has been acknowledged but not acted upon.
     */
    ACCEPTED: "202",

    /**
     * A client sends a request that is malformed or suspicious. Generally, it just doesn't look right.
     */
    BAD_REQUEST: "400",

    /**
     * An unauthenticated client is requesting a resource.
     */
    UNAUTHORIZED: "401",

    /**
     * A client is requesting a resource they are not authorized to access.
     */
    FORBIDDEN: "403",

    /**
     * A client is requesting a resource that cannot be found.
     * <br/>
     * <br/>
     * You can send this rather than {@link #FORBIDDEN} to hide the existence of a resource from an unauthorized
     * client.
     */
    NOT_FOUND: "404",

    INTERNAL_SERVER_ERROR: "500",
}