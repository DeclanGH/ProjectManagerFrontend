import { useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from "@apollo/client";
import { CREATE_OR_UPDATE_USER } from "./graphql/mutations";

function useUserUpdate() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [createOrUpdateUser] = useMutation(CREATE_OR_UPDATE_USER);
    const userRef = useRef();

    useEffect(() => {
        if (isLoading || !isAuthenticated || !user) return;

        if (!userRef.current || hasUserChanged(user, userRef.current)) {
            createOrUpdateUser({
                variables: {
                    email: user.email,
                    firstName: user.given_name || user.nickname,
                    middleName: user.middle_name || "",
                    lastName: user.family_name || ""
                }
            }).then(() => {
                userRef.current = user;
            }).catch(err => {
                console.error("Error during mutation:", err);
            });
        }
    }, [isAuthenticated, isLoading, user, createOrUpdateUser]);
}

function hasUserChanged(currentUser, previousUser) {
    return (
        currentUser.given_name !== previousUser.given_name ||
        currentUser.middle_name !== previousUser.middle_name ||
        currentUser.family_name !== previousUser.family_name
    );
}

export default useUserUpdate;
