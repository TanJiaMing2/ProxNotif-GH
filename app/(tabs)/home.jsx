import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://DCS2209221.dcs5604.com/getoffers.php"
      );
      const text = response.data;
      const userArray = text.split(";").map((user) => {
        const [listid, title, description, categori, address] = user.split(",");
        return { listid, title, description, categori, address };
      });
      setUsers(userArray);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // fetchUsers();
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      {/* border-2 border-red-500 */}
      <FlatList
        data={users}
        // data={[({ id: 1 }, { id: 1 }, { id: 1 })]}
        // data={[]}
        // keyExtractor={(item) => item.$id}
        keyExtractor={(item) => item.listid.toString()}
        renderItem={({ item }) => (
          // <Text>{item.title}</Text>

          // <Text className="text-3xl text-white">{item.title}</Text>
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">User</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View>
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Offers
              </Text>
              {/* <Trending posts={[{ id: 1 }, { id: 1 }, { id: 1 }] ?? []} /> */}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Offer Found" subtitle="No Offer Created Yet" />
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      {/* <Text>Home</Text> */}
    </SafeAreaView>
  );
};

export default Home;
