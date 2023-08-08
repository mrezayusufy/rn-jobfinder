import React, { useState } from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import useFetch from "../../hook/useFetch";
import { COLORS, Icons, SIZES } from "../../constants";
const tabs = ['About', 'Qualifications', 'Responsibilities']
const JobDetails = () => {
  const params = useSearchParams();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const id = params?.id;
  const { data: [jobDetail], isLoading, error } = useFetch("job-details", {
    job_id: id,
  });
  const onRefresh = () => { }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={Icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={Icons.share}
              dimension="60%"
              handlePress={() => { }}
            />
          ),
          headerTitle: jobDetail?.job_title ?? "Job Detail",
        }}
      />
      {isLoading ? <ActivityIndicator size="large" color={COLORS.primary} /> : error ? <Text>{error.message}</Text> :<SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : jobDetail.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={jobDetail?.employer_logo}
                jobTitle={jobDetail?.job_title}
                companyName={jobDetail?.employer_name}
                location={jobDetail?.job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab} />
              {displayTabContent(activeTab, jobDetail)}
            </View>
          )}
        </ScrollView>
        <JobFooter url={jobDetail.job_google_link ?? "https://careers.google.com/jobs/results"}/>
      </SafeAreaView>}
    </SafeAreaView>
  );
};

export default JobDetails;

const displayTabContent = (activeTab, item) => {
  switch (activeTab) {
    case "About":
      return <JobAbout info={item.job_description ?? null}/>
    case "Qualifications":
      return <Specifics
        title="Qualifications"
        points={item?.job_highlights?.Qualifications ?? null} />
    case "Responsibilities":
      <Specifics
        title="Responsibilities"
        points={item?.job_highlights?.Responsibilities ?? null} />
    default:
      break;
  }
}
