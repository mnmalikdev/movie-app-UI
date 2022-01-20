import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";

const Profiles = ({ profiles }) => {
  if (profiles.length <= 3) {
    return (
      <View style={styles.Container}>
        {profiles.map((item, index) => {
          return (
            <View key={`profile-${index}`} style={index == 0 ? null : { marginLeft: -15 }}>
              <Image source={item.profile} resizeMode="cover" style={styles.profileImage} />
            </View>
          );
        })}
      </View>
    );
  } else {
    return (
      <View style={styles.Container}>
        {profiles.map((item, index) => {
          if (index <= 2) {
            return (
              <View key={`profile-${index}`} style={index == 0 ? null : { marginLeft: -15 }}>
                <Image source={item.profile} resizeMode="cover" style={styles.profileImage} />
              </View>
            );
          }
        })}
        <Text
          style={{
            marginLeft: SIZES.base,
            color: COLORS.white,
            ...FONTS.body3,
          }}
        >
          +{profiles.length - 3}
        </Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
});
export default Profiles;
