import React from 'react';
import Loading from './Loading';
import SearchCard from './SearchCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
class SearchQueryArticles extends React.Component
{
    constructor(props) 
    {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
          items: [],
          ArticleID: this.props.location.search.replace("?q=","")
	    };
	}
	componentWillReceiveProps(nextProps)
	{
		console.log("SEARCH ARTICLE");
		const oldProps = this.props
		console.log("PROPS OLD", oldProps);
		console.log("PROPS NEW", nextProps);
		if(oldProps !== nextProps)
		{
			console.log("Search query based articles")
		console.log(nextProps);
		console.log(nextProps.location.search);
		const keyword = nextProps.location.search.replace("?q=","");
		this.setState({ArticleID: keyword});
		console.log("Keyword of query is",keyword);
		const fetchURl = "https://homework8backend.wm.r.appspot.com/searcharticles?q=" + keyword;
        const fetchURl_local = "http://localhost:8000/searcharticles?q=" + keyword;
	    fetch(fetchURl)
	    	.then(res => res.json())
	      	.then(
	        (res) => {
                const messageContent = res.articles.response.docs;
                console.log(messageContent);
	            this.setState({
	            isLoaded: true,
	            messageContent
	            });
	        },
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        })
		}
	}
    componentDidMount() {
        console.log("Search query based articles")
		console.log(this.props);
		console.log(this.props.location.search);
		const keyword = this.props.location.search.replace("?q=","");
		this.setState({ArticleID: keyword});
		console.log("Keyword of query is",keyword);
		const fetchURl = "https://homework8backend.wm.r.appspot.com/searcharticles?q=" + keyword;
        const fetchURl_local = "http://localhost:8000/searcharticles?q=" + keyword;
	    fetch(fetchURl)
	    	.then(res => res.json())
	      	.then(
	        (res) => {
                const messageContent = res.articles.response.docs;
                console.log(messageContent);
	            this.setState({
	            isLoaded: true,
	            messageContent
	            });
	        },
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        })
    }
    render() {
		const { error, isLoaded, messageContent } = this.state;
		console.log("RERENDER SEARCH ARTICLE")
	    if (error) 
	    {
	        return <div>Error: {error.message}</div>;
	    } 
	    else if (!isLoaded)
	    {
            return <div><Loading /></div>;
	    } 
	    else 
        {
            this.articles = this.state.messageContent.map((item) => <SearchCard Article={item} key={item.web_url}/>);
            console.log(this.articles);
            return (
                <>
                <p style={{fontSize:"2em", color: "#700707"}}>Results</p>
				<Container fluid>
                    <Row>
                        {this.articles}
                    </Row>
                </Container>
                </>
            );
        }
    }
}

export default SearchQueryArticles;
