import React from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, IItem, IOfficialBulletin } from "../types";
import { useState } from "react";
import { ItemContext } from "../Context/context";
import { ItemContextType } from "../types";
import { useContext } from "react";
import { FontContext } from "../Context/fontContext";
import { useAuth } from "../Context/AuthContext";

const API_URL = "http://172.19.159.72:5143/api/bulletins/official";

type AddOfficialScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AddOfficial"
>;

export default function AddOfficialScreen({
  navigation,
}: AddOfficialScreenProps) {
  const context = useContext(ItemContext);

  //  const [id, setId] = useState('');
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [content, setContent] = useState("");
  const fontContext = useContext(FontContext);
  const { token } = useAuth();

  /* const [officialBulletins, setOfficialBulletins] = useState<
    IOfficialBulletin[]
  >([]);
  const [loading, setLoading] = useState(true); */

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }
    const newBulletin: IOfficialBulletin = {
      id: Date.now().toString(),
      title: title.trim(),
      createdAt: new Date().toISOString(),
      content: content.trim(),
    };
    try {
      const headers: any = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = "Bearer " + token;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(newBulletin),
      });

      if (!response.ok) {
        throw new Error(`API error`);
      }
      const data = await response.json();
      if (context) {
        await context.saveOfficialBulletins(newBulletin);
      }
      navigation.navigate("OfficialBulletinsSummary");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Admin Add Screen</Text>

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

      <TextInput
        placeholder="Enter title"
        onChangeText={(newText) => setTitle(newText)}
      />

      <TextInput
        placeholder="Enter content"
        onChangeText={(newText) => setContent(newText)}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={{ backgroundColor: "black" }}
      >
        <Text style={{ color: "white", fontSize: fontContext?.fontSize || 16 }}>
          Add
        </Text>
      </TouchableOpacity>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
