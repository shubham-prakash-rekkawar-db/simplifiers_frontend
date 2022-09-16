import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';

export default function MusicApp () {

  const [sound, setSound] = useState(null);
  const [show, setShow] = useState(false);
  const [soundStatus, setSoundStatus] = useState({
    status: null,
    isPlaying: false,
    icon: 'ios-play-circle-outline'
  });

  async function handleAudio(soundStatus) {
    
    if (soundStatus.status === null) {
      const { sound, status } = await Audio.Sound.createAsync(
        require('../../assets/icons/widget.mp3'),
        { shouldPlay: true }
      );
      setSound(sound);
      setSoundStatus({ status: status, isPlaying: true, icon: 'ios-pause-circle-outline' });
    }
    
    if (soundStatus.isPlaying) {
      const status = await sound.pauseAsync();
      setSoundStatus({ status: status, isPlaying: false, icon: 'ios-play-circle-outline' });
    }

    if (!soundStatus.isPlaying && sound != null) {
        await sound.setPositionAsync(0);
        const status = await sound.playAsync();
        setSoundStatus({ status: status, isPlaying: true, icon: 'ios-pause-circle-outline' });
    }
  }

    return (
      <View>
            <View style={styles.parentView}>
            <TouchableOpacity onPress={()=>handleAudio(soundStatus)}>
                <ImageBackground source={require('../../assets/icons/widget.png')} resizeMode="cover" style={styles.image}>
                    <Text style={[styles.childText, styles.commonStyle]}>todays breathing exercise</Text>
                        <Icon name={soundStatus.icon} style={styles.icon}></Icon>
                </ImageBackground>
            </TouchableOpacity>
            </View>
            <View>
            <Button title={"Answer Me"} onPress={()=>{setShow(true)}}></Button>
            <Modal transparent={true} visible={show}>
            <View style={{backgroundColor:"#000000aa",flex:1}}>
              <View style={{backgroundColor:"#ffffff",margin:50,padding:40,borderRadius:10,flex:1}}>
                <Text style={{fontSize:50}}>Modal Text</Text>
              </View>
              <Button title={"Close"} onPress={()=>{setShow(false)}}></Button>
            </View>
            </Modal>
            </View>
            </View>
    );
};

const styles = StyleSheet.create({
    parentView: {
        flex:1,
        width: "95%",
        height: 200,
        marginTop: 50,
        marginHorizontal: 10,
        borderWidth: 3,
        borderColor: "#101820FF",
        borderRadius: 25,
        overflow: "hidden",
        alignItems: 'center',
    },
    image: {
        justifyContent: "center",
    },
    childText: {
        borderColor: "#2C5F2D",
        color: "#2C5F2D"
    },
    commonStyle: {
        fontSize: 17,
        height: "100%",
        textAlign: "center"
    },
    icon: {
        align: "center",
        position: "absolute",
        left: 70,
        fontSize: 60,
    }
});