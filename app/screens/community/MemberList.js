import React, {useEffect, useState} from "react";
import {View, FlatList} from "react-native";
import {Appbar, useTheme, Divider} from "react-native-paper";
import MemberItem from "../../components/MemberItem";
import {useDispatch, useSelector} from "react-redux";
import {getMembers, selectCommunityMembers} from "../../store/slices/communityMembersSlice";
import {ProgressBar} from "react-native-paper";

const MemberList = ({route, navigation}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)

    const members = useSelector(state => selectCommunityMembers(state, route.params?.community?.id))

    useEffect(() => {
        dispatch(getMembers({communityId: route.params?.community?.id}))
            .unwrap()
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
    }, [])

    const theme = useTheme();
    return (
        <View style={{flex: 1}}>
            <Appbar.Header
                style={{backgroundColor: theme.colors.surface, elevation: 2}}
            >
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Members"/>
            </Appbar.Header>
            <View style={{marginBottom: 90}}>
                <FlatList
                    data={members}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <MemberItem member={item}
                                                        is_admin={route.params?.community?.is_admin ?? false}/>}
                    keyExtractor={(item) => item.id + ""}
                    ItemSeparatorComponent={() => <Divider/>}
                    ListEmptyComponent={<ProgressBar visible={loading} indeterminate/>}
                />
            </View>
        </View>
    );
};

export default MemberList;
