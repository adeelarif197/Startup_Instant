import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import {
  useTheme,
  TouchableRipple,
  Divider,
  Card
} from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import ImageGrid from "../../components/ImageGrid";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useFocusEffect } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CameraRollBrowser from "../../components/CameraRollBrowser";
import ProgressCircle from "react-native-progress-circle";
import ParsedText from "react-native-parsed-text";
import { URL_REGEX } from "../../api/constants";
import { getURLPreview } from "../../api/utilities";
import URLPreview from "../../components/URLPreview";
import _ from "lodash";
import {createPost} from "../../store/slices/postsSlice";

const { width, height } = Dimensions.get("window");

const CommunityPostCreate = ({ route, navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user } = useSelector(({ auth }) => auth);
  const {postCategories} = useSelector(({extraEntities}) => extraEntities);


    const createPostInput = useRef(true);
  const scrollView = useRef();

  const keyboardOffset = new Animated.Value(0);

  const [video, setVideo] = React.useState(null);
  const [title, onChangeTitle] = React.useState(null);
  const [content, setContent] = React.useState("");

  const [url, setUrl] = React.useState(null);
  const [urlPreviewData, setUrlPreviewData] = React.useState(null);

  const statusBarHeight = getStatusBarHeight();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [select, setSelect] = React.useState(null);

  const [images, setImages] = React.useState([]);

  useEffect(() => {
    createPostInput && setTimeout(() => createPostInput.current.focus(), 150);
  }, []);

  // URL PREVIEWS
  useEffect(() => {
    if (URL_REGEX.test(content) && content.slice(-1).match(/[ \n]/g)) {
      setUrl(content.match(URL_REGEX)[0]);
    } else if (content === "") {
      setUrl(null);
    }
  }, [content]);

  useEffect(() => {
    url
      ? getURLPreview(url).then((data) => setUrlPreviewData(data))
      : setUrlPreviewData(null);
  }, [url]);

  // PICK IMAGE
  const pickMedia = async (type = "image") => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        type === "video"
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.cancelled) {
      await addImage(result.uri);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      route.params &&
        route.params.image &&
        setImages(...images, route.params.image);
    }, [route.params])
  );

  const addImage = async (image_uri) => {
    console.log(image_uri);
    const manipResult = await ImageManipulator.manipulateAsync(
      image_uri,
      [{ resize: { width: 800 } }],
      { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
    );
    console.log(manipResult);
    setImages([...images, { url: manipResult.uri }]);
  };

  const deleteImage = React.useCallback(
    (index) => {
      setImages(_.remove(images, (image, i) => i !== index));
    },
    [images]
  );

  const onKeyboardWillShow = (e) => {
    Animated.spring(keyboardOffset, {
      toValue: e.endCoordinates.height,
      friction: 8,
      useNativeDriver: false,
    }).start();
  };
  const onKeyboardWillHide = (e) => {
    Animated.spring(keyboardOffset, {
      toValue: 0,
      friction: 8,
      useNativeDriver: false,
    }).start();
  };

  const onPostSubmit = () => {
      dispatch(createPost({title, content, category:select?.id??null, images})).unwrap()
          .then(res=>{
            setContent('')
            onChangeTitle('')
            setImages([])
            setUrl(null)
          })
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: statusBarHeight,
        backgroundColor: theme.colors.surface,
      }}
    >
      <View
        style={[{ backgroundColor: theme.colors.background }, styles.header]}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.goBack()}
            style={[
              styles.cross,
            //   {
            //     backgroundColor: theme.colors.primary,
            //   },
            ]}
          >
            <Ionicons color={theme.colors.primary} name="md-close" size={28} />
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "bold",
              marginLeft: 12,
              fontSize: 18,
              color: theme.colors.primary,
            }}
          >
            Community name
          </Text>
        </View>
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        onKeyboardWillShow={onKeyboardWillShow}
        onKeyboardWillHide={onKeyboardWillHide}
        keyboardOpeningTime={100}
        ref={scrollView}
        enableOnAndroid
        enableAutomaticScroll
        extraHeight={200}
        extraScrollHeight={Platform.OS === "ios" ? 250 : 150}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.inputContainer}>
          <View style={styles.inputLeftContainer}>
            {/* <TouchableRipple
                                style={{marginHorizontal: 8}}
                                rippleColor={'transparent'}
                            >
                                <Avatar.Image
                                    size={48} source={{uri: user.pic}}/></TouchableRipple> */}
          </View>
          <View style={styles.inputRightContainer}>
            {(() => {
              if (select?.id === 1) {
                return (
                  <View style={{ marginBottom: 12 }}>
                    <TextInput
                      placeholder="News title"
                      placeholderTextColor={theme.colors.disabled}
                      style={[styles.input, { fontWeight: "bold" }]}
                      multiline
                      value={title}
                      onChangeText={onChangeTitle}
                      scrollEnabled={false}
                    />
                    <Divider />
                  </View>
                );
              }
              return null;
            })()}
            <TextInput
              ref={createPostInput}
              placeholder={"Write your post here..."}
              placeholderTextColor={theme.colors.disabled}
              style={[styles.input, { textAlignVertical: "top" }]}
              multiline
              onChangeText={(text) => setContent(text)}
            >
              <ParsedText
                style={{ color: theme.colors.text }}
                parse={[
                  {
                    pattern: /@(\w+)/,
                    style: { color: theme.colors.primary },
                  },
                  {
                    pattern: URL_REGEX,
                    style: { color: theme.colors.primary },
                  },
                  {
                    pattern: /#(\w+)/,
                    style: { color: theme.colors.primary },
                  },
                ]}
                childrenProps={{ allowFontScaling: false }}
              >
                {content}
              </ParsedText>
            </TextInput>

            {urlPreviewData && images.length === 0 && (
              <>
                <Divider />
                <URLPreview
                  theme={theme}
                  data={urlPreviewData}
                  style={{ borderRadius: 0 }}
                />
              </>
            )}

            <ImageGrid
              editable={true}
              theme={theme}
              images={images}
              onDelete={deleteImage}
            />
            {/*{video && (*/}
            {/*    <View>*/}
            {/*        <Video*/}
            {/*            // ref={video}*/}
            {/*            style={{height: ((width - 100) * 9) / 16, width: width - 100, borderRadius: 8}}*/}
            {/*            source={{*/}
            {/*                uri: video.url,*/}
            {/*            }}*/}
            {/*            resizeMode="cover"*/}
            {/*            shouldPlay*/}
            {/*            // onPlaybackStatusUpdate={status => setStatus(() => status)}*/}
            {/*        />*/}
            {/*        <FAB*/}
            {/*            style={{*/}
            {/*                backgroundColor: theme.colors.background,*/}
            {/*                position: 'absolute',*/}
            {/*                top: 8,*/}
            {/*                right: 40,*/}
            {/*                height: 40,*/}
            {/*                width: 40,*/}
            {/*                opacity: .8*/}
            {/*            }}*/}
            {/*            small*/}
            {/*            icon="close"*/}
            {/*            color={theme.colors.accent}*/}
            {/*            onPress={() => setVideo(null)}*/}
            {/*        />*/}
            {/*    </View>*/}
            {/*)}*/}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Animated.View
        style={{ bottom: keyboardOffset, position: "absolute", width: "100%" }}
      >
        <View>
          {/*<View style={{position: 'absolute', bottom: 56}}>*/}
          {content.length === 0 && images.length < 4 && video === null && (
            <CameraRollBrowser
              theme={theme}
              onImageSelect={(image) => addImage(image)}
            />
          )}

          {/*</View>*/}
          <Divider />

          <Card.Actions style={{ backgroundColor: theme.colors.surface }}>
            {/*<TouchableRipple*/}
            {/*    borderless*/}
            {/*    touchSoundDisabled={false}*/}
            {/*    style={styles.actionIcon}*/}
            {/*    rippleColor={theme.colors.primary}*/}
            {/*>*/}
            {/*    <Ionicons name='md-camera'*/}
            {/*              size={24}*/}
            {/*              color={images.length > 3 || video ? theme.colors.disabled : theme.colors.primary}/>*/}
            {/*</TouchableRipple>*/}
            <TouchableRipple
              borderless
              touchSoundDisabled={false}
              style={styles.actionIcon}
              rippleColor={theme.colors.primary}
              onPress={() => pickMedia("image")}
            >
              <Ionicons
                name="md-images"
                size={24}
                color={
                  images.length > 3 || video
                    ? theme.colors.disabled
                    : theme.colors.primary
                }
              />
            </TouchableRipple>
            {/*<TouchableRipple*/}
            {/*    borderless*/}
            {/*    touchSoundDisabled={false}*/}
            {/*    style={styles.actionIcon}*/}
            {/*    rippleColor={theme.colors.primary}*/}
            {/*    onPress={() => pickMedia('video')}*/}
            {/*    disabled={images.length > 0 || video}*/}
            {/*>*/}
            {/*    <Ionicons name='md-videocam'*/}
            {/*              size={24}*/}
            {/*              color={images.length > 0 || video ? theme.colors.disabled : theme.colors.primary}/>*/}
            {/*</TouchableRipple>*/}
            {/*<TouchableRipple*/}
            {/*    borderless*/}
            {/*    touchSoundDisabled={false}*/}
            {/*    style={styles.actionIcon}*/}
            {/*    rippleColor={theme.colors.primary}*/}
            {/*>*/}
            {/*    <Ionicons name='md-mic'*/}
            {/*              size={24}*/}
            {/*              color={images.length > 0 || video ? theme.colors.disabled : theme.colors.disabled}/>*/}
            {/*</TouchableRipple>*/}
            <TouchableRipple
              borderless
              touchSoundDisabled={false}
              style={styles.actionIcon}
              rippleColor={theme.colors.primary}
              onPress={() => {
                setContent(content + "@");
              }}
            >
              <Ionicons
                name="md-at-circle-outline"
                size={24}
                color={theme.colors.primary}
              />
            </TouchableRipple>

            <View style={{ flex: 1 }} />
            <Text style={{ color: theme.colors.disabled, marginRight: 4 }}>
              {content.length}/3000
            </Text>
            <ProgressCircle
              percent={(content.length / 500) * 100}
              radius={16}
              borderWidth={4}
              color={
                content.length < 500
                  ? theme.colors.primary
                  : theme.colors.accent
              }
              shadowColor={theme.colors.background}
              bgColor="#fff"
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={onPostSubmit}
              style={[
                styles.button,
                {
                  backgroundColor: theme.colors.primary,
                  borderColor: theme.colors.disabled,
                  marginLeft: 8,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: theme.colors.surface,
                  padding: 8,
                }}
              >
                Post now
              </Text>
            </TouchableOpacity>
          </Card.Actions>
        </View>
      </Animated.View>
    </View>
  );
};

export default CommunityPostCreate;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    elevation: 2,
  },
  dropMenu: {
    // width: 128,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    height: 120,
    width: 100,
    borderRadius: 5,
  },
  crossContainer: {
    position: "absolute",
    marginLeft: 66,
    marginTop: 12,
  },
  cross: {
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 45,
  },
  button: {
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: { flexDirection: "row", paddingHorizontal: 4, padding: 16 },
  //inputLeftContainer: {width: 64, alignItems: 'center'},
  inputRightContainer: {
    borderRadius: 8,
    marginRight: 8,
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    fontSize: 18,
    minHeight: 32,
    paddingHorizontal: 8,
    paddingBottom: 12,
    flex: 1,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});
