import React from 'react';
import {View, StyleSheet} from "react-native";
import {Caption, Text} from "react-native-paper";
import moment from "moment";
import {navigate} from "../../api/helper";


const PostItemJob = ({job}) => {
    if(!job) return null;
    return (
        <View>
            <Text style={[styles.text, styles.bold]}>{job.title}</Text>
            <Text style={styles.text}>{job.content}</Text>
            <Text style={styles.text}>Job Type : {job.job_type} TIME</Text>
            <Text style={styles.text}>Experience required: {job.experience} years</Text>
            <Text style={styles.text}>Salary: {parseInt(job.salary_min)} - {parseInt(job.salary_max)} {job.salary_unit}</Text>
        </View>
    )
}

export default PostItemJob;

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