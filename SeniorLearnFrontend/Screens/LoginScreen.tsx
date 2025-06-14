import React, { useState } from "react";
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
import { StyleSheet } from "react-native";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const API_URL = "http://172.19.159.72:5143/api/auth/sign-in";

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { login } = useAuth();

  const authContext = useContext(AuthContext);
  const context = useContext(ItemContext);
  if (!context) return null;
  //const { fontSize } = context;
  const fontContext = useContext(FontContext);

  if (!authContext) {
    return <Text>Loading...</Text>;
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = authContext;

  const handleSubmit = async () => {
    if (username.trim() && password.trim()) {
      try {
        const success = await login(username, password);

        if (success) {
          window.alert("Logged in");
          navigation.navigate("BulletinChoice");
        } else {
          // Since login returns only boolean, no message available here
          window.alert("Login failed: 123Invalid username or password");
        }
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "An unknown error occurred";
        console.error("Login error:", message);
        window.alert(`Login error: ${message}`);
      }
    } else {
      window.alert("Fill out all fields");
    }
  };

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
        style={[styles.input, { fontSize: fontContext?.fontSize || 16 }]}
      />

      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={(newText) => setPassword(newText)}
        style={[styles.input, { fontSize: fontContext?.fontSize || 16 }]}
      />

      <View style={styles.lowerButtons}>
        <TouchableOpacity style={styles.buttonLeft} onPress={handleSubmit}>
          <Text
            style={{
              color: "white",
              fontSize: fontContext?.fontSize || 16,
              backgroundColor: "black",
              borderRadius: 15,
              marginBottom: 15,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRight}
          onPress={() => navigation.navigate("Register")}
        >
          <Text
            style={{
              color: "white",
              fontSize: fontContext?.fontSize || 16,
              backgroundColor: "black",
              borderRadius: 15,
              marginBottom: 15,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>

      {/*       <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Text
          style={{
            color: "white",
            fontSize: fontContext?.fontSize || 16,
            backgroundColor: "black",
          }}
        >
          Settings
        </Text>
      </TouchableOpacity> */}

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

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
  },

  Button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFF5E6",
    borderRadius: 20,
    marginVertical: 10,
  },

  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  lowerButtons: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 15,
  },
  input: {
    color: "white",
    backgroundColor: "blue",
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  backButton: {
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: "black",
  },

  buttonLeft: {
    flex: 1,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "black",
  },

  buttonRight: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "black",
  },
});
