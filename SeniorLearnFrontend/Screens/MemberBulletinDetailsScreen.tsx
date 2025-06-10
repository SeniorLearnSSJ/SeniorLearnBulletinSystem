import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { ItemContext } from "../Context/context";
import { ItemContextType, IItem } from "../types";
import { useContext } from "react";
import { useAuth } from "../Context/AuthContext";

const API_URL = "http://172.19.159.72:5143/api/bulletins/member";

type MemberBulletinDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "MemberBulletinDetails"
>;

export default function MemberBulletinDetailsScreen({
  navigation,
  route,
}: MemberBulletinDetailsScreenProps) {
  const context = useContext(ItemContext);
  const { token, role } = useAuth();

  if (!context) {
    return <Text> Loading....</Text>;
  }
  const { bulletins, deleteBulletin, loadingMember } = context;
  const { item } = route.params;

  const deleteItem = async (idToDelete: string) => {
    try {
      const response = await fetch(`${API_URL}/${idToDelete}`, {
        method: "DELETE",

        headers: {
        Authorization: `Bearer ${token}`, // <-- Add this header
      },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      console.log(`Item with ID ${idToDelete} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }

    deleteBulletin(idToDelete);
    navigation.navigate("MemberBulletinSummary");
  };

  if (loadingMember) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <Text>Member bulletin details</Text>

      <Text>{item.category}</Text>
      <Text>{item.id}</Text>
      <Text> {item.title}</Text>

      {token && (role === "Member" || role === "Administrator") && (
        <Button
          title="Edit"
          onPress={() => navigation.navigate("Edit", { item })}
        />
      )}

      {token && (role === "Member" || role === "Administrator") && (
        <Button
          title="Delete"
          onPress={() => {
            deleteItem(item.id);
          }}
        />
      )}
    </View>
  );
}
