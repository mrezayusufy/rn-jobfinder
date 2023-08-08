import React from 'react'
import { View, Text,  ActivityIndicator, TouchableOpacity } from 'react-native'
import styles from './nearbyjobs.style';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants';
import useFetch from '../../../hook/useFetch'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
const Nearbyjobs = () => {
  const router = useRouter();
  const {data, isLoading, error} = useFetch('search', {
    query: 'React Developer',
    num_pages: 1
  })
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? <ActivityIndicator size="large" color={COLORS.primary}/>
        : error ? <Text>{error.message}</Text> : (
         data?.map((job) =>(
          <NearbyJobCard
          job={job}
          handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
          key={`nearby-job-${job?.job_id}`}/>
         )) 
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs