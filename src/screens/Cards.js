import React from 'react';
import { colors } from '../constants/theme';
import { Text, TouchableOpacity,View, StyleSheet, FlatList,SafeAreaView, ScrollView, Image, Dimensions} from 'react-native';
const Cards = (props) => {
const DATA = [
  {
    id: '1',
    title: 'Bad things happening',
  },
  {
    id: '2',
    title: 'Performance',
  },
  {
    id: '3',
    title: 'Friends, family and Society',
  },
  {
    id: '4',
    title: 'Lack of confidence',
  },
  {
    id: '5',
    title: 'Social',
  },
   {
    id: '6',
    title: 'Aimless future',
  },
  {
    id: '7',
    title: 'Preparing for baby',
  },
];
const Item = ({ title, item }) => (
   <TouchableOpacity 
                              onPress={() => {
                                  props.navigation.navigate('TabNavigation', {id: item.id});
                              }}>
                              <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
      </TouchableOpacity>
  
);
const renderItem = ({ item }) => (
    <Item title={item.title} item={item}/>
  );
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.container}>
        <View>
          <Image
            source={require('../../assets/yoga_main.jpg')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').width
            }}
          />
        </View>        
       <SafeAreaView style={styles.container}>
        
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      >
      </FlatList>
    </SafeAreaView>
    </View>
    </ScrollView>
    );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    position: 'relative',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    top: -40
  },
  item: {
    backgroundColor: colors.accent,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
   borderRadius: 30,
    elevation: 1,
    padding: 10,
    color: colors.black
  },
  title: {
    fontSize: 20,
  },
});

export default Cards;
