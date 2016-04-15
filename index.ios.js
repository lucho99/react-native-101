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
  Navigator,
} from 'react-native';

class JSConfUY extends Component {

  constructor() {
    super();

    this.state = {
      route: 'Default'
    }

    this._renderScene = this._renderScene.bind(this);
    this._getNavigationBar = this._getNavigationBar.bind(this);
    this._configureScene = this._configureScene.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          ref="navigator"
          initialRoute={{id: this.state.route}}
          renderScene={this._renderScene}
          configureScene={this._configureScene}
          navigationBar={this._getNavigationBar()}
        />
      </View>
    );
  }

  _renderScene(route, navigator) {
    switch (route.id) {
      case 'Default':
        return (
          <View style={styles.sceneContainer}>
            <Text style={styles.bold}>JSConfUY 2016</Text>
            <Text>WORKSHOP</Text>
            <Text>React Native 101</Text>
          </View>
        );
      default:
        return null;
    }
  }

  _configureScene() {
    return Navigator.SceneConfigs.FadeAndroid;
  }

  _getNavigationBar() {
    let NavigationBarRouteMapper = {
      LeftButton() {
        return null;
      },
      Title(route) {
        const title = route.id === 'Default' ? 'JSConfUY' : route.id;
        return (
          <View style={styles.navigationBarTitle}>
            <Text style={styles.navigationBarTitleText}>{title}</Text>
          </View>
        );
      },
      RightButton() {
        return null;
      }
    };

    return (
      <Navigator.NavigationBar
        routeMapper={NavigationBarRouteMapper}
        style={styles.toolbar} />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  sceneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70
  },
  bold: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  toolbar: {
    backgroundColor: '#172636',
    height: 70,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navigationBarTitle: {
    flex: 1,
    flexDirection: 'row'
  },
  navigationBarTitleText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  }
});

AppRegistry.registerComponent('JSConfUY', () => JSConfUY);
