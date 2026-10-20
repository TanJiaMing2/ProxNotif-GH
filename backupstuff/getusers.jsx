import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://DCS2209221.dcs5604.com/getusers.php"
        );
        const text = response.data;
        const userArray = text.split(";").map((user) => {
          const [UserID, Username, UserEmail] = user.split(",");
          return { UserID, Username, UserEmail };
        });
        setUsers(userArray);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.UserID.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>Username: {item.Username}</Text>
          <Text>Email: {item.UserEmail}</Text>
        </View>
      )}
    />
  );
};

// export default UserList;
