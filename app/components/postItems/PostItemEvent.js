import React from 'react';
import {View, StyleSheet} from "react-native";
import {Caption, Text} from "react-native-paper";
import moment from "moment";
import {navigate} from "../../api/helper";


const PostItemEvent = ({event}) => {
    if(!event) return null;
    return (
        <View>
            <Text style={[styles.text, styles.bold]}>{event.name}</Text>
            <Text style={styles.text}>{event.content}</Text>
            <Text style={styles.text}>Start at: {event.start_at} TIME</Text>
            <Text style={styles.text}>End at: {event.end_at} years</Text>
        </View>
    )
}

export default PostItemEvent;

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