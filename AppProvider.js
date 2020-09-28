// import React, { Component } from "react"
// import AppLoader from './AppLoader'
// export const AppContext = React.createContext({})
// export const AppConsumer = AppContext.Consumer

// export class AppProvider extends Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         loading:false,
//         loaderInfo:'',
//       }
//     }
//     showProgress = (info) =>this.setState({loading:true, loaderInfo:info})
//     hideProgress = () =>this.setState({loading:false})
//     render() {
//       const {loading}=this.state
//       const {loaderInfo}=this.state
//       const funcs = { 
//         showLoader:this.showProgress,
//         hideLoader:this.hideProgress 
//       }
//       return (
//         <AppContext.Provider value={funcs}>
//           {this.props.children}
//           {/* other global component  */}
//          <AppLoader isLoaderShow={loading} loaderInfo={loaderInfo}/>
//         </AppContext.Provider>
//       )
//     }
//   }
