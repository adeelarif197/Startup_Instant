import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {useTheme} from "react-native-paper";
import {followUser, unfollowUser} from "../../store/slices/usersSlice";
import {useDispatch} from "react-redux";

const FollowUnfollowButton = ({user}) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const handleFollow = () => {
        dispatch(followUser({id: user.id}));
    };
    const handleUnfollow = () => {
        dispatch(unfollowUser({id: user.id}));
    };


    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: "40%",
                backgroundColor: user.is_following
                    ? theme.colors.surface
                    : theme.colors.surface,
                paddingVertical: 15,
                borderRadius: 15,
                borderColor: user.is_following
                    ? theme.colors.disabled
                    : theme.colors.primary,
                borderWidth: 1,
                elevation:5
            }}
            onPress={() =>
                user.is_following ? handleUnfollow() : handleFollow()
            }
        >
            <Text
                style={{
                    color: user.is_following
                        ? theme.colors.primary
                        : theme.colors.primary,
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                }}
            >
                {user.is_following ? "Following" : "Follow"}
            </Text>
        </TouchableOpacity>
    )
}

export default FollowUnfollowButton;