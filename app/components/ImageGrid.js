import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import {Dimensions, FlatList, Image, Modal, StyleSheet, View} from "react-native";
import {FAB, TouchableRipple} from "react-native-paper";
import ImageViewer from "react-native-image-zoom-viewer";


const windowWidth = Dimensions.get('window').width;
const ImageGrid = ({theme, images = null, onDelete, editable = false}) => {

    const flatlist = useRef()
    const [imageViewerVisible, setImageViewerVisible] = useState(false);
    const [numImages, setNumImages] = useState(images ? images.length : 0)

    useEffect(() => {
        if (editable && images) {
            numImages < images.length && setTimeout(() => flatlist.current.scrollToEnd({animated: true}), 200)
            numImages > images.length && images.length > 0 && setTimeout(() => flatlist.current.scrollToIndex({
                animated: true,
                index: numImages > 1 ? numImages - 2 : 0
            }), 200)
            images && setNumImages(images.length)
        }
    }, [images])

    const renderImage = useCallback(
        ({item, index}) => <TouchableRipple
            onPress={() => setImageViewerVisible(true)}>
            <View style={{marginRight: 8}}>
                <Image source={{uri: item.url}}
                       style={styles.image}/>
                {editable && <FAB
                    style={[styles.fab, {backgroundColor: theme.colors.disabled}]}
                    small
                    icon="close"
                    onPress={() => onDelete && onDelete(index)}
                />}
            </View>

        </TouchableRipple>, [images])

    if (!images) return null;
    return (
        <View>
            <FlatList
                horizontal
                data={images}
                contentContainerStyle={{marginVertical: 8}}
                renderItem={renderImage}
                keyExtractor={(image, index) => index + ''}
                ref={flatlist}
                keyboardShouldPersistTaps='always'
            />

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
                    imageUrls={images} enableSwipeDown onCancel={() => setImageViewerVisible(false)}/>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    fab: {
        height: 40,
        width: 40,
        position: 'absolute',
        right: 10,
        bottom: 130,
        elevation: 0
    },
    image: {height: 180, width: 270, borderRadius: 8},
    imageViewerFab: {
        backgroundColor: `rgba(25, 208, 180, .37)`,
        elevation: 0,
        margin: 12,
        alignSelf: 'flex-end'
    }
})

export default memo(ImageGrid);