import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Modal,
  BackAndroid,
  Platform
} from 'react-native';

class ModalCustom extends Component {

  constructor() {
    super();

    if (Platform.OS === 'android') {
      this._handleBackButton = this._handleBackButton.bind(this);
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton);
    }
  }

  render() {
    return (
      <Modal
        animated={true}
        visible={this.props.visible}
        transparent={Platform.OS !== 'android'}
        onRequestClose={this.props.closeModal}>
        {this._renderModalContent()}
      </Modal>
    );
  }

  _renderModalContent() {
    if (this.props.content) {
      let talk = this.props.content
        , talkDescription;

      if (talk.talk_description) {
        talkDescription = (
          <View>
            {talk.talk_description.map((line, i) => {
              if (typeof line === 'object') {
                if (line.type === 'bulleted_list') {
                  return (
                    <View key={i} style={styles.descriptionTypeList}>
                      {line.list.map((l, i) => {
                        return (
                          <Text key={i}>{`• ${l}`}</Text>
                        );
                      })}
                    </View>
                  );
                }
                if (line.type === 'numbered_list') {
                  return (
                    <View key={i} style={styles.descriptionTypeList}>
                      {line.list.map((l, i) => {
                        return (
                          <Text key={i}>{`${i + 1}\) ${l}`}</Text>
                        );
                      })}
                    </View>
                  );
                }
                if (line.type === 'code') {
                  return (
                    <View key={i} style={styles.descriptionTypeCode}>
                      {line.list.map((l, i) => {
                        return (
                          <Text style={{color: '#333'}} key={i}>{l}</Text>
                        );
                      })}
                    </View>
                  );
                }
              }
              return (<Text style={styles.paragraph} key={i}>{line}</Text>);
            })}
          </View>
        );
      }

      return (
        <View style={styles.modalContainer}>
          <TouchableHighlight underlayColor="#f0f0f0" onPress={this.props.closeModal}
            style={styles.modalCloseBtn}>
            <Image style={styles.modalCloseBtnImg}
              source={require('../../images/ic_close.png')} />
          </TouchableHighlight>
          <Text numberOfLines={3} style={styles.modalTitle}>{talk.title}</Text>
          <ScrollView
            contentContainerStyle={styles.scrollViewContentContainer}
            automaticallyAdjustContentInsets={false}>
            <View style={styles.modalContent}>
              {talkDescription}
            </View>
          </ScrollView>
        </View>
      );
    }
    return null;
  }

  _handleBackButton() {
    this.props.closeModal();
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton);
    return true;
  }

}

const stylesAndroid = {
  modalContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 3,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  modalCloseBtn: {
    position: 'absolute',
    right: 5,
    top: 5,
    padding: 5
  }
};

const styles = StyleSheet.create(Object.assign({}, {
  modalContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    padding: 20
  },
  modalTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
    width: 200,
    color: '#333'
  },
  modalCloseBtn: {
    position: 'absolute',
    right: 5,
    top: 20,
    padding: 5
  },
  modalCloseBtnImg: {
    height: 30,
    width: 30,
  },
  descriptionTypeList: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10
  },
  descriptionTypeCode: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },
  paragraph: {
    marginBottom: 3
  }
}, Platform.OS === 'android' ? stylesAndroid : {}));

export default ModalCustom;
