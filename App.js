import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { Audio } from 'expo-av';

const App = () => {
  const [showGif1, setShowGif1] = useState(false);
  const [showGif2, setShowGif2] = useState(false);
  const [sound, setSound] = useState(null);
  const [sound2, setSound2] = useState(null);
  const buttonText1 = showGif1 ? 'HAHA CHEH' : "Besoin d'un ventilateur ?";
  const buttonText2 = showGif2 ? 'Gros dégueulasse !' : 'Tu aime les femmes nues ?';

  const toggleGif1 = async () => {
    if (showGif1) {
      // Couper le son
      if (sound) {
        await sound.stopAsync();
      }
    } else {
      // Jouer le son
      const { sound: soundObject } = await Audio.Sound.createAsync(
        require('./assets/spin.mp3')
      );
      setSound(soundObject);
      await soundObject.playAsync();
    }
    setShowGif1(!showGif1);
  };

  const toggleGif2 = async () => {
    if (showGif2) {
      // Couper le son 2
      if (sound2) {
        await sound2.stopAsync();
      }
    } else {
      // Jouer le son 2
      const { sound: soundObject } = await Audio.Sound.createAsync(
        require('./assets/issou_sound.mp3')
      );
      setSound2(soundObject);
      await soundObject.playAsync();
    }
    setShowGif2(!showGif2);
  };

  useEffect(() => {
    // Nettoyer les ressources sonores lorsque le composant est démonté
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (sound2) {
        sound2.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {showGif1 ? (
        <Image
          source={require('./assets/fresh.gif')}
          style={{ width: 300, height: 300 }}
        />
      ) : (
        <Text></Text>
      )}
      <Pressable
        onPress={toggleGif1}
        style={({ pressed }) => [
          {
            backgroundColor: showGif1 ? 'red' : 'blue',
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
          },
          pressed && { opacity: 0.5 },
        ]}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>{buttonText1}</Text>
      </Pressable>
      {showGif2 ? (
        <Image
          source={require('./assets/issou.gif')}
          style={{ width: 300, height: 300 }}
        />
      ) : (
        <Text></Text>
      )}
      <Pressable
        onPress={toggleGif2}
        style={({ pressed }) => [
          {
            backgroundColor: showGif2 ? 'red' : 'blue',
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
          },
          pressed && { opacity: 0.5 },
        ]}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>{buttonText2}</Text>
      </Pressable>
    </View>
  );
};

export default App;
