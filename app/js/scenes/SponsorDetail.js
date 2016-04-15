import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Linking,
  ScrollView,
  BackAndroid,
  Platform
} from 'react-native';

import Dimensions from 'Dimensions';

class SponsorDetail extends Component {

  constructor() {
    super();

    this.state = {
      scrollViewHeight: Dimensions.get('window').height || 0
    };

    this._handleBackButton = this._handleBackButton.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton);
  }

  render() {
    let scrollViewHeight = this.state.scrollViewHeight;
    scrollViewHeight = scrollViewHeight - 56; // header height;

    let {sponsor} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={{height: scrollViewHeight}}
          contentContainerStyle={styles.scrollViewContentContainer}
          automaticallyAdjustContentInsets={false}>
          <View style={styles.content}>
            <Image resizeMode="contain" style={styles.companyImage}
              source={{uri: sponsor.company_logo, isStatic: true}} />
            <Text style={styles.companyName}>{sponsor.company_name}</Text>
            <Text style={styles.companyDescription}>{sponsor.company_description}</Text>
            <TouchableHighlight underlayColor="#f0f0f0" onPress={this._openTwitter.bind(this)}>
              <Image resizeMode="contain" style={styles.companyTwitter}
                source={require('../../images/ic_twitter.png')} />
            </TouchableHighlight>
            <TouchableHighlight underlayColor="#f0f0f0" onPress={this._openSite.bind(this)}>
              <Text style={styles.companySite}>{sponsor.company_site}</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }

  _openSite() {
    Linking.openURL(this.props.sponsor.company_site);
  }

  _openTwitter() {
    Linking.openURL(this.props.sponsor.company_twitter.url);
  }

  _handleBackButton() {
    this.props.navigator.pop();
    return true;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: Platform.OS === 'ios' ? 70 : 56,
    backgroundColor: '#f0f0f0'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 3,
    padding: 10,
    elevation: 2 // Android only
  },
  companyImage: {
    height: 150,
    width: 150,
    borderRadius: Platform.OS === 'ios' ? 75 : 150,
  },
  companyName: {
    fontSize: 17,
    width: 200,
    color: '#333',
    textAlign: 'center',
    marginTop: 10
  },
  companyDescription: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  companyTwitter: {
    height: 40,
    width: 40
  },
  companySite: {
    margin: 15
  }
});

export default SponsorDetail;
