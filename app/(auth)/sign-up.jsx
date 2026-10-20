import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import axios from "axios";

// import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setisSubmitting] = useState(false);
  const submit = async () => {
    setisSubmitting(true);

    try {
      const response = await axios.post(
        "http://DCS2209221.dcs5604.com/signup.php", // Change to your sign-up endpoint
        {
          username: form.username,
          email: form.email,
          password: form.password,
        }
      );

      if (response.data.success) {
        // Handle successful sign-up (e.g., navigate to the main app screen)
        Alert.alert("Sign Up Successful", "Welcome!");
        router.replace("/home");
      } else {
        // Handle sign-up failure (e.g., show an error message)
        Alert.alert(
          "Sign Up Failed",
          response.data.message || "An error occurred"
        );
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error Signing Up:", error);
      Alert.alert("Sign Up Error", "An error occurred. Please try again.");
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
            Sign Up to Tan
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isloading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
