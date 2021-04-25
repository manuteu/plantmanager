import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { pt } from 'date-fns/locale';
import { formatDistance } from 'date-fns';

import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

import { loadPlant, PlantProps, removePlant } from '../libs/storage';

import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseha remover a ${plant.name}?`, [
      {
        text: 'Não 🙏🏼',
        style: 'cancel',
      },
      {
        text: 'Sim 😥',
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert('Não foi possível remover! 😥');
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStorage = await loadPlant();
      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStorage[0].name} à ${nextTime} horas.`
      );

      setMyPlants(plantsStorage);
      setLoading(false);
    }
    loadStorageData();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotLight}>
        <Image source={waterdrop} style={styles.spotImage} />
        <Text style={styles.spotText}>{nextWatered}</Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas Regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => {
                handleRemove(item);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: colors.background,
  },
  spotLight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotImage: {
    width: 60,
    height: 60,
  },
  spotText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
