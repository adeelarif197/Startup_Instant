import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {useTheme} from "react-native-paper";
import {useDispatch} from "react-redux";
import {followCompany, unFollowCompany} from "../../store/slices/companiesSlice";

const FollowUnfollowButton = ({company}) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const handleFollow = () => {
        dispatch(followCompany(company.id));
    };
    const handleUnfollow = () => {
        dispatch(unFollowCompany(company.id));
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: "84%",
                backgroundColor: company.is_following
                    ? theme.colors.surface
                    : theme.colors.primary,
                paddingVertical: 4,
                borderRadius: 4,
                borderColor: company.is_following
                    ? theme.colors.disabled
                    : theme.colors.primary,
            }}
            onPress={() =>
                company.is_following ? handleUnfollow() : handleFollow()
            }
        >
            <Text
                style={{
                    color: company.is_following
                        ? theme.colors.text
                        : theme.colors.surface,
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                }}
            >
                {company.is_following ? "Following" : "Follow"}
            </Text>
        </TouchableOpacity>
    )
}

export default FollowUnfollowButton;