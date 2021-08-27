import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Appearance,
  Image,
  Linking,
  Alert,
  Platform
} from 'react-native';
import {Iterable, IterableConfig} from '@iterable/react-native-sdk';
import {CustomColors} from './colors';
import {CommerceItems} from './commerce';
import {iterableAPIKey, iterableEmail} from './tokens';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'

const commerce = new CommerceItems();
const colorSceme = Appearance.getColorScheme();
const colors = new CustomColors();
const Tab = createBottomTabNavigator();

export default class App extends Component {

  constructor(props) {
    super(props);
    // ITERABLE:
    this.urlHandler = (url, context) => {
        console.log(`urlHandler, url: ${url}`);
        let events = url.match(/events\/([^\/]+)/i);
        let profile = url.match(/profile\/([^\/]+)/i);
        if (events && events.length > 1) {
            console.log("Navigate to events")
            this.navigate('Events');
        } else if (profile && profile.length > 1) {
          console.log("Navigate to profile")
          this.navigate('Profile');
        } else {
          console.log("Navigate to home")
          this.navigate("Home");
          return false;
        }
        return true;
    };
    this.homeTabRef = React.createRef();
    // ITERABLE:
    const config = new IterableConfig();
    config.inAppDisplayInterval = 1.0; // Min gap between in-apps. No need to set this in production.
    config.urlHandler = this.urlHandler;
    Iterable.initialize(iterableAPIKey, config);
    Iterable.setEmail(iterableEmail);
  };

  navigate(screen) {
    if (this.homeTabRef && this.homeTabRef.current) {
        console.log("Navigating to screen: " + screen);
        this.homeTabRef.current.navigate(screen);
    }
}
  
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
     Iterable.updateUser({"shoppingCartItems": commerce.addToCart});
     Iterable.trackEvent('Add To Cart',
       { "updatedShoppingCartItems": commerce.addToCart });
  };

  removeFromCart = () => {
      Iterable.updateUser({"shoppingCartItems": commerce.removeFromCart});
      Iterable.trackEvent('Remove From Cart',
      { "updatedShoppingCartItems": commerce.removeFromCart });
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
      <NavigationContainer ref={this.homeTabRef}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return <Icon name='home' size={size} color={color} ref={this.homeTabRef} />
              } else if (route.name === 'Events') {
                return <Icon name='th-list' size={size} color={color} />
              } else if (route.name === 'Profile') {
                return <Icon name='user' size={size} color={color} />
              }
            },
          })}
            tabBarOptions={{
              activeTintColor: 'purple',
              inactiveTintColor: 'gray'
            }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Events" component={EventsScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

componentDidMount() {
  if (Platform.OS == "android") {
    Linking.addEventListener('url', this._handleOpenURL);
  }
}
componentWillUnmount() {
  Linking.removeEventListener('url', this._handleOpenURL);
}
_handleOpenURL(event) {
  console.log(event.url);
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

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Image style={styles.homeLogo} source={require('./iterable.png')} />
      </View>
      <Text>Home!</Text>
    </View>
  );
}

const EventsScreen = ({ navigation }) => {
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

const ProfileScreen = ({ navigation }) => {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Profile Screen</Text>
      </View>
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
  homeLogo: {
    aspectRatio: 3.0,
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
