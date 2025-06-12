<<<<<<< HEAD
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
import Provider from "./Context/context";
import { AuthProvider } from "./Context/AuthContext";
import { FontSizeProvider } from "./Context/fontContext";
export default function App() {
  return (
    <Provider>
      <AuthProvider>
        <FontSizeProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </FontSizeProvider>
      </AuthProvider>
    </Provider>
  );
}
=======
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
>>>>>>> 632fe54fdd51849a71c48cb01c50341b42939bc0
