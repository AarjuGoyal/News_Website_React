import React from 'react';
import NewsCard from './NewsCard';
import Container from 'react-bootstrap/Container';

class NewsDisplay extends React.Component
{
    render()
	{
        console.log("Value of guradian times is ", this.props.guardianTimes);
        var DisplayInfo = this.props.message;   
        if(this.props.guardianTimes)
        {
            this.articles = DisplayInfo.slice(0,10).map(item =>
                <NewsCard news_desc_card={item} IsGuardianTimes={this.props.guardianTimes} key={item.id} section={this.props.section}/>
                );
        }
        else
        {
            this.articles = DisplayInfo.slice(0,10).map(item =>
                <NewsCard news_desc_card={item} IsGuardianTimes={this.props.guardianTimes} key={item.uri} section={this.props.section}/>
                );
        }
        
        return (
                <Container fluid>
                        {this.articles}
                </Container>
			);
	}
}

export default NewsDisplay