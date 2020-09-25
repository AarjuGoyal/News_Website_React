import React from 'react';
import Loading from './Loading';
import DetailedArticle from './DetailArticle';

class ArticleGuardian extends React.Component
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
        const weburl = this.props.location.search.replace("?id=","");
		console.log("Web url for article ", weburl);
		const fetchURl = "https://homework8backend.wm.r.appspot.com/guardianArticleSearch?weburl=" + weburl;
        const fetchURl_local = "http://localhost:8000/guardianArticleSearch?weburl=" + weburl;
        fetch(fetchURl)
            .then(res => res.json())
	      	.then(
	        (res) => {
                const messageContent = res.articles.response;
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
            return (
                <DetailedArticle message= {messageContent} IsGuardianTimes={true} ArticleID={this.state.ArticleID}/>
            );
        }
    }
}

export default ArticleGuardian;
