import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useContext } from "react";
import { ItemContext } from "../Context/context";
import TabMenu from "../tabs";
import { IItem, ItemContextType } from "../types";
import { Trie, TrieNode } from "../Trie";
import { useAuth } from "../Context/AuthContext";
import { MemberBulletinCategory } from "../types";



const categoryEnumMap: Record <string, number> ={
  Interest: MemberBulletinCategory.Interest,
  Event:  MemberBulletinCategory.Event,
  Update:  MemberBulletinCategory.Update,
};

const API_URL = "http://192.168.1.244:5143/api/bulletins/member";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "MemberBulletinSummary"
>;

const MemberBulletinSummary: React.FC<Props> = ({ navigation }) => {
  const context = useContext(ItemContext);
  const loadingOfficial = context?.loadingOfficial;

  const tabs = ["Interest", "Event", "Update"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState<string[]>([]);

  if (!context) {
    return <Text> Loading ...</Text>;
  }

  //const { bulletins, loadingMember } = context;

  const [bulletins, setBulletins] = useState<IItem[]>([]);

  //const { bulletins, loadingMember } = context;
  const { loadingMember } = context;

  // const [loading, setLoading] = useState(true);

  const [trie, setTrie] = useState<Trie>(new Trie());
  const { token, role } = useAuth();

  console.log("token:", token, "role:", role);

  useEffect(() => {
    const newTrie = new Trie();
    bulletins.forEach((bulletin) => newTrie.insert(bulletin.title));
    setTrie(newTrie);
  }, [bulletins]);

  useEffect(() => {
    if (input.length > 0) {
      setSuggestion(trie.suggest(input));
    } else {
      setSuggestion([]);
    }
  }, [input]);

  useFocusEffect(
    useCallback(() => {
      console.log("Token at fetch time:", token);
      if (!token) {
        //setLoading(false); // stop loading if no token
        return; // skip fetch if token is not available yet
      }

      //setLoading(true);

      const fetchData = async (): Promise<void> => {
        console.log("Token:", token);

        try {
          //const response = await fetch(API_URL);
          const response = await fetch(API_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await response.json();
          if (result.data) {
            setBulletins(result.data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          //setLoading(false);
        }
      };

      fetchData();
    }, [token])
  );

  const selectedTabIndex = categoryEnumMap [selectedTab];
    //MemberBulletinCategory[selectedTab as keyof typeof MemberBulletinCategory];
  const filteredBulletins = bulletins.filter(
    (item) =>
      categoryEnumMap[item.category] === selectedTabIndex &&
      (input.length === 0 ||
        item.title.toLowerCase().includes(input.toLowerCase()))
  );

  const findBulletinByTitle = (title: string) =>
    bulletins.find((b) => b.title === title);

  const renderSuggestions = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => {
        setInput(item);
        setSuggestion([]);
        const bulletin = findBulletinByTitle(item);
        if (bulletin) {
          navigation.navigate("MemberBulletinDetails", { item: bulletin });
        }
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: IItem }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("MemberBulletinDetails", { item })}
    >
      <View>
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loadingMember) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TabMenu
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <TextInput
        placeholder="Search bulletins"
        value={input}
        onChangeText={setInput}
      />

      {suggestion.length > 0 ? (
        <FlatList
          data={suggestion}
          keyExtractor={(item) => item}
          renderItem={renderSuggestions}
        />
      ) : (
        <FlatList
          data={filteredBulletins}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      {token && (role === "Member" || role === "Administrator") && (
        <Button title="Add" onPress={() => navigation.navigate("Add")} />
      )}
    </View>
  );
};

export default MemberBulletinSummary;
