import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Linking,
  Image,
  PixelRatio,
  Platform
} from 'react-native';

import MapView from 'react-native-maps';
import Dimensions from 'Dimensions';

class Venue extends Component {

  constructor() {
    super();

    this.state = {
      scrollViewHeight: Dimensions.get('window').height || 0,
      venueRegion: {
        latitude: -34.892574712559096,
        longitude: -56.19461506605148,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
      },
      venueMarker: {
        coordinate: {
          latitude: -34.892574712559096,
          longitude: -56.19461506605148
        },
        title: "JSConfUY 2016",
        description: "ANTEL - Complejo de las Telecomunicaciones"
      }
    };
  }

  render() {
    let scrollViewHeight = this.state.scrollViewHeight;
    scrollViewHeight = scrollViewHeight - 56; // header height;

    return (
      <View style={styles.container}>
        <ScrollView
          style={{height: scrollViewHeight}}
          contentContainerStyle={styles.scrollViewContentContainer}
          automaticallyAdjustContentInsets={false}>
          <View>
            <View style={styles.heading}>
              <Image style={styles.headingImage} resizeMode="contain"
                source={require('../../images/venue-title.png')} />
            </View>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={this.state.venueRegion}>
                <MapView.Marker
                  coordinate={this.state.venueMarker.coordinate}
                  title={this.state.venueMarker.title}
                  description={this.state.venueMarker.description}
                  image={require('../../images/map-pin.png')}
                  />
              </MapView>
            </View>
            <View style={styles.venueInfoContainer}>
              <Image style={styles.venueInfoImage} resizeMode="contain"
                  source={require('../../images/ic_ok.png')} />
                <Text style={styles.venueInfoTitle}>ANTEL AUDITORIUM</Text>
              <Text style={styles.venueInfoAddress}>GUATEMALA 1075</Text>
            </View>
            <View style={styles.content}>
              <Text>To get to Montevideo you can do that by plane, bus or ferry.
              You may check the timetable for the airport, bus schedules.
              The venue “La Torre de Antel” is reachable from downtown by
              BUS/TAXI in few minutes. Even if it is a walkable distance from
              downtown it is not recommended, particularly by night.
              </Text>
            </View>
            <View style={styles.infoButtonsContainer}>
              <TouchableHighlight style={styles.infoButton}
                activeOpacity={0.5}
                onPress={this._showTimableForAirport.bind(this)}>
                <Image style={styles.infoButtonImage}
                  source={require('../../images/ic_plane.png')} />
              </TouchableHighlight>
              <TouchableHighlight style={styles.infoButton}
                activeOpacity={0.5}
                onPress={this._showBusSchedules.bind(this)}>
                <Image style={styles.infoButtonImage}
                  source={require('../../images/ic_directions_bus.png')} />
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  _showTimableForAirport() {
    Linking.openURL('http://www.aeropuertodecarrasco.com.uy/en/');
  }

  _showBusSchedules() {
    Linking.openURL('http://www.trescruces.com.uy/horarios_especiales.html');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: Platform.OS === 'ios' ? 70 : 56,
  },
  scrollViewContentContainer: {
  },
  heading: {
    padding: 30,
    backgroundColor: '#254064',
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: 'center'
  },
  headingImage: {
    width: PixelRatio.getPixelSizeForLayoutSize(80),
    height: PixelRatio.getPixelSizeForLayoutSize(20)
  },
  content: {
    padding: 20,
    marginTop: 0
  },
  mapContainer: {
    position: 'absolute',
    marginTop: 0,
    height: 350,
    width: Dimensions.get('window').width
  },
  map: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  venueInfoContainer: {
    marginTop: 350,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#c5473d',
    padding: 20
  },
  venueInfoImage: {
    height: 100,
    width: 100
  },
  venueInfoTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold'
  },
  venueInfoAddress: {
    color: '#fff',
    marginTop: 5
  },
  infoButtonsContainer: {
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center"
  },
  infoButton: {
    backgroundColor: '#254064',
    padding: 20,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  }
});

export default Venue;
