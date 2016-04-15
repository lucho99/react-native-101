import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Linking
} from 'react-native';

import Dimensions from 'Dimensions';

class CodeOfConduct extends Component {

  constructor() {
    super();

    this.state = {
      scrollViewHeight: Dimensions.get('window').height || 0
    };
  }

  render() {
    let scrollViewHeight = this.state.scrollViewHeight;
    scrollViewHeight = scrollViewHeight - 70; // header height;

    return (
      <View style={styles.container}>
        <ScrollView style={{height: scrollViewHeight}}
          contentContainerStyle={styles.scrollViewContentContainer}
          automaticallyAdjustContentInsets={false}>
          <View>
            <View>
              <Text style={[styles.title, {textAlign: 'center', marginTop: 15}]}>
              THE JSCONF™ CODE OF CONDUCT
              </Text>
            </View>
            <View>
              <Text>
              All delegates, speakers, sponsors and volunteers at any JSConf event
              are required to agree with the following code of conduct. Organizers
              will enforce this code throughout the event.
              </Text>
            </View>
            <View>
              <Text style={styles.title}>THE QUICK VERSION</Text>
            </View>
            <View>
              <Text>
              JSConf is dedicated to providing a harassment-free conference
              experience for everyone, regardless of gender, sexual orientation,
              disability, physical appearance, body size, race, or religion. We do
              not tolerate harassment of conference participants in any form. Sexual
              language and imagery is not appropriate for any conference venue,
              including talks. Conference participants violating these rules may be
              sanctioned or expelled from the conference without a refund at the
              discretion of the conference organizers.
              </Text>
            </View>
            <View>
              <Text style={styles.title}>THE LESS QUICK VERSION</Text>
            </View>
            <View>
              <Text style={styles.paragraph}>
              Harassment includes offensive verbal comments related to gender,
              sexual orientation, disability, physical appearance, body size, race,
              religion, sexual images in public spaces, deliberate intimidation,
              stalking, following, harassing photography or recording, sustained
              disruption of talks or other events, inappropriate physical contact,
              and unwelcome sexual attention.
              </Text>
              <Text style={styles.paragraph}>
              Participants asked to stop any harassing behavior are expected to
              comply immediately.
              </Text>
              <Text style={styles.paragraph}>
              Sponsors are also subject to the anti-harassment policy. In particular,
              sponsors should not use sexualized images, activities, or other
              material. Booth staff (including volunteers) should not use sexualized
              clothing/uniforms/costumes, or otherwise create a sexualized environment.
              </Text>
              <Text style={styles.paragraph}>
              If a participant engages in harassing behavior, the conference
              organizers may take any action they deem appropriate, including warning
              the offender or expulsion from the conference with no refund.
              </Text>
              <Text style={styles.paragraph}>
              If you are being harassed, notice that someone else is being harassed,
              or have any other concerns, please contact a member of conference staff
              immediately. Conference staff can be identified by a clearly marked
              "STAFF" shirt.
              </Text>
              <Text style={styles.paragraph}>
              Conference staff will be happy to help participants contact hotel/venue
              security or local law enforcement, provide escorts, or otherwise assist
              those experiencing harassment to feel safe for the duration of the
              conference. We value your attendance.
              </Text>
              <Text style={styles.paragraph}>
              We expect participants to follow these rules at all conference venues
              and conference-related social events.
              </Text>
            </View>
            <TouchableHighlight style={styles.viewSource}
              activeOpacity={0.5}
              onPress={this._openSource.bind(this)}>
              <Text style={styles.viewSourceText}>View Source</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
  }

  _openSource() {
    Linking.openURL('http://jsconf.com/codeofconduct.html');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginTop: 70
  },
  scrollViewContentContainer: {
    padding: 20
  },
  title: {
    textAlign: 'left',
    color: '#254064',
    fontSize: 17,
    marginTop: 30,
    marginBottom: 30
  },
  paragraph: {
    marginBottom: 25
  },
  viewSource: {
    backgroundColor: '#254064',
    borderRadius: 5,
    alignSelf: 'center',
    padding: 15
  },
  viewSourceText: {
    color: '#fff',
    textAlign: 'center'
  }
});

export default CodeOfConduct;
