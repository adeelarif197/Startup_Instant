import React, {useEffect, useState} from "react";
import {View, FlatList,Text} from "react-native";
import {Appbar, useTheme, Divider, ProgressBar} from "react-native-paper";
import CommunityRequest from "../../components/CommunityRequest";
import {useDispatch, useSelector} from "react-redux";
import {getRequests, selectCommunityJoinRequests} from "../../store/slices/communityJoinRequestsSlice";

const RequestList = ({navigation, route}) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const requests = useSelector((state)=>selectCommunityJoinRequests(state, route.params.community.id))

    useEffect(()=>{
        const {community} = route.params;
        if(community){
            dispatch(getRequests({communityId:community.id}))
                .unwrap()
                .then(()=>setLoading(false))
                .catch(()=>setLoading(false))
        }
    }, [])


    const theme = useTheme();
    return (
        <View style={{flex: 1,backgroundColor:theme.colors.surface}}>
            <Appbar.Header
                style={{backgroundColor: theme.colors.surface, elevation: 2}}
            >
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content  titleStyle={{alignSelf:'center',right:'10%'}} title="Community Request"/>
            </Appbar.Header>
            <View style={{backgroundColor: theme.colors.surface}}>

                <Text style={{marginHorizontal:'5%',fontSize:16,fontWeight:'700',marginVertical:'3%'}}>
                Request Pending
                </Text>
                
                <FlatList
                    data={requests}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <CommunityRequest request={item}/>}
                    keyExtractor={(item) => item + ""}
                    ItemSeparatorComponent={() => <Divider/>}
                    ListEmptyComponent={<ProgressBar visible={loading} indeterminate/>}
                />


<Text style={{marginHorizontal:'5%',fontSize:16,fontWeight:'700',marginVertical:'3%'}}>
                Accepted
                </Text>
                <FlatList
                    data={requests}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <CommunityRequest request={item}/>}
                    keyExtractor={(item) => item + ""}
                    ItemSeparatorComponent={() => <Divider/>}
                    ListEmptyComponent={<ProgressBar visible={loading} indeterminate/>}
                />
            </View>
        </View>
    );
};

export default RequestList;
