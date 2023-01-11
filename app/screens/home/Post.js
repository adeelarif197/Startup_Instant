import React, {useCallback, useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {useTheme, Appbar, Text} from "react-native-paper";
import PostItem from "../../components/PostItem";
import {useDispatch, useSelector} from "react-redux";
import {getPosts, selectCategoryPosts} from "../../store/slices/postsSlice";

const Post = (props) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const {category} = props.route.params

    const categoryPostsParams = useSelector(({posts}) => posts.category[category.id]?.params ?? {
        ordering: '-id',
        limit: 2
    });
    const categoryPostsNext = useSelector(({posts}) => posts.category[category.id]?.next);

    const categoryPosts = useSelector((state) => selectCategoryPosts(state, category.id))

    const [refreshing, setRefreshing] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchCategoryPosts = useCallback((url = null) => {
        setLoading(true);
        url ?? setRefreshing(true);
        dispatch(getPosts({url, params: {...categoryPostsParams, category:category.id}, from: "category"}))
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
        fetchCategoryPosts();
    }, []);

    return (
        <View style={{flex: 1}}>
            <Appbar.Header
                style={{backgroundColor: theme.colors.surface, elevation: 2}}
            >
                <Appbar.BackAction onPress={() => props.navigation.goBack()}/>
                <Appbar.Content title={category.name}/>
            </Appbar.Header>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={categoryPosts}
                renderItem={({item}) => <PostItem item={item}/>}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.8}
                onEndReached={() => categoryPostsNext && !loading && fetchCategoryPosts(categoryPostsNext)}
                onRefresh={fetchCategoryPosts}
                refreshing={refreshing}
                ListEmptyComponent = {
                    !refreshing && <Text style={{padding:16, textAlign:'center', color:theme.colors.disabled}}>No posts in {category.name}</Text>
                }

            />
        </View>
    );
};

export default Post;
