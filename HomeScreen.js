import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  Button,
} from 'react-native';
import configLoading from './AppLoader';

class HomeScreen extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
        this.props.setLoaderPropsState(loader = {

          // Change the name of the loader to :--
          // 1. rollerCoaster
          // 2. circularProgress
          // 3. linearProgress

          name: 'circularProgress',

          // Change the properties as required
          properties : {
             colorOfLoader: 'tomato',
             colorOftext: 'tomato',
             fontSize: 20,
             innerFontSize: 18,
             innerFontColor: 'tomato',
             },
        });
        this.props.setProgressPercentWithDuration(37,5000);
        this.props.setLoading(true); 
        this.props.setLoadingMessage("Loading ....");
        this.props.setLoadingWithModal(false);
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
            this.props.setLoadingWithModal(false);
      }, 25000);
    }
    
    componentWillUnmount(){
      clearTimeout(this.timeoutHandle);
    } 

    navigateWithLoader = () => {
        this.props.navigation.navigate('Profile', { name: 'Siddhant' });
    }
    render(){
            return (
                   (!this.props.isLoading || this.props.withModal) && <View style={{justifyContent:"center", flex:1, alignItems:"center"}}>
                    <View style={{justifyContent:"center", flex:1, alignItems:"center"}}>
                        <Button
                          title="Go to Siddhant Profile"
                          onPress={this.navigateWithLoader}
                        />
                    </View>
             </View>
            );
    }
};

  export default configLoading(HomeScreen);

  