import React from 'react';
import Loading from './Loading';
import DetailedArticle from './DetailArticle';

class ArticleNY extends React.Component
{
    constructor(props) 
    {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
		  items: [],
		  ArticleID: this.props.location.search.replace("?id=","")
        };
        
        
    }
     
    componentDidMount() {
		console.log("articleNY")
		console.log(this.props);
		console.log(this.props.location.search);
        const weburl = this.props.location.search.replace("?id=","");
		console.log("Web url for article ", weburl);
		const fetchURl = "https://homework8backend.wm.r.appspot.com/nytimesArticleSearch?weburl=" + weburl;
        const fetchURl_local = "http://localhost:8000/nytimesArticleSearch?weburl=" + weburl;
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
			console.log(this.state.ArticleID);
			return (
                <DetailedArticle message= {messageContent} IsGuardianTimes={false} ArticleID={this.state.ArticleID}/>
            );
        }
    }
}

export default ArticleNY;
