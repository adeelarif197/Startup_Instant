import React, {useCallback, useEffect, useState} from "react";
import {FlatList, View,TextInput,TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {useTheme, Appbar, Text} from "react-native-paper";
import PostItem from "../../components/PostItem";

import {useDispatch, useSelector} from "react-redux";
import {getPosts, selectCategoryPosts, selectTypePosts} from "../../store/slices/postsSlice";

const PostByType = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const {type} = props.route.params

    const params = {
        ordering: '-id',
        limit: 2,
        type:type.name
    }
    const typePostsNext = useSelector(({posts}) => posts.type[type.name]?.next);

    const typePosts = useSelector((state) => selectTypePosts(state, type.name))

    const [refreshing, setRefreshing] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchTypePosts = useCallback((url = null) => {
        setLoading(true);
        url ?? setRefreshing(true);
        dispatch(getPosts({url, params: {...params, type:type.name}, from: "type"}))
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
        fetchTypePosts();
    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={{alignItems:'center',flex:0.3,paddingTop:'5%',justifyContent:'space-around',flexDirection:'row',backgroundColor:theme.colors.surface}}>
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
            {/* <Appbar.Header
                style={{backgroundColor: theme.colors.surface, elevation: 2}}
            >
                <Appbar.BackAction onPress={() => props.navigation.goBack()}/>
                <Appbar.Content title={type.value}/>
            </Appbar.Header> */}
            {type.name === "EVENT" || type.name === "JOB" ? (
                <Text style={{color:theme.colors.disabled, margin:10, alignSelf:'center'}}>Coming Soon</Text>
            )
                :
                (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={typePosts}
                        renderItem={({item}) => <PostItem item={item}/>}
                        keyExtractor={(item) => item.id.toString()}
                        onEndReachedThreshold={0.8}
                        onEndReached={() => typePostsNext && !loading && fetchTypePosts(typePostsNext)}
                        onRefresh={fetchTypePosts}
                        refreshing={refreshing}
                        ListHeaderComponent={
                            <View style={{width:'95%',alignSelf:'center',height:'10%'}}>
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
                                    {type.value}es
                                    </Text>
                                </View>
                                </View>}
                        ListEmptyComponent = {
                            !refreshing && <Text style={{padding:16, textAlign:'center', color:theme.colors.disabled}}>No posts in {type.value}</Text>
                        }

                    />
                )

            }
        </View>
    );
};

export default PostByType;
