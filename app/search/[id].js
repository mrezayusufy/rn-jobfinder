import { Stack, useRouter, useSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, Image, TouchableOpacity, View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import useFetch from '../../hook/useFetch';
import styles from './search.style'
import { NearbyJobCard, ScreenHeaderBtn } from '../../components';
import { COLORS, Icons, SIZES } from '../../constants';

const SearchJob = () => {
  const params = useSearchParams();
  console.log('params', params)
  // if (params) return <Text>this is true</Text>
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useFetch("search", {
    query: params.id,
    page: page.toString(),
  });
  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1)
      refetch();
    } else if (direction === 'right') {
      setPage(page + 1)
      refetch();
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn handlePress={() => router.back()} iconUrl={Icons.left} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      {isLoading ? <ActivityIndicator size="large" color={COLORS.primary}/> : 
      error ? <Text>{error.message}</Text> : 
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NearbyJobCard job={item} handleNavigate={() => router.push(`/job-details/${item.job_id}`)} />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (<ActivityIndicator size="large" color={COLORS.primary} />)
                : error && (<Text>Oops something went wrong!!!</Text>)}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.paginationButton} onPress={() => handlePagination('left')}>
              <Image source={Icons.chevronLeft} resizeMode='contain' style={styles.paginationImage} />
            </TouchableOpacity>

            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>

            <TouchableOpacity style={styles.paginationButton} onPress={() => handlePagination('right')}>
              <Image source={Icons.chevronRight} style={styles.paginationImage} resizeMode='contain' />
            </TouchableOpacity>
          </View>
        )} />}
    </SafeAreaView>
  )
}

export default SearchJob
