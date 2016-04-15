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
  Image,
  Navigator,
  TouchableHighlight,
  PixelRatio
} from 'react-native';

import Drawer from 'react-native-drawer';

import Schedule from './app/js/scenes/Schedule';
import Speakers from './app/js/scenes/Speakers';
import SpeakerDetail from './app/js/scenes/SpeakerDetail';
import Sponsors from './app/js/scenes/Sponsors';
import SponsorDetail from './app/js/scenes/SponsorDetail';

class JSConfUY extends Component {

  constructor() {
    super();

    this.state = {
      route: 'Schedule'
    }

    this._toggleMenu = this._toggleMenu.bind(this);
    this._renderScene = this._renderScene.bind(this);
    this._getNavigationBar = this._getNavigationBar.bind(this);
    this._configureScene = this._configureScene.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Drawer
          ref="drawer"
          type="overlay"
          openDrawerOffset={0.2}
          tapToClose={true}
          styles={{
            main: {
              shadowColor: "#000000",
              shadowOpacity: 0.4,
              shadowRadius: 3
            }
          }}
          content={this._getNavigationView()}>

          <Navigator
            ref="navigator"
            initialRoute={{id: this.state.route}}
            renderScene={this._renderScene}
            configureScene={this._configureScene}
            navigationBar={this._getNavigationBar()}
          />

        </Drawer>
      </View>
    );
  }

  _renderScene(route, navigator) {
    switch (route.id) {
      case 'Schedule':
        return <Schedule navigator={navigator} />;
      case 'Speakers':
        return <Speakers navigator={navigator} />;
      case 'SpeakerDetail':
        return <SpeakerDetail navigator={navigator} speaker={route.speaker} />;
      case 'Sponsors':
        return <Sponsors navigator={navigator} />;
      case 'SponsorDetail':
        return <SponsorDetail navigator={navigator} sponsor={route.sponsor} />;
      default:
        return null;
    }
  }

  _configureScene() {
    return Navigator.SceneConfigs.FadeAndroid;
  }

  _getNavigationBar() {
    let self = this;
    let NavigationBarRouteMapper = {
      LeftButton(route, navigator) {
        if (route.id === 'SpeakerDetail' || route.id === 'SponsorDetail') {
          return (
            <View style={styles.navigationBarLeft}>
              <TouchableHighlight onPress={_ => navigator.pop()}>
                <Image resizeMode="contain" style={styles.navigationBarLeftIcon}
                  source={require('./app/images/ic_arrow-back.png')} />
              </TouchableHighlight>
            </View>
          );
        }
        return (
          <View style={styles.navigationBarLeft}>
            <TouchableHighlight onPress={self._toggleMenu}>
              <Image resizeMode="contain" style={styles.navigationBarLeftIcon}
                source={require('./app/images/ic_side-menu.png')} />
            </TouchableHighlight>
          </View>
        );
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

  _getNavigationView() {
    let buttonStyle = {
      fontSize: 16,
      height: 50,
      textAlign: 'center',
      color: '#fff',
      alignSelf: 'center',
      paddingTop: 15
    };

    return (
      <View style={{flex: 1, backgroundColor: '#172636'}}>
        <Image resizeMode="contain" style={styles.drawerLogo}
          source={require('./app/images/jsconfuy-logo.png')} />
        <TouchableHighlight onPress={() => this._navigateToScene('Schedule')}>
          <Text style={buttonStyle}>Schedule</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._navigateToScene('Speakers')}>
          <Text style={buttonStyle}>Speakers</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this._navigateToScene('Sponsors')}>
          <Text style={buttonStyle}>Sponsors</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _navigateToScene(sceneId) {
    this.refs.drawer.close();

    setTimeout(_ => {
      this.refs.navigator.resetTo({
        id: sceneId
      });
    });
  }

  _toggleMenu() {
    this.refs.drawer.open();
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
  drawerLogo: {
    margin: 20,
    marginLeft: 25,
    width: PixelRatio.getPixelSizeForLayoutSize(100),
    height: PixelRatio.getPixelSizeForLayoutSize(50),
    alignSelf: 'center'
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
  },
  navigationBarLeft: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  navigationBarLeftIcon: {
    height: 20,
    width: 20,
    padding: 17
  }
});

AppRegistry.registerComponent('JSConfUY', () => JSConfUY);
