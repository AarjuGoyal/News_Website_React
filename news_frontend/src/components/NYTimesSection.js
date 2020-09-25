import React from 'react';
import NewsDisplay from './NewsDisplay';
import Loading from './Loading';

class NYTimesSection extends React.Component
{
    constructor(props) 
    {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: []
        };
        
        // console.log("SECTION", this.props.match.params.section);
    }
	
	// componentWillReceiveProps(nextProps){
	// 	this.setState({
	// 		section: nextProps.match.params.section
	// 	})
	// 	console.log("SECTION", this.state.section);
		
	// }
	
    componentDidMount() {
		const section = this.props.section;
		const fetchURl = "https://homework8backend.wm.r.appspot.com/nyTimesSection?section=" + section;
        const fetchURl_local = "http://localhost:8000/nytimesSection?section=" + section;
        fetch(fetchURl)
            .then(res => res.json())
	      	.then(
	        (res) => {
                const messageContent = res.articles.results;
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
                <NewsDisplay message= {messageContent} guardianTimes={false} section={this.section}/>
            );
        }
    }
}

export default NYTimesSection;
