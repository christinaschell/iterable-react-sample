import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Appearance,
  Image,
  PixelRatio,
} from 'react-native';
import {Iterable, IterableConfig} from '@iterable/react-native-sdk';
import {CustomColors} from './colors';
import {CommerceItems} from './commerce';
import {Tokens} from './tokens';

const config = new IterableConfig();
const commerce = new CommerceItems();
const colorSceme = Appearance.getColorScheme();
const colors = new CustomColors();
const size = PixelRatio.getPixelSizeForLayoutSize(20);

class App extends Component {
  trackEvent = () => {
    Iterable.trackEvent('React Native Custom Event', {
      platform: 'React Native',
      custom_key: true,
    });
  };

  productView = () => {
    Iterable.trackEvent('Product List View',
    { "productImpressions": commerce.productView });
  };

  addToCart = () => {
      Iterable.trackEvent('Add To Cart',
       { "shoppingCartItems": commerce.addToCart });
  };

  removeFromCart = () => {
      Iterable.trackEvent('Remove From Cart',
      { "shoppingCartItems": commerce.removeFromCart });
  };

  purchase = () => {
    Iterable.trackPurchase(8.98, commerce.purchase, {
      is_rewards_member: true,
      rewards_available: 5000,
      order_discount_code: 'Summer2021',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.logo} source={require('./iterable.png')} />
        </View>
        <TouchableButton
          onPress={this.trackEvent}
          text="Track Custom Event"
          color={colors.green}
        />
        <TouchableButton
          onPress={this.listView}
          text="Product List View"
          color={colors.blue}
        />
        <TouchableButton
          onPress={this.addToCart}
          text="Add To Cart"
          color={colors.red}
        />
        <TouchableButton
          onPress={this.removeFromCart}
          text="Remove From Cart"
          color={colors.darkPurple}
        />
        <TouchableButton
          onPress={this.purchase}
          text="Purchase"
          color={colors.lightPurple}
        />
      </View>
    );
  }

  componentDidMount() {
    config.urlHandler = (url, context) => {
      if (url.match(/schellyapps\/([^\/]+)/i)) {
        // todo: handle url
        console.log('Handled deep link: ' + url);
        return true; // handled
      }
      return false; // not handled
    };
    Iterable.initialize("349dcc9373c74c6699c5d1204a271695", config);
    Iterable.setEmail("docs@iterable.com");
  }
}

const TouchableButton = props => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: props.color}]}
      onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: colorSceme === 'dark' ? '#FFFFFF' : '#000000',
    fontWeight: 'bold', 
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 50
  },
  logo: {
    aspectRatio: 2.0,
    resizeMode: 'contain'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 225,
    padding: 10,
    marginBottom: 10,
    borderRadius: 15
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default App;
