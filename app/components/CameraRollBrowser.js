import React from 'react';
import {
    View,
    FlatList,
    Dimensions,
    Image,
    StyleSheet, TouchableOpacity
} from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import {TouchableRipple} from "react-native-paper";


const {width} = Dimensions.get('window');

export default class CameraRollBrowser extends React.Component {
    static defaultProps = {
        loadCompleteMetadata: false,
        loadCount: 24,
        emptyStayComponent: null,
        mediaType: [MediaLibrary.MediaType.photo, ],
    }

    state = {
        hasCameraRollPermission: null,
        photos: [],
        isEmpty: false,
        after: null,
        hasNextPage: true
    }

    async componentDidMount() {
        await this.getPermissionsAsync();
        setTimeout(()=>{
            this.getPhotos();
        }, 1000)
    }

    getPermissionsAsync = async () => {
        const {status: cameraRoll} = await MediaLibrary.requestPermissionsAsync();
        this.setState({
            hasCameraRollPermission: cameraRoll === 'granted'
        });
    }

    getPhotos = () => {
        const params = {
            first: this.props.loadCount,
            mediaType: this.props.mediaType,
            sortBy: [MediaLibrary.SortBy.default],
        };
        if (this.state.after) params.after = this.state.after;
        if (!this.state.hasNextPage) return;
        MediaLibrary
            .getAssetsAsync(params)
            .then(this.processPhotos);
    }

    processPhotos = (data) => {
        if (data.totalCount) {
            if (this.state.after === data.endCursor) return;
            const uris = data.assets;
            this.setState({
                photos: [...this.state.photos, ...uris],
                after: data.endCursor,
                hasNextPage: data.hasNextPage
            });
        } else {
            this.setState({isEmpty: true});
        }
    }

    getItemLayout = (data, index) => {
        const length = width / 4;
        return {length, offset: length * index, index};
    }

    renderImageTile = ({item}) => {
        return (
            <TouchableOpacity
                borderless
                rippleColor={this.props.theme.colors.primary}
                onPress={() => {
                    console.log('iu', item.uri)
                    this.props.onImageSelect && this.props.onImageSelect(item.uri)
                }}
                style={styles.tile}
            >
                <Image source={{uri: item.uri}} style={[styles.tileImage, {borderColor: this.props.theme.colors.disabled}]}/>
            </TouchableOpacity>
        );
    }

    renderPreloader = () => this.props.preloaderComponent;

    renderEmptyStay = () => this.props.emptyStayComponent;


    render() {
        return (
            <View style={{height:100}}>
                <FlatList
                    data={this.state.photos}
                    horizontal
                    renderItem={this.renderImageTile}
                    keyExtractor={(_, index) => index + ''}
                    onEndReached={() => this.getPhotos()}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={this.state.isEmpty ? this.renderEmptyStay() : this.renderPreloader()}
                    initialNumToRender={12}
                    keyboardShouldPersistTaps='always'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tile:{marginLeft:4, marginVertical:4, borderRadius:4},
    tileImage:{width: 80, height: 80, borderRadius: 4, borderWidth:1}
})