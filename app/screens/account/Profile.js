import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
} from "react-native";
import {Caption, useTheme, Divider} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {getStatusBarHeight} from "react-native-status-bar-height";
import PostItem from "../../components/PostItem";
import CommunityListItem from "../../components/CommunityListItem";
import Overview from "../../components/Overview";
import {useDispatch, useSelector} from "react-redux";
import {MaterialTabBar, Tabs} from "react-native-collapsible-tab-view";
import {getPosts, selectUserPosts} from "../../store/slices/postsSlice";
import {getCommunities, selectCommunitiesByUser, selectFeaturedCommunities} from "../../store/slices/communitiesSlice";
import CommunityCard from "../../components/CommunityCard";
import { selectFollowedCompanies } from "../../store/slices/companiesSlice";
import CompanyListItem from "../../components/company/CompanyListItem";


const Profile = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch()

    const user = useSelector(({auth}) => auth.user);
    if(!user){
        return null
    }
    const userPostsParams = useSelector(({posts}) => posts.user[user.id]?.params ?? {ordering:'-id', limit:2});
    const userPostsNext = useSelector(({posts}) => posts.user[user.id]?.next);

    const userPosts = useSelector((state)=>selectUserPosts(state, user.id))
    const userCommunities = useSelector((state)=>selectCommunitiesByUser(state, user.id))
    const userCompanies = useSelector((state) =>
    selectFollowedCompanies(state, user.id)
    );
    const featuredCommunities = useSelector(selectFeaturedCommunities)
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const {width} = Dimensions.get("window");
    const statusBarHeight = getStatusBarHeight();

    useEffect(
        () => {
            fetchUserPosts();
            dispatch(getCommunities({params:{ordering:'-id', user:user.id}, from:'user'}))
            dispatch(getCommunities({params: {featured: true}, from: 'featured'}))
        },[]
    )

    const fetchUserPosts = (url=null) => {
        setLoading(true)
        url ?? setRefreshing(true);
        dispatch(getPosts({url, params:{...userPostsParams, user:user.id}, from: "user"}))
            .unwrap()
            .then(() => {
                setRefreshing(false)
                setLoading(false)
            })
            .catch(() => {
                setRefreshing(false)
                setLoading(false)
            });
    }

    const Header = () => (
        <View>
            <View style={{alignItems: "center", marginBottom: 12}}>
                {/* <ScrollView> */}
                <Text numberOfLines={1} style={{marginTop: 16, marginHorizontal: 48,fontSize:14,fontWeight:'700',color:theme.colors.backdrop}}>
                    @{user.username}
                </Text>
                <Image
                    source={{
                        uri: user?.pic,
                    }}
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 75,
                        marginTop: 8,
                        borderColor: theme.colors.disabled,
                        borderWidth: 1,
                    }}
                />
                <Text numberOfLines={1} style={{marginTop: 8, alignSelf:'center',fontSize:18,fontWeight:'700'}}>
                {user.fullname}
            </Text>
            <Text numberOfLines={1} style={{marginTop: 4,fontSize: 16, alignSelf:'center'}}>
                {user.title}
                {/* Designer */}
            </Text>
            <Text numberOfLines={1} style={{marginTop: 2,fontSize: 14, alignSelf:'center',color:theme.colors.backdrop}}>
                {user.extra.company}
                {/* Nuwork */}
            </Text>
            <Text numberOfLines={1} style={{marginTop: 2,fontSize: 16, alignSelf:'center',fontWeight:'700'}}>
            {user.extra.address}
                {/* Banglore, India */}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    width: width / 1.3,
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                }}
            >
                <View style={{alignItems: "center"}}>
                    <Text style={{fontWeight: "bold", fontSize: 18}}>
                        {user?.num_posts ?? 0}
                    </Text>
                    <Text style={{color:theme.colors.backdrop}}>Posts</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => props.navigation.push("FOLLOWER_LIST")}
                    style={{alignItems: "center", marginLeft: 22}}
                >
                    <Text style={{fontWeight: "bold", fontSize: 18}}>
                        {user.num_followers}
                    </Text>
                    <Text style={{color:theme.colors.backdrop}}>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => props.navigation.push("FOLLOWER_LIST")}
                    style={{alignItems: "center"}}
                >
                    <Text style={{fontWeight: "bold", fontSize: 18}}>
                        {user.num_following}
                    </Text>
                    <Text style={{color:theme.colors.backdrop}}>Following</Text>
                </TouchableOpacity>
            </View>
                <View
                    style={{
                        marginTop: 12,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{
                            backgroundColor: theme.colors.primary,
                            paddingVertical: 12,
                            paddingHorizontal: width / 3.3,
                            borderRadius: 7,
                        }}
                        onPress={() => props.navigation.push("PROFILE_UPDATE")}
                    >
                        <Text
                            style={{
                                color: theme.colors.surface,
                                // fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* </ScrollView> */}
            </View>
        </View>
    );
    return (
        <View
            style={{
                flex: 1,
                marginTop: statusBarHeight,
                backgroundColor: theme.colors.surface,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    // paddingHorizontal: 12,
                    // zIndex: 9999,
                    backgroundColor: theme.colors.surface,
                    height: 54,
                    width:'97%',
                    // elevation: 2,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => props.navigation.goBack()}
                >
                    <View style={{flexDirection:'row'}}>
                    <Ionicons
                        color={theme.colors.backdrop}
                        name="chevron-back"
                        size={26}
                    />
                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            // marginHorizontal: 12,
                            color:theme.colors.backdrop,
                            alignSelf:'center'
                        }}
                    >
                        Back
                    </Text>
                    </View>
                </TouchableOpacity>
                <View style={{alignSelf:'center', alignItems: "center"}}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            // marginHorizontal: 12,
                            paddingRight:15,
                            color:theme.colors.primary,
                            alignSelf:'center',
                            // alignItems:'center'
                        }}
                    >
                        MY PROFILE
                    </Text>
                </View>
                <Ionicons
                onPress={() => props.navigation.push("DRAWER")}
                    color={theme.colors.backdrop}
                    style={{alignSelf:'center',transform: [{rotateY: '180deg'}]}}
                    name="menu-outline"
                    size={26}
                />
            </View>
            {/* <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    zIndex: 9999,
                    backgroundColor: theme.colors.surface,
                    height: 54,
                    elevation: 2,
                }}
            >
                <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.navigate('HOME')}
        >
          <Ionicons
            color={theme.colors.text}
            name="md-arrow-back-outline"
            size={26}
          />
        </TouchableOpacity>
                <View style={{alignItems: "center"}}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            marginHorizontal: 6,
                        }}
                    >
                        {user.fullname}
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => props.navigation.push("DRAWER")}
                >
                    <Ionicons
                        color={theme.colors.text}
                        name="md-menu-outline"
                        size={26}
                    />
                </TouchableOpacity>
            </View> */}

            <Tabs.Container
                renderHeader={Header}
                headerHeight={900} // optional
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
                            fontSize: 12,
                            fontWeight: "bold",
                        }}
                        indicatorStyle={{backgroundColor: theme.colors.primary}}
                    />
                )}
            >
                <Tabs.Tab name="About" label='About'>
                    <Tabs.ScrollView showsVerticalScrollIndicator={false}>
                        <Overview user={user}/>
                    </Tabs.ScrollView>
                </Tabs.Tab>
                <Tabs.Tab name="Posts" label='Posts'>
                    <Tabs.FlatList
                        data={userPosts}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <PostItem item={item}/>}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <Divider/>}
                        onEndReachedThreshold={0.8}
                        onEndReached={()=>userPostsNext && !loading && fetchUserPosts(userPostsNext)}
                        onRefresh={fetchUserPosts}
                        refreshing={refreshing}
                    />
                </Tabs.Tab>
                <Tabs.Tab name="Communities" label='Community'>
                    <Tabs.FlatList
                        data={featuredCommunities}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => 
                        {item.member === null && (
                        <CommunityCard community={item}/>
                        )}
                    }
                        keyExtractor={(item) => item + ""}
                        ItemSeparatorComponent={() => <Divider/>}
                    />
                </Tabs.Tab>
                <Tabs.Tab name="Company" label="Company">
                    <Tabs.FlatList
                        data={userCompanies}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                        {item.member === null && ( 
                        <CompanyListItem company={item}/>
                        )}
                    }
                        keyExtractor={(item) => item + ""}
                        ItemSeparatorComponent={() => <Divider/>}
                    />
                </Tabs.Tab>
            </Tabs.Container>
        </View>
    );
};

export default Profile;
