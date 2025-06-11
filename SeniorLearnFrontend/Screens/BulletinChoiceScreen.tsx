import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { FontContext } from '../Context/fontContext';
import {useContext} from 'react';




type BulletinChoiceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "BulletinChoice"
>;

export default function BulletinChoiceScreen({
  navigation,
}: BulletinChoiceScreenProps) {


  const fontContext = useContext (FontContext);
  return (
    <View>
      <Text>Bulletin Choice Screen</Text>
      <Button
        title="Go to member bulletins"
        onPress={() => navigation.navigate("MemberBulletinSummary")}
      />



          <Text>Bulletin Choice Screen</Text>
      <Button
        title="Go to official bulletins"
        onPress={() => navigation.navigate("OfficialBulletinsSummary")}
      />


 {/*         <Button
        title="Go to ofiical bulletins"
        onPress={() => navigation.navigate("OfficialBulletinsSummary")};
      />  */}


 <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={{ color: "white", fontSize: fontContext?.fontSize|| 16, backgroundColor: "black" }}>
         Profile
        </Text>
      </TouchableOpacity>



    </View>
  );
}
