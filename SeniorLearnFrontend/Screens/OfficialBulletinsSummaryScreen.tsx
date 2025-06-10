import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IOfficialBulletin, RootStackParamList } from "../types";
import { useContext } from "react";
import { ItemContext } from "../Context/context";
import TabMenu from "../tabs";
import { IItem, ItemContextType } from "../types";
import { useAuth } from "../Context/AuthContext";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "OfficialBulletinsSummary"
>;

const API_URL = "http://172.19.159.72:5143/api/bulletins/official";

const OfficialBulletinsSummary: React.FC<Props> = ({ navigation }) => {
  const context = useContext(ItemContext);
  const { token, role } = useAuth();
  const [officialBulletins, setOfficialBulletins] = useState<
    IOfficialBulletin[]
  >([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched items:", data);
        setOfficialBulletins(data.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, [token]);

  if (!context) {
    return (
      <View>
        <Text>Loading context ...</Text>
      </View>
    );
  }

  //const { officialBulletins, loadingOfficial } = context;

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  interface GroupedOfficialBulletins {
    today: IOfficialBulletin[];
    earlier: IOfficialBulletin[];
  }

  const intitalGrouping: GroupedOfficialBulletins = {
    today: [],
    earlier: [],
  };

  const bulletinsToSort: IOfficialBulletin[] = officialBulletins;

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const groupBulletinsBehaviour = (
    acc: GroupedOfficialBulletins,
    currentObj: IOfficialBulletin
  ): GroupedOfficialBulletins => {
    if (isToday(new Date(currentObj.createdAt))) {
      acc.today.push(currentObj);
    } else {
      acc.earlier.push(currentObj);
    }
    return acc;
  };

  const bulletinsGroupedByDate = bulletinsToSort.reduce(
    groupBulletinsBehaviour,
    intitalGrouping
  );

  const todayBulletins = bulletinsGroupedByDate.today.sort(
    (a: IOfficialBulletin, b: IOfficialBulletin) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const earlierBulletins = bulletinsGroupedByDate.earlier.sort(
    (a: IOfficialBulletin, b: IOfficialBulletin) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const renderItem = ({ item }: { item: IOfficialBulletin }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("OfficialBulletinsDetails", { item })}
    >
      <View>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1 }}>
      <Text>Today's bulletins</Text>
      <FlatList
        data={todayBulletins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No bulletins from today</Text>}
      />

      <Text>Earlier bulletins</Text>
      <FlatList
        data={earlierBulletins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No bulletins</Text>}
      />

      {token && role === "Administrator" && (
        <Button
          title="Add"
          onPress={() => navigation.navigate("AddOfficial")}
        />
      )}
    </View>
  );
};

export default OfficialBulletinsSummary;

/*   const tabs = [1, 2, 3];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  if (!context) {
    return <Text> Loading ...</Text>;
  }

    const { bulletins } = context;

    const filteredBulletins = bulletins.filter((item) => item.type === selectedTab)

  const renderItem = ({ item }: { item: { id: string; title: string; type: number } }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("MemberBulletinDetails", { item })}
    >
      <View>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
   <View style={{ flex: 1 }}>
<TabMenu tabs = {tabs} selectedTab = {selectedTab} setSelectedTab = {setSelectedTab}/>

<FlatList
data = {filteredBulletins}
renderItem = {renderItem}
keyExtractor = {(item) => item.id}/>

 <Button title="Add" onPress={() => navigation.navigate("Add")} />


    </View>
  )
}


export default OfficialBulletinsSummary; */
