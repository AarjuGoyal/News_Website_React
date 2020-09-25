import React from 'react';
import NewsDisplay from './NewsDisplay';
import Loading from './Loading';

class GuardianTimesSection extends React.Component
{
	constructor(props) 
    {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: []
	    };
    }
    
    componentDidMount() {
        const section = this.props.section
		const fetchURL = "https://homework8backend.wm.r.appspot.com/guardianTimesSection?section=" + section
		const fetchURL_local = "http://localhost:8000/guardianTimesSection?section=" + section
	    fetch(fetchURL)
	    	.then(res => res.json())
	      	.then(
	        (res) => {
                const messageContent = res.articles.response.results;
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
                <NewsDisplay message= {messageContent} guardianTimes={true} section={this.section}/>
            );
        }
    }
}

export default GuardianTimesSection