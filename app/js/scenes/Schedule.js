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
  Platform,
  PixelRatio
} from 'react-native';

import Dimensions from 'Dimensions';

var SCHEDULE = require('../../data/schedule.json');

class Schedule extends Component {

  constructor() {
    super();

    this.state = {
      scrollViewHeight: Dimensions.get('window').height || 0,
      schedule: []
    };
  }

  componentDidMount() {
    this.setState({
      schedule: SCHEDULE
    });
  }

  render() {
    let scrollViewHeight = this.state.scrollViewHeight;
    scrollViewHeight = scrollViewHeight - 70; // header height;

    return (
      <View style={styles.container}>

        <ScrollView
          style={{height: scrollViewHeight}}
          contentContainerStyle={styles.scrollViewContentContainer}
          automaticallyAdjustContentInsets={false}>

          <View>
            <View style={styles.heading}>
              <Image style={styles.headingImage} resizeMode="contain"
                source={require('../../images/schedule-title.png')} />
            </View>
            <View style={styles.content}>
              {this.state.schedule.map((day, i) => {
                return (
                  <View key={day.id} style={i === 0 ? styles.firstDay : {}}>
                    <Text style={styles.title}>{day.title}</Text>
                    <View>{this._renderTalks(day.talks)}</View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  _renderTalks(talks) {
    return talks.map(t => {
      let talkStyle = {}
        , talk;

      if (t.talk_type === 'global') {
        talkStyle.backgroundColor = 'rgba(85, 150, 192, 0.2)';
        talk = this._renderGlobalTalk(t);
      }
      if (t.talk_type === 'talk' || t.talk_type === 'workshop') {
        talkStyle.borderStyle = 'solid';
        talkStyle.borderWidth = 1;
        talkStyle.borderColor = '#E0E0D9';
        talk = this._renderTalk(t);
      }
      if (t.talk_type === 'keynote') {
        talkStyle.padding = 0;
        talk = (
          <View style={styles.talk}>
            <Image resizeMode="cover" style={styles.talkKeynoteBg}
              source={{uri: t.talk_bg_image, isStatic: true}} />
            {this._renderTalkKeynote(t)}
          </View>
        );
      }

      return (
        <View key={t.id} style={styles.talkContainer}>
          <Text style={[styles.talkStartTime, styles.leftSide]}>{t.start_time}</Text>
          <TouchableHighlight style={styles.rightSide} underlayColor="#f0f0f0">
            <View style={[styles.talk, talkStyle]}>
              {talk}
            </View>
          </TouchableHighlight>
        </View>
      );
    });
  }

  _renderGlobalTalk(talk) {
    return (
      <Text style={styles.talkTitle}>{talk.title}</Text>
    );
  }

  _renderTalk(talk) {
    return (
      <View style={styles.talkContentContainer}>
        <Text numberOfLines={3} style={styles.talkTitle}>{talk.title}</Text>
        <Text style={styles.talkLanguage}>{`${talk.talk_type.toUpperCase()} - ${talk.talk_language}`}</Text>
        {talk.speakers.map((speaker, i) => {
          return (
            <View key={`${talk.id}_speaker_${i}`} style={styles.talkSpeakerContainer}>
              <Image resizeMode="contain" style={styles.talkSpeakerImage}
                source={{uri: speaker.speaker_image, isStatic: true}} />
              <Text style={styles.talkSpeakerName}>{speaker.speaker_name}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  _renderTalkKeynote(talk) {
    return (
      <View style={styles.talkContentContainer}>
        <Text numberOfLines={3} style={[styles.talkTitle, styles.talkTitleKeynote]}>
          {talk.title}
        </Text>
        <Text style={[styles.talkLanguage, {color: '#172636'}]}>{talk.talk_language}</Text>
        {talk.speakers.map((speaker, i) => {
          return (
            <View key={`${talk.id}_speaker_${i}`} style={styles.talkSpeakerContainer}>
              <Image style={styles.talkSpeakerImage} resizeMode="contain"
                source={{uri: speaker.speaker_image, isStatic: true}} />
              <Text style={[styles.talkSpeakerName, styles.talkTitleKeynote]}>
                {speaker.speaker_name}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: Platform.OS === 'ios' ? 70 : 56,
    backgroundColor: '#fff'
  },
  scrollViewContentContainer: {
  },
  heading: {
    backgroundColor: '#254064',
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: 'center'
  },
  headingImage: {
    width: PixelRatio.getPixelSizeForLayoutSize(100),
    height: PixelRatio.getPixelSizeForLayoutSize(50)
  },
  content: {
    padding: 20,
    marginTop: 0
  },
  title: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(10),
    color: '#254064',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  talkContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10
  },
  talkContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    flexDirection: 'column',
    flex: 1
  },
  leftSide: {
    flex: 1,
  },
  rightSide: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  talkStartTime: {
    color: '#999',
    width: 50
  },
  firstDay: {
    marginBottom: 40
  },
  talk: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    padding: 10
  },
  talkKeynoteBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 3
  },
  talkTitle: {
    textAlign: 'center',
    fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: PixelRatio.getPixelSizeForLayoutSize(100),
    color: '#172636'
  },
  talkTitleKeynote: {
    color: '#fff',
    textShadowColor: 'rgba(20, 20, 20, 0.5)',
    textShadowOffset: { width: 1, height: 1},
    textShadowRadius: 1
  },
  talkSpeakerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  talkLanguage: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(5.5),
    color: '#999',
    textAlign: 'center',
    marginTop: 3
  },
  talkSpeakerImage: {
    height: 55,
    width: 55,
    borderRadius: Platform.OS === 'ios' ? 27.5 : 55,
    marginTop: 15
  },
  talkSpeakerName: {
    textAlign: 'center',
    color: '#172636',
    marginTop: 3,
    fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
  }
});

export default Schedule;
