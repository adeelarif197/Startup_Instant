import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {navigate} from "../../api/helper";
import CommunityCard from "../../components/CommunityCard";
import React from "react";
import {useSelector} from "react-redux";
import {selectCommunitiesByCategory} from "../../store/slices/communitiesSlice";

const CommunitiesListHorizontal = ({category}) => {
    const communities = useSelector((state) => selectCommunitiesByCategory(state, category.id));

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginHorizontal: 12,
                    marginTop: 10
                }}
            >
                <Text style={{fontWeight: "bold", fontSize: 18}}>
                    {category.name}
                </Text>
                <Text onPress={() => navigate("COMMUNITY_LIST", {category})}>
                    See all
                </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {communities.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.9}
                        onPress={() => navigate("OTHER_COMMUNITY")}
                    >
                        <CommunityCard community={item}/>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>

    )
}

export default CommunitiesListHorizontal;