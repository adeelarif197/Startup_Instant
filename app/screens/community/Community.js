import React, {useEffect,useState} from "react";
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { useTheme, Appbar, Divider, Caption } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import PostItem from "../../components/PostItem";
import Tooltip from 'react-native-walkthrough-tooltip';
import { useDispatch, useSelector } from "react-redux";
import {
  requestAdd,
  requestDelete,
} from "../../store/slices/communityJoinRequestsSlice";
import CommunityJoinRequest from "../../components/community/CommunityJoinRequest";
import CommunityLeaveButton from "../../components/community/CommunityLeaveButton";
import {navigate} from "../../api/helper";
import ImageGrid from "../../components/ImageGrid";
import {getPosts, selectCommunityPosts} from "../../store/slices/postsSlice";

const Community = ({ navigation, route }) => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const { height, width } = Dimensions.get("window");
  const statusBarHeight = getStatusBarHeight();
  const [TipVisible, setTipVisible] = useState(false);
  const referred_community = route.params?.community;
  if (!referred_community) return null;

  const community = useSelector(
    ({ communities }) => communities.byId[referred_community.id]
  );
  if (!community) return null;

  const nextPostsUrl = useSelector(({posts}) => posts.community[referred_community.id]?.next)
  const posts = useSelector(state => selectCommunityPosts(state, referred_community.id))

  useEffect(() => {
    fetchPosts()
  }, [])


  const fetchPosts = (url = null) => {
    dispatch(getPosts({url, from: 'community', params: {ordering: '-id', community: community.id, limit: 20}}))
  }

  return (
    <View style={{ flex: 1, marginTop: statusBarHeight , backgroundColor:theme.colors.surface }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri: community.cover,
          }}
          style={{
            height: height/3,
            width: width,
            
          }}
        />
        <Divider />
        {/* <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Ionicons
            color={theme.colors.surface}
            name="md-arrow-back-outline"
            size={35}
          />
        </TouchableOpacity> */}
        <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',position:'absolute'}}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Ionicons
            color={theme.colors.surface}
            name="md-arrow-back-outline"
            size={35}
          />
        </TouchableOpacity>

        {community.is_admin === true && (
        <Tooltip
        isVisible={TipVisible}
        backgroundStyle={{
          // borderRadius:15
        }}
        tooltipStyle={{
          width:'45%',
          height:'20%',
          paddingHorizontal:5,
          position:'absolute',
          // bottom:10
          
        }}
        content={<View>
          <View style={{flexDirection:'row'}}>
          <Ionicons
          // style={{alignSelf:'center',paddingHorizontal:10,backgroundColor:theme.colors.surface,borderRadius:10}}
            color={theme.colors.backdrop}
            name="md-trash-outline"
            size={20}
          />
          <Text style={{fontSize:14,color:theme.colors.backdrop}}>Delete Community </Text>

          </View>
          <View style={{flexDirection:'row'}}>
          <Ionicons
          // style={{alignSelf:'center',paddingHorizontal:10,backgroundColor:theme.colors.surface,borderRadius:10}}
            color={theme.colors.backdrop}
            name="md-people-outline"
            size={20}
          />
          <Text onPress={() => navigation.push("REQUEST_LIST", { community })} style={{fontSize:14,fontWeight:'700',color:theme.colors.backdrop}}>Request </Text>

          </View>
        </View>}
        placement="left"
        showChildInTooltip={false}
        onClose={() => setTipVisible(false )}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setTipVisible(true )}
          style={styles.back}
        >
          <Ionicons
          style={{alignSelf:'center',paddingHorizontal:10,backgroundColor:theme.colors.surface,borderRadius:10}}
            color={theme.colors.text}
            name="md-ellipsis-horizontal"
            size={30}
          />
        </TouchableOpacity>
        {/* <TouchableHighlight onPress={() => setTipVisible(true )}>
          <Text>Press me</Text>
        </TouchableHighlight> */}
      </Tooltip>
        )}
        </View>
        
        <View
          style={{
            paddingHorizontal: 12,
            marginHorizontal:'6%',
            backgroundColor: theme.colors.surface,
            marginTop: -60,
            borderRadius:10,
            elevation:5
          }}
        >
          {/* <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          > */}
            <Image
              source={{
                uri: community.icon,
              }}
              style={styles.profilePic}
            />
            <View style={{ marginHorizontal: 12, marginTop: 8, marginBottom: 20,alignSelf:'center',alignItems:'center'}}>
          <Text style={{ fontSize: 18, fontWeight: "bold",color:theme.colors.backdrop}}>
            About us
          </Text>
          <Caption style={{ fontSize: 16, letterSpacing: 0.1,color:theme.colors.backdrop }}>
            {community.about}
          </Caption>
          </View>
            {/* <View style={{ width: "55%", marginRight: 4 }}>
              {community.member ? (
                community.is_admin ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ marginTop: 8 }}
                    onPress={()=>navigate('COMMUNITY_UPDATE', {community})}
                  >
                    <Text
                      style={[
                        styles.editButton,
                        {
                          color: theme.colors.surface,
                          backgroundColor: theme.colors.primary,
                        },
                      ]}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <CommunityLeaveButton community={community} />
                )
              ) : (
                <CommunityJoinRequest community={community} />
              )}
            </View> */}
          {/* </View> */}
          <View style={{flexDirection:'row',alignSelf:'center',marginVertical:'5%'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              // paddingBottom: 9,
              // marginTop: -2,
              marginHorizontal:'2%',
              alignSelf:'center'
            }}
          >
            {community.name}
          </Text>
          <View
            style={[
              styles.categoryContainer,
              {
                borderColor: theme.colors.disabled,
              },
            ]}
          >
            <Caption style={styles.category}>{community.category}</Caption>
          </View>
          </View>
          {/* <Tooltip
  isVisible={TipVisible}
  content={<Text>Check this out!</Text>}
  placement="left"
  onClose={() => setTipVisible(false )}
>
  <TouchableHighlight onPress={() => setTipVisible(true )}>
    <Text>Press me</Text>
  </TouchableHighlight>
</Tooltip> */}
        </View>
        {/* <Divider /> */}
        <View style={{ marginHorizontal: 12, marginTop: 8, marginBottom: 20,alignSelf:'center',alignItems:'center'}}>
        {community.is_admin === false && (
        <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: 270,
                marginTop:15,
                backgroundColor: theme.colors.primary,
                paddingVertical: 12,
                borderRadius: 30,
                borderColor: theme.colors.primary,
                borderWidth: 1,
                elevation:5,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
            }}
            // onPress={() =>}
        >
          <Ionicons
            color={theme.colors.surface}
            style={{alignSelf:'center',marginHorizontal:'2%'}}
            name="md-person-add-sharp"
            size={18}
          />
            <Text
                style={{
                    color: theme.colors.surface,
                    // fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                    alignSelf:'center'
                    // paddingRight:20
                }}
            >
                Join Community
            </Text>
        </TouchableOpacity>
        )}
        {community.is_admin === true && (
        <TouchableOpacity
        onPress={() => navigation.push("COMMUNITY_UPDATE", { community })}
            activeOpacity={0.9}
            style={{
                width: 270,
                marginTop:15,
                backgroundColor: theme.colors.primary,
                paddingVertical: 12,
                borderRadius: 30,
                borderColor: theme.colors.primary,
                borderWidth: 1,
                elevation:5,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'
            }}
            // onPress={() =>}
        >
          {/* <Ionicons
            color={theme.colors.surface}
            style={{alignSelf:'center',marginHorizontal:'2%'}}
            name="md-person-add-sharp"
            size={18}
          /> */}
            <Text
                style={{
                    color: theme.colors.surface,
                    // fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                    alignSelf:'center'
                    // paddingRight:20
                }}
            >
                Edit Community
            </Text>
        </TouchableOpacity>
        )}
          <View
            style={{
              marginTop: 20,
              marginLeft: 8,
              alignItems: "center",
              flexDirection: "row",
              // elevation:3
            }}
          >
            {[0, 1, 2, 3].map((item) => (
              <View style={{backgroundColor:theme.colors.surface}} key={item}>
                <Image
                  source={{
                    uri: "https://ma-hub.imgix.net/wp-images/2020/07/21183139/Video-Effects-News-Background.jpg",
                  }}
                  style={styles.memberImage}
                />
              </View>
            ))}
            <View
              style={[
                styles.members,
                {
                  backgroundColor: theme.colors.primary,
                },
              ]}
              onPress={() => navigation.push("MEMBER_LIST", { community })}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.surface,
                }}
              >
                100k+
              </Text>
            </View>
            {/* <Text
              onPress={() => navigation.push("MEMBER_LIST", { community })}
              style={{ fontSize: 15, marginLeft: 5 }}
            >
              Members
            </Text> */}
            
          </View>
          {/* {community.is_admin === true && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                

                <Text
                  onPress={() => navigation.push("REQUEST_LIST", { community })}
                  style={{
                    fontSize: 16,
                    color: theme.colors.primary,
                    fontWeight: "bold",
                  }}
                >
                  Requests
                </Text>
              </View>
            )} */}
        </View>
        <Divider />
        <ImageGrid images={community.images}/>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate("POST_CREATE", {community})}
          style={[
            styles.newPost,
            {
              backgroundColor: theme.colors.surface,
              width: width,
            },
          ]}
        >
          <View
            style={[
              styles.postInput,
              {
                backgroundColor: '#F8F8F8',
                // borderColor: theme.colors.disabled,
                width: width - 102,
                elevation:3
              },
            ]}
          >
            <Caption
              style={{
                fontSize: 14,
                backgroundColor: '#F8F8F8',
                paddingVertical: 12,
              }}
            >
              New post
            </Caption>
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Ionicons
                color={theme.colors.disabled}
                name="md-camera-outline"
                size={24}
              />
            </View>
          </View>
          <View
            style={[
              styles.postButton,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text
              style={{
                color: theme.colors.surface,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Post
            </Text>
          </View>
        </TouchableOpacity>
        <Divider />
        {posts.map((item) => (
          <View key={item.id}>
            <PostItem item={item}/>
            <Divider />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({
  memberImage: {
    height: 60,
    width: 60,
    marginHorizontal:5,
    borderWidth:2,
    borderRadius: 75,
    // backgroundColor:,
    // elevation:3,
  },
  back: {
    // position: "absolute",
    marginTop: 8,
    marginHorizontal: 14,
    paddingVertical: 4,
    paddingHorizontal: 5.5,
    borderRadius: 75,
    // backgroundColor: "#fff"
  },
  profilePic: {
    height: 120,
    width: 120,
    borderRadius: 10,
    marginTop: -60,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#fff",
    alignSelf:'center'
  },
  editButton: {
    borderRadius: 5,
    paddingVertical: 4,
    width: "100%",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  categoryContainer: {
    borderWidth: 0.5,
    // marginBottom: 12,
    alignSelf: "center",
    borderRadius: 8,
    marginHorizontal:'2%',
    paddingVertical:'2%',
    paddingHorizontal:'5%'
  },
  category: {
    fontWeight: "bold",
    fontSize: 14,
    marginHorizontal: 12,
    marginTop: 3,
    marginBottom: 4,
  },
  members: {
    borderRadius: 75,
    // marginLeft: -8,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  newPost: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postInput: {
    // borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 7,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: 72,
    marginLeft: 5,
    paddingHorizontal: 16,
    borderRadius: 7,
    elevation:3
  },
});
