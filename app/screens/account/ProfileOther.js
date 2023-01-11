import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, Image, Dimensions} from "react-native";
import {Caption, useTheme, Divider} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {getStatusBarHeight} from "react-native-status-bar-height";
import PostItem from "../../components/PostItem";
import Tooltip from "react-native-walkthrough-tooltip";
import CommunityListItem from "../../components/CommunityListItem";
import CommunityCard from "../../components/CommunityCard";
import Overview from "../../components/Overview";
import {
    followUser,
    getUser,
    selectUser,
    unfollowUser,
} from "../../store/slices/usersSlice";
import {useDispatch, useSelector} from "react-redux";
import {MaterialTabBar, Tabs} from "react-native-collapsible-tab-view";
import {getPosts, selectUserPosts} from "../../store/slices/postsSlice";
import CompanyListItem from "../../components/company/CompanyListItem";
import {
    getCommunities,
    selectCommunitiesByUser,
} from "../../store/slices/communitiesSlice";
import { selectOwnedCompanies } from "../../store/slices/companiesSlice";
import FollowUnfollowButton from "../../components/users/FollowUnfollowButton";

const {width} = Dimensions.get("window");
const statusBarHeight = getStatusBarHeight();
const ProfileOther = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const user = useSelector((state) =>
        selectUser(state, props?.route?.params?.userId)
    );

    if (!user) {
        return null;
    }

    const userPostsParams = useSelector(
        ({posts}) => posts.user[user.id]?.params ?? {ordering: "-id", limit: 2}
    );
    const userPostsNext = useSelector(({posts}) => posts.user[user.id]?.next);
    const [TipVisible, setTipVisible] = useState(false);
    const userPosts = useSelector((state) => selectUserPosts(state, user.id));
    const userCommunities = useSelector((state) =>
        selectCommunitiesByUser(state, user.id)
    );
    const userCompanies = useSelector((state) =>
    selectOwnedCompanies(state, user.id)
    );

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getUser({id: props?.route?.params?.userId}));
        fetchUserPosts();
        dispatch(
            getCommunities({
                params: {ordering: "-id", user: props?.route?.params?.userId},
                from: "user",
            })
        );
    }, []);

    const fetchUserPosts = (url = null) => {
        setLoading(true);
        url ?? setRefreshing(true);
        dispatch(
            getPosts({
                url,
                params: {...userPostsParams, user: user.id},
                from: "user",
            })
        )
            .unwrap()
            .then(() => {
                setRefreshing(false);
                setLoading(false);
            })
            .catch(() => {
                setRefreshing(false);
                setLoading(false);
            });
    };

    const Header = () => (
        <View style={{alignItems: "center", marginBottom: 12}}>
            <Image
                source={{
                    uri: user.pic,
                }}
                resizeMode='cover'
                style={{
                    height: 100,
                    width: 100,
                    borderRadius: 75,
                    marginTop: 8,
                    borderColor: theme.colors.disabled,
                    borderWidth: 0,
                }}
            />
            <Text numberOfLines={1} style={{marginTop: 8, alignSelf:'center',fontSize:18,fontWeight:'700'}}>
                {user.username}
            </Text>
            <Text numberOfLines={1} style={{marginTop: 4,fontSize: 16, alignSelf:'center'}}>
                {/* {user.company} */}
                Designer
            </Text>
            <Text numberOfLines={1} style={{marginTop: 2,fontSize: 14, alignSelf:'center',color:theme.colors.backdrop}}>
                {/* {user.location} */}
                Nuwork
            </Text>
            <Text numberOfLines={1} style={{marginTop: 2,fontSize: 16, alignSelf:'center',fontWeight:'700'}}>
                {/* {user.address} */}
                Banglore, India
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
                    flexDirection: "row",
                    width: width / 1.2,
                    justifyContent: "space-around",
                    marginTop: 12,
                    alignItems: "center",
                }}
            >

                <FollowUnfollowButton user={user}/>
                <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: "40%",
                backgroundColor: theme.colors.primary,
                paddingVertical: 15,
                borderRadius: 15,
                borderColor: theme.colors.primary,
                borderWidth: 1,
                elevation:5
            }}
            // onPress={() =>}
        >
            <Text
                style={{
                    color: theme.colors.surface,
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                }}
            >
                Message
            </Text>
        </TouchableOpacity>
                {/* <Ionicons
                    onPress={() => props.navigation.push("CHAT_DETAIL")}
                    color={theme.colors.disabled}
                    name="md-chatbox"
                    size={38}
                /> */}
            </View>
        </View>
    );

    return (
        <View
            style={{
                flex: 1,
                marginTop: statusBarHeight,
                // backgroundColor: theme.colors.surface,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 5,
                    // zIndex: 9999,
                    backgroundColor: theme.colors.surface,
                    height: 54,
                    width:'100%',
                    // elevation: 2,
                    // flex:1
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
                
                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            right:'30%',
                            // marginHorizontal: 12,
                            paddingHorizontal:'10%',
                            color:theme.colors.backdrop,
                            alignSelf:'center',
                            alignItems:'center',
                            textAlign:'justify'
                            // alignItems:'center'
                        }}
                    >
                        @{user.fullname}
                    </Text>
                
                    <Tooltip
        isVisible={TipVisible}
        backgroundStyle={{
          // borderRadius:15
        }}
        backgroundColor='rgba(0,0,0,0.2)'
        tooltipStyle={{
          width:'50%',
          height:'30%',
          paddingHorizontal:5,
          paddingVertical:5,
          position:'absolute',
          elevation:10
          
        }}
        content={<View style={{justifyContent:'center'}}>
          <View style={{flexDirection:'row'}}>
          <Ionicons
          style={{marginVertical:5}}
          // style={{alignSelf:'center',paddingHorizontal:10,backgroundColor:theme.colors.surface,borderRadius:10}}
            color={theme.colors.backdrop}
            name="md-information-circle"
            size={16}
          />
          <Text style={{fontSize:12,fontWeight:'700',color:theme.colors.backdrop,marginVertical:5}}>Report </Text>

          </View>
          <View style={{flexDirection:'row'}}>
          <Ionicons
          style={{marginVertical:5}}
          // style={{alignSelf:'center',paddingHorizontal:10,backgroundColor:theme.colors.surface,borderRadius:10}}
            color='red'
            name="close-circle-outline"
            size={16}
          />
          <Text style={{fontSize:12,fontWeight:'700',color:'red',marginVertical:5}}>Block @{user.fullname} </Text>

          </View>
        </View>}
        placement="left"
        showChildInTooltip={false}
        onClose={() => setTipVisible(false )}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setTipVisible(true)}
        //   style={styles.back}
        >
          <Ionicons
                    color={theme.colors.backdrop}
                    style={{alignSelf:'center'}}
                    name="ellipsis-horizontal"
                    size={26}
                />
        </TouchableOpacity>
        {/* <TouchableHighlight onPress={() => setTipVisible(true )}>
          <Text>Press me</Text>
        </TouchableHighlight> */}
      </Tooltip>
                {/* <Ionicons
                    color={theme.colors.backdrop}
                    style={{alignSelf:'center'}}
                    name="ellipsis-horizontal"
                    size={26}
                /> */}
            </View>

            <Tabs.Container
                renderHeader={Header}
                headerHeight={900} // optional
                lazy
                tabBarHeight={56}
                renderTabBar={(props) => (
                    <MaterialTabBar
                        {...props}
                        style={{
                            // backgroundColor: theme.colors.surface,
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
                <Tabs.Tab name="Overview" label="About">
                    <Tabs.ScrollView showsVerticalScrollIndicator={false}>
                        <Overview user={user}/>
                    </Tabs.ScrollView>
                </Tabs.Tab>
                <Tabs.Tab name="Posts" label="Posts">
                    <Tabs.FlatList
                        data={userPosts}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <PostItem item={item}/>}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <Divider/>}
                        onEndReachedThreshold={0.8}
                        onEndReached={() =>
                            userPostsNext && !loading && fetchUserPosts(userPostsNext)
                        }
                        onRefresh={fetchUserPosts}
                        refreshing={refreshing}
                    />
                </Tabs.Tab>
                <Tabs.Tab name="Communities" label="Community">
                    <Tabs.FlatList
                        data={userCommunities}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <CommunityCard community={item}/>}
                        keyExtractor={(item) => item + ""}
                        ItemSeparatorComponent={() => <Divider/>}
                    />
                </Tabs.Tab>
                <Tabs.Tab name="Company" label="Company">
                    <Tabs.FlatList
                        data={userCompanies}
                        // horizontal
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <CompanyListItem company={item}/>}
                        keyExtractor={(item) => item + ""}
                        ItemSeparatorComponent={() => <Divider/>}
                    />
                </Tabs.Tab>
            </Tabs.Container>
        </View>
    );
};

export default ProfileOther;
