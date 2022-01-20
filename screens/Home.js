import React, { useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Profiles, ProgressBar } from "../components";
import { COLORS, dummyData, FONTS, icons, images, SIZES } from "../constants";
const Home = ({ navigation }) => {
  const newSeasonScrollX = useRef(new Animated.Value(0)).current;

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          }}
        >
          <Image source={images.profile_photo} style={styles.profile_photo} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          }}
        >
          <Image source={icons.airplay} style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
    );
  }
  //  rendering a new season section.
  function NewSeasonSection() {
    return (
      <View>
        <Animated.FlatList
          horizontal
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate={0}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          data={dummyData.newSeason}
          keyExtractor={(item) => `${item.id}`}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: newSeasonScrollX } } }], { useNativeDriver: false })}
          renderItem={(item, index) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("MovieDetail", { selectedMovie: item.item });
                }}
              >
                <View
                  style={{
                    width: SIZES.width,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageBackground
                    source={item.item.thumbnail}
                    resizeMode="cover"
                    style={{ width: SIZES.width * 0.95, height: 400, justifyContent: "flex-end", padding: 15 }}
                    imageStyle={{ borderRadius: 40 }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        height: 50,
                        width: "100%",
                        marginBottom: SIZES.radius,
                        paddingHorizontal: SIZES.radius,
                      }}
                    >
                      {/*play now button */}
                      <View
                        style={{
                          flexDirection: "row",
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            backgroundColor: COLORS.transparentWhite,
                          }}
                        >
                          <Image source={icons.play} resizeMode="contain" style={styles.playIcon} />
                        </View>
                        <Text style={styles.btnPlayText}>Play Now</Text>
                      </View>
                      {/*people watching */}
                      {item.item.stillWatching.length > 0 && (
                        <View
                          style={{
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>still watching</Text>
                          <Profiles profiles={item.item.stillWatching} />
                        </View>
                      )}
                    </View>
                  </ImageBackground>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    );
  }
  //render dots section function component
  function renderDots() {
    const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width);
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {dummyData.newSeason.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: SIZES.radius,
                opacity: opacity,
                width: dotWidth,
                marginHorizontal: 2,
                height: 6,
                backgroundColor: dotColor,
              }}
            ></Animated.View>
          );
        })}
      </View>
    );
  }
  function ContinueWatchingSection() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        {/* Continue watching text + icon */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.h2, color: COLORS.white, flex: 1 }}>Continue watching</Text>
          <Image source={icons.right_arrow} style={{ width: 20, height: 20, tintColor: COLORS.primary }} />
        </View>
        {/* List of  */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.padding,
          }}
          data={dummyData.continueWatching}
          keyExtractor={(item) => `${item.id}`}
          renderItem={(item, index) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate("MovieDetail", { selectedMovie: item.item });
                }}
              >
                <View
                  style={{
                    marginLeft: index == 0 ? SIZES.padding : 20,
                    marginRight: index == dummyData.continueWatching.length - 1 ? SIZES.padding : 0,
                  }}
                >
                  {/* movie thumbnail */}
                  <Image
                    source={item.item.thumbnail}
                    resizeMode="cover"
                    style={{
                      width: SIZES.width / 3,
                      height: SIZES.width / 3 + 30,
                      borderRadius: 20,
                    }}
                  />
                  {/* movie title*/}
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.white,
                      marginTop: SIZES.base,
                      marginBottom: SIZES.base,
                    }}
                  >
                    {item.item.name}
                  </Text>
                  {/* movie progress-bar*/}
                  <ProgressBar
                    containerStyle={{
                      marginTop: SIZES.radius,
                    }}
                    barStyle={{ height: 3 }}
                    barPercentage={item.item.overallProgress}
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {NewSeasonSection()}
        {renderDots()}
        {ContinueWatchingSection()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  profile_photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconStyle: {
    tintColor: COLORS.primary,
    width: 25,
    height: 25,
  },
  playIcon: {
    width: 15,
    height: 15,
    tintColor: COLORS.white,
  },
  btnPlayText: {
    marginLeft: SIZES.base,
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default Home;
