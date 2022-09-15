import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Linking
} from 'react-native';
import {colors} from '../constants/theme';
import axios from 'axios';
import base64 from 'react-native-base64';
import {connect} from 'react-redux';
import {updateConcerns} from '../redux/actions/profile';
import {fetchQuoteOfTheDay} from '../redux/actions/quote';
import MusicApp from './MusicApp';
import WebView from 'react-native-webview';
import {persons} from './data';

const HomeScreen = props => {
  const [modalVisible, setModalVisible] = useState(true);
  const [playlist, setPlaylist] = useState([]);
  const [selectedConcerns, setSelectedConcerns] = useState([]);

  useEffect(() => {
    console.log(props.auth.profile);
  });

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('TrackList', {
            id: item.id,
            title: item.name,
          });
        }}>
        <View style={styles.track}>
          <View style={styles.trackImage}>
            <Image
              source={{uri: item.images[0].url}}
              style={{
                width: 150,
                height: 150,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.helloText}>Hello !</Text>
            <Text style={styles.nameText}>{props.auth.profile.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Profile');
            }}>
            <View style={styles.avatar}>
              <Image
                source={require('../../assets/avatar.png')}
                style={{width: 60, height: 60}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.chatbotContainer}>
          <View style={styles.botContainer}>
            <Image
              source={require('../../assets/tink.gif')}
              style={{width: 180, height: 180}}
            />
          </View>
          <View></View>
          <View style={styles.botContent}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
                color: colors.secondary,
              }}>
              I'M TINK
            </Text>
            <TouchableOpacity onPress={()=> Linking.openURL("https://console.dialogflow.com/api-client/demo/embedded/4212b6b6-c4be-401b-ac25-cb13446d6dd6")}>
            <View style={styles.button}>
                <View style={styles.button}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 16,
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}>
                    Let's talk
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('CreateMeme');
            }}>
            <View style={styles.createMemeContainer}>
              <Text style={styles.createMemeText}>Create a Meme</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>Quote of the day</Text>
          <View style={styles.quote}>
            <Text style={{fontSize: 17}}>
              Be yourself no matter what they say!
            </Text>
          </View>
        </View>
        <View>
        <View style={styles.tracksContainer}>
            <Text style={styles.trackTitle}>Tracks to refresh your mood!</Text>
            {persons.map((person) => {
                return (
                <MusicApp person={person}/>
                );
            })}
        </View>  
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  quote: state.quote,
});

export default connect(mapStateToProps, {updateConcerns, fetchQuoteOfTheDay})(
  HomeScreen,
);

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: colors.primary,
    paddingBottom: 20,
    borderBottomLeftRadius: 120,
    elevation: 10,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'column',
    width: Dimensions.get('window').width - 20,
  },

  helloText: {
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection: 'column',
    color: colors.white,
    marginTop: 30,
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
    flexDirection: 'column',
    color: colors.white,
  },
  avatar: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 10,
    width: 70,
    height: 70,
    borderRadius: 90,
    marginRight: 10,
    marginTop: 20,
    marginLeft: 20,
  },
  chatbotContainer: {
    margin: 10,
    marginTop: 0,
    borderStyle: 'solid',
    borderColor: '#EFEFEF',
    borderRadius: 20,
    borderBottomWidth: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  botContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  botContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  quoteContainer: {
    padding: 10,
    paddingTop: 0,
  },
  quoteText: {
    marginRight: 15,
    fontSize: 18,
    alignSelf: 'flex-end',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  quote: {
    padding: 10,
    width: Dimensions.get('screen').width - 50,
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#face4b',
    borderTopRightRadius: 0,
  },
  tracksContainer: {
    marginVertical: 10,
    padding: 10,
    paddingTop: 0,
    paddingLeft: 20,
    position: 'relative',
    flex:1
  },
  trackTitle: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  track: {
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 10,
    position: 'relative',
  },
  trackContent: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    borderRadius: 10,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingBottom: 10,
  },
  trackImage: {
    opacity: 1,
  },
  done: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 15,
    flex: 1,
    color: colors.black,
  },
  done_button: {
    borderRadius: 90,
    backgroundColor: colors.yellow,
    borderColor: colors.tertiary,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    width: 120,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  preferencesItem: {
    marginHorizontal: 2,
    borderRadius: 12,
    borderColor: colors.gray3,
    borderWidth: 2,
    elevation: 0,
    backgroundColor: colors.white,
  },
  preferenceItemSelected: {
    marginHorizontal: 2,
    borderRadius: 12,
    borderColor: colors.gray3,
    borderWidth: 2,
    elevation: 0,
    backgroundColor: colors.accent,
  },
  preferenceText: {
    color: colors.primary,
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 5,
  },
  createMemeContainer: {
    width: 150,
    height: 40,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginLeft: 20,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createMemeText: {
    color: colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
