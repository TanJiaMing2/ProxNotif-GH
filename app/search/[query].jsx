import { View, Text, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { query } = useLocalSearchParams();
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
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = users.filter((user) =>
        user.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [query, users]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.listid.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Offer Found"
            subtitle="No offers found for this searches"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
