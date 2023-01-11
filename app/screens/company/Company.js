import React, {useEffect, useState} from "react";
import {
    ImageBackground,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    ScrollView,
} from "react-native";
import {useTheme, Appbar, Divider, Caption} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import PostItem from "../../components/PostItem";
import FollowUnfollowButton from "../../components/company/FollowUnfollowButton";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, selectCommunityPosts, selectCompanyPosts} from "../../store/slices/postsSlice";
import ImageGrid from "../../components/ImageGrid";
import Tooltip from 'react-native-walkthrough-tooltip';
const Company = ({navigation, route}) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const {height, width} = Dimensions.get("window");
    const statusBarHeight = getStatusBarHeight();
    const [TipVisible, setTipVisible] = useState(false);
    const {company: ref_company} = route.params;
    const company = useSelector(({companies}) => companies.byId[ref_company?.id])
    if (!company) return null;

    const nextPostsUrl = useSelector(({posts}) => posts.company[company.id]?.next)
    const posts = useSelector(state => selectCompanyPosts(state, company.id))

    useEffect(() => {
        fetchPosts()
    }, [])


    const fetchPosts = (url = null) => {
        dispatch(getPosts({url, from: 'company', params: {ordering: '-id', company: company.id, limit: 40}}))
    }


    return (
        <View style={{flex: 1, marginTop: statusBarHeight , backgroundColor:theme.colors.surface}}>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            {/* <Appbar.Header
                style={{backgroundColor: theme.colors.surface, elevation: 2}}
            >
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title={company.name}/>
            </Appbar.Header> */}
            <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground
          source={{
            uri: company.banner,
          }}
          style={{
            height: height/3,
            width: width,
            
          }}
        />
        <Divider />
        
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
        {company.is_owner === true && (
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
          <Text style={{fontSize:14,fontWeight:'700',color:theme.colors.backdrop}}>Request </Text>

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
                uri: company.icon,
              }}
              style={styles.profilePic}
            />
            <View style={{ marginHorizontal: 12, marginTop: 8, marginBottom: 20,alignSelf:'center',alignItems:'center'}}>
          <Text style={{ fontSize: 18, fontWeight: "bold",color:theme.colors.backdrop}}>
            About us
          </Text>
          <Caption style={{ fontSize: 16, letterSpacing: 0.1,color:theme.colors.backdrop }}>
            {company.about}
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
          <View style={{flexDirection:'row',alignSelf:'center',marginVertical:'5%',width:'100%',justifyContent:'space-evenly'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              left:15,
              // paddingBottom: 9,
              // marginTop: -2,
            //   marginHorizontal:'2%',
              alignSelf:'center'
            }}
          >
            {company.name}
          </Text>
          <View
            style={[
              styles.categoryContainer,
              {
                borderColor: theme.colors.disabled,
              },
            ]}
          >
            <Caption style={styles.category}>Business</Caption>
          </View>
          </View>
        </View>
        {/* <Divider /> */}
        <View style={{ marginHorizontal: 12, marginTop: 8, marginBottom: 20,alignSelf:'center',alignItems:'center'}}>
        {company.is_owner === true && (
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
                Edit Company
            </Text>
        </TouchableOpacity>
        )}
        {company.is_owner === false && (
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
                Follow
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
              onPress={() => navigation.push("MEMBER_LIST", { company })}
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
            {/* {community.is_admin === true && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    marginHorizontal: 12,
                  }}
                >
                  •
                </Text>

                <Text
                  onPress={() => navigation.push("REQUEST_LIST", { company })}
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
        </View>
        <Divider />
        <ImageGrid images={company.images}/>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate("POST_CREATE", {company})}
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




                {/* <ImageBackground
                    source={{
                        uri: company.banner,
                    }}
                    style={{
                        height: height/3,
            width: width,
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: width,
                        paddingHorizontal: 12,
                        backgroundColor: theme.colors.surface,
                    }}
                >
                    <View style={{flexDirection: "row"}}>
                        <Image
                            source={{
                                uri: company.icon,
                            }}
                            style={styles.profilePic}
                        />

                        <View style={{marginHorizontal: 12}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>
                                {company.name}
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 8}}>
                                <View style={{flex: 1}}>
                                    <FollowUnfollowButton company={company}/>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    style={[
                                        styles.editButton,
                                        {
                                            backgroundColor: theme.colors.primary,
                                        },
                                    ]}
                                    onPress={() => navigation.push("COMPANY_UPDATE", {company})}>
                                    <Text
                                        style={{
                                            color: theme.colors.surface,
                                            fontWeight: "bold",
                                            fontSize: 16,
                                        }}
                                    >
                                        Edit
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                </View>
                <Divider/>
                <View style={{marginHorizontal: 12, marginTop: 12, marginBottom: 20}}>
                    <Text style={{fontSize: 16, fontWeight: "bold"}}>About us</Text>
                    <Caption style={{fontSize: 15, letterSpacing: 0.1}}>
                        {company.about}
                    </Caption>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 7,
                            marginLeft: -3,
                            alignItems: "center",
                        }}
                    >
                        <Ionicons name="md-location-outline" size={22}/>
                        <Text style={{fontSize: 14, letterSpacing: 0.1, marginLeft: 2}}>
                            {company.address?.street}, {company.address?.city}, {company.address?.state}, {company.address?.pincode}, {company.address?.country}
                        </Text>
                    </View>
                    <View
                        style={{flexDirection: "row", marginTop: 7, alignItems: "center"}}
                    >
                        <Ionicons name="md-calendar-outline" size={18}/>
                        <Text style={{fontSize: 14, letterSpacing: 0.1, marginLeft: 5}}>
                            Founded : {company.date_founded}
                        </Text>
                    </View>
                    <View
                        style={{flexDirection: "row", marginTop: 7, alignItems: "center"}}
                    >
                        <Ionicons name="md-call-outline" size={18}/>
                        <Text style={{fontSize: 14, marginLeft: 5, letterSpacing: 0.1}}>
                            +91-{company.phone}
                        </Text>
                    </View>
                    <View
                        style={{flexDirection: "row", marginTop: 7, alignItems: "center"}}
                    >
                        <Ionicons name="md-mail-outline" size={18}/>
                        <Text style={{fontSize: 14, marginLeft: 5, letterSpacing: 0.1}}>
                            {company.email}
                        </Text>
                    </View>
                    <View
                        style={{flexDirection: "row", marginTop: 7, alignItems: "center"}}
                    >
                        <Ionicons name="md-earth-outline" size={20}/>
                        <Text style={{fontSize: 14, marginLeft: 5, letterSpacing: 0.1}}>
                            {company.website}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            marginLeft: 8,
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        {[0, 1, 2, 3, 4].map((item) => (
                            <View key={item}>
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
                        >
                            <Text
                                style={{
                                    fontSize: 10,
                                    color: theme.colors.surface,
                                }}
                            >
                                100k+
                            </Text>
                        </View>
                        <Text style={{fontSize: 15, marginLeft: 5}}>Followers</Text>
                    </View>
                </View>
                <Divider/>
                <View
                    style={[
                        styles.newPost,
                        {
                            backgroundColor: theme.colors.surface,
                            width: width,
                        },
                    ]}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate("POST_CREATE", {company})}
                        style={[
                            styles.postInput,
                            {
                                backgroundColor: theme.colors.background,
                                borderColor: theme.colors.disabled,
                                width: width - 102,
                            },
                        ]}
                    >
                        <Caption
                            style={{
                                fontSize: 14,
                                backgroundColor: theme.colors.background,
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
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={[
                            styles.postButton,
                            {backgroundColor: theme.colors.primary},
                        ]}
                        onPress={() => alert("Please write post first.")}
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
                    </TouchableOpacity>
                </View>
                <Divider/>
                {posts.map((item) => (
                    <View key={item.id}>
                        <PostItem item={item}/>
                        <Divider/>
                    </View>
                ))} */}
            </ScrollView>
        </View>
    );
};

export default Company;

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
        // marginHorizontal: 14,
        paddingVertical: 4,
        paddingHorizontal: 5.5,
        borderRadius: 75,
        alignSelf:'center'
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
        right:10,
        // marginHorizontal:'2%',
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
    // memberImage: {
    //     height: 34,
    //     width: 34,
    //     borderRadius: 75,
    //     marginLeft: -8,
    // },
    // profilePic: {
    //     height: 80,
    //     width: 80,
    //     borderRadius: 75,
    //     marginTop: -30,
    //     marginBottom: 12,
    // },
    // editButton: {
    //     alignItems: "center",
    //     justifyContent: "center",
    //     paddingVertical: 4,
    //     paddingHorizontal: 32,
    //     borderRadius: 4,
    // },
    // members: {
    //     borderRadius: 75,
    //     marginLeft: -8,
    //     height: 34,
    //     width: 34,
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    // newPost: {
    //     paddingVertical: 20,
    //     paddingHorizontal: 12,
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    // },
    // postInput: {
    //     borderWidth: 1,
    //     paddingHorizontal: 10,
    //     borderRadius: 5,
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    // },
    // postButton: {
    //     alignItems: "center",
    //     justifyContent: "center",
    //     height: 44,
    //     width: 72,
    //     marginLeft: 5,
    //     paddingHorizontal: 16,
    //     borderRadius: 5,
    // },
});
