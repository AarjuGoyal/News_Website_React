import React from 'react';
import NewsDisplay from './NewsDisplay';
import Loading from './Loading';

class GuardianTimes extends React.Component
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
		const path = "https://homework8backend.wm.r.appspot.com/guardiantimes";
		const local_path = "http://localhost:8000/guardianTimes";
	    fetch(path)
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
                <NewsDisplay message= {messageContent} guardianTimes={true}/>
            );
        }
    }
}

export default GuardianTimes