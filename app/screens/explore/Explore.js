import React, {useEffect, useState} from "react";
import {
    FlatList,
    SafeAreaView,
    Dimensions,
    Image,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity,
    
} from "react-native";
// import {FlatList} from "react-native-gesture-handler";
import {Divider, Text, useTheme} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import PostItem from "../../components/PostItem";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, selectFeaturedUsers} from "../../store/slices/usersSlice";
import {getPosts, selectSuggestedPosts} from "../../store/slices/postsSlice";
import {navigate} from "../../api/helper";
import { selectFeaturedCommunities } from "../../store/slices/communitiesSlice";
import extraEntities, {getRoles} from "../../store/slices/extraEntitiesSlice";
import CommunityCard from "../../components/CommunityCard";

const Explore = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const {width} = Dimensions.get("window");
    const statusBarHeight = getStatusBarHeight();
    const {roles} = useSelector((state)=>state.extraEntities)
    const featuredUsers = useSelector(selectFeaturedUsers);
    const suggestedPosts = useSelector(selectSuggestedPosts);
    const {next, params} = useSelector(({posts}) => posts.suggested);
    const featuredCommunities = useSelector(selectFeaturedCommunities)

    const [search, onChangeSearch] = React.useState(null);
    const [refreshing, setRefreshing] = useState(true)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        dispatch(getUsers({from: 'featured'}))
        dispatch(getRoles())
        fetchSuggestedPosts()
        // console.log(roles.name)
    }, [])

    const fetchSuggestedPosts = (url = null) => {
        url ? setLoading(true) : setRefreshing(true)
        dispatch(getPosts({url, from: 'suggested', params}))
            .unwrap()
            .then(res => {
                setLoading(false);
                setRefreshing(false)
            })
    }

    return (
        <ScrollView style={{flex: 1, marginTop: statusBarHeight, backgroundColor: theme.colors.surface}}>
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
                    onFocus={()=>navigate('SEARCH')}
                    // value={fullname} 
                    />
                </View>
                <Ionicons name="md-notifications-outline" style={{alignSelf:'center'}} size={29} color={theme.colors.primary}/>
            </View>
            <View style={{height:'5%',justifyContent:'center',overflow:'visible'}}>
            <ScrollView style={{flex:1,alignSelf:'center'}} horizontal showsHorizontalScrollIndicator={false}>
                            {roles.map((item) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    // onPress={() => props.navigation.push("PROFILE_OTHER", {userId: item.id})}
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
                                    
                                    <Text numberOfLines={1} style={{alignSelf:'center',color:'#8D8D8D'}}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        </View>
            {/* <View
                style={{
                    height: 56,
                    width: width,
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "row",
                    backgroundColor: theme.colors.surface,
                    elevation: 2
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: theme.colors.background,
                        borderRadius: 5,
                        height: 38,
                        flex: 1,
                        marginHorizontal: 12,
                        paddingLeft: 12,
                        paddingRight: 44,
                    }}
                    placeholder="Search Users, Community, Companies etc..."
                    onFocus={()=>navigate('SEARCH')}
                />
                <View
                    style={{
                        position: "absolute",
                        paddingRight: 22,
                        justifyContent: "center",
                    }}
                >
                    <Ionicons
                        color={theme.colors.disabled}
                        name="md-search-outline"
                        size={24}
                    />
                </View>
            </View> */}
            <View style={{justifyContent:'center',alignItems:'center'}}>
            
            <View style={{overflow:'hidden'}}>
            <Text style={{fontWeight: "bold", fontSize: 16,marginHorizontal:'3%',alignSelf:'flex-start'}}>
                                People in India are following
                            </Text>

                            

                            <View style={{borderWidth:0.5,borderColor:theme.colors.disabled,borderRadius:10,marginVertical:5}}>
                                        <CommunityCard community={featuredCommunities[0]}/>
                                        
                                        </View>
                                        <View style={{borderWidth:0.5,borderColor:theme.colors.disabled,borderRadius:10,marginVertical:5}}>
                                        <CommunityCard community={featuredCommunities[1]}/>
                                        
                                        </View>
                                        <Text style={{color:theme.colors.primary,fontWeight: "bold", fontSize: 18,marginBottom:'3%',alignSelf:'center'}}>
                                See All
                            </Text>
            </View>
                                    
                            <Divider style={{height:10,color:theme.colors.background}}/>

            
            <FlatList
                showsVerticalScrollIndicator={false}
                data={featuredUsers}
                numColumns={2}
                renderItem={({item}) => 
                <TouchableOpacity
      activeOpacity={0.9}
      style={{
        // alignSelf:'center',
        // elevation: 1,
        // height: width / 1.8,
        width: '45%',
        // alignItems: "center",
        marginTop: 10,
        borderWidth: 1,
        borderColor:'#D8D8D8',
        marginHorizontal: 10,
        marginVertical: 10,
        // backgroundColor: 'red',
        borderRadius: 10,
      }}
      onPress={() => props.navigation.push("PROFILE_OTHER", {userId: item.id})}
    >
      {/* <ImageBackground
        source={{
          uri: community.cover,
        }}
        style={{
          height: 90,
          width: width / 1.1,
          borderColor: 50,
        }}
        imageStyle={{
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      /> */}
      <View style={{flexDirection:'row',alignSelf:'center'}}>
      <Image
      onPress={() => props.navigation.push("PROFILE_OTHER", {userId: item.id})}
        source={{
            uri: item.pic,
        }}
        style={{
          height: 80,
          width: 80,
          borderRadius: 75,
        //   marginTop: -40,
        //   left:10,
          borderColor: theme.colors.surface,
          borderWidth: 3,
          alignSelf:'center'
        }}
      />
      {/* <View style={{ width: "84%" ,left:25}}>
        {community.member === null && (
          <CommunityJoinRequest community={community} />
        )}
      </View> */}
      </View>
      <Text
        numberOfLines={1}
        style={{
          marginTop: 10,
          fontWeight: "bold",
          fontSize: 16,
          marginHorizontal: 10,
          alignSelf:'center'
          // textAlign:'justify'
        }}
      >
        {item.fullname}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          marginTop: 10,
          fontWeight: "bold",
          fontSize: 14,
          marginHorizontal: 10,
          alignSelf:'center',
          color: theme.colors.backdrop
        }}
      >
        {/* {item.role.name} */}
        Founder
      </Text>
      <Text
        numberOfLines={1}
        style={{
          marginTop: 4,
          fontWeight: "bold",
          fontSize: 12,
          marginHorizontal: 10,
          alignSelf:'center',
          color: '#B3B3B3'
        }}
      >
        {/* {item.company} */}
        Company Name
      </Text>
      
      <Text
        numberOfLines={1}
        style={{
          fontSize: 11,
          fontWeight: "bold",
          marginTop: 4,
          alignSelf:'center',
          color: theme.colors.text,
        }}
      >
        <Text
        numberOfLines={1}
        style={{color:theme.colors.text , fontSize: 12, marginTop: 1, paddingHorizontal: 10,fontWeight:'700' }}
      >{item.num_followers}</Text> Followers
      </Text>

      <TouchableOpacity
                        activeOpacity={0.9}
                        style={{
                            backgroundColor: theme.colors.surface,
                            width:'80%',
                            marginVertical:10,
                            paddingVertical: 12,
                            paddingHorizontal: 5,
                            borderRadius: 7,
                            borderWidth:1,
                            borderColor: theme.colors.primary,
                            alignSelf:'center'
                        }}
                        // onPress={() => props.navigation.push("PROFILE_UPDATE")}
                    >
                        <Text
                            style={{
                                color: theme.colors.primary,
                                alignSelf:'center',
                                fontSize: 16,
                            }}
                        >
                            Follow
                        </Text>
                    </TouchableOpacity>
      
      
      
    </TouchableOpacity>
    
                // <PostItem item={item}/>
            }
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <Divider style={{height: 0.5}}/>}
                ListHeaderComponent={
                    <View style={{backgroundColor: theme.colors.surface}}>
                        {/* <View
                            style={{
                                justifyContent: "center",
                                marginHorizontal: 12,
                                marginTop: 12,
                            }}
                        >
                            <Text style={{fontWeight: "bold", fontSize: 17}}>
                                Top Profile
                            </Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {featuredUsers.map((item) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => props.navigation.push("PROFILE_OTHER", {userId: item.id})}
                                    key={item.id.toString()}
                                    style={{
                                        elevation: 1,
                                        height: 70,
                                        width: 70,
                                        alignItems: "center",
                                        marginLeft: 12,
                                        marginTop: 10,
                                        marginBottom: 30,
                                        backgroundColor: theme.colors.surface,
                                        borderRadius: 75,
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: item.pic,
                                        }}
                                        style={{height: 70, width: 70, borderRadius: 75}}
                                    />
                                    <Text numberOfLines={1} style={{marginTop: 5}}>
                                        {item.fullname}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView> */}
                        {/* <View style={{backgroundColor: theme.colors.surface, marginTop: 12}}>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 17,
                                paddingTop: 12,
                                paddingBottom: 2,
                                marginLeft: 12,
                                
                            }}
                        >
                            Suggested Post
                        </Text>
                        </View> */}
                        <Text style={{fontWeight: "bold", fontSize: 16,marginHorizontal:'3%'}}>
                                More Suggestions for you
                            </Text>
                    </View>
                }
                onEndReachedThreshold={0.8}
                // onEndReached={()=>next && !loading && fetchSuggestedPosts(next)}
                // onRefresh={fetchSuggestedPosts}
                refreshing={refreshing}
            />
            </View>
        </ScrollView>
    );
};

export default Explore;
