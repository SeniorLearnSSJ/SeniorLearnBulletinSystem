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
import { FontContext } from "../Context/fontContext";

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

const API_BASE = "http://172.19.159.72:5143/api/auth";

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const auth = useContext(AuthContext);
  const fontContext = useContext(FontContext);
  if (!auth) {
    return <Text>Loading...</Text>;
  }
  const { token, setToken } = auth;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  /* interface RegisterData {

  username: String;
  password: String;
  firstName: String;
  lastName: String;
  email: String

} 

const [registerData, setRegisterData] = useState({
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
});
 */

  /*  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => console.log(data))
      .finally(() => setLoading(false));
  }, []);
 */

  const handleSubmit = async () => {
    // Assuming you have form fields like 'username', 'email', etc.
    if (
      !username.trim() ||
      !password.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim()
    ) {
      window.alert("Error, please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(`${API_BASE}/register`, {
        username,
        password,
        firstName,
        lastName,
        email,
      });

      if (res.data.success) {
        window.alert("registration successful");
        navigation.navigate("Login");
      } else {
        window.alert("Registration failed");
      }
    } catch (err) {
      console.error(err);
      window.alert("registration error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        Register Screen
      </Text>

      <TextInput
        placeholder="Enter username"
        value={username}
        onChangeText={(newText) => setUsername(newText)}
        style={{ fontSize: fontContext?.fontSize || 16 }}
      />

      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={(newText) => setPassword(newText)}
        secureTextEntry={true}
        style={{ fontSize: fontContext?.fontSize || 16 }}
      />

      <TextInput
        placeholder="Enter firstName"
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

      <TouchableOpacity onPress={handleSubmit}>
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

      {/*       <Button title="Register" onPress={handleSubmit} /> */}

      {/* <Button
        title="Register"
        onPress={() => navigation.navigate('Login',{username, password} )}
      />
 */}
    </View>
  );
}
