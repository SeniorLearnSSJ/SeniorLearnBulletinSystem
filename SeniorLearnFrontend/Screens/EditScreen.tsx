import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { ItemContext } from "../Context/context";
import { ItemContextType, IItem } from "../types";
import { useContext, useState } from "react";
import { MemberBulletinCategory } from "../types";

import { useAuth } from "../Context/AuthContext";

type EditScreenProps = NativeStackScreenProps<RootStackParamList, "Edit">;

const API_BASE = "http://192.168.1.244:5143/api/bulletins/member";

export default function EditScreen({ navigation, route }: EditScreenProps) {
  const context = useContext(ItemContext);
const { token } = useAuth();
  if (!context) {
    return <Text>Loading...</Text>;
  }

  const { bulletins, deleteBulletin, saveBulletins } = context;

  const { item } = route.params;
  const [title, setTitle] = useState(item?.title ?? "");
  const [category, setCategory] = useState<number>(() =>{
    if (typeof item?.category === "string"){
      return MemberBulletinCategory [item.category as keyof typeof MemberBulletinCategory]
    }
    return item?.category??0;
  });
  const [content, setContent] = useState(item.content ?? "");
 
  const handleSubmit = async () => {
    if (!title.trim() || category==null || category == undefined ||!content.trim()) {
      alert("Fill all fields");
      return;
    }
    // const newBulletin = { id: Date.now().toString(), title: title.trim() };

    const updatedBulletin = {
      id: item?.id ?? Date.now().toString(),
      title: title.trim(),
      category: category,
      content: content.trim()
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

      saveBulletins(updatedBulletin);

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

  const handleTypeSelect = (category: number) => {
    setCategory(category);
  };

  return (
    <View>
      <Text>Member bulletin details</Text>

      <Text>{item.id}</Text>

      {/* 
      <Text>{item.type}</Text> */}

      <Button title="Interest" onPress={() => handleTypeSelect(0)} />

      <Button title="Event" onPress={() => handleTypeSelect(1)} />

      <Button title="Update" onPress={() => handleTypeSelect(2)} />

      <Text>Title</Text>

      {/* <TextInput value={type} onChangeText={setType}></TextInput> */}

      <TextInput value={title} onChangeText={setTitle}></TextInput>


           <TextInput value={content} onChangeText={setContent}></TextInput>

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
