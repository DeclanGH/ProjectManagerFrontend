import {useAuth0} from "@auth0/auth0-react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {ADD_MEMBER_TO_PROJECT_USING_INVITE} from "../../graphql/mutations.js";
import LoadingSpinner from "../spinners/LoadingSpinner.jsx";
import {useEffect, useState} from "react";
import {ROUTE, TOAST_VARIANT} from "../../common/constants.js";
import ToastNotification from "../alerts/ToastNotification.jsx";

function InviteHandler() {
    const { user } = useAuth0();
    const { projectId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token");

    const [showToastNotification, setShowToastNotification] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const [addMemberToProject, {loading, error}] = useMutation(
        ADD_MEMBER_TO_PROJECT_USING_INVITE,
        {
            onCompleted: () => {
                setToastMessage("Successfully joined project!");
                setShowToastNotification(true);
                setTimeout(() => {
                    navigate(ROUTE.DASHBOARD);
                    }, 2000);
                },
            onError: (error) => {
                setToastMessage("Error joining project: " + error.message);
                showToastNotification(true);
            },
        }
    );

    useEffect(() => {
        if (user && projectId && token) {
            addMemberToProject({
                variables: {
                    userEmail: user.email,
                    projectId: projectId,
                    token: token,
                },
            });
        }
    }, [user, projectId, token, addMemberToProject]);

    if (loading) return <LoadingSpinner />;

    return (
        <>
            {showToastNotification && (
                <ToastNotification
                    show={showToastNotification}
                    variant={error ? TOAST_VARIANT.DANGER : TOAST_VARIANT.SUCCESS}
                    message={toastMessage}
                />
            )}
        </>
    );
}

export default InviteHandler;
