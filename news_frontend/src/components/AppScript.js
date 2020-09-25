import React from 'react';
import {withRouter} from 'react-router-dom'
class AppScript extends React.Component {

    componentWillMount() {
      this.unlisten = this.props.history.listen((location, action) => {
        console.log("ROUTE CHANGE", location);
        console.log("PATH", location.pathname);
        // this.props.getPath(location.pathname);
        if(location.pathname == '/articleguardian' || location.pathname == '/articleny' || location.pathname == '/articlesearch' || location.pathname == '/favorites')
        {
            console.log("SPECIAL URL");
            this.props.detailArticle();
        }
        else
        {
            console.log("NOTHING SPECIAL");
            this.props.nonDetailArticle();
        }
      });
    }
    componentWillUnmount() {
        this.unlisten();
    }
    render() {
       return (
           <div>{this.props.children}</div>
        );
    }
  }
  export default withRouter(AppScript);