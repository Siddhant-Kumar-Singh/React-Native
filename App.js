
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'
import ProfileScreen from './ProfileScreen'
import OtherProfileScreen from './OtherProfileScreen'

import configLoading from './AppLoader';
const Stack = createStackNavigator();

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (      
                   <NavigationContainer>
                        <Stack.Navigator>
                          <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ title: 'Welcome'}}
                          />
                          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Siddhant'}}/>
                          <Stack.Screen name="OtherProfile" component={OtherProfileScreen} options={{ title: 'Other Profile'}} />
                        </Stack.Navigator>
                      </NavigationContainer>

    )
  }
};


// class HomeScreen extends React.Component {

//   constructor(props) {
//     super(props);
//   }
  
//   navigateWithLoader = () => {
//     // global.props.showLoader("Please wait for 5 seconds");

//     this.props.navigation.navigate('Profile', { name: 'Siddhant' });
//   }

//   render() {
//      return (
//       <View style={{justifyContent:"center", flex:1, alignItems:"center"}}>
//         <Button
//           title="Go to Siddhant's profile"
//           onPress={this.navigateWithLoader}
//         />
//       </View>

//     );
//   }
// };

// class ProfileScreen extends React.Component {

//   constructor(props) {
//     super(props);
//   }

//   componentDidMount(){
//     this.timeoutHandle = setTimeout(()=>{
//       this.props.setLoading(false);
//     }, 5000);
//   }

//   componentWillUnmount(){
//     // clearTimeout(this.timeoutHandle);
//   } 

//   navigateWithLoader = () => {
//     // global.props.showLoader("Please wait for another 5 seconds");
//     this.props.navigation.navigate('OtherProfile', { name: 'Other' });
//   }

//   render() {
//     return (
//       <View style={{justifyContent:"space-evenly", flex:1, alignItems:"center"}}>
//         <Text>This is Siddhant's profile.</Text>
//         <Button
//             title="Go to Other's profile"
//             onPress={this.navigateWithLoader}
//           />
//       </View>
//     );
//   }
// };

// class OtherProfileScreen extends React.Component {

//   constructor(props) {
//     super(props);
//   }

//   // componentDidMount(){
//   //   this.timeoutHandle = setTimeout(()=>{
//   //     global.props.hideLoader();
//   //   }, 5000);
//   // }

//   // componentWillUnmount(){
//   //   clearTimeout(this.timeoutHandle);
//   // }

//   render() {
//     return (
//       <View style={{justifyContent:"center", flex:1, alignItems:"center"}}>
//         <Text>This is Other profile</Text>
//       </View>
//     );
//   }
// };
export default configLoading(App, "Please wait as we load your data");

