import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IOfficialBulletin, RootStackParamList } from "../types";
import { ItemContext } from "../Context/context";
import { ItemContextType, IItem } from "../types";
import { useContext } from "react";
import { ListNode, DoublyLinkedList } from "../helper";
import { useAuth } from "../Context/AuthContext";

type OfficialBulletinsDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "OfficialBulletinsDetails"
>;

const API_URL = "http://172.19.159.72:5143/api/bulletins/official";

export default function OfficialBulletinsDetailsScreen({
  navigation,
  route,
}: OfficialBulletinsDetailsScreenProps) {
  const context = useContext(ItemContext);
  const { token, role } = useAuth();

  if (!context) {
    return <Text> Loading....</Text>;
  }
  const {
    officialBulletins,
    officialBulletinList,
    deleteOfficialBulletins,
    loadingOfficial,
  } = context;
  const { item } = route.params as {item: IOfficialBulletin};
  const currentNode = officialBulletinList.getNodeById(item.id);

  const deleteItem = async (idToDelete: string) => {
    try {
      const response = await fetch(`${API_URL}/${idToDelete}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,  // <-- Add this line
      },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log(`Item with ID ${idToDelete} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }

    deleteOfficialBulletins(idToDelete);
    navigation.navigate("OfficialBulletinsSummary");
  };

  const handleNavigate = (node: ListNode) => {
    navigation.replace("OfficialBulletinsDetails", {
      item: {
        id: node.id,
        title: node.title,
        createdAt: node.datetime.toISOString(),
        content: node.content,
      },
    });
  };

  if (loadingOfficial) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <Text>Official bulletin details</Text>

      {/* 
      <Text>{item.datetime.toDateString()}</Text> */}

      <Text>{new Date(item.createdAt).toDateString()}</Text>

      <Text>{item.id}</Text>
      <Text> {item.title}</Text>

      {token && role === "Administrator" && (
        <Button
          title="Edit"
          onPress={() => navigation.navigate("EditOfficial", { item })}
        />
      )}

      {token && role === "Administrator" && (
        <Button
          title="Delete"
          onPress={() => {
            deleteItem(item.id);
          }}
        />
      )}

      <Button
        title="Previous"
        disabled={!currentNode || !currentNode.prev}
        onPress={() => currentNode?.prev && handleNavigate(currentNode.prev)}
      />
      <Button
        title="Next"
        disabled={!currentNode || !currentNode.next}
        onPress={() => currentNode?.next && handleNavigate(currentNode.next)}
      />
    </View>
  );
}
