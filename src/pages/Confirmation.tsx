import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '../components/Buttom';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  title: string;
  subTitle: string;
  buttonTitle: string;
  icon: 'smite' | 'hug';
  nextScreen: string;
}

const emojis = {
  hug: '🤗',
  smile: '😁',
};

export function Confirmation() {
  const routes = useRoute();
  const navigation = useNavigation();

  const {
    title,
    subTitle,
    buttonTitle,
    icon,
    nextScreen,
  } = routes.params as Params;

  function handleMoveOn() {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis.smile}</Text>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>

        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30,
  },
  emoji: {
    fontSize: 62,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },
  subTitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 30,
  },
});
