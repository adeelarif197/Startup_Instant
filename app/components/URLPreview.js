import React, {memo, useEffect, useState} from "react";
import {Card, Text} from "react-native-paper";
import {Image, View, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {getURLPreview} from "../api/utilities";

const URLPreview = ({theme, data = null, style={}, navigation}) => {
    if (!data) return null;
    console.log('rendered URLPReview 🔗')
    return (
        <Card style={[styles.container, style]} onPress={()=>navigation && navigation.push('FlashWebView', {url:data.url})}>
            <View style={styles.innerContainer}>
                {data.image !== '' &&
                <Image source={{uri: data.image}} style={styles.image}/>}
                <View style={{paddingLeft: 8, flex: 1}}>
                    <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{data.title}</Text>
                    <Text numberOfLines={3} style={{marginTop: 2}}>{data.description}</Text>
                    <Text numberOfLines={1} style={{color: theme.colors.disabled, marginTop: 2}}><Ionicons
                        name='md-link' size={13}/> {data.url}</Text>
                </View>
            </View>
        </Card>

    )
}

const styles = StyleSheet.create({
    container: {height: 112},
    innerContainer:{flexDirection: 'row', padding: 8, margin: 0},
    image:{height: 96, width: 96, borderRadius: 8}
})

export default memo(URLPreview);