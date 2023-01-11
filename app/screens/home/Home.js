import React, {memo, useCallback, useEffect, useState} from "react";
import {MaterialTabBar, Tabs} from "react-native-collapsible-tab-view";
import {
    View,
    Image,
    TextInput
} from "react-native";
import {Divider, Text, useTheme} from "react-native-paper";
import PostItem from "../../components/PostItem";
import CommunityCard from "../../components/CommunityCard";
import {Ionicons} from "@expo/vector-icons";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {FlatList} from "react-native-gesture-handler";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, selectCommunityFeedPosts, selectFeedPosts} from "../../store/slices/postsSlice";
import {getPostCategories} from "../../store/slices/extraEntitiesSlice";
import PostCategoryIcon from "../../components/PostCategoryIcon";
import {getCommunities, selectFeaturedCommunities} from "../../store/slices/communitiesSlice";
import {postTypes} from "../../api/constants";
import _ from 'lodash';

const Home = ({navigation}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const statusBarHeight = getStatusBarHeight();

    const posts = useSelector(selectFeedPosts);
    const communityPosts = useSelector(selectCommunityFeedPosts);
    const {next:communityFeedNext} = useSelector(({posts}) => posts.communityFeed);

    const {params, next} = useSelector(({posts}) => posts.feed);
    const {postCategories} = useSelector(({extraEntities}) => extraEntities);

    const featuredCommunities = useSelector(selectFeaturedCommunities)

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);


    const fetchPostCategories = () => {
        dispatch(getPostCategories())
    }


    const fetchFeedPosts = useCallback((url = null) => {
        setLoading(true)
        url ?? setRefreshing(true);
        dispatch(getPosts({url, params, from: "feed"}))
            .unwrap()
            .then(() => {
                setRefreshing(false)
                setLoading(false)
            })
            .catch(() => {
                setRefreshing(false)
                setLoading(false)
            });
    }, [])

    const fetchCommunityFeedPosts = useCallback((url = null) => {
        setLoading(true)
        url ?? setRefreshing(true);
        dispatch(getPosts({url, params:{community_feed:true, ordering:'-id',limit:1}, from: "communityFeed"}))
            .unwrap()
            .then(() => {
                setRefreshing(false)
                setLoading(false)
            })
            .catch(() => {
                setRefreshing(false)
                setLoading(false)
            });
    }, [])



    const navigate = (screenName) => {
        navigation.push(screenName)
    }

    useEffect(() => {
        fetchPostCategories()
        fetchFeedPosts()
        fetchCommunityFeedPosts()
        dispatch(getCommunities({params: {featured: true}, from: 'featured'}))
    }, [])

    return (
        <View style={{flex: 1, marginTop: statusBarHeight}}>
            <View style={{justifyContent:'space-around',flexDirection:'row',backgroundColor:'white'}}>
                <Image style={{height:50,width:50,borderRadius:100}} source={require('../../../assets/logo.png')}/>
                <View
                    style={{
                        borderRadius: 30,
                        height: '70%',
                        backgroundColor:'#F6F6F6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'73%',
                        paddingHorizontal: 5,
                        flexDirection:'row'
                        // borderBottomWidth: 1,
                        
                    }}
                    
                >
                    
                <Ionicons name="md-search-outline" style={{alignSelf:'center',marginHorizontal:'2%'}} size={26} color={theme.colors.backdrop}/>
                <TextInput placeholder="Search"
                    placeholderStyle={{  }}
                    // onChangeText={setFullname}
                    // value={fullname} 
                    />
                </View>
                <Ionicons name="md-notifications-outline" style={{alignSelf:'center'}} size={29} color={theme.colors.primary}/>
            </View>
            <Tabs.Container
                lazy
                tabBarHeight={56}
                renderTabBar={(props) => (
                    <MaterialTabBar
                        {...props}
                        style={{
                            backgroundColor: theme.colors.surface,
                            color: theme.colors.text,
                        }}
                        labelStyle={{
                            color: theme.colors.text,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                        indicatorStyle={{backgroundColor: theme.colors.primary}}
                    />
                )}
            >
                <Tabs.Tab name="Feed">
                    <Tabs.FlatList
                        showsVerticalScrollIndicator={false}
                        data={posts}
                        renderItem={({item}) => <PostItem item={item}/>}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <Divider/>}
                        ListHeaderComponent={
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled={true}
                                data={_.filter(postTypes, ({name})=>name!=='NORMAL')}
                                renderItem={({item}) => <PostCategoryIcon item={item}/>}
                                keyExtractor={(item) => item.name}
                            />
                        }
                        onEndReachedThreshold={0.8}
                        onEndReached={()=>next && !loading && fetchFeedPosts(next)}
                        onRefresh={fetchFeedPosts}
                        refreshing={refreshing}
                    />
                </Tabs.Tab>
                <Tabs.Tab name="Community">
                    <Tabs.FlatList
                        showsVerticalScrollIndicator={false}
                        data={communityPosts}
                        renderItem={({item}) => <PostItem item={item}/>}
                        keyExtractor={(item) => item.id + ""}
                        ItemSeparatorComponent={() => <Divider/>}
                        ListHeaderComponent={
                            <View style={{marginBottom: 12}}>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginHorizontal: 12,
                                        marginTop: 12,
                                    }}
                                >
                                    <Text style={{fontWeight: "bold", fontSize: 16}}>
                                        Explore Community
                                    </Text>
                                    <Text
                                    style={{fontWeight: "bold", fontSize: 14, color:theme.colors.primary}}
                                        onPress={() => navigate("COMMUNITY_EXPLORE")}
                                    >
                                        See all
                                    </Text>
                                </View>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    data={featuredCommunities}
                                    keyExtractor={(item) => item.id + ""}
                                    renderItem={({item}) => (
                                        <CommunityCard community={item}/>
                                    )}
                                />
                            </View>
                        }
                        onEndReachedThreshold={0.8}
                        onEndReached={()=>communityFeedNext && !loading && fetchCommunityFeedPosts(communityFeedNext)}
                        onRefresh={fetchCommunityFeedPosts}
                        refreshing={refreshing}
                    />
                </Tabs.Tab>
            </Tabs.Container>
        </View>
    );
};

export default Home;
