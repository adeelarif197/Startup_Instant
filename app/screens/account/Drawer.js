import React, { useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme, Appbar, List, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../store/slices/authSlice";
import { WebView } from "react-native-webview";
import {
  getCommunities,
  selectOwnedCommunities,
} from "../../store/slices/communitiesSlice";
import { navigate } from "../../api/helper";
import {
  getCompanies,
  selectOwnedCompanies,
} from "../../store/slices/companiesSlice";

const Drawer = (props) => {
  const dispatch = useDispatch();

  const ownedCommunities = useSelector(selectOwnedCommunities);
  const ownedCompanies = useSelector(selectOwnedCompanies);

  useEffect(() => {
    dispatch(getCommunities({ params: { owned: true }, from: "owned" }));
    dispatch(getCompanies({ params: { owned: true }, from: "owned" }));
  }, []);

  const handlePrivacy = () => {
    return navigate("SI_WEBVIEW", {
      url: "https://medium.com/@aaryansingh590/startup-instant-privacy-policy-1860fff7fcad",
    });
  };

  const handleLogout = () => {
    dispatch(onLogout());
  };

  const theme = useTheme();
  const { width } = Dimensions.get("window");
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.surface, elevation: 2 }}
      >
        <Appbar.BackAction color={theme.colors.primary} onPress={() => props.navigation.goBack()} />
        <Appbar.Content titleStyle={{color:theme.colors.primary}} title="Settings" />
      </Appbar.Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: theme.colors.surface }}
      >
        <Divider />
        <View style={{ margin: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{color:theme.colors.backdrop, fontSize: 16, fontWeight: "bold" }}>My company</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => props.navigation.push("COMPANY_CREATE")}
              style={{
                backgroundColor: theme.colors.primary,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                elevation:5
              }}
            >
              <Text style={{ color: theme.colors.surface }}>Create</Text>
            </TouchableOpacity>
          </View>
          {ownedCompanies?.map((item) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigate("COMPANY", { company: item })}
            >
              <Text style={{ marginTop: 8, fontSize: 16 }}>{item.name}..</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Divider />
        <View style={{ margin: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{color:theme.colors.backdrop, fontSize: 16, fontWeight: "bold" }}>
              My community
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => props.navigation.push("COMMUNITY_CREATE")}
              style={{
                backgroundColor: theme.colors.primary,
                
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                elevation:5
              }}
            >
              <Text style={{ color: theme.colors.surface }}>Create</Text>
            </TouchableOpacity>
          </View>
          {ownedCommunities?.map((item) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigate("COMMUNITY", { community: item })}
            >
              <Text style={{ marginTop: 8, fontSize: 16 }}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Divider />
        <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin:12
            }}
          >
            <Text style={{color:theme.colors.backdrop, fontSize: 16, fontWeight: "bold",
                paddingVertical: 10,
                borderRadius: 10 }}>
            <Ionicons style={{marginRight:5}}color={theme.colors.backdrop} name="md-bookmark-outline" size={22} />
              Saved Items
            </Text>
            <View/>
          </View>
        
        <Divider />
        <View style={{ margin: 12 }}>
          <Text style={{color:theme.colors.backdrop, fontSize: 16, fontWeight: "bold" }}>About</Text>
          <TouchableOpacity activeOpacity={0.9} onPress={handlePrivacy}>
            <Text style={{color:theme.colors.backdrop, marginTop: 8, fontSize: 14 }}>Privacy policy</Text>
          </TouchableOpacity>
        </View>
        <Divider />
        <TouchableOpacity
          activeOpacity={1}
          style={{paddingVertical: 10, margin: 12, flexDirection: "row", alignItems: "center" }}
          onPress={handleLogout}
        >
          <Ionicons color={theme.colors.backdrop} name="md-power" size={22} />
          <Text style={{color:theme.colors.backdrop, fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>
            Sign out
          </Text>
        </TouchableOpacity>
        <Divider />
        <View style={{ marginTop: 26, alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Startup Instant
          </Text>
          <Text style={{fontSize: 16, marginTop: 5 ,color:theme.colors.primary}}>V 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Drawer;
