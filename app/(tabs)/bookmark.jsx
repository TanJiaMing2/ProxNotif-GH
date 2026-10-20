import React from "react";
import { Button, View, StyleSheet } from "react-native";
import openMap from "react-native-open-maps";

const Bookmark = () => {
  const goToYosemite = () => {
    openMap({ latitude: 37.865101, longitude: -119.53833 });
  };

  return (
    <View style={styles.container}>
      <Button
        color={"#bdc3c7"}
        onPress={goToYosemite}
        title="Click To Open Maps 🗺"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Bookmark;
