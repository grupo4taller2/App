import React, { useState } from "react";
import { Stack, TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import FiUberLogo from './resources/images/logo.png';
import LoginViewWithLogo from "./LoginViewWithLogo";
import LoginView from "./LoginView";

export default function App() {
  return (
    //<LoginViewWithLogo></LoginViewWithLogo>
    <LoginView></LoginView>
  );
}