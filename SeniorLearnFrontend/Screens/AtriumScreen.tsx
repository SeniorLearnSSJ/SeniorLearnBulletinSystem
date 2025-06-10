import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { FontContext } from "../Context/fontContext";
import { useContext } from "react";

type AtriumScreenProps = NativeStackScreenProps<RootStackParamList, "Atrium">;

export default function AtriumScreen({ navigation }: AtriumScreenProps) {
  const fontContext = useContext(FontContext);
  return (
    <View>
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>Home Screen</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "white", fontSize: fontContext?.fontSize || 16, backgroundColor: "black" }}>
          Go to login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("BulletinChoice")}>
        <Text style={{ color: "white", fontSize: fontContext?.fontSize || 16, backgroundColor: "black" }}>
          Continue as guest
        </Text>
      </TouchableOpacity>

 <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={{ color: "white", fontSize: fontContext?.fontSize || 16, backgroundColor: "black" }}>
         Profile
        </Text>
      </TouchableOpacity>



    </View>
  );
}
