import React, {useCallback, useEffect, useState} from "react";
import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    Dimensions,
    FlatList,
    TextInput,
    Image,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {Appbar, useTheme, Divider, Caption} from "react-native-paper";
import PostedNews from "../../components/PostedNews";
import {useDispatch, useSelector} from "react-redux";
import {getCommunityCategories} from "../../store/slices/extraEntitiesSlice";
import {getPosts, selectCategoryPosts, selectRecommendedNews, selectTypePosts} from "../../store/slices/postsSlice";
import moment from "moment";

const News = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const {height, width} = Dimensions.get("window");

    const {type} = props.route.params
    if(!type) return null;

    const params = {
        ordering: '-id',
        limit: 2,
        type:type.name

    };
    const typePostsNext = useSelector(({posts}) => posts.type[type.name]?.next);

    const typePosts = useSelector((state) => selectTypePosts(state, type.name))
    const recommendedNewsParams = useSelector((state)=>state.posts.recommendedNews.params)
    const recommendedNews = useSelector(selectRecommendedNews)
    const categories = useSelector((state) => state.extraEntities.communityCategories)

    console.log(recommendedNews, "67890")

    const [refreshing, setRefreshing] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchTypePosts = useCallback((url = null) => {
        setLoading(true);
        url ?? setRefreshing(true);
        dispatch(getPosts({url, params: {...params, type: type.name}, from: "type"}))
            .unwrap()
            .then(() => {
                setRefreshing(false);
                setLoading(false);
            })
            .catch(() => {
                setRefreshing(false);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        dispatch(getCommunityCategories())
    }, [])
    useEffect(() => {
        fetchTypePosts();
        dispatch(getPosts({params:recommendedNewsParams, from:'recommendedNews'}))
    }, []);


    return (
        <View style={{flex: 1}}>
            <View style={{flex:0.4,marginTop:'6%',elevation:5}}>
            <View style={{flex:1,justifyContent:'space-around',flexDirection:'row',backgroundColor:theme.colors.surface}}>
            <Ionicons onPress={() => props.navigation.goBack()} name="md-arrow-back-outline" style={{alignSelf:'center',marginHorizontal:'2%'}} size={30} color={theme.colors.backdrop}/>
                <View
                    style={{
                        borderRadius: 30,
                        height: 45,
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
            {/* <Divider/> */}
            <ScrollView style={{flex:0.5,backgroundColor:theme.colors.surface,paddingVertical:'3%'}} horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    // onPress={() => 
                                    //     {setVisible(item.id)
                                    //     setName(item.name)}
                                    // }
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
                                    
                                    <Text numberOfLines={1} style={{alignSelf:'center', color: '#8D8D8D'}}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            </ScrollView>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={recommendedNews}
                renderItem={({item}) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => props.navigation.push("NEWS_DETAILS",{item})}
                    >
                        <PostedNews user={item.user} item={item.news}/>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id + ""}
                ItemSeparatorComponent={() => <Divider/>}
                ListHeaderComponent={
                    <View style={{width:'95%',alignSelf:'center'}}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginHorizontal: 12,
                                marginTop: 12,
                            }}
                        >
                            <Text style={{fontWeight: "bold", fontSize: 18}}>
                                Trending News
                            </Text>
                        </View>
                        <ScrollView style={{}}  showsHorizontalScrollIndicator={false}>
                            {typePosts.map((item) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => props.navigation.push("NEWS_DETAILS", {item})}
                                    key={item}
                                    style={{
                                        flexDirection:'row',
                                        elevation: 1,
                                        // marginLeft: 12,
                                        marginTop: 10,
                                        marginBottom: 10,
                                        backgroundColor: theme.colors.surface,
                                        borderRadius: 5,
                                        padding:15,
                                        // alignSelf:'center'
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: item.news.image || "https://ma-hub.imgix.net/wp-images/2020/07/21183139/Video-Effects-News-Background.jpg",
                                        }}
                                        style={{height: 80, width: width / 3, borderColor: 50,borderRadius:10}}
                                        // imageStyle={{
                                        //     borderTopLeftRadius: 5,
                                        //     borderTopRightRadius: 5,
                                        // }}
                                    />
                                    <View style={{paddingHorizontal: 8, paddingVertical: 5}}>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "bold",
                                                width: width / 1.8,
                                            }}
                                        >
                                            {item.news.title}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 13,
                                                color:theme.colors.backdrop,
                                                fontWeight: "bold",
                                                width: width / 1.8,
                                            }}
                                        >
                                           By  {item.user.fullname}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Caption style={{fontSize: 12}}>{moment(item.news.created_at).format('MMM Do, h:mm a')}</Caption>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        {/* <Text
                            style={{
                                fontWeight: "bold",
                                marginVertical: 12,
                                fontSize: 18,
                                marginLeft: 12,
                            }}
                        >
                            Recommended News
                        </Text> */}
                    </View>
                }
            />
        </View>
    );
};

export default News;
