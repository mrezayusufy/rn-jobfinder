import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import styles from "./popularjobs.style";
import { useRouter } from "expo-router";
import { COLORS, Icons, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import ScreenHeaderBtn from "../../common/header/ScreenHeaderBtn";
const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <View>
            <Text>{error.message}</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item?.job_id}
            horizontal
            contentContainerStyle={{ columnGap: SIZES.medium }}
            renderItem={({ item }) => <PopularJobCard item={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
