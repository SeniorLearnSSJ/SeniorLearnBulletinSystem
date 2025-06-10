import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { api } from "../api";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { useAuth } from "../Context/AuthContext";
import { ItemContext } from "../Context/context";
import { FontContext } from "../Context/fontContext";

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const API_URL = "http://172.19.159.72:5143/api/profile";

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { login } = useAuth();
  const { logout } = useAuth();
  const authContext = useContext(AuthContext);
  const context = useContext(ItemContext);
  if (!context) return null;
  //const { fontSize } = context;
  const fontContext = useContext(FontContext);

  if (!authContext) {
    return <Text>Loading...</Text>;
  }

  const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [membershipDate, setMembershipDate] = useState("");
  const [loading, setLoading] = useState(false);

  const { token, setToken } = authContext;

  /* const getItems = async () => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched items:', data);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}; */
  /* 

  useEffect(() => {

    const fetchProfile = async () =>{
        try{
            const response = await fetch (API_URL, {

            }
        })
    
    if (!response.ok){
        throw new Error (`Error: ${response.status}`)
    }
const data = await Response.json();
setUsername (data.username);




    fetch(API_URL)
      .then(res => res.json())
      .then(data => console.log(data))
      .finally(() => setLoading(false));
  }, []);
 */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error(`${response.status}`);

        const data = await response.json();
        setUsername(data.username);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setRole(data.role);
        setMembershipDate(data.membershipDate);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    // Assuming you have form fields like 'username', 'email', etc.
    if (
      !username.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !role.trim() ||
      !membershipDate.trim()
    ) {
      window.alert("all fields necessary");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
          role,
          membershipDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Updated item:", data);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Update the state or perform any checks
  // Navigate and pass form data to the next screen

  /*     
      try {
        const success = await login(username, password);
        if (success) {
          //setToken(res.data.token)
          window.alert("LOgged in");
          navigation.navigate("BulletinChoice");
        } else {
          window.alert("Login failed");
        }
      } catch {
        window.alert("Error");
      }
    } else {
      window.alert("Fill out all fields");
    }
  }; */

  /*  const login = async (name: string) => {


  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Item created:', data);
  } catch (error) {
    console.error('Error creating item:', error);
  } */

  return (
    <View>
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        Login Screen
      </Text>

      <TextInput
        placeholder="Enter username"
        value={username}
        onChangeText={(newText) => setUsername(newText)}
        style={{ fontSize: fontContext?.fontSize || 16 }}
      />

      <TextInput
        placeholder="Enter first name"
        value={firstName}
        onChangeText={(newText) => setFirstName(newText)}
        style={{ fontSize: fontContext?.fontSize || 16 }}
      />

      <TextInput
        placeholder="Enter last name"
        value={lastName}
        onChangeText={(newText) => setLastName(newText)}
        style={{ fontSize: fontContext?.fontSize || 16 }}
      />

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={(newText) => setEmail(newText)}
        style={{ fontSize: fontContext?.fontSize || 16 }}
      />

      <TextInput
        placeholder="Enter role"
        value={role}
        onChangeText={(newText) => setRole(newText)}
        style={{ fontSize: fontContext?.fontSize || 16 }}
      />

      <TextInput
        placeholder="Enter membership date"
        value={membershipDate}
        onChangeText={(newText) => setMembershipDate(newText)}
        style={{ fontSize: fontContext?.fontSize || 16 }}
      />

      <TouchableOpacity onPress={handleSubmit}>
        <Text
          style={{
            color: "white",
            fontSize: fontContext?.fontSize || 16,
            backgroundColor: "black",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text
          style={{
            color: "white",
            fontSize: fontContext?.fontSize || 16,
            backgroundColor: "black",
          }}
        >
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Text
          style={{
            color: "white",
            fontSize: fontContext?.fontSize || 16,
            backgroundColor: "black",
          }}
        >
          Settings
        </Text>
      </TouchableOpacity>

      {/*       <Button title="Submit" onPress={handleSubmit} />

      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />

      <Button
        title="Settings"
        onPress={() => navigation.navigate("Settings")}
      />
 */}
    </View>
  );
}
