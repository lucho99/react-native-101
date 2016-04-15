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
  Platform,
  PixelRatio
} from 'react-native';

import Dimensions from 'Dimensions';

var SPONSORS = require('../../data/sponsors.json');

class Sponsors extends Component {

  constructor() {
    super();

    this.state = {
      sponsors: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

    this._renderSponsor = this._renderSponsor.bind(this);
  }

  componentDidMount() {
    let sponsors = SPONSORS;
    this.setState({
      sponsors: this.state.sponsors.cloneWithRows(sponsors),
      scrollViewHeight: Dimensions.get('window').height || 0
    });
  }

  render() {
    let scrollViewHeight = this.state.scrollViewHeight;
    scrollViewHeight = scrollViewHeight - 66; // header height;

    return (
      <View style={styles.container}>
        <ListView
          initialListSize={4}
          dataSource={this.state.sponsors}
          renderRow={this._renderSponsor}
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
        <Text style={styles.headingText}>SPONSORS</Text>
      </View>
    );
  }

  _renderSponsor(sponsor, _, index) {
    let margins = {};
    if (index == 0) {
      margins.marginTop = 0;
    }
    if (index == this.state.sponsors.getRowCount()) {
      margins.marginBottom = 0;
    }
    return (
      <TouchableHighlight underlayColor="#f0f0f0">
        <View style={[styles.listViewItem, margins]}>
          <Image resizeMode="contain" style={styles.companyLogo}
            source={{uri: sponsor.company_logo, isStatic: true}} />
          <View>
            <View>
              <Text numberOfLines={2} style={styles.companyName}>{sponsor.company_name}</Text>
            </View>
            <View>
              <Text style={styles.companyTwitter}>{sponsor.company_twitter.name}</Text>
            </View>
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
    marginBottom: 10,
    padding: 30,
    backgroundColor: '#254064'
  },
  headingText: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: "center"
  },
  listView: {
  },
  listViewItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    height: 110,
    elevation: 2 // Android only
  },
  companyLogo: {
    height: 80,
    width: 80,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 0
  },
  companyName: {
    fontSize: 17,
    width: PixelRatio.getPixelSizeForLayoutSize(80),
  },
  companyTwitter: {
    color: '#777'
  }
});

export default Sponsors;
