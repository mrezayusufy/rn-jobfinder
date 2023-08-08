import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { Icons, SIZES } from "../../../constants";
import Popularjobs from "../popular/Popularjobs";
import Nearbyjobs from "../nearby/Nearbyjobs";
const jobsType = [ "Full-time","Part-time", "Contractor"]
const Welcome = ({searchTerm, setSearchTerm, handleClick}) => {
  const [actionJobType, setActionJobType] = useState('Full-time');
  const router = useRouter();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Reza Yusufy</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="what are you looking for?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={Icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList 
        data={jobsType}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.tab(actionJobType, item)} onPress={() => {
            setActionJobType(item);
            router.push(`/search/${item}`)
          }}>
            <Text style={styles.tabText(actionJobType, item)}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        contentContainerStyle={{ columnGap: SIZES.small}}
        horizontal/>
        <Popularjobs/>
        <Nearbyjobs/>
      </View>
    </View>
  );
};

export default Welcome;
