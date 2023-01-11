import React, {useEffect,useState} from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import {Appbar, useTheme} from "react-native-paper";
import CommunityCard from "../../components/CommunityCard";
import {useDispatch, useSelector} from "react-redux";
import {getCommunities, selectCommunitiesByCategory} from "../../store/slices/communitiesSlice";
import {navigate} from "../../api/helper";
import {getCommunityCategories} from "../../store/slices/extraEntitiesSlice";
import _ from 'lodash'
import CommunitiesListHorizonal from "./CommunitiesListHorizonal";

const CommunityExplore = (props) => {
    const theme = useTheme();
    const [visible, setVisible] = React.useState();
    const [Name, setName] = React.useState();
    const dispatch = useDispatch();
    const communities = useSelector((state) => selectCommunitiesByCategory(state, visible));
    const categories = useSelector((state) => state.extraEntities.communityCategories)

    useEffect(() => {
        dispatch(getCommunityCategories())
    }, [])

    useEffect(() => {
        if (!!categories.length) {
            _.forEach(categories, category => {
                let params = {ordering: '-id', limit: 10, category: category.id}
                dispatch(getCommunities({params, from: 'category'}))
            })
        }
    }, [categories])

    return (
        <View style={{flex: 1}}>
            <Appbar.Header
                style={{backgroundColor: theme.colors.surface, elevation: 2}}
            >
                <Appbar.BackAction color={theme.colors.primary} onPress={() => props.navigation.navigate("HOME")}/>
                <Appbar.Content titleStyle={{color:theme.colors.primary}} title="Explore Communities"/>
            </Appbar.Header>
            <ScrollView
                style={{marginBottom: 12}}
                showsVerticalScrollIndicator={false}
            >
                <ScrollView style={{flex:1,backgroundColor:theme.colors.surface,paddingVertical:'3%',elevation:5}} horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => 
                                        {setVisible(item.id)
                                        setName(item.name)}
                                    }
                                    // key={item.id.toString()}
                                    style={{
                                        elevation: 1,
                                        height: 40,
                                        // width: 70,
                                        alignItems: "center",
                                        justifyContent:'center',
                                        marginLeft: 12,
                                        marginTop: 10,
                                        paddingHorizontal:20,
                                        paddingVertical:10,
                                        backgroundColor: '#DBDBDB',
                                        borderRadius: 20,
                                    }}
                                >
                                    
                                    <Text numberOfLines={1} style={{alignSelf:'center', color:visible == item.id ? theme.colors.primary : '#8D8D8D'}}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            </ScrollView>
                            <Text style={{fontSize:16,fontWeight:'700',marginHorizontal:'5%',marginTop:'3%'}}>
                                {Name}
                            </Text>


                            {communities.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.9}
                        onPress={() => navigate("OTHER_COMMUNITY")}
                    >
                        <CommunityCard community={item}/>
                    </TouchableOpacity>
                ))}
                {/* {categories.map((item) => <CommunitiesListHorizonal category={item}/>)} */}
            </ScrollView>
        </View>
    );
};

export default CommunityExplore;
