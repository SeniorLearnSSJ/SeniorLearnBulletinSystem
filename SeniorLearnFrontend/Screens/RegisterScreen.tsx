import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { api } from "../api";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { FontContext } from "../Context/fontContext";
import { StyleSheet } from "react-native";

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
    <ScrollView>
      <Text style={{ fontSize: fontContext?.fontSize || 16 }}>
        Register Screen
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
        secureTextEntry={true}
        style={[styles.input, { fontSize: fontContext?.fontSize || 16 }]}
      />

      <TextInput
        placeholder="Enter firstName"
        value={firstName}
        onChangeText={(newText) => setFirstName(newText)}
        style={[styles.input, { fontSize: fontContext?.fontSize || 16 }]}
      />

      <TextInput
        placeholder="Enter last name"
        value={lastName}
        onChangeText={(newText) => setLastName(newText)}
        style={[styles.input, { fontSize: fontContext?.fontSize || 16 }]}
      />

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={(newText) => setEmail(newText)}
        style={[styles.input, { fontSize: fontContext?.fontSize || 16 }]}
      />

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              color: "white",
              fontSize: fontContext?.fontSize || 16,
              //backgroundColor: "black",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRight} onPress={handleSubmit}>
          <Text
            style={{
              color: "white",
              fontSize: fontContext?.fontSize || 16,
              //backgroundColor: "black",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>

      {/*       <Button title="Register" onPress={handleSubmit} /> */}

      {/* <Button
        title="Register"
        onPress={() => navigation.navigate('Login',{username, password} )}
      />
 */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
    backgroundColor: "#FFF5E6",
  },

  list: {},

  input: {
    backgroundColor: "blue",
    color: "white",
    borderRadius: 10,
    margin: 20,
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: "black",
    borderRadius: 15,
  },
  buttonDisabled: {
    backgroundColor: "grey",
  },
  bulletinButton: {
    backgroundColor: "blue",
    borderRadius: 15,
    marginBottom: 10,
  },
  bulletinText: {
    color: "white",
  },
});
