import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';


type Props = {
  tabs: string[];
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

const TabMenu = ({ tabs, selectedTab, setSelectedTab }: Props) => {
  const renderTabs = () => {
    return tabs.map((label, index) => (
      <TouchableOpacity key={index} onPress={() => {setSelectedTab(label)}}>
        <View style = {styles.tab}>
          <Text style = {label === selectedTab ? styles.selectedText: styles.tabText}>{label}</Text>
        </View>
      </TouchableOpacity>
    ));
  };
  




  return <View style = {styles.container}>{renderTabs()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    marginHorizontal: 20,
  },
  selectedText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  tabText: {
    fontWeight: 'normal',
    color: 'black',
  },
});




export default TabMenu;
