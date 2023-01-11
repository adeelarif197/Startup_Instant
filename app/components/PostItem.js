import React, { memo, useEffect, useState , Component} from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Keyboard,
} from "react-native";
import {
  Avatar,
  Caption,
  Divider,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { Ionicons , Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../store/slices/postsSlice";
import { navigate } from "../api/helper";
import Tooltip from 'react-native-walkthrough-tooltip';
import _ from "lodash";
import {
  addComment,
  getComments,
  selectComments,
} from "../store/slices/commentsSlice";
import PostItemNews from "./postItems/PostItemNews";
import PostItemPitch from "./postItems/PostItemPitch";
import PostItemJob from "./postItems/PostItemJob";
import PostItemEvent from "./postItems/PostItemEvent";
import PostItemPromotion from "./postItems/PostItemPromotion";
import ReactNativeTooltipMenu from 'react-native-tooltip-menu';
import { ThemeProvider } from "@react-navigation/native";


const PostItem = ({ item: post }) => {
  const theme = useTheme();
  const [TipVisible, setTipVisible] = useState(false);
  const [TipVisible1, setTipVisible1] = useState(false);
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState("");
  const commentParams = useSelector(
    ({ comments }) =>
      comments.post[post?.id]?.params ?? {
        ordering: "-id",
        limit: 10,
        post: post?.id,
      }
  );
  const comments = useSelector((state) => selectComments(state, post?.id));

  const handleLike = () => {
    dispatch(likePost({ id: post.id }));
  };
  const handleUnlike = () => {
    dispatch(unlikePost({ id: post.id }));
  };

  const fetchComments = (url = null) => {
    dispatch(getComments({ url, params: commentParams }));
  };

  useEffect(() => {
    if (modalVisible) {
      console.log("start fetching comments");
      fetchComments();
    }
  }, [modalVisible]);

  const handleAddComment = () => {
    if (comment === "") {
      return;
    }
    dispatch(addComment({ text: comment, post: post.id }))
      .unwrap()
      .then((res) => setComment(""));
  };


  const renderContent = () => {
      switch (post.type) {
          case 'NEWS':
              return <PostItemNews news={post.news}/>
          case 'PITCH':
              return <PostItemPitch pitch={post.pitch}/>
          case 'JOB':
              return <PostItemJob job={post.job}/>
          case 'EVENT':
              return <PostItemEvent event={post.event}/>
          case 'PROMOTION':
              return <PostItemPromotion promotion={post.promotion}/>
          default:
              return <Text
                  style={{
                      fontSize: 14,
                      letterSpacing: -0.1 / 5,
                  }}
              >
                  {post.content}
              </Text>
      }
  }

  if (!post) return null;
  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        paddingVertical: 12,
        marginBottom: 1.1,
        marginHorizontal:4,
        marginVertical:10
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)', height: "30%" }}
        />
        <Divider />
        <View
          style={{
            backgroundColor: theme.colors.background,
            height: "70%",
          }}
        >
          <View
            style={{
              margin: 12,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Comments</Text>
              <Text style={{ fontSize: 16 }}> • 245</Text>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons color={theme.colors.text} name="md-close" size={24} />
            </TouchableOpacity>
          </View>
          <Divider />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingHorizontal: 12,
              backgroundColor: theme.colors.surface,
            }}
          >
            {comments.map((item) => (
              <View
                key={item.id.toString()}
                style={{
                  flexDirection: "row",
                  // marginVertical:20,
                  marginTop: 12,
                  marginBottom: 5,
                }}
              >
                <Avatar.Image
                  size={44}
                  source={{
                    uri: item.user?.pic,
                  }}
                />
                <View style={{ flex: 1, paddingLeft: 12 }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      marginVertical:'1%',
                      fontWeight: "bold",
                      marginRight: 12,
                    }}
                  >
                    {item.user?.fullname}
                  </Text>
                  <Text
                    // numberOfLines={1}
                    style={{ fontSize: 12, color: theme.colors.backdrop }}
                  >
                  {moment(item.created_at).format('MMM Do, yy')}
                  </Text>
                  <View style={{borderColor: theme.colors.backdrop,
                    borderRadius: 10,
                    flex: 1,
                    marginVertical:'1%',
                    textAlign: "center",
                    width: width / 1.3,
                    paddingHorizontal:'4%',
                    paddingVertical:'3%',
                    fontSize: 12,
                    borderWidth: 0.5,
                    }}>
                  <Text
                    // numberOfLines={1}
                    style={{ fontSize: 12 }}
                  >
                    {item.content}
                  </Text>
                  
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'1%'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Ionicons name="md-heart-outline" color={theme.colors.backdrop} size={14} />
                    <Text
                    // numberOfLines={1}
                    style={{ fontSize: 12, color:theme.colors.backdrop }}
                  >
                    Like (1) 
                  </Text>
                  <View style={styles.verticleLine}></View>
                  <Feather name="corner-up-left" color={theme.colors.backdrop} size={14} />
                    <Text
                    // numberOfLines={1}
                    style={{ fontSize: 12 , color:theme.colors.backdrop}}
                  >
                    Reply (1) 
                  </Text>
                    </View>
                    <Text
                    // numberOfLines={1}
                    style={{ fontSize: 12 , fontWeight:'700', color:theme.colors.primary,marginLeft:'5%' }}
                  >
                    View previous replies 
                  </Text>

                  </View>
                  
                </View>
                {/* ////////////////////////////////////////////////////////////////////////////////// */}
                
        <Tooltip
        isVisible={TipVisible==item.id ? true : false}
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
            name="md-trash-outline"
            size={16}
          />
          <Text style={{fontSize:12,fontWeight:'700',color:theme.colors.backdrop,marginVertical:5}}>Delete Comment </Text>

          </View>
          <View style={{flexDirection:'row'}}>
          <Ionicons
          style={{marginVertical:5}}
          // style={{alignSelf:'center',paddingHorizontal:10,backgroundColor:theme.colors.surface,borderRadius:10}}
            color='red'
            name="close-circle-outline"
            size={16}
          />
          <Text style={{fontSize:12,fontWeight:'700',color:'red',marginVertical:5}}>Block {item.user?.fullname} </Text>

          </View>
        </View>}
        placement="left"
        showChildInTooltip={false}
        onClose={() => setTipVisible(false )}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setTipVisible(item.id )}
          style={styles.back}
        >
          <Ionicons
          style={{alignSelf:'center',paddingHorizontal:10,backgroundColor:theme.colors.surface,borderRadius:10}}
            color={theme.colors.text}
            name="md-ellipsis-vertical"
            size={20}
          />
        </TouchableOpacity>
        {/* <TouchableHighlight onPress={() => setTipVisible(true )}>
          <Text>Press me</Text>
        </TouchableHighlight> */}
      </Tooltip>
        
        
                {/* <Ionicons name="md-ellipsis-vertical" size={20} /> */}
              </View>
            ))}
          </ScrollView>
          <Divider />
          <View
            style={{
              height: 56,
              width: width,
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: theme.colors.surface,
            }}
          >
            <TextInput
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 5,
                height: 42,
                flex: 1,
                fontSize: 15,
                marginHorizontal: 12,
                paddingLeft: 12,
                paddingRight: 44,
              }}
              placeholder="Write your comment..."
              value={comment}
              onChangeText={setComment}
            />
            <View
              style={{
                position: "absolute",
                paddingRight: 18,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                style={{
                  elevation:5,
                  borderRadius: 45,
                }}
                onPress={handleAddComment}
              >
                <Image
                    style={{height: 45, width: 45}}
                    source={require("../../assets/send.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
          paddingLeft: 12,
          // marginVertical:
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigate("PROFILE_OTHER", { userId: post.user?.id })}
        >
          <Avatar.Image
            size={50}
            source={{
              uri: post.user?.pic,
            }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, paddingLeft: 12 }}>
          <Text
            onPress={() => navigate("PROFILE_OTHER", { userId: post.user?.id })}
            numberOfLines={1}
            style={{ fontSize: 16, fontWeight: "bold", marginRight: 12 }}
          >
            {post.user?.fullname}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: 13, marginRight: 12,color:theme.colors.backdrop }}>
            {post.user?.title}
          </Text>
          <Text style={{fontSize: 12,color:theme.colors.backdrop}}>Today at 6:21 AM
          {/* {moment(item.created_at).format('MMM Do, h:mm a')} */}
          </Text>
        </View>
        <View>
        <Tooltip
        isVisible={TipVisible1}
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
            name="md-trash-outline"
            size={16}
          />
          <Text style={{fontSize:12,fontWeight:'700',color:theme.colors.backdrop,marginVertical:5}}>Delete </Text>

          </View>
          <View style={{flexDirection:'row'}}>
          <Ionicons
          style={{marginVertical:5}}
          // style={{alignSelf:'center',paddingHorizontal:10,backgroundColor:theme.colors.surface,borderRadius:10}}
            color='red'
            name="close-circle-outline"
            size={16}
          />
          <Text style={{fontSize:12,fontWeight:'700',color:'red',marginVertical:5}}>Block {post.user?.fullname} </Text>

          </View>
        </View>}
        placement="left"
        showChildInTooltip={false}
        onClose={() => setTipVisible1(false )}
      >
        <TouchableRipple
            borderless
            onPress={() => setTipVisible1(true )}
            style={{
              height: 32,
              width: 32,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="md-ellipsis-vertical" size={20} />
          </TouchableRipple>
        {/* <TouchableHighlight onPress={() => setTipVisible(true )}>
          <Text>Press me</Text>
        </TouchableHighlight> */}
      </Tooltip>
          {/* <TouchableRipple
            borderless
            onPress={() => {}}
            style={{
              height: 32,
              width: 32,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="md-ellipsis-vertical" size={20} />
          </TouchableRipple> */}
        </View>
      </View>
      <View style={{ paddingTop: 10, paddingHorizontal: 12 }}>
          {renderContent()}

      </View>
      {post.category_name && (
        <View style={{ paddingTop: 0, paddingHorizontal: 2 }}>
          <Caption style={{ fontSize: 14, fontWeight: "bold" }}>
            #{post.category_name}
          </Caption>
        </View>
      )}
      {!!post.image && (
        <Image
          source={{
            uri: post.image,
          }}
          style={[
            styles.imageSwipe,
            { height: 224, width: "95%", marginTop: 8,alignSelf:'center',borderRadius:15 },
          ]}
        />
      )}
      <View
  style={{
    borderBottomColor: theme.colors.backdrop,
    borderBottomWidth: 0.3,
    marginVertical:'5%',
    marginHorizontal:'2%',
    // width:400
  }}
/>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          // paddingTop: 12,
          marginHorizontal: 12,
          paddingLeft: 8,
        }}
      >
        <View style={{padding: 0, flexDirection: "row",alignItems:'center'}}>
        <View style={{ marginHorizontal:'2%', flexDirection: "row" }}>
          {post.is_liking ? (
            <TouchableOpacity onPress={handleUnlike}>
              <Ionicons color="red" name="md-heart" size={24} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLike}>
              <Ionicons color={`rgba(0,0,0,0.6)`} name="md-heart-outline" size={24} />
            </TouchableOpacity>
          )}
          <Text
            style={{
              alignSelf:'center',
              fontSize: 14,
              marginHorizontal:5,
              fontWeight: "bold",
              color: "rgba(0,0,0,0.6)",
            }}
          >
            {post.num_likes}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(true)}
          style={{ marginHorizontal:'15%', flexDirection: "row" }}
        >
          

          <Ionicons color={`rgba(0,0,0,0.6)`} name="md-chatbubble-outline" size={22} />
          <Text
            style={{
              alignSelf:'center',
              marginHorizontal:5,
              fontSize: 14,
              fontWeight: "bold",
              color: "rgba(0,0,0,0.6)",
            }}
          >
            {post.num_comments??0}
            {/* 2 */}
          </Text>
          {/*<Caption style={{paddingLeft: 4, fontSize: 16, paddingTop: 1}}>*/}
          {/*    {post.num_comments??0}*/}
          {/*</Caption>*/}
        </TouchableOpacity>
        </View>
        <View style={{ paddingRight: 12, flexDirection: "row" }}>
          
          <Ionicons color={`rgba(0,0,0,0.6)`} name="md-arrow-redo" size={24} />
          <Text
            style={{
              alignSelf:'center',
              fontSize: 14,
              // fontWeight: "bold",
              color: "rgba(0,0,0,0.6)",
            }}
          >
            Share
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(PostItem);

const styles = StyleSheet.create({
  imageSwipe: {
    overflow: "hidden",
    resizeMode: "cover",
  },
  swiperDot: {
    width: 6,
    height: 6,
    borderRadius: 8,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 20,
    marginBottom: -12,
  },
  swiperActiveDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 20,
    marginBottom: -12,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
    marginHorizontal:'5%'
  }
});
