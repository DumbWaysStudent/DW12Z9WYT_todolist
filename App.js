import React, { Component } from 'react';
import { View, Text,StyleSheet} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [
        {id: 1, name:'work'},
        {id: 2, name:'swim'},
        {id: 3, name:'study'},
        {id: 4, name:'sleep'},
        {id: 5, name:'run'},
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
      {this.state.datas.map((item, key) => {
        return (
          <Text style={styles.item} key={item.id}>
            {item.name}
          </Text>
        );
     })}
     </View>
    );
  }
}

const styles = StyleSheet.create({  
      item: {
        borderBottomWidth: 0.5,
        fontSize:23
      }

})