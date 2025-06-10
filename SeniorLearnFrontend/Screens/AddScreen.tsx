import React from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, IItem } from "../types";
import { useState } from "react";
import { ItemContext } from "../Context/context";
import { ItemContextType } from "../types";
import { useContext } from "react";
import { FontContext } from "../Context/fontContext";
import { useAuth } from "../Context/AuthContext";


type AddScreenProps = NativeStackScreenProps<RootStackParamList, "Add">;

const API_URL = "http://172.19.159.72:5143/api/bulletins/member";

export default function AddScreen({ navigation }: AddScreenProps) {
  const context = useContext(ItemContext);
  const { token } = useAuth();

  if (!context){
    alert ("Context not avaialble")
    return null;
  }
  const {refreshBulletins} = context;

  //  const [id, setId] = useState('');
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const fontContext = useContext(FontContext);

  const handleSubmit = async () => {
    if (!token) {
      alert("You must be logged in to submit.");
      return;
    }

    if (!title.trim() || !category.trim()) {
      alert("Fill all fields");
      return;
    }

    const newBulletin: IItem = {
      id: Date.now().toString(),
      title: title.trim(),
      category: category.trim(),
      content: content.trim()
    };
    
      console.log("Submitting bulletin:", newBulletin);
        console.log("Payload JSON:", JSON.stringify(newBulletin));

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBulletin),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Item created:", data);

      if (!context) {
        alert("Context not avaialable");
        return;
      }

      const { saveBulletins } = context;

      await saveBulletins(data.data);

      await refreshBulletins();

      navigation.navigate("MemberBulletinSummary");
    } catch (error) {
      console.error(error);
    }
  };

  const handleTypeSelect = (category: string) => {
    setCategory(category);
  };

  return (
    <View>
      <Text>Add Screen</Text>

      {/*  <TextInput
        
        placeholder="Enter id"
        onChangeText={newText => setId(newText)}
      
      />
 */}

      {/*  <TextInput
        
        placeholder="Enter type"
        onChangeText={newText => setType(newText)}
      
      />


 */}

      <TouchableOpacity onPress={() => handleTypeSelect("Interest")}>
        <Text style={{ fontSize: fontContext?.fontSize || 16 }}> 1 </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTypeSelect("Event")}>
        <Text style={{ fontSize: fontContext?.fontSize || 16 }}> 2 </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleTypeSelect("Update")}>
        <Text style={{ fontSize: fontContext?.fontSize || 16 }}> 3 </Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Enter title"
        onChangeText={(newText) => setTitle(newText)}
      />
      
      <TextInput
        placeholder="Enter content"
        onChangeText={(newText) => setContent(newText)}
      />

      <TouchableOpacity onPress={handleSubmit}>
        <Text style={{ fontSize: fontContext?.fontSize || 16 }}> Submit </Text>
      </TouchableOpacity>

      {/*       <Button title="1" onPress={() => handleTypeSelect("1")} />

      <Button title="2" onPress={() => handleTypeSelect("2")} />

      <Button title="3" onPress={() => handleTypeSelect("3")} />

      <TextInput
        placeholder="Enter title"
        onChangeText={(newText) => setTitle(newText)}
      />

      <Button title="Submit" onPress={handleSubmit} /> */}
    </View>
  );
}
