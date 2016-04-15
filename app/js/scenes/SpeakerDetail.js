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

class SpeakerDetail extends Component {

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
    scrollViewHeight = scrollViewHeight - 70; // header height;

    let {speaker} = this.props;
    let takls = null, workshops = null;

    if (speaker.talks && speaker.talks.length > 0) {
      talks = (
        <View>
          <Text style={styles.talkType}>Talk</Text>
          {speaker.talks.map((talk, i) => {
            return (<Text style={styles.talkName} key={i}>{talk}</Text>);
          })}
        </View>
      );
    } else {
      talks = (<View></View>);
    }
    if (speaker.workshops && speaker.workshops.length > 0) {
      workshops = (
        <View style={{marginTop: 20}}>
          <Text style={styles.talkType}>Workshop</Text>
          {speaker.workshops.map((workshop, i) => {
            return (<Text style={styles.talkName} key={i}>{workshop}</Text>);
          })}
        </View>
      );
    } else {
      workshops = (<View></View>);
    }

    return (
      <View style={styles.container}>
        <ScrollView style={{height: scrollViewHeight}}
          contentContainerStyle={styles.scrollViewContentContainer}
          automaticallyAdjustContentInsets={false}>
          <View style={styles.content}>
            <Image resizeMode="contain" style={styles.speakerImage}
              source={{uri: speaker.speaker_image, isStatic: true}} />
            <Text style={styles.speakerName}>{speaker.speaker_name}</Text>
            <Text style={styles.speakerCompany}>{speaker.speaker_company}</Text>
            <Text style={styles.speakerBio}>{speaker.speaker_bio}</Text>
            <TouchableHighlight underlayColor="#f0f0f0" onPress={this._openTwitter.bind(this)}>
              <Image resizeMode="contain" style={styles.speakerTwitter}
                source={require('../../images/ic_twitter.png')} />
            </TouchableHighlight>
            <View style={styles.talkContainer}>
              {talks}
              {workshops}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  _openTwitter() {
    Linking.openURL(this.props.speaker.speaker_twiter);
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
  speakerImage: {
    height: 150,
    width: 150,
    borderRadius: Platform.OS === 'ios' ? 75 : 150
  },
  speakerName: {
    fontSize: 17,
    width: 200,
    color: '#333',
    textAlign: 'center',
    marginTop: 10
  },
  speakerCompany: {
    textAlign: 'center',
    color: '#777'
  },
  speakerBio: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  speakerTwitter: {
    height: 40,
    width: 40
  },
  talkContainer: {
    margin: 20,
    marginBottom: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  talkType: {
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'center'
  },
  talkName: {
    color: '#5596c0',
    fontSize: 22,
    fontWeight: '100',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5
  }
});

export default SpeakerDetail;
