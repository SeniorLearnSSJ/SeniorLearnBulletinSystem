import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { ItemContext } from "../Context/context";
import { ItemContextType, IItem } from "../types";
import { useContext, useState } from "react";

import { useAuth } from "../Context/AuthContext";

type EditScreenProps = NativeStackScreenProps<RootStackParamList, "Edit">;

const API_BASE = "http://172.19.159.72:5143/api/bulletins/member";

export default function EditScreen({ navigation, route }: EditScreenProps) {
  const context = useContext(ItemContext);
const { token } = useAuth();
  if (!context) {
    return <Text>Loading...</Text>;
  }

  const { bulletins, deleteBulletin, saveBulletins } = context;

  const { item } = route.params;
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState(item?.category ?? "");

  const handleSubmit = async () => {
    if (!title.trim() || !category.trim()) {
      alert("Fill all fields");
      return;
    }
    // const newBulletin = { id: Date.now().toString(), title: title.trim() };

    const updatedBulletin = {
      id: item?.id ?? Date.now().toString(),
      title: title.trim(),
      category: category.trim(),
    };

    try {
      const response = await fetch(`${API_BASE}/${updatedBulletin.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBulletin),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Updated item:", data);

      await saveBulletins(updatedBulletin);

      navigation.navigate("MemberBulletinSummary");
    } catch (error) {
      console.error(error);
      alert("Failed to update bulletin");
    }
  };

  const deleteItem = async (idToDelete: string) => {
    try {
      const response = await fetch(`${API_BASE}/${idToDelete}`, {
        method: "DELETE",
            headers: {
        Authorization: `Bearer ${token}`,
      },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      deleteBulletin(idToDelete);
      navigation.navigate("MemberBulletinSummary");

      console.log(`Item with ID ${idToDelete} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }

    //deleteBulletin(idToDelete);
    //navigation.navigate("MemberBulletinSummary");
  };

  const handleTypeSelect = (category: string) => {
    setCategory(category);
  };

  return (
    <View>
      <Text>Member bulletin details</Text>

      <Text>{item.id}</Text>

      {/* 
      <Text>{item.type}</Text> */}

      <Button title="1" onPress={() => handleTypeSelect("1")} />

      <Button title="2" onPress={() => handleTypeSelect("2")} />

      <Button title="3" onPress={() => handleTypeSelect("3")} />

      <Text>Title</Text>

      {/* <TextInput value={type} onChangeText={setType}></TextInput> */}

      <TextInput value={title} onChangeText={setTitle}></TextInput>

      <Button
        title="Submit"
        onPress={() => {
          handleSubmit();
        }}
      />

      <Button
        title="Delete"
        onPress={() => {
          deleteItem(item.id);
        }}
      />
    </View>
  );
}
