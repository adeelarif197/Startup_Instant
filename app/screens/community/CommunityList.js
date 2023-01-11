import React, {useEffect} from "react";
import {View, ScrollView, TouchableOpacity} from "react-native";
import {Appbar, useTheme} from "react-native-paper";
import CommunityListItem from "../../components/CommunityListItem";
import {useDispatch, useSelector} from "react-redux";
import {selectCommunitiesByCategory} from "../../store/slices/communitiesSlice";
import {getCommunityCategories} from "../../store/slices/extraEntitiesSlice";

const CommunityList = ({navigation, route}) => {
    const theme = useTheme();
    const dispatch = useDispatch()

    const communities = useSelector(state => selectCommunitiesByCategory(state, route.params?.category?.id))

    useEffect(() => {
        dispatch(getCommunityCategories())
    }, [])


    return (
        <View style={{flex: 1}}>
            <Appbar.Header
                style={{backgroundColor: theme.colors.surface, elevation: 2}}
            >
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title={route.params?.category?.name}/>
            </Appbar.Header>
            <ScrollView showsVerticalScrollIndicator={false}>
                {communities.map((item) => (
                    <TouchableOpacity activeOpacity={0.9}
                                      key={item}
                                      onPress={() => navigation.push("OTHER_COMMUNITY")}
                    >
                        <CommunityListItem community={item}/>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default CommunityList;
