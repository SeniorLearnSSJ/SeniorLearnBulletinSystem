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
