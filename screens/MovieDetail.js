import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ProgressBar } from "../components";
import { COLORS, FONTS, icons, SIZES } from "../constants";
const MovieDetail = ({ navigation, route }) => {
  {
    /* setting state . */
  }
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    let { selectedMovie } = route.params;
    setSelectedMovie(selectedMovie);
  }, []);
  {
    /* returning component. */
  }

  function renderHeaderBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
          marginTop: Platform.OS === "ios" ? 40 : 20,
        }}
      >
        {/*back button */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.left_arrow}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>

        {/*share button */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.upload}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderHeaderSection() {
    return (
      <ImageBackground
        source={selectedMovie?.details?.image}
        resizeMode="cover"
        style={{
          width: "100%",
          height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {renderHeaderBar()}
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["transparent", "#000"]}
              style={{
                width: "100%",
                height: 150,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.body4,
                }}
              >
                {selectedMovie?.details.season}
              </Text>

              <Text
                style={{
                  marginTop: SIZES.base,
                  color: COLORS.white,
                  ...FONTS.h1,
                }}
              >
                {selectedMovie?.name}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  }
  function renderCategoryAndRatings() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: SIZES.base,
        }}
      >
        {/* age group */}
        <View style={[styles.categoryContainer, { marginLeft: 0 }]}>
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{selectedMovie?.details?.age}</Text>
        </View>
        {/* genre */}
        <View style={[styles.categoryContainer, { paddingHorizontal: SIZES.padding }]}>
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{selectedMovie?.details?.genre}</Text>
        </View>
        {/* ratings */}
        <View style={styles.categoryContainer}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{
              height: 15,
              width: 15,
            }}
          />
          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {selectedMovie?.details?.ratings}
          </Text>
        </View>
      </View>
    );
  }
  function renderMovieDetails() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          justifyContent: "space-around",
        }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                flex: 1,
                color: COLORS.white,
                ...FONTS.body5,
              }}
            >
              {selectedMovie?.details?.currentEpisode}
            </Text>
            <Text
              style={{
                color: COLORS.lightGray,
                ...FONTS.body5,
              }}
            >
              {selectedMovie?.details?.runningTime}
            </Text>
          </View>
          <ProgressBar
            containerStyle={{ marginTop: SIZES.radius }}
            barStyle={{
              height: 5,
              borderRadius: 3,
            }}
            barPercentage={selectedMovie?.details?.progress}
          ></ProgressBar>
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: Platform.OS === "ios" ? SIZES.padding * 2 : 3,
            borderRadius: 15,
            backgroundColor: COLORS.primary,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {selectedMovie?.details?.progress == "0%" ? "WATCH NOW" : "CONTINUE WATCHING"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
      style={{ backgroundColor: COLORS.black }}
    >
      {renderHeaderSection()}
      {renderCategoryAndRatings()}
      {renderMovieDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1,
  },
});
export default MovieDetail;
