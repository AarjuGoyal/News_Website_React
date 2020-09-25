import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import GuardianTimes from  './components/GuardianTimes'
import NYNews from './components/NYNews'
import NYTimesSection from './components/NYTimesSection'
import GuardianTimesSection from './components/GuardianTimesSection'

import { BrowserRouter, Route, Switch, Link , Router, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';


import ArticleNY from './components/ArticleNY';
import ArticleGuardian from './components/ArticleGuardian';
import HomeNavBar from './components/HomeNavBar';
import Favorites from './components/Favorites';
import SearchQueryArticles from './components/GetSearchArticle';

import Container from 'react-bootstrap/Container';
import AppScript from './components/AppScript';

class AllContent extends React.Component
{
	
	
	constructor(props)
	{
		
		super(props);
		
		this.SetNewsPriority = this.SetNewsPriority.bind(this);
		this.DetailArticleHandler = this.DetailArticleHandler.bind(this);
		this.NonDetailArticle = this.NonDetailArticle.bind(this);
		this.getPathName = this.getPathName.bind(this);
		var guar_val = JSON.parse(localStorage.getItem("NewsPref"));
		console.log("Value of guardian time saved was ", guar_val)
		if(!(guar_val == null))
		{
			this.state = ({
				guardian_times: guar_val,
				ArticleSearch: null
			});
		}
		else
		{
			this.state = ({
				guardian_times: false,
				ArticleSearch: null
			});
		}
		
	}
	
	SetNewsPriority()
	{
		this.setState({guardian_times: !this.state.guardian_times}, () => {
			console.log("New value of guardian times ", this.state.guardian_times);
			localStorage.setItem("NewsPref",JSON.stringify(this.state.guardian_times));
		  });
		
		
	};
	SetArticleSearch = (result) =>
	{
		this.setState({ArticleSearch:result}, () =>
		{ 
			console.log("Value set as ", this.state.ArticleSearch);
			// return (<Redirect to='/articlesearch' />)
		});
	};
	DetailArticleHandler = () =>
	{
		console.log("DETAIL ARTICLE PAGE");
		this.setState({DetailArticle: true});

	}
	NonDetailArticle = () =>
	{
		console.log("NON DETAIL Page");
		this.setState({DetailArticle: false});
	}
	getPathName = ({path}) =>
	{
		console.log("Path given as ", path);
		this.setState({currentPath: path});
	}
	render()
    {
		// localStorage.clear();
		var link = window.location.href;
		console.log("ROUTER", link);
		
		if (!this.state.guardian_times)
		{
			return (
				<>
				<AppScript detailArticle={this.DetailArticleHandler} nonDetailArticle={this.NonDetailArticle} getPath={this.getPathName}/>

				<HomeNavBar NewsChangeHandler={this.SetNewsPriority} isGuardian={this.state.guardian_times} SearchArticle={this.SetArticleSearch} isDetailed={this.state.DetailArticle}/>

				{/* <Switch> */}
					<Route path="/world">
						<NYTimesSection section={"world"} />
					</Route>

					<Route path="/politics">
						<NYTimesSection section={"politics"} />
					</Route>

					<Route path="/business" >
						<NYTimesSection section={"business"} />
					</Route>

					<Route path="/technology" >
						<NYTimesSection section={"technology"} />
					</Route>

					<Route path="/sports">
						<NYTimesSection section={"sports"} />
					</Route>

					<Route path="/articleny" render={ props => <ArticleNY {...props} />} />	
					
					<Route path="/favorites" exact>
							<Favorites />				
					</Route>

					<Route path='/articlesearch' render={ props => <SearchQueryArticles {...props} />} />
						
					

					<Route path="/" exact >
						<NYNews />
					</Route>
				
					
				{/* </Switch> */}
				</>
			);
		}
		else
		{
			return (
				<>
				<AppScript detailArticle={this.DetailArticleHandler} nonDetailArticle={this.NonDetailArticle} />	

				<HomeNavBar NewsChangeHandler={this.SetNewsPriority} isGuardian={this.state.guardian_times} SearchArticle={this.SetArticleSearch} isDetailed={this.state.DetailArticle}/>

				{/* <Switch> */}

					<Route path="/world" >
						<GuardianTimesSection section={"world"} />
					</Route>

					<Route path="/politics" >
					{/* // render={(props) => <GuardianTimesSection {...props} section={"politics"} />} /> */}
						<GuardianTimesSection section={"politics"} />
					</Route>

					<Route path="/business" >
						
						<GuardianTimesSection section={"business"} />
					</Route>

					<Route path="/technology" >

						<GuardianTimesSection section={"technology"} />
					</Route>

					<Route path="/sports" >
						<GuardianTimesSection section={"sport"} />
					</Route>

					<Route path="/articleguardian" render={ props => <ArticleGuardian {...props} />} />
						{/* <ArticleResNavBar />
						<ArticleGuardian />
					</Route> */}

					<Route path="/favorites" exact>
						{/* <FavoriteNavBar /> */}
							<Favorites />
					</Route>  

					<Route path='/articlesearch' render={ props => <SearchQueryArticles {...props} />} />

					<Route path="/articleny" render={ props => <ArticleNY {...props} />} />	
					
					<Route path="/" exact>
						<GuardianTimes />
					</Route>
            	{/* </Switch> */}
				</>
			);
		}
    }
}
export default withRouter(AllContent);
// // class NavBar 
ReactDOM.render(
	<>
<BrowserRouter>
  <AllContent/>
</BrowserRouter>
  </>,
  document.getElementById("root")
);
