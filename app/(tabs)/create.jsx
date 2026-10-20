import { View, Text, ScrollView, Image, Alert, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import axios from "axios";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    categori: "",
    address: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            format: "json",
            lat: latitude,
            lon: longitude,
          },
          headers: {
            "User-Agent": "YourAppName/1.0 (yourname@domain.com)", // Customize with your app name and contact info
          },
        }
      );

      if (response.data && response.data.display_name) {
        setForm((prevForm) => ({
          ...prevForm,
          address: response.data.display_name,
        }));
      } else {
        Alert.alert("An error occurred while fetching the address.");
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      Alert.alert("An error occurred while fetching the address.");
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const submit = async () => {
    setisSubmitting(true);

    try {
      const response = await axios.post(
        "http://DCS2209221.dcs5604.com/createoffer.php",
        {
          title: form.title,
          description: form.description,
          categori: form.categori,
          address: form.address,
        }
      );

      if (response.data.success) {
        Alert.alert("Created Successfully!");
        router.replace("/home");
      } else {
        Alert.alert(
          "Failed to Create",
          response.data.message || "An error occurred"
        );
      }
    } catch (error) {
      console.error("Error Creating Offer:", error);
      Alert.alert("An error occurred. Please try again.");
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            You are now Creating a new Offer or List
          </Text>
          <FormField
            title="Title"
            value={form.title}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Description"
            value={form.description}
            handleChangeText={(e) => setForm({ ...form, description: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Category"
            value={form.categori}
            handleChangeText={(e) => setForm({ ...form, categori: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Address"
            value={form.address}
            handleChangeText={(e) => setForm({ ...form, address: e })}
            otherStyles="mt-7"
          />
          <Button
            title="Refresh Location"
            onPress={fetchLocation}
            color="#841584"
            accessibilityLabel="Refresh location"
          />
          <CustomButton
            title="Create!"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
