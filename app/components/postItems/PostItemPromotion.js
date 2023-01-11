import React from 'react';
import {View, StyleSheet} from "react-native";
import {Caption, Text} from "react-native-paper";
import moment from "moment";
import {navigate} from "../../api/helper";


const PostItemPromotion = ({promotion}) => {
    if(!promotion) return null;
    return (
        <View>
            <Text style={[styles.text, styles.bold]}>{promotion.title}</Text>
            <Text style={styles.text}>{promotion.content}</Text>
        </View>
    )
}

export default PostItemPromotion;

const styles = StyleSheet.create({
    text:{
        fontSize: 16,
        letterSpacing: -0.1 / 5,
        marginTop:10
    },
    bold:{
        fontWeight:'bold',
    },

})