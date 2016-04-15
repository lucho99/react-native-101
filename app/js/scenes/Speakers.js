import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Linking,
  ListView,
  ScrollView,
  RecyclerViewBackedScrollView,
  Platform
} from 'react-native';

import Dimensions from 'Dimensions';

var SPEAKERS = require('../../data/speakers.json');

class Speakers extends Component {

  constructor() {
    super();

    this.state = {
      speakers: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

    this._renderSpeaker = this._renderSpeaker.bind(this);
  }

  componentDidMount() {
    let speakers = SPEAKERS;
    this.setState({
      speakers: this.state.speakers.cloneWithRows(speakers),
      scrollViewHeight: Dimensions.get('window').height || 0
    });
  }

  render() {
    let scrollViewHeight = this.state.scrollViewHeight;
    scrollViewHeight = scrollViewHeight - 70; // header height;

    return (
      <View style={styles.container}>
        <ListView
          initialListSize={4}
          dataSource={this.state.speakers}
          renderRow={this._renderSpeaker}
          renderHeader={this._renderHeader}
          style={[styles.listView, {height: scrollViewHeight}]}
          automaticallyAdjustContentInsets={false}
          />
      </View>
    );
  }

  _renderHeader() {
    return (
      <View style={styles.heading}>
        <Text style={styles.headingText}>MEET THE SPEAKERS</Text>
      </View>
    );
  }

  _renderSpeaker(speaker, _, index) {
    let margins = {};
    if (index == 0) {
      margins.marginTop = 0;
    }
    if (index == this.state.speakers.getRowCount()) {
      margins.marginBottom = 0;
    }
    return (
      <TouchableHighlight underlayColor="#f0f0f0" onPress={_ => this.props.navigator.push({
        id: 'SpeakerDetail',
        speaker: speaker
      })}>
        <View style={[styles.listViewItem, margins]}>
          <Image resizeMode="contain" style={styles.speakerImage} source={{uri: speaker.speaker_image, isStatic: true}} />
          <View>
            <View>
              <Text numberOfLines={2} style={styles.speakerName}>{speaker.speaker_name}</Text>
            </View>
            { speaker.speaker_company ? (
                <View>
                  <Text style={styles.speakerCompany}>{speaker.speaker_company}</Text>
                </View>
              ) : null }
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: Platform.OS === 'ios' ? 70 : 56,
    backgroundColor: '#f0f0f0'
  },
  heading: {
    marginTop: 20,
    marginBottom: 20
  },
  headingText: {
    color: '#254064',
    fontSize: 24,
    textAlign: 'center',
    alignSelf: 'center'
  },
  listView: {
  },
  listViewItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    elevation: 2
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
    width: 200,
    color: '#777'
  }
});

export default Speakers;
