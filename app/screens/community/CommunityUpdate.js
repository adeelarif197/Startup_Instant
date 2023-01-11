import React, {useEffect} from "react";
import {
    ImageBackground,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    TextInput,
    ScrollView, Platform,
} from "react-native";
import {useTheme, Appbar, Menu} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import extraEntitiesSlice, {getCommunityCategories} from "../../store/slices/extraEntitiesSlice";
import * as ImagePicker from "expo-image-picker";
import {updateUser} from "../../store/slices/authSlice";
import * as ImageManipulator from "expo-image-manipulator";
import {createCommunity, deleteCommunity, updateCommunity} from "../../store/slices/communitiesSlice";
import {navigate} from "../../api/helper";

const CommunityUpdate = ({navigation, route}) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const {height, width} = Dimensions.get("window");

    const {community} = route.params;
    if(!community) return null;

    const [name, onChangeName] = React.useState(community.name);
    const [icon, setIcon] = React.useState(null);
    const [cover, setCover] = React.useState(null);
    const [about, setAbout] = React.useState(community.about);
    const [category, setCategory] = React.useState(community.category);

    const [visible, setVisible] = React.useState(false);

    const categories = useSelector(({extraEntities}) => extraEntities.communityCategories)


    useEffect(() => {
        dispatch(getCommunityCategories())
    }, [])


    const handleUpdateCommunity = () => {
        if(name!==""){
            dispatch(updateCommunity({id:community.id, name, about, category: category?.id, icon, cover}))
        }
    }

    const handleDeleteCommunity = () => {
        dispatch(deleteCommunity(community.id))
            .unwrap()
            .then(res=>{
                navigate("BOTTOM_TABS");
            })
    }


    useEffect(() => {
        (async () => {
            const {status} =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
        })();
    }, []);


    const pickImageFromGallery = async (aspect = [1,1]) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: aspect,
            quality: 1,
        });
        if (!result) return null;
        const manipResult = await ImageManipulator.manipulateAsync(
            result.uri,
            [{resize: {width: 800}}],
            {compress: 0.6, format: ImageManipulator.SaveFormat.JPEG}
        );

        return manipResult;

    }

    const pickIcon = async () => {
        const image = await pickImageFromGallery()
        image && setIcon(image?.uri);
    };
    const pickCover = async () => {
        const image = await pickImageFromGallery([2.5, 1])
        image && setCover(image?.uri);
    };


    return (
        <View style={{flex: 1}}>
            <Appbar.Header
                style={{backgroundColor: theme.colors.surface, elevation: 2}}
            >
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Create community"/>
            </Appbar.Header>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <ImageBackground
                        source={{
                            uri: cover||community.cover,
                        }}
                        style={{
                            height: width / 3,
                            width: width,
                            borderColor: 50,
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                        }}

                        onPress={pickCover}

                    >
                        <Ionicons
                            color={theme.colors.surface}
                            name="md-camera-outline"
                            size={32}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        backgroundColor: theme.colors.background,
                    }}
                >
                    <View style={{marginTop: -30, marginHorizontal: 12}}>
                        <Image
                            source={{
                                uri: icon||community.icon,
                            }}
                            style={styles.profilePic}
                        />
                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                margin: 24,
                            }}
                            onPress={pickIcon}
                        >
                            <Ionicons
                                color={theme.colors.surface}
                                name="md-camera-outline"
                                size={30}
                            />
                        </TouchableOpacity>
                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>Community name</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="Community name"
                                onChangeText={onChangeName}
                                value={name}
                            />
                        </View>
                        <Menu
                            visible={visible}
                            onDismiss={() => setVisible(false)}
                            anchor={
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => setVisible(true)}
                                    style={[
                                        styles.dropMenu,
                                        {
                                            backgroundColor: theme.colors.primary,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            marginRight: 8,
                                            fontWeight: "bold",
                                            fontSize: 14,
                                            color: theme.colors.surface,
                                        }}
                                    >
                                        {category?.name ?? "Select Category"}
                                    </Text>
                                    <Ionicons
                                        name="chevron-down-sharp"
                                        color={theme.colors.surface}
                                        size={22}
                                    />
                                </TouchableOpacity>
                            }
                        >
                            {categories.map(item => (
                                <Menu.Item
                                    onPress={() => {
                                        setCategory(item);
                                        setVisible(false);
                                    }}
                                    title={item.name}
                                />
                            ))}
                        </Menu>
                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>About us</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                        paddingVertical: 8,
                                        height: 90,
                                        textAlignVertical: 'top'
                                    },
                                ]}
                                multiline
                                placeholder="Describe your community"
                                onChangeText={setAbout}
                                value={about}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={handleUpdateCommunity}
                            style={{
                                backgroundColor: theme.colors.primary,
                                borderColor: theme.colors.disabled,
                                borderRadius: 5,
                                marginVertical: 12,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: theme.colors.surface,
                                    paddingVertical: 10,
                                }}
                            >
                                Update
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={handleDeleteCommunity}
                            style={{
                                backgroundColor: '#cc0058',
                                borderColor: theme.colors.disabled,
                                borderRadius: 5,
                                marginVertical: 12,
                                marginTop:48,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: theme.colors.surface,
                                    paddingVertical: 10,
                                }}
                            >
                                Delete community permanenyly
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default CommunityUpdate;

const styles = StyleSheet.create({
    memberImage: {
        height: 34,
        width: 34,
        borderRadius: 75,
        marginLeft: -8,
    },
    profilePic: {
        height: 80,
        width: 80,
        borderRadius: 75,
        marginBottom: 12,
    },
    textInput: {
        borderRadius: 5,
        height: 46,
        marginTop: 8,
        fontSize: 16,
        paddingHorizontal: 12,
        borderWidth: 1,
    },
    catagory: {
        marginTop: 8,
        fontSize: 16,
        height: 46,
        flex: 1,
        paddingHorizontal: 12,
        paddingLeft: 12,
        paddingRight: 42,
        borderWidth: 1,
        borderRadius: 5,
    },
    dropMenu: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 5,
        alignItems: "center",
        flexDirection: "row",
        alignSelf: 'flex-start',
        marginVertical: 12,
        justifyContent: "flex-start",
    }
});
