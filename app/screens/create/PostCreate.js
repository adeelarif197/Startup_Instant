import React, {useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Platform,
    Image,
    ScrollView
} from "react-native";
import {
    useTheme,
    Menu,
    Button,
    TouchableRipple,
    Divider,
    Card,
    List
} from "react-native-paper";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Animated from "react-native-reanimated";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import ProgressCircle from "react-native-progress-circle";
import {postJobSalaryUnits, postJobTypes, postTypes} from "../../api/constants";
import {createPost} from "../../store/slices/postsSlice";
import SingleImageViewer from "../../components/SingleImageViewer";
import ContentInput from "../../components/postCreateInputs/ContentInput";
import {getCompanies, selectOwnedCompanies} from "../../store/slices/companiesSlice";
import Picker from "../../components/picker/Picker";
import { Video } from 'expo-av';
import extraEntities, {getInterests, getRoles} from "../../store/slices/extraEntitiesSlice";
import RBSheet from "react-native-raw-bottom-sheet";
import _ from 'lodash';

const PostCreate = ({route, navigation}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const user = useSelector(({auth}) => auth.user);
    if(!user){
        return null
    }
    // const [selectedInterests, setSelectedInterests] = useState(user?.interests ?? []);

    const scrollView = useRef();
    const videoRef = React.useRef(null);

    const keyboardOffset = new Animated.Value(0);

    const myCompanies = useSelector(selectOwnedCompanies)


    const [community, setCommunity] = useState(route.params?.community ?? null)
    const [company, setCompany] = useState(route.params?.company ?? null)

    const [content, setContent] = React.useState("");
    const {interests} = useSelector((state) => state.extraEntities)
    const [selectedInterests, setSelectedInterests] = useState([]);

    const [image, setImage] = React.useState(null);

    // NEWS
    const [title, setTitle] = React.useState('')

    // PITCH
    const [video, setVideo] = React.useState(null)
    const [pitchCompany, setPitchCompany] = React.useState(null)
    const [website, setWebsite] = React.useState('')
    const [problem, setProblem] = React.useState('')
    const [solution, setSolution] = React.useState('')

    // JOB
    // title, content, website
    const [jobType, setJobType] = useState(postJobTypes[0])
    const [salaryUnit, setSalaryUnit] = useState(postJobSalaryUnits[1])
    const [location, setLocation] = useState('')
    const [minSalary, setMinSalary] = useState('')
    const [maxSalary, setMaxSalary] = useState('')
    const [experience, setExperience] = useState('')
    const [jobCompany, setJobCompany] = React.useState(null)

    // event
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')


    const statusBarHeight = getStatusBarHeight();
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [select, setSelect] = React.useState(postTypes[0]);
    const refRBSheet = useRef();
    const [status, setStatus] = React.useState({});
    const [selection, setSelection] = React.useState("options");

    useEffect(()=>{
        dispatch(getCompanies({params: {owned: true}, from: 'owned'}))
        dispatch(getInterests())

    }, [])


    /* PLAN
    * 1. add all fields here
    * 2. based on the type selected by the user, display inputs in render
    * 3. on submit, based on the selected type, send the data to the createPost
    * 4. in create post, use lodash foreach to populate formdata.
    * */


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
            if (type === 'image')
                await addImage(result.uri);
            else if (type === 'video')
                await setVideo(result.uri);
        }
    };

    const addImage = async (image_uri) => {
        const manipResult = await ImageManipulator.manipulateAsync(
            image_uri,
            [{resize: {width: 800}}],
            {compress: 0.6, format: ImageManipulator.SaveFormat.JPEG}
        );
        setImage(manipResult.uri);
    };

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
        let data = {content, image, type: select?.name ?? '', company: company?.id, community: community?.id}
        switch (select?.name ?? "") {
            
            case 'NEWS':
                data['title'] = title
            case 'PITCH':
                data['video'] = video
                data['pitch_company'] = pitchCompany?.id
                data['website'] = website
                data['problem'] = problem
                data['solution'] = solution
            case 'PROMOTION':
                data['title'] = title
            case 'JOB':
                data['title'] = title
                data['job_company'] = jobCompany?.id
                data['job_type'] = jobType.name
                data['website'] = website
                data['location'] = location
                data['salary_min'] = minSalary
                data['salary_max'] = maxSalary
                data['salary_unit'] = salaryUnit?.name
                data['experience'] = experience
            case 'EVENT':
                data['name'] = title
                data['start_at'] = startDate
                data['end_at'] = endDate
        }
        dispatch(createPost(data)).unwrap()
            .then(res => {
                setContent('')
                setImage(null)
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
                style={[{backgroundColor: theme.colors.surface}, styles.header]}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {navigation.goBack()
                        setSelection("options")
                    }}
                >
                    <View style={{flexDirection:'row'}}>
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
                <View style={{alignItems: "flex-start", flexDirection: "row"}}>
                
                    <Text
                        style={{
                            fontWeight: "bold",
                            // marginLeSft: 12,
                            fontSize: 20,
                            // alignSelf:'center',
                            color: theme.colors.primary,
                        }}
                    >
                        Create
                    </Text>
                </View>
                <View style={{width:'15%'}}/>
                {/* <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={openMenu}
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
                                {select?.value ?? "Select Category"}
                            </Text>
                            <Ionicons
                                name="chevron-down-sharp"
                                color={theme.colors.surface}
                                size={22}
                            />
                        </TouchableOpacity>
                    }
                >
                    {_.filter(postTypes, ({name})=>name!=='DEAL').map(item => (
                        <Menu.Item
                            onPress={() => {
                                setSelect(item);
                                closeMenu();
                            }}
                            title={item.value}
                        />
                    ))}
                </Menu> */}
            </View>
            {(community || company) && (
                <View style={{
                    height: 52,
                    backgroundColor: theme.colors.background,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 12
                }}>
                    <Text numberOfLines={1}>Posting to {community && community.name}{company && company.name}</Text>
                </View>
            )}
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
                    <View style={styles.inputRightContainer}>
                    {selection === "options" && (
                            <View style={{marginHorizontal:'3%'}}>
                                <TouchableOpacity style={{flexDirection:'row',marginVertical:'5%'}} onPress={() => {
                                setSelection("normal");
                                
                            }}>
                                <Image style={{height:50,width:50}} source={require('../../../assets/normal.png')}/>
                                <View style={{marginHorizontal:'3%',alignSelf:'center'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        Post
                                    </Text>
                                    <Text style={{fontSize:14,color:theme.colors.backdrop}}>
                                    Create content, ask questions, etc...
                                    </Text>
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flexDirection:'row',marginVertical:'5%'}} onPress={() => {
                                setSelection("news");}}>
                                <Image style={{height:50,width:50}} source={require('../../../assets/news.png')}/>
                                <View style={{marginHorizontal:'3%',alignSelf:'center'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        News
                                    </Text>
                                    <Text style={{fontSize:14,color:theme.colors.backdrop}}>
                                    Post news that you want to share
                                    </Text>
                                </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                setSelection("pitch");}} style={{flexDirection:'row',marginVertical:'5%'}}>
                                <Image style={{height:50,width:50}} source={require('../../../assets/pitch.png')}/>
                                <View style={{marginHorizontal:'3%',alignSelf:'center'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        Pitch
                                    </Text>
                                    <Text style={{fontSize:14,color:theme.colors.backdrop}}>
                                    Showcase your StartUp
                                    </Text>
                                </View>
                                </TouchableOpacity>

                            </View>
                        )}
                        {selection === "normal" && (
                            <View style={{marginHorizontal:'3%',flex:1}}>
                                
                <View style={{flexDirection:'row',marginVertical:'5%',width:'100%',justifyContent:'space-between',alignItems:'center'}} >
                                <View style={{marginHorizontal:'3%',alignSelf:'center',flexDirection:'row'}}>
                                <Image
                    source={{
                        uri: user?.pic,
                    }}
                    style={{
                        height: 70,
                        width: 70,
                        borderRadius: 75,
                        marginTop: 8,
                        borderColor: theme.colors.disabled,
                        borderWidth: 1,
                    }}
                />
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        {user.fullname}
                                    </Text>
                                    <Text style={{fontSize:14,color:theme.colors.backdrop}}>
                                    {user.title}
                                    </Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={pickMedia} style={{alignSelf:'center',justifyContent:'center',width:50,height:50,borderRadius:10,backgroundColor:theme.colors.primary}}>
                                <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.surface}
                            name="md-camera"
                            size={25}
                        />
                                </TouchableOpacity>
                                </View>
                                <View style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:theme.colors.backdrop,
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        marginVertical:20,
                        
                    }}>
                <TextInput
                    
                    placeholder="What's on your mind?"
                    onChangeText={setContent}
                    // value={username}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 16,color:theme.colors.text,left:5 }}>
            Video
        </Text>
            <View style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:theme.colors.backdrop,
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        marginVertical:5,
                        
                    }}>
                <TextInput
                    
                    placeholder="Paste a Youtube URL"
                    // onChangeText={setUsername}
                    // value={username}
                />
            </View>
            <View style={{marginVertical:'5%',width:'100%',justifyContent:'space-between'}} >
                                <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{marginTop:'3%',flexDirection:'row'}}>
                                <View style={{alignSelf:'center',justifyContent:'center',width:50,height:50,borderRadius:10,backgroundColor:theme.colors.primary}}>
                                <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.surface}
                            name="md-apps-sharp"
                            size={25}
                        />
                                </View>
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        Add Topics
                                    </Text>
                                    
                                    </View>
                                </TouchableOpacity>
                                
                                <View style={{flexDirection:'row'}}>
                                {selectedInterests.map(selectedInterests => (
                                    <TouchableOpacity
                                    activeOpacity={0.9}
                                    // onPress={() => 
                                    //     {setVisible(item.id)
                                    //     setName(item.name)}
                                    // }
                                    // key={item.id.toString()}
                                    style={{
                                        elevation: 1,
                                        height: 40,
                                        // width: 70,
                                        alignItems: "center",
                                        justifyContent:'center',
                                        marginLeft: 12,
                                        marginTop: 10,
                                        paddingHorizontal:20,
                                        paddingVertical:10,
                                        backgroundColor: '#DBDBDB',
                                        borderRadius: 20,
                                    }}
                                >
                                    
                                    <Text numberOfLines={1} style={{alignSelf:'center', color:'#0D5484'}}>
                                        {selectedInterests.name}
                                    </Text>
                                </TouchableOpacity>

                                ))}
                                </View>
                                <TouchableOpacity style={{flexDirection:'row',marginTop:'3%'}}>
                                <View style={{alignSelf:'center',justifyContent:'center',width:50,height:50,borderRadius:10,backgroundColor:theme.colors.primary}}>
                                <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.surface}
                            name="md-person-add"
                            size={25}
                        />
                                </View>
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        Tag Someone
                                    </Text>
                                    
                                    </View>
                                </TouchableOpacity>
                                
                                </View>
                                <RBSheet
                                ref={refRBSheet}
                                height={500}
                                closeOnDragDown={true}
                                closeOnPressMask={false}
                                customStyles={{
                                    wrapper: {
                                        backgroundColor: 'rgba(0,0,0,0.3)'
                                    },
                                    draggableIcon: {
                                        backgroundColor: "#000"
                                    }
                                }}
                                >
        <ScrollView>
        <View style={{flexDirection:'row',marginVertical:'5%',width:'100%',justifyContent:'space-between',alignItems:'center'}} >
                                <View style={{marginHorizontal:'3%',alignSelf:'center',flexDirection:'row'}}>
                                
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        Select Idustry
                                    </Text>
                                    <Text style={{fontSize:14,color:theme.colors.backdrop}}>
                                    What Industry is your content related to?
                                    </Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{alignSelf:'center',justifyContent:'center'}}>
                                <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.surface}
                            name="md-camera"
                            size={25}
                        />
                                </TouchableOpacity>
                                </View>
        <Divider/>
        <View
                    style={{
                        borderRadius: 10,
                        height: '5%',
                        backgroundColor:'#F6F6F6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'90%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        marginVertical:'2%'
                        
                        
                    }}
                    
                >
                    
                <Ionicons name="md-search-outline" style={{alignSelf:'center',marginHorizontal:'2%'}} size={26} color={theme.colors.backdrop}/>
                <TextInput placeholder="Search"
                    placeholderStyle={{  }}
                    // onChangeText={setFullname}
                    // value={fullname} 
                    />
                </View>
                {interests.map(interest => (
                    <List.Item
                    titleStyle={{fontSize: 14,fontWeight: "bold"
                    // ,color: selectedInterests === interest ? '#5C5C5C' : theme.colors.primary
                }}
                        right={() => _.includes(selectedInterests, interest) &&
                            <Ionicons name='checkmark-circle-outline' color={theme.colors.primary} size={24}/>}
                        title={interest.name}
                        onPress={() => _.includes(selectedInterests, interest) ? setSelectedInterests(selectedInterests.filter(item=>item!==interest)) :setSelectedInterests(_.union(selectedInterests, [interest]))}/>
                ))}
        </ScrollView>
      </RBSheet>
      <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: "95%",
                backgroundColor: '#1492E6',
                paddingVertical: 15,
                borderRadius: 10,
                borderColor: '#1492E6',
                borderWidth: 1,
                elevation:2,
                marginVertical:'10%',
                alignSelf:'center'
            }}
            onPress={onPostSubmit}
        >
            <Text
                style={{
                    color: '#FFFFFF',
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                }}
            >
                Post
            </Text>
        </TouchableOpacity>
                                </View>
                        )}

{selection === "pitch" && (
                            <View style={{marginHorizontal:'3%',flex:1}}>
                                <TouchableOpacity
                                onPress={pickMedia}
            activeOpacity={0.9}
            style={{
                width: "95%",
                backgroundColor: '#1492E6',
                paddingVertical: 15,
                borderRadius: 10,
                borderColor: '#1492E6',
                borderWidth: 1,
                elevation:2,
                marginVertical:'10%',
                alignSelf:'center'
            }}
            // onPress={onPostSubmit}
        >
            <Text
                style={{
                    color: '#FFFFFF',
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                }}
            >
                UPLOAD VIDEO
            </Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 14,color:theme.colors.backdrop,left:5 }}>
            Company Name
        </Text>
                                <View style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:theme.colors.backdrop,
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        marginVertical:5,
                        
                    }}>
                <TextInput
                    
                    placeholder="Your Company"
                    onChangeText={setContent}
                    // value={username}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 14,color:theme.colors.backdrop,left:5,marginTop:'5%' }}>
            Company One Liner
        </Text>
                                <View style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:theme.colors.backdrop,
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        marginVertical:5,
                        
                    }}>
                <TextInput
                    
                    placeholder="One Sentence Pitch of Your Company"
                    onChangeText={setContent}
                    // value={username}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 14,color:theme.colors.backdrop,left:5,marginTop:'5%' }}>
            Company Website
        </Text>
                                <View style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:theme.colors.backdrop,
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        marginVertical:5,
                        
                    }}>
                <TextInput
                    
                    placeholder="Your Company Website"
                    onChangeText={setContent}
                    // value={username}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 14,color:theme.colors.backdrop,left:5,marginTop:'5%' }}>
            Problem
        </Text>
                                <View style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:theme.colors.backdrop,
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        marginVertical:5,
                        
                    }}>
                <TextInput
                    
                    placeholder="What Problem are you Solving?"
                    onChangeText={setContent}
                    // value={username}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 14,color:theme.colors.backdrop,left:5,marginTop:'5%' }}>
            Solution
        </Text>
                                <View style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:theme.colors.backdrop,
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        marginVertical:5,
                        
                    }}>
                <TextInput
                    
                    placeholder="What's your solution to the problem?"
                    onChangeText={setContent}
                    // value={username}
                />
            </View>
            <Text style={{ fontWeight: "bold", fontSize: 14,color:theme.colors.backdrop,left:5,marginTop:'5%'}}>
            Traction & Go To Market strategy
        </Text>
                                <View style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:theme.colors.backdrop,
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        marginVertical:5,
                        
                    }}>
                <TextInput
                    
                    placeholder="Share any info You'd like publicity about your growth" 
                    onChangeText={setContent}
                    // value={username}
                />
            </View>
            {/* <Text style={{ fontWeight: "bold", fontSize: 16,color:theme.colors.text,left:5 }}>
            Video
        </Text> */}
           
            <View style={{marginVertical:'5%',width:'100%',justifyContent:'space-between'}} >
                                <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{marginTop:'3%',flexDirection:'row'}}>
                                <View style={{alignSelf:'center',justifyContent:'center',width:50,height:50,borderRadius:10,backgroundColor:theme.colors.primary}}>
                                <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.surface}
                            name="md-apps-sharp"
                            size={25}
                        />
                                </View>
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        Industry
                                    </Text>
                                    
                                    </View>
                                </TouchableOpacity>
                                
                                <View style={{flexDirection:'row'}}>
                                {selectedInterests.map(selectedInterests => (
                                    <TouchableOpacity
                                    activeOpacity={0.9}
                                    // onPress={() => 
                                    //     {setVisible(item.id)
                                    //     setName(item.name)}
                                    // }
                                    // key={item.id.toString()}
                                    style={{
                                        elevation: 1,
                                        height: 40,
                                        // width: 70,
                                        alignItems: "center",
                                        justifyContent:'center',
                                        marginLeft: 12,
                                        marginTop: 10,
                                        paddingHorizontal:20,
                                        paddingVertical:10,
                                        backgroundColor: '#DBDBDB',
                                        borderRadius: 20,
                                    }}
                                >
                                    
                                    <Text numberOfLines={1} style={{alignSelf:'center', color:'#0D5484'}}>
                                        {selectedInterests.name}
                                    </Text>
                                </TouchableOpacity>

                                ))}
                                </View>
                                <TouchableOpacity style={{flexDirection:'row',marginTop:'3%'}}>
                                <View style={{alignSelf:'center',justifyContent:'center',width:50,height:50,borderRadius:10,backgroundColor:theme.colors.primary}}>
                                <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.surface}
                            name="md-person-add"
                            size={25}
                        />
                                </View>
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        Add Co-Founders/Team
                                    </Text>
                                    
                                    </View>
                                </TouchableOpacity>
                                
                                </View>
                                <RBSheet
                                ref={refRBSheet}
                                height={500}
                                closeOnDragDown={true}
                                closeOnPressMask={false}
                                customStyles={{
                                    wrapper: {
                                        backgroundColor: 'rgba(0,0,0,0.3)'
                                    },
                                    draggableIcon: {
                                        backgroundColor: "#000"
                                    }
                                }}
                                >
        <ScrollView>
        <View style={{flexDirection:'row',marginVertical:'5%',width:'100%',justifyContent:'space-between',alignItems:'center'}} >
                                <View style={{marginHorizontal:'3%',alignSelf:'center',flexDirection:'row'}}>
                                
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        Select Idustry
                                    </Text>
                                    <Text style={{fontSize:14,color:theme.colors.backdrop}}>
                                    What Industry is your content related to?
                                    </Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{alignSelf:'center',justifyContent:'center'}}>
                                <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.surface}
                            name="md-camera"
                            size={25}
                        />
                                </TouchableOpacity>
                                </View>
        <Divider/>
        <View
                    style={{
                        borderRadius: 10,
                        height: '5%',
                        backgroundColor:'#F6F6F6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'90%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        marginVertical:'2%'
                        
                        
                    }}
                    
                >
                    
                <Ionicons name="md-search-outline" style={{alignSelf:'center',marginHorizontal:'2%'}} size={26} color={theme.colors.backdrop}/>
                <TextInput placeholder="Search"
                    placeholderStyle={{  }}
                    // onChangeText={setFullname}
                    // value={fullname} 
                    />
                </View>
                {interests.map(interest => (
                    <List.Item
                    titleStyle={{fontSize: 14,fontWeight: "bold"
                    // ,color: selectedInterests === interest ? '#5C5C5C' : theme.colors.primary
                }}
                        right={() => _.includes(selectedInterests, interest) &&
                            <Ionicons name='checkmark-circle-outline' color={theme.colors.primary} size={24}/>}
                        title={interest.name}
                        onPress={() => _.includes(selectedInterests, interest) ? setSelectedInterests(selectedInterests.filter(item=>item!==interest)) :setSelectedInterests(_.union(selectedInterests, [interest]))}/>
                ))}
        </ScrollView>
      </RBSheet>
      <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: "95%",
                backgroundColor: '#1492E6',
                paddingVertical: 15,
                borderRadius: 10,
                borderColor: '#1492E6',
                borderWidth: 1,
                elevation:2,
                marginVertical:'10%',
                alignSelf:'center'
            }}
            onPress={onPostSubmit}
        >
            <Text
                style={{
                    color: '#FFFFFF',
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                }}
            >
                Submit Pitch
            </Text>
        </TouchableOpacity>
                                </View>
                        )}
                        {selection === "news" && (
                            <View style={{marginHorizontal:'3%',flex:1}}>
                                
                <View style={{flexDirection:'row',marginVertical:'5%',width:'100%',justifyContent:'space-between',alignItems:'center'}} >
                                <View style={{marginHorizontal:'3%',alignSelf:'center',flexDirection:'row'}}>
                                <Image
                    source={{
                        uri: user?.pic,
                    }}
                    style={{
                        height: 70,
                        width: 70,
                        borderRadius: 75,
                        marginTop: 8,
                        borderColor: theme.colors.disabled,
                        borderWidth: 1,
                    }}
                />
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        {user.fullname}
                                    </Text>
                                    <Text style={{fontSize:14,color:theme.colors.backdrop}}>
                                    {user.title}
                                    </Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={pickMedia} style={{alignSelf:'center',justifyContent:'center',width:50,height:50,borderRadius:10,backgroundColor:theme.colors.primary}}>
                                <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.surface}
                            name="md-camera"
                            size={25}
                        />
                                </TouchableOpacity>
                                </View>
                                <View style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:theme.colors.backdrop,
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 55,
                        marginVertical:20,
                        
                    }}>
                <TextInput
                    
                    placeholder="News Title"
                    onChangeText={setContent}
                    // value={username}
                />
            </View>
            {/* <Text style={{ fontWeight: "bold", fontSize: 16,color:theme.colors.text,left:5 }}>
            Video
        </Text> */}
            <View style={{
                        borderRadius: 8,
                        height: '70%',
                        borderWidth:1,
                        borderColor:theme.colors.backdrop,
                        alignSelf:'center',
                        fontSize: 16,
                        width:'97%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        height: 110,
                        marginVertical:5,
                        
                    }}>
                <TextInput
                    
                    placeholder="Write your post here..."
                    // onChangeText={setUsername}
                    // value={username}
                />
            </View>
            <View style={{marginVertical:'5%',width:'100%',justifyContent:'space-between'}} >
                                <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{marginTop:'3%',flexDirection:'row'}}>
                                <View style={{alignSelf:'center',justifyContent:'center',width:50,height:50,borderRadius:10,backgroundColor:theme.colors.primary}}>
                                <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.surface}
                            name="md-apps-sharp"
                            size={25}
                        />
                                </View>
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        Add Topics
                                    </Text>
                                    
                                    </View>
                                </TouchableOpacity>
                                
                                <View style={{flexDirection:'row'}}>
                                {selectedInterests.map(selectedInterests => (
                                    <TouchableOpacity
                                    activeOpacity={0.9}
                                    // onPress={() => 
                                    //     {setVisible(item.id)
                                    //     setName(item.name)}
                                    // }
                                    // key={item.id.toString()}
                                    style={{
                                        elevation: 1,
                                        height: 40,
                                        // width: 70,
                                        alignItems: "center",
                                        justifyContent:'center',
                                        marginLeft: 12,
                                        marginTop: 10,
                                        paddingHorizontal:20,
                                        paddingVertical:10,
                                        backgroundColor: '#DBDBDB',
                                        borderRadius: 20,
                                    }}
                                >
                                    
                                    <Text numberOfLines={1} style={{alignSelf:'center', color:'#0D5484'}}>
                                        {selectedInterests.name}
                                    </Text>
                                </TouchableOpacity>

                                ))}
                                </View>
                                <TouchableOpacity style={{flexDirection:'row',marginTop:'3%'}}>
                                <View style={{alignSelf:'center',justifyContent:'center',width:50,height:50,borderRadius:10,backgroundColor:theme.colors.primary}}>
                                <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.surface}
                            name="md-person-add"
                            size={25}
                        />
                                </View>
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        Tag Someone
                                    </Text>
                                    
                                    </View>
                                </TouchableOpacity>
                                
                                </View>
                                <RBSheet
                                ref={refRBSheet}
                                height={500}
                                closeOnDragDown={true}
                                closeOnPressMask={false}
                                customStyles={{
                                    wrapper: {
                                        backgroundColor: 'rgba(0,0,0,0.3)'
                                    },
                                    draggableIcon: {
                                        backgroundColor: "#000"
                                    }
                                }}
                                >
        <ScrollView>
        <View style={{flexDirection:'row',marginVertical:'5%',width:'100%',justifyContent:'space-between',alignItems:'center'}} >
                                <View style={{marginHorizontal:'3%',alignSelf:'center',flexDirection:'row'}}>
                                
                                
                                    <View style={{alignSelf:'center',marginHorizontal:'8%'}}>
                                    <Text style={{fontSize:16,fontWeight:'700',color:theme.colors.text}}>
                                        Select Idustry
                                    </Text>
                                    <Text style={{fontSize:14,color:theme.colors.backdrop}}>
                                    What Industry is your content related to?
                                    </Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{alignSelf:'center',justifyContent:'center'}}>
                                <Ionicons
                        style={{alignSelf:'center'}}
                            color={theme.colors.surface}
                            name="md-camera"
                            size={25}
                        />
                                </TouchableOpacity>
                                </View>
        <Divider/>
        <View
                    style={{
                        borderRadius: 10,
                        height: '5%',
                        backgroundColor:'#F6F6F6',
                        alignSelf:'center',
                        fontSize: 16,
                        width:'90%',
                        paddingHorizontal: 5,
                        flexDirection:'row',
                        marginVertical:'2%'
                        
                        
                    }}
                    
                >
                    
                <Ionicons name="md-search-outline" style={{alignSelf:'center',marginHorizontal:'2%'}} size={26} color={theme.colors.backdrop}/>
                <TextInput placeholder="Search"
                    placeholderStyle={{  }}
                    // onChangeText={setFullname}
                    // value={fullname} 
                    />
                </View>
                {interests.map(interest => (
                    <List.Item
                    titleStyle={{fontSize: 14,fontWeight: "bold"
                    // ,color: selectedInterests === interest ? '#5C5C5C' : theme.colors.primary
                }}
                        right={() => _.includes(selectedInterests, interest) &&
                            <Ionicons name='checkmark-circle-outline' color={theme.colors.primary} size={24}/>}
                        title={interest.name}
                        onPress={() => _.includes(selectedInterests, interest) ? setSelectedInterests(selectedInterests.filter(item=>item!==interest)) :setSelectedInterests(_.union(selectedInterests, [interest]))}/>
                ))}
        </ScrollView>
      </RBSheet>
      <TouchableOpacity
            activeOpacity={0.9}
            style={{
                width: "95%",
                backgroundColor: '#1492E6',
                paddingVertical: 15,
                borderRadius: 10,
                borderColor: '#1492E6',
                borderWidth: 1,
                elevation:2,
                marginVertical:'10%',
                alignSelf:'center'
            }}
            onPress={onPostSubmit}
        >
            <Text
                style={{
                    color: '#FFFFFF',
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center",
                }}
            >
                Post
            </Text>
        </TouchableOpacity>
                                </View>
                        )}



                        {/* {select && select.name === "NEWS" && (
                            <View>
                                <ContentInput content={title} setContent={setTitle} placeholder='News Title'/>
                                <Divider/>
                                <ContentInput content={content} setContent={setContent} minHeight={100}/>

                            </View>
                        )}
                        {select && select.name === "PITCH" && (
                            <View>
                                <Button onPress={() => pickMedia('video')} mode={'contained'}>Upload Pitch
                                    Video</Button>
                                {video &&
                                <Video
                                    style={{
                                        alignSelf: 'center',
                                        width: 320,
                                        height: 200,
                                        marginVertical: 10
                                    }}
                                    source={{
                                        uri: video,
                                    }}
                                    ref={videoRef}
                                    useNativeControls
                                    resizeMode="contain"
                                    isLooping
                                    onPlaybackStatusUpdate={status => setStatus(() => status)}

                                />}
                                {video && (
                                    <Button
                                    onPress={() =>
                                    status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()
                                }
                                    >{status.isPlaying ? 'Pause' : 'Play'}</Button>
                                    )}

                                {///////////////// todo display video here & option to delete}
                                <Divider/>
                                <Picker
                                    text={pitchCompany?.name ?? "Select Company"}
                                    theme={theme}
                                    items={myCompanies}
                                    onSelect={setPitchCompany}
                                />

                                <Divider/>
                                <ContentInput content={content}
                                              setContent={setContent}
                                              placeholder='Describe in brief'
                                              minHeight={100}/>
                                <Divider/>
                                <ContentInput content={website} setContent={setWebsite} placeholder='Enter Website'/>
                                <Divider/>
                                <ContentInput content={problem}
                                              setContent={setProblem}
                                              placeholder='Problem statement'
                                              minHeight={100}/>
                                <Divider/>
                                <ContentInput content={solution}
                                              setContent={setSolution}
                                              placeholder='Solution statement'
                                              minHeight={100}/>

                            </View>
                        )}

                        {select && select.name === "JOB" && (
                            <View>
                                <ContentInput content={title} setContent={setTitle} placeholder='Enter Job Title'/>
                                <Divider/>
                                <Picker
                                    text={jobCompany?.name ?? "Select Company"}
                                    theme={theme}
                                    items={myCompanies}
                                    onSelect={setJobCompany}
                                />
                                <Divider/>
                                <Picker
                                    text={jobType?.value ?? "Select Job Type"}
                                    theme={theme}
                                    items={postJobTypes}
                                    onSelect={setJobType}
                                />

                                <Divider/>
                                <ContentInput content={content} setContent={setContent} placeholder='Job Description' minHeight={100}/>
                                <Divider/>
                                <ContentInput content={website}
                                              setContent={setWebsite}
                                              placeholder='Enter Website Link'/>
                                <Divider/>
                                <ContentInput content={location} setContent={setLocation} placeholder='Job Location'/>
                                <Divider/>
                                <ContentInput content={minSalary} setContent={setMinSalary} placeholder='Min Salary'/>
                                <Divider/>
                                <ContentInput content={maxSalary} setContent={setMaxSalary} placeholder='Max Salary'/>
                                <Divider/>
                                <Picker
                                    text={salaryUnit?.value ?? "Select Salary Unit"}
                                    theme={theme}
                                    items={postJobSalaryUnits}
                                    onSelect={setSalaryUnit}
                                />
                                <ContentInput content={experience}
                                              setContent={setExperience}
                                              placeholder='Experience required (years)'/>
                            </View>
                        )}

                        {select && select.name === "EVENT" && (
                            <View>
                                <ContentInput content={title} setContent={setTitle} placeholder='Event Title'/>
                                <Divider/>
                                <ContentInput content={content}
                                              setContent={setContent}
                                              placeholder='Event Description'
                                minHeight={100}
                                />
                                <Divider/>
                                <ContentInput content={startDate}
                                              setContent={setStartDate}
                                              placeholder='Event Start Datetime'/>
                                <Divider/>
                                <ContentInput content={endDate}
                                              setContent={setEndDate}
                                              placeholder='Event End Datetime'/>
                            </View>
                        )}

                        {select && select.name === "PROMOTION" && (
                            <View>
                                <ContentInput content={title} setContent={setTitle} placeholder='Promotion Title'/>
                                <Divider/>
                                <ContentInput content={content} setContent={setContent} placeholder='Write post here'/>
                            </View>
                        )}

                        
                        {!select || select?.name === "NORMAL" && (
                            <ContentInput content={content} setContent={setContent}/>
                            // <View/>
                        )} */}

                        {/*<ContentInput content={content} setContent={setContent}/>*/}
                        {/*<View>*/}

                        <SingleImageViewer uri={image} setImage={setImage}/>
                    </View>
                </View>
            </KeyboardAwareScrollView>

            
            {/* <Animated.View
                style={{bottom: keyboardOffset, position: "absolute", width: "100%"}}
            >
                <View>
                    <Card.Actions style={{backgroundColor: theme.colors.surface}}>
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
                                    image
                                        ? theme.colors.disabled
                                        : theme.colors.primary
                                }
                            />
                        </TouchableRipple>
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

                        <View style={{flex: 1}}/>
                        <Text style={{color: theme.colors.disabled, marginRight: 4}}>
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
            </Animated.View> */}
        </View>
    );
};

export default PostCreate;

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
    inputContainer: {flexDirection: "row", paddingHorizontal: 4, padding: 16, flex: 1},
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
    }
});
