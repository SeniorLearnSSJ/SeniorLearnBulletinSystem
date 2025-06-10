import React from "react";
import { View, Pressable, Text } from "react-native";

type BrightnessSwitchProps = {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  fontSize?: number;
};

const BrightnessSwitch: React.FC<BrightnessSwitchProps> = ({
  value,
  onValueChange,
  fontSize = 16
}) => {
  const toggleSwitch = () => {
    onValueChange(!value);
  };

  return (
    <Pressable onPress={toggleSwitch}>
      <View
        style={{
          width: 60,
          height: 60,

          backgroundColor: value ? "lightblue" : "darkblue",
          justifyContent: "center",
          alignItems: value ? "flex-end" : "flex-start",
        }}
      >
        <Text style={{ margin: 20, fontSize, color: "white"}}>
          {value ? "Dark" : "Light"}
        </Text>

        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: "white",
          }}
        />
      </View>
    </Pressable>
  );
};

export default BrightnessSwitch;
