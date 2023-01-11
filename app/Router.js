import React from "react";
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
    DefaultTheme as PaperDefaultTheme,
    Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Host} from 'react-native-portalize';
import {Ionicons} from "@expo/vector-icons";
import {navigationRef} from "./api/helper";
import {enableScreens} from "react-native-screens";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import FlashMessage from "react-native-flash-message";
import {StatusBar} from 'expo-status-bar';
import {
    Home,
    Post, PostCreate,
    Profile, ProfileOther, Drawer, ProfileUpdate, FollowerList,
    Settings, SIWebView,
    News, NewsDetails,
    CommunityPostCreate,
    Company, OtherCompany, CompanyCreate, CompanyUpdate,
    CommunityExplore, Community, MemberList, RequestList, CommunityList, CommunityCreate, CommunityUpdate,
    Chats, ChatDetail,
    Explore, Search,
    Login, Signup, PostByType
} from "./screens";
// import ImageGrid from "./components/ImageGrid";
import {useSelector} from "react-redux";

enableScreens();

let CombinedTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);

CombinedTheme = {
    ...CombinedTheme,
    colors: {
        ...CombinedTheme.colors,
        primary: '#039be5',
        accent: '#ff4f89',
        highlight: `rgba(25, 208, 180, 0.16)`
    }
}

const BottomTabs = createBottomTabNavigator();

const CoreStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const BottomTabsScreen = () => (
    <BottomTabs.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarHideOnKeyboard:true,
            tabBarStyle: { height: '7%' }
            
        }}
    >
        <BottomTabs.Screen
            key={"feed"}
            name="HOME"
            component={Home}
            options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Ionicons name="md-grid-outline" size={26} color={color}/>
                )
            }}
        />
        <BottomTabs.Screen
            key={"explore"}
            name="EXPLORE"
            component={Explore}
            options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Ionicons name="md-compass-outline" size={30} color={color}/>
                ),
            }}
        />
        <BottomTabs.Screen
            key={"create"}
            name="CREATE"
            component={PostCreate}
            options={{
                // tabBarItemStyle:{elevation:10,backgroundColor:},
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Ionicons name="add-circle" size={60} style={{textShadowOffset:{width:5, height:5},
                    shadowColor:'black',
                    
                    shadowOpacity:0.7}}  color={CombinedTheme.colors.primary}/>
                ),
            }}
        />
        <BottomTabs.Screen
            key={"chats"}
            name="CHATS"
            component={Chats}
            options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Ionicons name="md-chatbox-outline" size={26} color={color}/>
                ),
            }}
        />
        <BottomTabs.Screen
            key={"profile"}
            name="PROFILE"
            component={Profile}
            options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Ionicons name="md-person-outline" size={26} color={color}/>
                ),
            }}
        />

    </BottomTabs.Navigator>
)

const CoreStackScreen = () => (
    <CoreStack.Navigator
        initialRouteName={'BOTTOM_TABS'}
        screenOptions={{
            headerBackTitle: 'Back',
            stackAnimation: 'slide_from_right'
        }}
        mode="modal">

        <AuthStack.Screen
            name="SIGNUP"
            component={Signup}
            options={{headerShown: false}}
        />

        <CoreStack.Screen
            name="BOTTOM_TABS"
            component={BottomTabsScreen}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="POST"
            component={Post}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="POST_CREATE"
            component={PostCreate}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="NEWS"
            component={News}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="NEWS_DETAILS"
            component={NewsDetails}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="COMMUNITY_EXPLORE"
            component={CommunityExplore}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="COMMUNITY"
            component={Community}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="MEMBER_LIST"
            component={MemberList}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="REQUEST_LIST"
            component={RequestList}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="COMMUNITY_LIST"
            component={CommunityList}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="COMMUNITY_UPDATE"
            component={CommunityUpdate}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="COMMUNITY_CREATE"
            component={CommunityCreate}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="COMMUNITY_POST_CREATE"
            component={CommunityPostCreate}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="COMPANY"
            component={Company}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="OTHER_COMPANY"
            component={OtherCompany}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="COMPANY_CREATE"
            component={CompanyCreate}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="COMPANY_UPDATE"
            component={CompanyUpdate}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="SEARCH"
            component={Search}
            options={{title: 'Search Anything'}}
        />
        <CoreStack.Screen
            name="CHAT_DETAIL"
            component={ChatDetail}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="PROFILE_OTHER"
            component={ProfileOther}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="DRAWER"
            component={Drawer}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="FOLLOWER_LIST"
            component={FollowerList}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="PROFILE_UPDATE"
            component={ProfileUpdate}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="SETTINGS"
            component={Settings}
            options={{headerShown: false}}
        />
        <CoreStack.Screen
            name="SI_WEBVIEW"
            component={SIWebView}
        />
        <CoreStack.Screen
            name="POST_TYPE"
            component={PostByType}
            options={{headerShown: false}}
        />
        {/* <CoreStack.Screen
            name="POST_TYPE"
            component={PostByType}
            options={{headerShown: false}}
        /> */}
    </CoreStack.Navigator>
)

const AuthStackScreen = () => (
    <AuthStack.Navigator
        initialRouteName={"BOTTOM_TABS"}
        screenOptions={{
            headerBackTitle: "Back",
            stackAnimation: "slide_from_right",
        }}
        mode="modal"
    >
        <AuthStack.Screen
            name="LOGIN"
            component={Login}
            options={{headerShown: false}}
        />
    </AuthStack.Navigator>
);


export default () => {
    const {user} = useSelector(({auth}) => auth)
    return (
        <PaperProvider theme={CombinedTheme}>
            <NavigationContainer theme={CombinedTheme} ref={navigationRef}>
                <FlashMessage
                    style={{
                        margin: 0,
                        paddingTop: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    floating={false} icon='auto' titleStyle={{fontSize: 16}} position='top'/>
                <StatusBar backgroundColor='#fff' />
                <Host>
                    {user === null ? <AuthStackScreen/> : user.signup_step===0 ? <CoreStackScreen/> : <Signup/>}
                </Host>
            </NavigationContainer>
        </PaperProvider>
    );
};
