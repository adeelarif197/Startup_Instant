import React, {useEffect, useState} from "react";
import {TextInput, View} from "react-native";
import {Divider, Headline, ProgressBar, Text, Title, useTheme} from "react-native-paper";
import {MaterialTabBar, Tabs} from "react-native-collapsible-tab-view";
import PostItem from "../../components/PostItem";
import {useDispatch, useSelector} from "react-redux";
import {getUsers, selectSearchUsers} from "../../store/slices/usersSlice";
import UserListItem from "../../components/users/UserListItem";
import {getCommunities, selectSearchCommunities} from "../../store/slices/communitiesSlice";
import CommunityListItem from "../../components/CommunityListItem";
import {getCompanies, selectSearchCompanies} from "../../store/slices/companiesSlice";
import CompanyListItem from "../../components/company/CompanyListItem";

const Search = (props) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const users = useSelector(selectSearchUsers)
    const communities = useSelector(selectSearchCommunities)
    const companies = useSelector(selectSearchCompanies)

    const nextUsers = useSelector(({users})=>users.search?.next)
    const nextCommunities = useSelector(({communities})=>communities.search?.next)
    const nextCompanies = useSelector(({companies})=>companies.search?.next)

    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        console.log(search)
        fetchUsers()
        fetchCommunities()
        fetchCompanies()
    }, [search])

    const fetchUsers = (url = null) => {

        if (search !== "") {
            setLoading(true)
            url ?? setRefreshing(true);
            dispatch(getUsers({url, params: {search, limit: 30}, from: 'search'}))
                .unwrap()
                .then(() => {
                    setRefreshing(false)
                    setLoading(false)
                })
                .catch(() => {
                    setRefreshing(false)
                    setLoading(false)
                });
        }
    }

    const fetchCommunities = (url = null) => {
        if (search !== "") {
            setLoading(true)
            url ?? setRefreshing(true);
            dispatch(getCommunities({url, params: {search, limit: 30}, from: 'search'}))
                .unwrap()
                .then(() => {
                    setRefreshing(false)
                    setLoading(false)
                })
                .catch(() => {
                    setRefreshing(false)
                    setLoading(false)
                });
        }
    }

    const fetchCompanies = (url = null) => {
        if (search !== "") {
            setLoading(true)
            url ?? setRefreshing(true);
            dispatch(getCompanies({url, params: {search, limit: 30}, from: 'search'}))
                .unwrap()
                .then(() => {
                    setRefreshing(false)
                    setLoading(false)
                })
                .catch(() => {
                    setRefreshing(false)
                    setLoading(false)
                });
        }
    }


    const Header = () => (
        <View style={{backgroundColor: theme.colors.background}}>
            <TextInput
                style={{
                    backgroundColor: theme.colors.surface,
                    padding: 12,
                    borderRadius: 8,
                    margin: 12
                }}
                value={search}
                onChangeText={setSearch}
                placeholder='Search'
                autoFocus
            />
        </View>
    )

    return (
        <View style={{flex: 1, justifyContent: 'flex-start'}}>

            <Tabs.Container
                tabBarHeight={48}
                renderHeader={Header}
                renderTabBar={(props) => (
                    <MaterialTabBar
                        {...props}
                        scrollEnabled
                        style={{
                            backgroundColor: theme.colors.background,
                            color: theme.colors.text,
                            borderRadius: 8,
                        }}
                        labelStyle={{
                            color: theme.colors.text,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                        indicatorStyle={{backgroundColor: theme.colors.primary}}
                    />
                )}
            >
                <Tabs.Tab name="Users" label='Users'>
                    <Tabs.FlatList
                        data={users}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <UserListItem user={item}/>}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <Divider/>}
                        onEndReachedThreshold={0.8}
                        ListHeaderComponent = {<ProgressBar indeterminate visible={loading}/>}
                        onEndReached={()=>nextUsers && fetchUsers(nextUsers)}
                        onRefresh={fetchUsers}
                        refreshing={refreshing}
                    />
                </Tabs.Tab>
                <Tabs.Tab name="Communities" label='Communities'>
                    <Tabs.FlatList
                        data={communities}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <CommunityListItem community={item}/>}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <Divider/>}
                        onEndReachedThreshold={0.8}
                        ListHeaderComponent = {<ProgressBar indeterminate visible={loading}/>}
                        onEndReached={()=>nextCommunities && fetchUsers(nextCommunities)}
                        onRefresh={fetchCommunities}
                        refreshing={refreshing}
                    />
                </Tabs.Tab>
                <Tabs.Tab name="Companies" label='Companies'>
                    <Tabs.FlatList
                        data={companies}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <CompanyListItem company={item}/>}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <Divider/>}
                        onEndReachedThreshold={0.8}
                        ListHeaderComponent = {<ProgressBar indeterminate visible={loading}/>}
                        onEndReached={()=>nextCompanies && fetchUsers(nextCompanies)}
                        onRefresh={fetchCompanies}
                        refreshing={refreshing}
                    />
                </Tabs.Tab>
            </Tabs.Container>
        </View>
    )
}

export default Search;