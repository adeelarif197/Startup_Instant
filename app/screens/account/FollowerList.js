import React from "react";
import { View, FlatList } from "react-native";
import { Appbar, useTheme, Divider } from "react-native-paper";
import UserListItem from "../../components/users/UserListItem";

const FollowerList = (props) => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        style={{ backgroundColor: theme.colors.surface, elevation: 2 }}
      >
        <Appbar.BackAction onPress={() => props.navigation.goBack()} />
        <Appbar.Content title="UserListItem" />
      </Appbar.Header>
      <View style={{marginBottom: 90}}>
        <FlatList
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <UserListItem />}
          keyExtractor={(item) => item + ""}
          ItemSeparatorComponent={() => <Divider />}
        />
      </View>
    </View>
  );
};

export default FollowerList;
