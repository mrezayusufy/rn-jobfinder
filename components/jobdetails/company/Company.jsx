import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { Icons } from "../../../constants";

const Company = ({ companyLogo, jobTitle, companyName, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.logoBox}>
          <Image
            source={{
              uri:
                companyLogo !== null
                  ? companyLogo
                  : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqz05H.jpg",
            }}
            style={styles.logoImage}
          />
        </View>

        <View style={styles.jobTitleBox}>
          <Text style={styles.jobTitle}>{jobTitle}</Text>
        </View>

        <View styles={styles.companyInfoBox}>

          <Text styles={styles.companyName}>{companyName} / </Text>

          <View style={styles.locationBox}>
            <Image source={Icons.location} resizeMode="contain" style={styles.locationImage}/>
            <Text styles={styles.locationName}>{location}</Text>
          </View>
        </View>
      </View>
      <Text>Company</Text>
    </View>
  );
};

export default Company;
