import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
// import AuthProvider from "../context/AuthProvider";

export default function App() {
  return (
    // <View className="flex-1 items-center justify-center bg-white">
    //   <Text className="text-3xl font-pblack">Tan!</Text>
    //   <StatusBar style="auto" />
    //   <Link href="/home" style={{ color: "blue" }}>
    //     Go to Home
    //   </Link>
    // </View>
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        {/* <AuthProvider> */}
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          ></Image>
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          ></Image>

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilites with {""}
              <Text className="text-secondary-200">ProxNotif!</Text>{" "}
            </Text>
            <Image
              source={images.path}
              className="w-[146px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            ></Image>
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark with a journey of
            limitless exporation with ProxNotif!
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            contentContainerStyle="w-full mt-7"
          />
        </View>
        {/* </AuthProvider> */}
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
      {/* draken status bar (the top screen) */}
    </SafeAreaView>
  );
}
