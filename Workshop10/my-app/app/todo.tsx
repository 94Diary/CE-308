import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { addTodo, toggleTodo, removeTodo, Todo } from "./redux/todoSlice";
import { Stack } from "expo-router";
import "./global.css";

export default function TodoScreen() {
  const [task, setTask] = useState("");
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (task) {
      const newTodo: Todo = {
        id: Math.random().toString(),
        text: task,
        completed: false,
      };
      dispatch(addTodo(newTodo));
      setTask("");
    }
  };

  return (
    <View className="flex-1 p-5 bg-gray-100">
      <Stack.Screen options={{ title: "To-Do List" }} />
      <Text className="text-2xl font-bold mb-4 text-center">To-Do List (Homework)</Text>

      <View className="flex-row mb-5">
        <TextInput
          placeholder="Enter task..."
          value={task}
          onChangeText={setTask}
          className="flex-1 border border-gray-300 p-2 rounded-l-lg bg-white"
        />
        <TouchableOpacity 
          onPress={handleAddTodo}
          className="bg-blue-500 p-2 rounded-r-lg justify-center px-4"
        >
          <Text className="text-white font-bold">Add Task</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-white p-4 rounded-lg mb-2 shadow-sm">
            <TouchableOpacity 
              onPress={() => dispatch(toggleTodo(item.id))}
              className="flex-1"
            >
              <Text className={`text-lg ${item.completed ? 'line-through text-gray-400' : 'text-black'}`}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => dispatch(removeTodo(item.id))}
              className="bg-red-500 p-2 rounded ml-2"
            >
              <Text className="text-white">Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
