import {TouchableOpacity} from "react-native";
import {Text, useTheme} from "react-native-paper";
import React from "react";
import {useDispatch} from "react-redux";
import {leave} from "../../store/slices/communityMembersSlice";

const CommunityLeaveButton = ({community}) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const handleLeave = () => {
        dispatch(leave({communityId: community.id, memberId: community.member}))
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                backgroundColor: '#fff',
                marginTop: 8,
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderRadius: 5,
                alignSelf: 'center'
            }}
            onPress={handleLeave}
        >
            <Text
                style={{
                    color: "#ff3373",
                    fontWeight: "bold",
                    fontSize: 16,
                }}
            >
                Leave
            </Text>
        </TouchableOpacity>

    )
}

export default CommunityLeaveButton;