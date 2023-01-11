import React, {useEffect, useState} from "react";
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
  Platform,
} from "react-native";
import { useTheme, Appbar,Menu } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slices/authSlice";
import * as ImagePicker from "expo-image-picker";
import extraEntities, {getRoles} from "../../store/slices/extraEntitiesSlice";

const ProfileUpdate = (props) => {
  const dispatch = useDispatch();

  const user = useSelector(({ auth }) => auth.user);

  const theme = useTheme();
  const { height, width } = Dimensions.get("window");
  const [name, onChangeName] = React.useState(user.fullname);
  const [username, onChangeUsername] = React.useState(user.username);
    const [title, setTitle] = useState(user?.title??'');
  const [about, onChangeAbout] = React.useState(user.bio);
  const [address, onChangeAddress] = React.useState(user.extra?.address);
  const [number, onChangeNumber] = React.useState(user.extra?.company_number);
  const [email, onChangeEmail] = React.useState(user.email);
  const [website, onChangeWebsite] = React.useState(user.extra?.website);
  const [interests, onChangeInterests] = React.useState(user.extra?.interests);
  const [education, onChangeEducation] = React.useState(user.extra?.education);
  const [company, onChangeCompany] = React.useState(user.extra?.company);
  const [visibler, setVisibler] = React.useState(false);
  const [visiblei, setVisiblei] = React.useState(false);
  const [visiblel, setVisiblel] = React.useState(false);
  const [visiblep, setVisiblep] = React.useState(false);
  const {roles} = useSelector((state)=>state.extraEntities)
    console.log("ROELS",roles)
    // const [role, setRole] = useState(user?.role??null);
  const openMenu = () => setVisiblep(true);

  const closeMenu = () => setVisiblep(false);
  const openMenur = () => setVisiblel(true);

  const closeMenur = () => setVisiblel(false);
  const openMenui = () => setVisiblei(true);

  const closeMenui = () => setVisiblei(false);
  const openMenul = () => setVisiblel(true);

  const closeMenul = () => setVisiblel(false);

  const handleProfileUpdate = () => {
    const extra = {
      address,
      website,
      interests,
      education,
      company,
      company_number: number,
    };
    dispatch(
      
      updateUser({
        fullname: name,
        username,
        title,
        bio: about,
        email,
        extra: JSON.stringify(extra),
      })
    );
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    dispatch(getRoles())

    dispatch(updateUser({ pic: result?.uri }));
  };

  return (
    <View style={{ flex: 1,backgroundColor:theme.colors.surface }}>
      {/* <Appbar.Header
        style={{ backgroundColor: theme.colors.surface, elevation: 2 }}
      >
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="Edit profile" />
      </Appbar.Header> */}
      <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    // paddingHorizontal: 12,
                    // zIndex: 9999,
                    backgroundColor: theme.colors.surface,
                    height: '10%',
                    width:'100%',
                    paddingTop:'8%',
                    elevation: 5,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => props.navigation.goBack()}
                >
                    <View style={{flexDirection:'row',width:'100%'}}>
                    <Ionicons
                        color={theme.colors.backdrop}
                        name="chevron-back"
                        size={26}
                    />
                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: "bold",
                            fontSize: 14,
                            // marginHorizontal: 12,
                            color:theme.colors.backdrop,
                            alignSelf:'center'
                        }}
                    >
                        Back
                    </Text>
                    </View>
                </TouchableOpacity>
                <View style={{alignSelf:'center',width:'30%'}}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            // marginHorizontal: 12,
                            // paddingRight:'10%',
                            color:theme.colors.primary,
                            alignSelf:'center',
                            // alignItems:'center'
                        }}
                    >
                        EDIT PROFILE
                    </Text>
                </View>
                <View style={{alignSelf:'center',width:'15%'}}></View>
            </View>
      <ScrollView style={{backgroundColor:theme.colors.surface}} showsVerticalScrollIndicator={false}>
        {/* <View style={{ alignItems: "center", justifyContent: "center",backgroundColor:theme.colors.surface }}>
          <Image
            source={{
              uri: user?.pic,
            }}
            style={[{ borderColor: theme.colors.text }, styles.profilePic]}
          />
          <TouchableOpacity
            onPress={pickImage}
            style={{
              position: "absolute",
            }}
          >
            <Ionicons
              color={theme.colors.text}
              name="md-camera-outline"
              size={32}
            />
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            backgroundColor: theme.colors.background,
          }}
        >
          <View style={{ paddingHorizontal: 12 , backgroundColor:theme.colors.surface}}>
            
            <Text style={{ fontSize: 12,fontWeight:'700',color:'#4B4B4B' }}>User name</Text>
            <View style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    marginBottom: 14
                  },
                ]}>
              {/* <Text style={{ fontSize: 12,fontWeight:'700',color:'#4B4B4B' }}>User name</Text> */}
              <TextInput
              style={{}}
                // style={[
                //   styles.textInput,
                //   {
                //     backgroundColor: theme.colors.surface,
                //     borderColor: theme.colors.disabled,
                //   },
                // ]}
                placeholder="User name"
                onChangeText={onChangeUsername}
                value={username}
              >
                
              </TextInput>
              <Text style={{fontSize: 12,fontWeight:'700',color:theme.colors.primary,alignSelf:'center'}}>Edit</Text>
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text style={{ fontSize: 12,fontWeight:'700',color:'#4B4B4B' }}>Name</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                  },
                ]}
                placeholder="Name"
                onChangeText={onChangeName}
                value={name}
              />
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text style={{ fontSize: 12,fontWeight:'700',color:'#4B4B4B' }}>Profession</Text>
              <Menu
        visible={visiblep}
        onDismiss={closeMenu}
        anchor={
        // <Button onPress={openMenu}>Show menu</Button>
        <TouchableOpacity onPress={openMenu} style={{backgroundColor: theme.colors.surface,
            borderColor: theme.colors.disabled,borderRadius: 10,
            height: 46,
            width:'100%',
            marginTop: 8,
            fontSize: 16,
            paddingHorizontal: 12,
            flexDirection:'row',
            borderWidth: 1,justifyContent:'space-between'}}>
            <Text style={{alignSelf:'center',fontSize:14,fontWeight:'700',color:'#4F4F4F'}}>
            {user.title}
            </Text>
            <Ionicons
                        style={{alignSelf:'center',top:2}}
                            color='#4F4F4F'
                            name="md-chevron-down-outline"
                            size={20}
                        />

        </TouchableOpacity>
        }>
            {roles.map(item => (
                <Menu.Item
                    onPress={() => {
                        // setCategory(item);
                        setVisiblep(false);
                    }}
                    title={item.name}
                />
            ))}
        </Menu>
              
              {/* <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                  },
                ]}
                placeholder="Title"
                onChangeText={setTitle}
                value={title}
              /> */}
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text style={{ fontSize: 12,fontWeight:'700',color:'#4B4B4B' }}>Address</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                  },
                ]}
                placeholder="Your Address"
                onChangeText={onChangeAddress}
                value={address}
              />
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text style={{ fontSize: 12,fontWeight:'700',color:'#4B4B4B' }}>Email ID</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                  },
                ]}
                placeholder="Enter your email ID"
                onChangeText={onChangeEmail}
                autoCapitalize="none"
                value={email}
              />
            </View>
            <Text style={{ fontSize: 16,fontWeight:'700',color:theme.colors.primary,marginBottom: 14 }}>ABOUT YOU</Text>
            <View style={{ marginBottom: 14 }}>
              <Text style={{ fontSize: 12,fontWeight:'700',color:'#4B4B4B' }}>Website</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                  },
                ]}
                placeholder="Your Website Link"
                autoCapitalize="none"
                onChangeText={onChangeWebsite}
                value={website}
              />
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text style={{ fontSize: 12,fontWeight:'700',color:'#4B4B4B' }}>Bio</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                  },
                ]}
                placeholder="Write here..."
                onChangeText={onChangeAbout}
                value={about}
              />
            </View>
            
            <View style={{ marginBottom: 14 }}>
              <Text style={{ fontSize: 12,fontWeight:'700',color:'#4B4B4B' }}>Company Phone number</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                  },
                ]}
                placeholder="Company Phone number"
                onChangeText={onChangeNumber}
                value={number}
              />
            </View>
            
            <Menu
        visible={visibler}
        onDismiss={closeMenur}
        anchor={
        // <Button onPress={openMenu}>Show menu</Button>
        <TouchableOpacity onPress={openMenur} style={{backgroundColor: theme.colors.surface,
            borderColor: theme.colors.disabled,borderRadius: 10,
            height: 46,
            width:'40%',
            marginTop: 8,
            fontSize: 16,
            paddingHorizontal: 12,
            flexDirection:'row',
            borderWidth: 1,justifyContent:'space-between'}}>
            <Text style={{alignSelf:'center',fontSize:14,fontWeight:'700',color:'#4F4F4F',fontStyle: 'italic'}}>
            Roles
            </Text>
            <Ionicons
                        style={{alignSelf:'center',top:2}}
                            color='#4F4F4F'
                            name="md-chevron-down-outline"
                            size={20}
                        />

        </TouchableOpacity>
        }>
            {roles.map(item => (
                <Menu.Item
                    onPress={() => {
                        // setCategory(item);
                        setVisibler(false);
                    }}
                    title={item.name}
                />
            ))}
        </Menu>
        <View style={{flexDirection:'row'}}>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:10,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Entrepreneur
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:10,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Student
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:10,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Designer
          </Text>
          
          
        </View>
        </View>

        <Menu
        visible={visiblei}
        onDismiss={closeMenui}
        anchor={
        // <Button onPress={openMenu}>Show menu</Button>
        <TouchableOpacity onPress={openMenui} style={{backgroundColor: theme.colors.surface,
            borderColor: theme.colors.disabled,borderRadius: 10,
            height: 46,
            width:'40%',
            marginTop: 8,
            fontSize: 16,
            paddingHorizontal: 12,
            flexDirection:'row',
            borderWidth: 1,justifyContent:'space-between'}}>
            <Text style={{alignSelf:'center',fontSize:14,fontWeight:'700',color:'#4F4F4F',fontStyle: 'italic'}}>
            Interests
            </Text>
            <Ionicons
                        style={{alignSelf:'center',top:2}}
                            color='#4F4F4F'
                            name="md-chevron-down-outline"
                            size={20}
                        />

        </TouchableOpacity>
        }>
            {roles.map(item => (
                <Menu.Item
                    onPress={() => {
                        // setCategory(item);
                        setVisiblei(false);
                    }}
                    title={item.name}
                />
            ))}
        </Menu>
        <View style={{flexDirection:'row'}}>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:10,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Entrepreneur
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:10,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Student
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:10,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Designer
          </Text>
          
          
        </View>
        </View>

        <Menu
        visible={visiblel}
        onDismiss={closeMenul}
        anchor={
        // <Button onPress={openMenu}>Show menu</Button>
        <TouchableOpacity onPress={openMenul} style={{backgroundColor: theme.colors.surface,
            borderColor: theme.colors.disabled,borderRadius: 10,
            height: 46,
            width:'40%',
            marginTop: 8,
            fontSize: 16,
            paddingHorizontal: 12,
            flexDirection:'row',
            borderWidth: 1,justifyContent:'space-between'}}>
            <Text style={{alignSelf:'center',fontSize:14,fontWeight:'700',color:'#4F4F4F',fontStyle: 'italic'}}>
            Looking for
            </Text>
            <Ionicons
                        style={{alignSelf:'center',top:2}}
                            color='#4F4F4F'
                            name="md-chevron-down-outline"
                            size={20}
                        />

        </TouchableOpacity>
        }>
            {roles.map(item => (
                <Menu.Item
                    onPress={() => {
                        // setCategory(item);
                        setVisiblel(false);
                    }}
                    title={item.name}
                />
            ))}
        </Menu>
        <View style={{flexDirection:'row'}}>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:10,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Entrepreneur
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:10,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Student
          </Text>
          
          
        </View>
        <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf:'center',
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                    paddingVertical:10,
                    backgroundColor: '#F8F8F8',
                    marginVertical:16,
                    borderRadius:10,
                    marginHorizontal:10
                   
                }}>
          <Text style={{color:'#015F9E',fontSize:14,fontWeight:'700'}}>
          
          Designer
          </Text>
          
          
        </View>
        </View>
            
            {/* <View style={{ marginBottom: 14 }}>
              <Text style={{ fontSize: 18 }}>Interests</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                  },
                ]}
                placeholder="Interests"
                onChangeText={onChangeInterests}
                value={interests}
              />
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text style={{ fontSize: 18 }}>Education</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                  },
                ]}
                placeholder="Education"
                onChangeText={onChangeEducation}
                value={education}
              />
            </View>
            <View style={{ marginBottom: 14 }}>
              <Text style={{ fontSize: 18 }}>Company</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.disabled,
                  },
                ]}
                placeholder="Company"
                onChangeText={onChangeCompany}
                value={company}
              />
            </View> */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleProfileUpdate}
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
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileUpdate;

const styles = StyleSheet.create({
  memberImage: {
    height: 100,
    width: 100,
    borderRadius: 75,
    marginLeft: -8,
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 75,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
  },
  textInput: {
    borderRadius: 10,
    height: 50,
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
});
