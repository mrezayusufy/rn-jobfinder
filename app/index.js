
import { View, SafeAreaView, ScrollView } from "react-native"
import { Stack, useRouter } from "expo-router";
import { ScreenHeaderBtn, Welcome } from '../components'
import { COLORS, Icons, SIZES } from "../constants";
import images from "../constants/images";
import { useState } from "react";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter();
  return <SafeAreaView style={{
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  }}>
    <Stack.Screen
      options={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerLeftContainerStyle: {
          paddingLeft: 16,
        },
        headerRightContainerStyle: {
          paddingRight: 16,
        },
        headerShadowVisible: false,
        headerLeft: () => (
          <ScreenHeaderBtn iconUrl={Icons.menu} dimension={"60%"} handlePress={() => console.log("pressed")} />
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconUrl={images.profile} dimension={"100%"} handlePress={() => console.log("pressed")} />
        ),
        headerTitle: "",
      }}
    />
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{
        flex: 1,
        padding: SIZES.medium
      }}>
        <Welcome searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleClick={() => {
          if(searchTerm) router.push(`/search/${searchTerm}`);
        }}/>
      </View>
    </ScrollView>

  </SafeAreaView>
}
export default Home