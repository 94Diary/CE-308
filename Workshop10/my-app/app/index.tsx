import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { addItem, removeItem, clearCart, CartItem } from "./redux/cartSlice";
import { Link, Stack } from "expo-router";
import "./global.css";

export default function CartScreen() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleAddItem = () => {
    if (name && quantity && price) {
      const newItem: CartItem = {
        id: Math.random().toString(),
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      };
      dispatch(addItem(newItem));
      setName("");
      setQuantity("");
      setPrice("");
    }
  };

  return (
    <View className="flex-1 p-5 bg-gray-100">
      <Stack.Screen options={{ title: "Shopping Cart" }} />
      <Text className="text-2xl font-bold mb-4 text-center">Shopping Cart</Text>
      
      <View className="bg-white p-4 rounded-lg shadow-sm mb-5">
        <TextInput
          placeholder="Product Name"
          value={name}
          onChangeText={setName}
          className="border border-gray-300 p-2 rounded mb-2"
        />
        <TextInput
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          className="border border-gray-300 p-2 rounded mb-2"
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          className="border border-gray-300 p-2 rounded mb-3"
        />
        <TouchableOpacity 
          onPress={handleAddItem}
          className="bg-blue-500 p-3 rounded-lg items-center"
        >
          <Text className="text-white font-bold">Add to Cart</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-white p-4 rounded-lg mb-2 shadow-sm">
            <View>
              <Text className="text-lg font-semibold">{item.name} x {item.quantity}</Text>
              <Text className="text-gray-500">{item.price * item.quantity} Baht</Text>
            </View>
            <TouchableOpacity 
              onPress={() => dispatch(removeItem(item.id))}
              className="bg-red-500 p-2 rounded"
            >
              <Text className="text-white">Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View className="mt-5 p-4 bg-white rounded-lg shadow-sm">
        <Text className="text-xl font-bold">Total: {cart.totalAmount} Baht</Text>
        <TouchableOpacity 
          onPress={() => dispatch(clearCart())}
          className="bg-blue-600 p-3 rounded-lg mt-3 items-center"
        >
          <Text className="text-white font-bold">Clear Cart</Text>
        </TouchableOpacity>
      </View>

      <Link href="/todo" asChild>
        <TouchableOpacity className="mt-5 items-center">
          <Text className="text-blue-500 font-semibold">Go to To-Do List (Homework)</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
