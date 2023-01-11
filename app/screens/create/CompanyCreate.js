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
    ScrollView,
} from "react-native";
import {useTheme, Appbar,Menu,Button} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {getCompanyCategories} from "../../store/slices/extraEntitiesSlice";
import Picker from "../../components/picker/Picker";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import {createCommunity} from "../../store/slices/communitiesSlice";
import {navigate} from "../../api/helper";
import {createCompany} from "../../store/slices/companiesSlice";

const CompanyCreate = ({navigation}) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const {width} = Dimensions.get("window");

    const {companyCategories} = useSelector(({extraEntities}) => extraEntities)

    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');
    const [icon, setIcon] = React.useState(null);
    const [banner, setBanner] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

    useEffect(() => {
        dispatch(getCompanyCategories())
    }, [])

    useEffect(() => {
        (async () => {
            const {status} =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
        })();
    }, []);


    const pickImageFromGallery = async (aspect = [1, 1]) => {
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
    const pickBanner = async () => {
        const image = await pickImageFromGallery([2.5, 1])
        image && setBanner(image?.uri);
    };


    const handleCreateCompany = () => {
        if (name !== "") {
            dispatch(createCompany({name, about, category: category?.id, icon, banner}))
                .unwrap()
                .then(res => {
                    navigate("DRAWER")
                })
        }

    }

    return (
        <View style={{flex: 1}}>
            <Appbar.Header
                style={{backgroundColor: theme.colors.surface, elevation: 2}}
            >
                <Appbar.BackAction color={theme.colors.primary} onPress={() => navigation.goBack()}/>
                <Appbar.Content titleStyle={{color:theme.colors.primary}} title="Create company"/>
            </Appbar.Header>
            <View showsVerticalScrollIndicator={false}>
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <ImageBackground
                        source={{
                            uri: banner || "https://ma-hub.imgix.net/wp-images/2020/07/21183139/Video-Effects-News-Background.jpg",
                        }}
                        style={{
                            height: width / 2.2,
                            width: width,
                            borderColor: 50,
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            // position: "absolute",
                            // alignSelf:'flex-end',
                            // marginTop: -30,
                            position: "absolute",
                                // margin: 24,
                                right:5,
                                bottom:-10,
                                height: 45,
                                width: 45,
                                borderRadius:100,
                                justifyContent:'center',
                                elevation:5,
                                backgroundColor:theme.colors.surface,
                                alignSelf:'flex-end'
                            
                        }}
                        onPress={pickBanner}
                    >
                        <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.text}
                            name="md-camera"
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        backgroundColor: theme.colors.surface,
                    }}
                >
                    <View style={{marginTop: -60, marginHorizontal: 12}}>
                        <View style={styles.profilePic}>
                        <ImageBackground
                            source={{
                                uri: icon || "https://ma-hub.imgix.net/wp-images/2020/07/21183139/Video-Effects-News-Background.jpg",
                            }}
                            resizeMode='cover'
                            style={{height: 140,
                                width: 140,overflow:'hidden',
                                borderRadius: 100,
                                borderWidth:1,
                                borderColor:'#939393'}}
                        />
                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                // margin: 24,
                                left:-10,
                                bottom:-10,
                                height: 45,
                                width: 45,
                                borderRadius:100,
                                justifyContent:'center',
                                elevation:5,
                                backgroundColor:theme.colors.surface,
                                alignSelf:'flex-end'
                            }}
                            onPress={pickIcon}
                        >
                            <Ionicons
                            style={{alignSelf:'center'}}
                                color={theme.colors.text}
                                name="md-camera"
                                size={25}
                            />
                        </TouchableOpacity>
                        </View>
                        <View style={{marginBottom: 25}}>
                            <Text style={{fontSize: 12,fontWeight:'700',color:'#4B4B4B'}}>Company name</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="Enter Company name"
                                onChangeText={setName}
                                value={name}
                            />
                        </View>
                        
                        <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
        // <Button onPress={openMenu}>Show menu</Button>
        <TouchableOpacity onPress={openMenu} style={{backgroundColor: theme.colors.surface,
            borderColor: theme.colors.disabled,borderRadius: 10,
            height: 46,
            width:'45%',
            marginTop: 8,
            fontSize: 16,
            paddingHorizontal: 12,
            flexDirection:'row',
            borderWidth: 1,justifyContent:'space-between'}}>
            <Text style={{alignSelf:'center',fontSize:14,fontWeight:'700',color:'#4F4F4F',fontStyle: 'italic'}}>
            Select Category
            </Text>
            <Ionicons
                        style={{alignSelf:'center',top:2}}
                            color='#4F4F4F'
                            name="md-chevron-down-outline"
                            size={20}
                        />

        </TouchableOpacity>
        }>
            {companyCategories.map(item => (
                <Menu.Item
                    onPress={() => {
                        setCategory(item);
                        setVisible(false);
                    }}
                    title={item.name}
                />
            ))}
        </Menu>
        <View style={{marginTop: 25}}>
                            <Text style={{fontSize: 12,fontWeight:'700',color:'#4B4B4B'}}>Company about</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                        height: '40%'
                                    },
                                ]}
                                placeholder="Describe your community"
                                onChangeText={setAbout}
                                value={about}
                            />
                        </View>
                        {/* <Picker
                            text={category?.name ?? "Select Category"}
                            theme={theme}
                            items={companyCategories}
                            onSelect={setCategory}
                        /> */}
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={handleCreateCompany}
                            style={{
                                backgroundColor: theme.colors.primary,
                                borderColor: theme.colors.disabled,
                                borderRadius: 10,
                                marginVertical: 12,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    // fontWeight: "bold",
                                    color: theme.colors.surface,
                                    paddingVertical: 16,
                                    letterSpacing:0.9
                                }}
                            >
                                CREATE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CompanyCreate;

const styles = StyleSheet.create({
    memberImage: {
        height: 34,
        width: 34,
        borderRadius: 75,
        marginLeft: -8,
    },
    profilePic: {
        height: 120,
        width: 120,
        // borderRadius: 10,
        // borderWidth:1,
        // borderColor:'#939393',
        marginBottom: 12,
        alignSelf:'center',
        // overflow:'hidden',
        flexDirection:'row-reverse'
        // alignItems:'baseline'
    },
    textInput: {
        borderRadius: 10,
        height: 46,
        marginTop: 8,
        fontSize: 16,
        paddingHorizontal: 12,
        borderWidth: 1,
    },
    upload: {
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
