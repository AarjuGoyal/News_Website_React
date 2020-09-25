
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';

import {FaRegBookmark} from "react-icons/fa";

import { Search } from "semantic-ui-react";
import _ from "lodash";
import SelectedResult from "./SelectedResult";
class ArticleResNavBar extends React.Component
{
	state = { results: [], selectedResult: null };

  handleSearchChange = async (event, { value }) => {
    try {
      const response = await fetch(
        `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${value}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "645528c5f500464fbe9a9f3af5098971"
          }
        }
      );
      const data = await response.json();
      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      const results = resultsRaw.map(result => ({ title: result.displayText}));
      this.setState({ results });
    } catch (error) {
      console.error(`Error fetching search ${value}`);
    }
  };

  handleResultSelect = (e, { result }) =>
    this.setState({ selectedResult: result });
	render()
	{

		// const [value, setValue] = useState('yes');
		// const [value, setValue] = useState(0);
		return (

			<Navbar className="NavBar">
			<div className="App">
			<Search
				onSearchChange={_.debounce(this.handleSearchChange, 1000, {
					leading: true
				})}
				results={this.state.results}
				onResultSelect={this.handleResultSelect}
				/>
				<SelectedResult result={this.state.selectedResult} />
			</div>

		    <Nav>
		      <Nav.Link href="/">Home</Nav.Link>
		      <Nav.Link href="/world">World</Nav.Link>
		      <Nav.Link href="/politics">Politics</Nav.Link>
		      <Nav.Link href="/business">Business</Nav.Link>
		      <Nav.Link href="/technology">Technology</Nav.Link>
		      <Nav.Link href="/sports">Sports</Nav.Link>
		    </Nav>
			
			<div className="BookMark_Toggle">
                <Nav.Link href='/favorites'>
				<FaRegBookmark size={24} data-tip="Bookmark" color={"white"}/>
                </Nav.Link>
			</div>
			
		 	</Navbar>

			);
	}

}

export default ArticleResNavBar;