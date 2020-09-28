import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

import configLoading from './AppLoader';


class ProfileScreen extends React.Component {

    constructor(props) {
      super(props);
    }
   
    componentDidMount(){
      this.props.setLoaderPropsState(loader = {
        // Change the name of the loader to :--
          // 1. rollerCoaster
          // 2. circularProgress
          // 3. linearProgress

          name: 'linearProgress',
          properties : {
            // Change the properties as required
           colorOfLoader: 'tomato',
           colorOftext: 'tomato',
           fontSize: 20,
           // Only set for linear progress bar
           innerFontSize: 18,
           innerFontColor: 'green',
           }
      });
      this.props.setProgressPercentWithDuration(37,5000);
      this.props.setLoading(true); 
      this.props.setLoadingMessage("Loading ....");
      
      // Uncomment the below line to use a Modal effect
      // this.props.setLoadingWithModal(true); 
      
      this.timeoutHandle = setTimeout(()=>{
        this.props.setLoadingMessage("Please wait we are loading your data");
        this.props.setProgressPercentWithDuration(63,4000);
      }, 10000);
    this.timeoutHandle = setTimeout(()=>{
      this.props.setLoadingMessage("Your profile is ready in 5 seconds"); 
      this.props.setProgressPercentWithDuration(100,4500);
    }, 20000);
      this.timeoutHandle = setTimeout(()=> {     
          this.props.setLoading(false);
    }, 27000);
    }
  
    componentWillUnmount(){
      clearTimeout(this.timeoutHandle);
    } 
  
    navigateWithLoader = () => {
      this.props.navigation.navigate('OtherProfile', { name: 'Other' });
    }
  
    render() {
        return (
          (!this.props.isLoading || this.props.withModal) && <View style={{justifyContent:"space-evenly", flex:1, alignItems:"center"}}>
            <Text>This is Siddhant's profile.</Text>
            <Button
                title="Go to Other's profile"
                onPress={this.navigateWithLoader}
              />
          </View>
        );
    }
    };

export default configLoading(ProfileScreen);
