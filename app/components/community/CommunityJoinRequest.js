import {TouchableOpacity} from "react-native";
import {Text, useTheme} from "react-native-paper";
import React from "react";
import {requestAdd, requestDelete} from "../../store/slices/communityJoinRequestsSlice";
import {useDispatch} from "react-redux";

const CommunityJoinRequest = ({community}) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const handleJoinRequest = () => {
        dispatch(requestAdd({communityId: community.id}))
    }

    const handleJoinRequestDelete = (requestId) => {
        dispatch(requestDelete({communityId: community.id}))
    }


    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                borderColor: community.join_request ? theme.colors.disabled : theme.colors.primary,
                marginTop: 8,
                borderWidth:1,
                paddingVertical: 5,
                paddingHorizontal: 12,
                borderRadius: 20,
                justifyContent: 'center',
                alignSelf: 'center',
                width: '50%'
            }}
            onPress={() => community.join_request ? handleJoinRequestDelete(community.join_request) : handleJoinRequest()}
        >
            <Text
                style={{
                    color: theme.colors.primary,
                    fontWeight: "bold",
                    fontSize: 11,
                    alignSelf:'center',
                    textAlign: 'center'
                }}
            >
                {community.join_request ? "Requested" : "Join Community"}
            </Text>
        </TouchableOpacity>

    )
}

export default CommunityJoinRequest