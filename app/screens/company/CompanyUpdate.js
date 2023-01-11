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
import {useTheme, Appbar} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {getCompanyCategories} from "../../store/slices/extraEntitiesSlice";
import Picker from "../../components/picker/Picker";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import {createCommunity} from "../../store/slices/communitiesSlice";
import {navigate} from "../../api/helper";
import {createCompany, deleteCompany, updateCompany} from "../../store/slices/companiesSlice";

const CompanyCreate = ({route, navigation}) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const {width} = Dimensions.get("window");

    const {company} = route.params;
    if (!company) return null;

    const {companyCategories} = useSelector(({extraEntities}) => extraEntities)

    const [name, setName] = React.useState(company.name);
    const [about, setAbout] = React.useState(company.about);
    const [icon, setIcon] = React.useState(null);
    const [banner, setBanner] = React.useState(null);
    const [category, setCategory] = React.useState(company.category);


    const [email, setEmail] = React.useState(company.email);
    const [phone, setPhone] = React.useState(company.phone);
    const [website, setWebsite] = React.useState(company.website);
    const [cin_number, setCINNumber] = React.useState(company.cin_number);
    const [date_founded, setDateFounded] = React.useState(company.date_founded);

    const [street, setStreet] = React.useState(company.address?.street);
    const [city, setCity] = React.useState(company.address?.city);
    const [state, setState] = React.useState(company.address?.state);
    const [pincode, setPincode] = React.useState(company.address?.pincode);
    const [country, setCountry] = React.useState(company.address?.country);


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


    const handleUpdateCompany = () => {
        if (name !== "") {
            dispatch(updateCompany({
                id: company.id,
                name,
                about,
                category: category?.id,
                icon,
                banner,
                email,
                phone,
                website,
                cin_number,
                date_founded,
                street,
                city,
                state,
                pincode,
                country
            }))
                .unwrap()
                .then(res => {
                    // navigation.goBack()
                })
        }
    }

    const handleDeleteCompany = () => {
        dispatch(deleteCompany(company.id))
            .unwrap()
            .then(
                res => navigate('BOTTOM_TABS')
            )
    }

    return (
        <View style={{flex: 1}}>
            <Appbar.Header
                style={{backgroundColor: theme.colors.surface, elevation: 2}}
            >
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
                <Appbar.Content title="Create company"/>
            </Appbar.Header>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{alignItems: "center", justifyContent: "center"}}>
                    <ImageBackground
                        source={{
                            uri: banner || company.banner,
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
                        onPress={pickBanner}
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
                                uri: icon || company.icon,
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
                            <Text style={{fontSize: 18}}>Company name</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="Company name"
                                onChangeText={setName}
                                value={name}
                            />
                        </View>
                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>Company about</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="About"
                                onChangeText={setAbout}
                                value={about}
                            />
                        </View>
                        <Picker
                            text={category?.name ?? "Select Category"}
                            theme={theme}
                            items={companyCategories}
                            onSelect={setCategory}
                        />


                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>Email</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="Email"
                                onChangeText={setEmail}
                                value={email}
                            />
                        </View>
                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>Phone</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="Phone"
                                onChangeText={setPhone}
                                value={phone}
                            />
                        </View>
                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>Website</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="Website"
                                onChangeText={setWebsite}
                                value={website}
                            />
                        </View>
                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>CIN Number</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="CIN Number"
                                onChangeText={setCINNumber}
                                value={cin_number}
                            />
                        </View>
                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>Date Founded</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="Date Founded"
                                onChangeText={setDateFounded}
                                value={date_founded}
                            />
                        </View>

                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Address</Text>

                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>Street</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="Street"
                                onChangeText={setStreet}
                                value={street}
                            />
                        </View>
                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>City</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="City"
                                onChangeText={setCity}
                                value={city}
                            />
                        </View>
                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>Pincode</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="Pincode"
                                onChangeText={setPincode}
                                value={pincode}
                            />
                        </View>
                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>State</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="State"
                                onChangeText={setState}
                                value={state}
                            />
                        </View>
                        <View style={{marginBottom: 14}}>
                            <Text style={{fontSize: 18}}>Country</Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: theme.colors.surface,
                                        borderColor: theme.colors.disabled,
                                    },
                                ]}
                                placeholder="Country"
                                onChangeText={setCountry}
                                value={country}
                            />
                        </View>


                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={handleUpdateCompany}
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
                                Update Company
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={handleDeleteCompany}
                            style={{
                                backgroundColor: "#ff2f6c",
                                borderColor: theme.colors.disabled,
                                borderRadius: 5,
                                marginVertical: 12,
                                marginTop: 72,
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
                                Delete Company
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
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
    upload: {
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
