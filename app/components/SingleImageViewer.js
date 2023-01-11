import React, {useState} from "react";
import {FAB, TouchableRipple, useTheme} from "react-native-paper";
import {Dimensions, Image, Modal, StyleSheet, View} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

const SingleImageViewer = ({uri:image, setImage}) => {
    const theme = useTheme()
    const windowWidth = Dimensions.get('window').width;
    const [imageViewerVisible, setImageViewerVisible] = useState(false);

    if(!image) return null;
    return (
        <View>
            {image && (
                <TouchableRipple
                    onPress={() => setImageViewerVisible(true)}>
                    <View style={{marginRight: 8}}>
                        <Image source={{uri: image}}
                               style={styles.image}/>
                        <FAB
                            style={[styles.fab, {backgroundColor: theme.colors.disabled}]}
                            small
                            icon="close"
                            onPress={() => setImage(null)}
                        />
                    </View>

                </TouchableRipple>
            )}
            <Modal animationType={'fade'} visible={imageViewerVisible} transparent={true}
                   onRequestClose={() => setImageViewerVisible(false)}>
                <ImageViewer
                    backgroundColor='rgba(0,0,0,0.87)'
                    renderFooter={() => <View style={{width: windowWidth}}>
                        <FAB
                            style={styles.imageViewerFab}
                            color={theme.colors.primary}
                            small
                            icon="close"
                            onPress={() => setImageViewerVisible(false)}
                        />
                    </View>}

                    renderIndicator={() => null}
                    imageUrls={[{url:image}]} enableSwipeDown onCancel={() => setImageViewerVisible(false)}/>
            </Modal>

        </View>
    )
}

export default SingleImageViewer;


const styles = StyleSheet.create({
    fab: {
        height: 40,
        width: 40,
        position: 'absolute',
        right: 10,
        bottom: 130,
        elevation: 0
    },
    image: {height: 180, width: '100%', borderRadius: 8},
    imageViewerFab: {
        backgroundColor: `rgba(25, 208, 180, .37)`,
        elevation: 0,
        margin: 12,
        alignSelf: 'flex-end'
    }
})