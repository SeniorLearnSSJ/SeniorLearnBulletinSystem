import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { ItemContext } from "../Context/context";
import { ItemContextType, IItem } from "../types";
import { useContext, useState } from "react";
import { useAuth } from "../Context/AuthContext";

type EditOfficialScreenProps = NativeStackScreenProps<RootStackParamList, "EditOfficial">;

const API_BASE = "http://172.19.159.72:5143/api/bulletins/official";

export default function EditOfficialScreen({ navigation, route }: EditOfficialScreenProps) {
  const context = useContext(ItemContext);
 const { token } = useAuth();
 

if (!context){
  return <Text> Loading</Text>
}

 const { item } = route.params;
  const [title, setTitle] = useState(item?.title ?? "");
  const [datetime, setDateTime] = useState<Date | null>(item?.createdAt ? new Date(item.createdAt) : null);
  const [content, setContent] = useState(item.content ?? "");
const {saveOfficialBulletins, deleteOfficialBulletins} = context;

  const handleSubmit = async () => {


    if (!title.trim() || !content.trim()){
      alert("Fill all fields");
      return;
    }
  


      const updatedBulletin = {
        id: item?.id ?? Date.now().toString(),
        title: title.trim(),
        createdAt: new Date().toISOString(),
        content: content.trim()
      };



  try {
    const response = await fetch(`${API_BASE}/${updatedBulletin.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify( updatedBulletin),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Updated item:', data);

    await saveOfficialBulletins(updatedBulletin);
    navigation.navigate("OfficialBulletinsSummary");
  } catch (error) {
    console.error('Error updating item:', error);
    alert("Failed to update bulletin")
  }
};





const deleteItem = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
         headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    console.log(`Item with ID ${id} deleted successfully.`);
    deleteOfficialBulletins(id);
    navigation.navigate("OfficialBulletinsSummary");
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};





/* 

  const deleteItem = (idToDelete: string) => {
    deleteOfficialBulletins(idToDelete);
    navigation.navigate("OfficialBulletinsSummary");
  }; */


  return (
    <View>
      <Text>Official bulletin details</Text>

      <Text>{item.id}</Text>


      <Text>{item.title}</Text>

<Text>{new Date(item.createdAt).toLocaleDateString()}</Text>




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
