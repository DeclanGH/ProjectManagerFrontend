import PropTypes from "prop-types";
import CreatorBadge from "../badges/CreatorBadge.jsx";
import OwnerBadge from "../badges/OwnerBadge.jsx";
import {Stack} from "react-bootstrap";
import ProjectMemberObjectParser from "./ProjectMemberObjectParser.js";

function MemberBadgeHandler({ memberInfo }) {

    return (
        memberInfo ? (
            <div>
                <Stack direction="horizontal" gap={2}>
                    {ProjectMemberObjectParser.getFullName(memberInfo)}
                    <Stack direction="horizontal" gap={1}>
                        {memberInfo.isCreator && <CreatorBadge/>}
                        {memberInfo.isOwner && <OwnerBadge/>}
                    </Stack>
                </Stack>
            </div>
        ) : null
    );
}

MemberBadgeHandler.propTypes = {
    memberInfo: PropTypes.object.isRequired,
}

export default MemberBadgeHandler;
