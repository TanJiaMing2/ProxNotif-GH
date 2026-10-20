import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import axios from "axios";

// import AsyncStorage from "@react-native-async-storage/async-storage";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    categori: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);
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
      // Handle any errors that occurred during the request
      console.error("Error Signing Up:", error);
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
          <CustomButton
            title="Create!"
            handlePress={submit}
            containerStyles="mt-7"
            isloading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
