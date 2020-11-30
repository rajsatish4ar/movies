import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ActivityIndicator
} from 'react-native';
const transparentColor = '#00000066';
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  show = () => {
    this.setState({loading: true});
  };
  hide = () => {
    this.setState({loading: false});
  };

  render() {
    const {loading = false} = this.state;
    if (!loading) {
      return null;
    }
    const {colors={}} = this.props
    return (
      <Modal transparent>
        <View style={styles.alertContainer}>
          <View style={styles.conetnt}>
            <View style={styles.indicator}>
              <ActivityIndicator color={colors.primary}
              size='large'
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 120,
    height: 120,
  },
  conetnt: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: transparentColor,
  },
  alertContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    margin: 0,
    position: 'absolute',
    zIndex: 1000,
  },
  indicator: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
