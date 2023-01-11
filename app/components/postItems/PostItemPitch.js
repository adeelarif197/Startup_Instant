import React from 'react';
import {View,Dimensions} from "react-native";
import {Button, Caption, Text} from "react-native-paper";
import moment from "moment";
import {navigate} from "../../api/helper";
import {Video} from "expo-av";


const PostItemPitch = ({pitch}) => {
    const videoRef = React.useRef(null);
    const { width, height } = Dimensions.get("window");
    const [status, setStatus] = React.useState({});

    if (!pitch) return null;
    return (
        <View>

            {pitch.video &&
            <Video
            onPress={() =>
                status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()
            }
                style={{
                    alignSelf: 'center',
                    width: width,
                    height: width/1.6,

                    marginVertical: 10,
                }}
                source={require('../../../assets/1.mp4')}
                // source={{
                //     // uri: pitch.video,
                //     uri: 'https://www.youtube.com/embed/YwVghzHSX84',
                // }}
                ref={videoRef}
                // useNativeControls
                resizeMode="cover"
                isLooping
                // shouldPlay={false}
                onPlaybackStatusUpdate={status => setStatus(() => status)}

            />}
            {/* {pitch.video && (
                <Button
                    onPress={() =>
                        status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()
                    }
                >{status.isPlaying ? 'Pause' : 'Play'}</Button>
            )} */}

            {/* <Text
                style={{
                    fontSize: 16,
                    letterSpacing: -0.1 / 5,
                    marginTop:10,
                    position:'absolute'
                }}
            >
                <Text style={{fontWeight: 'bold'}}>Description: </Text>{pitch.video}
            </Text> */}
            {/* <Text
                style={{
                    fontSize: 16,
                    letterSpacing: -0.1 / 5,
                    marginTop:10
                }}
            >
                <Text style={{fontWeight: 'bold'}}>Problem: </Text>{pitch.problem}
            </Text>
            <Text
                style={{
                    fontSize: 16,
                    letterSpacing: -0.1 / 5,
                    marginTop:10
                }}
            >
                <Text style={{fontWeight: 'bold'}}>Solution: </Text>{pitch.solution}
            </Text> */}
        </View>
    )
}

export default PostItemPitch;