import React from 'react';
import {View} from "react-native";
import {Caption, Text} from "react-native-paper";
import moment from "moment";
import {navigate} from "../../api/helper";


const PostItemNews = ({news}) => {
    if(!news) return null;
    return (
        <View>
            <Text
                onPress={() => navigate("NEWS_DETAILS", {item:news})}
                style={{
                    fontSize: 16,
                    fontWeight:'bold',
                    letterSpacing: -0.1 / 5,
                }}
            >
                {news.title}
            </Text>
            <Caption style={{fontSize: 12}}>{moment(news.created_at).format('MMM Do, h:mm a')}</Caption>
        </View>
    )
}

export default PostItemNews;