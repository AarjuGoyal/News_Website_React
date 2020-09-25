
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';

import Toggle from "react-toggle";
import "react-toggle/style.css";
import {FaRegBookmark} from "react-icons/fa";
import {FaBookmark} from "react-icons/fa";
import _ from "lodash";

import AsyncSelect from 'react-select/lib/Async';

import {Redirect, Link } from 'react-router-dom';

import MediaQuery from 'react-responsive';
import ReactTooltip from 'react-tooltip'
import {withRouter} from 'react-router-dom'
class HomeNavBar extends React.Component
{
	constructor(props)
	{
		super(props);
		console.log("NAVBAR ");
		
		var link = window.location.pathname;
		console.log("INITIAL PATH", link)
		var link_search = window.location.search;
		console.log("SEARCH", link_search);
		if(link.includes('/favorites'))
		  {
			console.log("CURRENT PATH FAVORITE");
			this.state = ({
				opacityHome: "0.5",
				opacityWorld: "0.5",
				opacityBusiness:"0.5",
				opacityPolitics: "0.5",
				opacitySports: "0.5",
				opacityTechnology: "0.5",
				displayRegBookmark: "none",
				displayFillBookmark: "inline-block",
				displayToggleSwitch: "none",
				displayToggleSwitchSmall: "none",
				SearchKey: "null"
			});
			//, ()=> {console.log("SEARCH KEY", this.state.SearchKey); console.log("LOCATION SEARCH KEY", location.search.replace("?q=",""))}
		}
		else if(link.includes('/articlesearch'))
		  {
			console.log("CURRENT PATH ARTICLE SEARCH");
			// console.log("CURRENT QUERY", location.search);
			this.state = ({
				opacityHome: "0.5",
				opacityWorld: "0.5",
				opacityBusiness:"0.5",
				opacityPolitics: "0.5",
				opacitySports: "0.5",
				opacityTechnology: "0.5",
				displayRegBookmark: "inline-block",
				displayFillBookmark: "none",
				displayToggleSwitch: "none",
				displayToggleSwitchSmall: "none",
				SearchKey: {label: link_search.replace("?q=",""), value:"search_key"}
			});
			//, ()=> {console.log("SEARCH KEY", this.state.SearchKey); console.log("LOCATION SEARCH KEY", location.search.replace("?q=","")
			this.searchArticle();

		}
		else if(link.includes('/articleny') || link.includes('/articleguardian'))
		  {
			console.log("CURRENT PATH DETAIL ARTICLE");
			// console.log("CURRENT QUERY", location.search);
			this.state = ({
				opacityHome: "0.5",
				opacityWorld: "0.5",
				opacityBusiness:"0.5",
				opacityPolitics: "0.5",
				opacitySports: "0.5",
				opacityTechnology: "0.5",
				displayRegBookmark: "inline-block",
				displayFillBookmark: "none",
				displayToggleSwitch: "none",
				displayToggleSwitchSmall: "none",
				SearchKey: "null"
			});
			// , ()=> 
			// {
			// 	console.log("SEARCH KEY", this.state.SearchKey); console.log("LOCATION SEARCH KEY", location.search.replace("?q=",""));
				
			// }
		}
		else
		{
			console.log("CURRENT PATH SECTION");
			// console.log("CURRENT QUERY", location.search);
			
			if(link.includes('/world'))
			{
				this.state = ({
				opacityHome: "0.5",
				opacityWorld: "1",
				opacityBusiness:"0.5",
				opacityPolitics: "0.5",
				opacitySports: "0.5",
				opacityTechnology: "0.5",
				displayRegBookmark: "inline-block",
				displayFillBookmark: "none",
				displayToggleSwitch: "inline-block",
				displayToggleSwitchSmall: "block",
				SearchKey: "null"
			});
			}
			else if(link.includes('/business'))
			{
				this.state = ({
				opacityHome: "0.5",
				opacityWorld: "0.5",
				opacityBusiness:"1",
				opacityPolitics: "0.5",
				opacitySports: "0.5",
				opacityTechnology: "0.5",
				displayRegBookmark: "inline-block",
				displayFillBookmark: "none",
				displayToggleSwitch: "inline-block",
				displayToggleSwitchSmall: "block",
				SearchKey: "null"
			});
			}
			else if(link.includes('/politics'))
			{
				this.state = ({
				opacityHome: "0.5",
				opacityWorld: "0.5",
				opacityBusiness:"0.5",
				opacityPolitics: "1",
				opacitySports: "0.5",
				opacityTechnology: "0.5",
				displayRegBookmark: "inline-block",
				displayFillBookmark: "none",
				displayToggleSwitch: "inline-block",
				displayToggleSwitchSmall: "block",
				SearchKey: "null"
			});
			}
			else if(link.includes('/technology'))
			{
				this.state = ({
				opacityHome: "0.5",
				opacityWorld: "0.5",
				opacityBusiness:"0.5",
				opacityPolitics: "0.5",
				opacitySports: "0.5",
				opacityTechnology: "1",
				displayRegBookmark: "inline-block",
				displayFillBookmark: "none",
				displayToggleSwitch: "inline-block",
				displayToggleSwitchSmall: "block",
				SearchKey: "null"
			});
			}
			else if(link.includes('/sports'))
			{
				this.state = ({
				opacityHome: "0.5",
				opacityWorld: "0.5",
				opacityBusiness:"0.5",
				opacityPolitics: "0.5",
				opacitySports: "1",
				opacityTechnology: "0.5",
				displayRegBookmark: "inline-block",
				displayFillBookmark: "none",
				displayToggleSwitch: "inline-block",
				displayToggleSwitchSmall: "block",
				SearchKey: "null"
			});
			}
			else
			{
				this.state = ({
				opacityHome: "1",
				opacityWorld: "0.5",
				opacityBusiness:"0.5",
				opacityPolitics: "0.5",
				opacitySports: "0.5",
				opacityTechnology: "0.5",
				displayRegBookmark: "inline-block",
				displayFillBookmark: "none",
				displayToggleSwitch: "inline-block",
				displayToggleSwitchSmall: "block",
				SearchKey: "null"
			});
			}
		}
		
	}
	componentWillMount() {
		this.unlisten = this.props.history.listen((location, action) => {
		  console.log("ROUTE CHANGE", location);
		  console.log("NAVBAR PATH", location.pathname);
		  
		  if(location.pathname == '/favorites')
		  {
			console.log("CURRENT PATH FAVORITE");
			this.setState({
				opacityHome: "0.5",
				opacityWorld: "0.5",
				opacityBusiness:"0.5",
				opacityPolitics: "0.5",
				opacitySports: "0.5",
				opacityTechnology: "0.5",
				displayRegBookmark: "none",
				displayFillBookmark: "inline-block",
				displayToggleSwitch: "none",
				displayToggleSwitchSmall: "none",
				SearchKey: "none"
			}, ()=> {console.log("SEARCH KEY", this.state.SearchKey); console.log("LOCATION SEARCH KEY", location.search.replace("?q=",""))});
		  }
		  else if(location.pathname == '/articlesearch')
		  {
			console.log("CURRENT PATH ARTICLE SEARCH");
			console.log("CURRENT QUERY", location.search);
			this.setState({
				opacityHome: "0.5",
				opacityWorld: "0.5",
				opacityBusiness:"0.5",
				opacityPolitics: "0.5",
				opacitySports: "0.5",
				opacityTechnology: "0.5",
				displayRegBookmark: "inline-block",
				displayFillBookmark: "none",
				displayToggleSwitch: "none",
				displayToggleSwitchSmall: "none",
				SearchKey: {label: location.search.replace("?q=",""), value:"search_key"}
			}, ()=> {console.log("SEARCH KEY", this.state.SearchKey); console.log("LOCATION SEARCH KEY", location.search.replace("?q=",""));
			this.searchArticle();
		});
		  }

		else if(location.pathname == '/articleny' || location.pathname == '/articleguardian')
		  {
			console.log("CURRENT PATH DETAIL ARTICLE");
			console.log("CURRENT QUERY", location.search);
			this.setState({
				opacityHome: "0.5",
				opacityWorld: "0.5",
				opacityBusiness:"0.5",
				opacityPolitics: "0.5",
				opacitySports: "0.5",
				opacityTechnology: "0.5",
				displayRegBookmark: "inline-block",
				displayFillBookmark: "none",
				displayToggleSwitch: "none",
				displayToggleSwitchSmall: "none",
				SearchKey: "none"
			}, ()=> 
			{
				console.log("SEARCH KEY", this.state.SearchKey); console.log("LOCATION SEARCH KEY", location.search.replace("?q=",""));
				
			});
		}
		else
		{
			console.log("CURRENT PATH SECTION");
			console.log("CURRENT QUERY", location.search);
			this.setState({
				opacityHome: "0.5",
				opacityWorld: "0.5",
				opacityBusiness:"0.5",
				opacityPolitics: "0.5",
				opacitySports: "0.5",
				opacityTechnology: "0.5",
				displayRegBookmark: "inline-block",
				displayFillBookmark: "none",
				displayToggleSwitch: "inline-block",
				displayToggleSwitchSmall: "block",
				SearchKey: "none"
			});
			if(location.pathname == '/world')
			{
				this.setState({
					opacityWorld: "1"
				});
			}
			else if(location.pathname == '/business')
			{
				this.setState({
					opacityBusiness: "1"
				});
			}
			else if(location.pathname == '/politics')
			{
				this.setState({
					opacityPolitics: "1"
				});
			}
			else if(location.pathname == '/technology')
			{
				this.setState({
					opacityTechnology: "1"
				});
			}
			else if(location.pathname == '/sports')
			{
				this.setState({
					opacitySports: "1"
				});
			}
			else
			{
				this.setState({
					opacityHome: "1"
				});
			}
		}
		
		});
	}
	componentWillUnmount() {
		  this.unlisten();
	}
	componentWillReceiveProps(nextProps)
	{
		const oldProps = this.props
		console.log("PROPS OLD", oldProps);
		console.log("PROPS NEW", nextProps);
		
		if(nextProps.location.pathname === '/articlesearch')
		{
			this.setState({SearchKey: {label: nextProps.location.search.replace("?q=", ""), value:"value"} });
		}
	}
	  
	handleSearchChange = async (inputvalue) => {
	try {
			var value = inputvalue;
			console.log(value);
		  	const response = await fetch(
			`https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${value}`,
			{
			  	headers: {
				"Ocp-Apim-Subscription-Key": "645528c5f500464fbe9a9f3af5098971"
			  	}
			});
		  
		  	const data = await response.json();
		  	console.log(data);
	
		  	const resultsRaw = data.suggestionGroups[0].searchSuggestions;
		  	console.log(resultsRaw);
	
			var final_results = [];
		  	for(var i=0; i<resultsRaw.length; i++)
		  	{
			  	final_results.push({value: resultsRaw[i].query, label: resultsRaw[i].query});
		  	}
			console.log(final_results);
		} 
	catch (error) 
		{
		  	console.error(`Error fetching search ${value}`);
		}
			return final_results;
	};
	
	handleResultSelect = (result) => {
			console.log("select value of ", result)
		
			this.setState({selectedResult: result.value, searchQuery: true,SearchKey:result.value });
		};

	searchArticle = () => {
		console.log("Search query submitted: ", this.state.searchQuery)
		if(this.state.searchQuery)
		{
			console.log("Back here");

			var path = "/articlesearch?q=" + this.state.selectedResult;

			console.log("SEARCH", path);
			// var prev_path = location.pathname + location.search;
			// return <Redirect strict to={{
			// 	pathname: "/articlesearch",
			// 	search: "?q=" + this.state.selectedResult,
			// 	query: this.state.selectedResult
			// }}/>

			return <Redirect to={path} />

			// history.push({pathname: '/articlesearch', this.state.selectedResult});

		}	
	}
	
	HomeNav = () =>
	{
		this.setState({
			opacityHome: "1",
			opacityWorld: "0.5",
			opacityBusiness:"0.5",
			opacityPolitics: "0.5",
			opacitySports: "0.5",
			opacityTechnology: "0.5",
			displayRegBookmark: "inline-block",
			displayFillBookmark: "none",
			displayToggleSwitch: "inline-block",
			displayToggleSwitchSmall: "block",
			SearchKey: "null"

		});
	}
	WorldNav = () =>
	{
		console.log("WORLD");
		this.setState({
			opacityHome: "0.5",
			opacityWorld: "1",
			opacityBusiness:"0.5",
			opacityPolitics: "0.5",
			opacitySports: "0.5",
			opacityTechnology: "0.5",
			displayRegBookmark: "inline-block",
			displayFillBookmark: "none",
			displayToggleSwitch: "inline-block",
			displayToggleSwitchSmall: "block",
			SearchKey: "null"

		});
	}
	BusinessNav = () =>
	{
		console.log("BUSINESS");
		
		// this.props.updateURL();
		this.setState({
			opacityHome: "0.5",
			opacityWorld: "0.5",
			opacityBusiness:"1",
			opacityPolitics: "0.5",
			opacitySports: "0.5",
			opacityTechnology: "0.5",
			displayRegBookmark: "inline-block",
			displayFillBookmark: "none",
			displayToggleSwitch: "inline-block",
			displayToggleSwitchSmall: "block"

		});
	}
	PoliticNav = () =>
	{
		console.log("POLITICS");
		// this.props.updateURL();
		
		this.setState({
			opacityHome: "0.5",
			opacityWorld: "0.5",
			opacityBusiness:"0.5",
			opacityPolitics: "1",
			opacitySports: "0.5",
			opacityTechnology: "0.5",
			displayRegBookmark: "inline-block",
			displayFillBookmark: "none",
			displayToggleSwitch: "inline-block",
			displayToggleSwitchSmall: "block"

		});
	}
	TechNav = () =>
	{
		console.log("TECH");
		
		this.setState({
			opacityHome: "0.5",
			opacityWorld: "0.5",
			opacityBusiness:"0.5",
			opacityPolitics: "0.5",
			opacitySports: "0.5",
			opacityTechnology: "1",
			displayRegBookmark: "inline-block",
			displayFillBookmark: "none",
			displayToggleSwitch: "inline-block",
			displayToggleSwitchSmall: "block"

		});
	}
	SportNav = () =>
	{
		this.setState({
			opacityHome: "0.5",
			opacityWorld: "0.5",
			opacityBusiness:"0.5",
			opacityPolitics: "0.5",
			opacitySports: "1",
			opacityTechnology: "0.5",
			displayRegBookmark: "inline-block",
			displayFillBookmark: "none",
			displayToggleSwitch: "inline-block",
			displayToggleSwitchSmall: "block"

		});
	}
	FavoriteNav = () =>
	{
		this.setState({
			opacityHome: "0.5",
			opacityWorld: "0.5",
			opacityBusiness:"0.5",
			opacityPolitics: "0.5",
			opacitySports: "0.5",
			opacityTechnology: "0.5",
			displayRegBookmark: "none",
			displayFillBookmark: "inline-block",
			displayToggleSwitch: "none",
			displayToggleSwitchSmall: "none"

		});
	}
	articleDetailNav = () =>
	{
		this.setState({
			opacityHome: "0.5",
			opacityWorld: "0.5",
			opacityBusiness:"0.5",
			opacityPolitics: "0.5",
			opacitySports: "0.5",
			opacityTechnology: "0.5",
			displayRegBookmark: "inline-block",
			displayFillBookmark: "none",
			displayToggleSwitch: "none",
			displayToggleSwitchSmall: "none"

		});
	}
	render()
	{
		var link = window.location.href;
		console.log(link);
		
		
		return (
			
			<>
			<Navbar collapseOnSelect expand="lg" className="NavBar">
			
				
				<Navbar.Brand>
				<div style={{width:"15em"}}>
					
						<AsyncSelect
							cacheOptions
							placeholder ="Enter Keyword.."
							loadOptions={_.debounce(this.handleSearchChange, 1000, {
								leading: true
							})}
							defaultOptions
							onChange={this.handleResultSelect}
							style={{width: "40em"}}
							value={this.state.SearchKey}	
						>
						</AsyncSelect>

						{this.searchArticle()}
						{/* {this.state.searchQuery ? <Redirect to={{
				pathname: "/articlesearch",
				search: "?q=" + this.state.selectedResult,
				state: {query: this.state.selectedResult}
			}}/>: <></>} */}
				</div>

				</Navbar.Brand>
				
				<Navbar.Toggle aria-controls="auto-navbar-nav" />

				<Navbar.Collapse>


			<Nav.Link as={Link} to="/"  style={{opacity:this.state.opacityHome, color:"white"}} >Home</Nav.Link>
			
			<Nav.Link as={Link} to="/world"  style={{opacity:this.state.opacityWorld, color:"white"}} >World </Nav.Link>
	
			<Nav.Link as={Link} to="/politics"  style={{opacity:this.state.opacityPolitics, color:"white"}} >Politics</Nav.Link>
		
			<Nav.Link as={Link} to="/business" style={{opacity:this.state.opacityBusiness, color:"white"}} >Business</Nav.Link>
	
			<Nav.Link as={Link} to="/technology" style={{opacity:this.state.opacityTechnology, color:"white"}} >Technology </Nav.Link>
	   
			<Nav.Link as={Link} to="/sports" style={{opacity:this.state.opacitySports, color:"white"}}>Sports </Nav.Link>
		
			
			<MediaQuery minDeviceWidth={701}>
			
				<div style={{position: "absolute", right:"5%"}}>	
					
					<Nav.Link as={Link} to='/favorites' style={{display: this.state.displayRegBookmark}}>
					<FaRegBookmark data-tip="Bookmark" size={24} data-tip="Bookmark" color={"white"}/>
					<ReactTooltip />
					</Nav.Link>

					<Nav.Link as={Link} to='/' style={{display: this.state.displayFillBookmark}}>
					<FaBookmark size={24} data-tip="Bookmark" color={"white"}/>
					<ReactTooltip />
					</Nav.Link>
				
					

					<Nav.Item style={{display: "inline"}}>
						<div style={{display: this.state.displayToggleSwitch}} >
						<span style={{color:"white"}} data-tip="NYTimes">NYTimes{"  "} <ReactTooltip /></span>
						<Toggle
							checked={this.props.isGuardian}
							icons={false}
							className='NewsToggle'
							onChange={this.props.NewsChangeHandler}
						/>
						<span style={{color:"white"}} data-tip="Guardian Times">Guardian Times <ReactTooltip /></span>
						</div>
					</Nav.Item>
				</div>
			</MediaQuery>

			<MediaQuery maxDeviceWidth={700}>
			
					
					<Nav.Link as={Link} to='/favorites'  style={{display: this.state.displayRegBookmark}}>
					<FaRegBookmark size={24} data-tip="Bookmark" color={"white"}/>
					</Nav.Link>

					<Nav.Link as={Link} to='/'  style={{display: this.state.displayFillBookmark}}>
					<FaBookmark size={24} data-tip="Bookmark" color={"white"}/>
					</Nav.Link>

					<div style={{display: this.state.displayToggleSwitchSmall}} >
				<Nav.Item style={{margin:"1em"}}>
					<span style={{color:"white"}} data-tip="NYimes">NYTimes <ReactTooltip /></span>
				</Nav.Item>
				<Nav.Item>
					<Toggle
						checked={this.props.isGuardian}
						icons={false}
						className='NewsToggle'
						onChange={this.props.NewsChangeHandler}
					/>
				</Nav.Item>
				<Nav.Item style={{margin:"1em"}}>
					<span style={{color:"white"}} data-tip="Guardian Times">Guardian Times <ReactTooltip /></span>
					
				</Nav.Item>

					</div>
				
			</MediaQuery>
			</Navbar.Collapse>
			</Navbar>

			</>
			);
	}

}

export default withRouter(HomeNavBar);