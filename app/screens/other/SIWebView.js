import * as React from 'react';
import {WebView} from 'react-native-webview';
import {useEffect} from "react";
import {Button, useTheme} from "react-native-paper";
import {navigate, showFlashMessage} from "../../api/helper";

export default function FlashWebView({route, navigation}) {

    const theme = useTheme();

    useEffect(() => {
        navigation.setOptions(
            {
                headerTitle: route.params && route.params.url,
                headerRight: () => <Button onPress={navigation.goBack} color={theme.colors.primary}>BACK</Button>
            }
        );



    }, [])

    // const onCopyURL = () =>{
    //     const url = route.params ? route.params.url : ''
    //     console.log(url)
    //     if(url){
    //         Clipboard.setString(url)
    //         showFlashMessage({message:'Link copied successfully!', type:'success'})
    //     }
    // }

    return <WebView
        scalesPageToFit={true}
        startInLoadingState={true}
        javaScriptEnabled={true}

        domStorageEnabled={true}
        originWhitelist={['*']}
        mixedContentMode='always'
        source={{uri: route.params && route.params.url}}/>;
}