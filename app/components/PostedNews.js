import React from "react";
import {Image, View, Dimensions} from "react-native";
import {Text, useTheme, Caption} from "react-native-paper";
import moment from "moment";

const PostedNews = ({item, user}) => {
    if(!item) return null;
    const theme = useTheme()
    const { width } = Dimensions.get("window");
    return (
        <View style={{backgroundColor: theme.colors.surface, paddingLeft: 12, paddingVertical: 12}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{ height: 110, width: 110, borderRadius: 5 }} source={{uri: item.image || 'https://lh3.googleusercontent.com/proxy/MwLGJQaqi6pLdfL2Ri7nl8JaJS6B03hWopFO-Rag5Xam72f6MkLl0AfSvmaedhIDqNsQ0AEH_VSML0m8hTsKyRH5nRlHMwRBEB9EDie4ZrOs8TT4MhnkxT04JFUzGMR7paO5'}}/>
                <View style={{flex: 1, paddingHorizontal: 12}}>
                    <Text numberOfLines={1} style={{fontSize: 15, fontWeight: 'bold'}}>{item.title}</Text>
                    <Caption numberOfLines={2} style={{fontSize: 14, color: theme.colors.text, letterSpacing: -0.1}}>{item.content}</Caption>
                        <Caption numberOfLines={1} style={{fontSize: 12, width: width/2.6}}>By - {user?.fullname}</Caption>
                        <Caption style={{fontSize: 12}}>{moment(item.created_at).format('MMM Do, h:mm a')}</Caption>
                </View>
            </View>           
        </View>
    )
}

export default PostedNews;