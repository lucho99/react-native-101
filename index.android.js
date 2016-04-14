/**
 * JSConfUY 2016 Workshop - React Native 101
 * https://github.com/lucho99/react-native-101
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class JSConfUY extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bold}>JSConfUY 2016</Text>
        <Text>WORKSHOP</Text>
        <Text>React Native 101</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

AppRegistry.registerComponent('JSConfUY', () => JSConfUY);
