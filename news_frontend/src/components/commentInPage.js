import React from 'react';
import commentBox from 'commentbox.io';
import qs from 'qs';

class CommentsInPage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {id: this.props.id}
    }
    componentDidMount() {
        const ID = this.props.id;
        console.log("In comment box component did mount")
        
        // this.removeCommentBox = commentBox('5710226380554240-proj', {
        //     createBoxUrl(boxId, pageLocation) {
        
        //         // const queryParams = qs.parse(pageLocation.search.replace('?', ''));
        //         // const relevantParams = {
        //         //     'page_id': queryParams['page_id']
        //         // };
        //         // pageLocation.search = qs.stringify(relevantParams); // we will now include "?page_id=5" in the box URL
        //         pageLocation.hash = boxId + ID; // creates link to this specific Comment Box on your page
        //         console.log(pageLocation.hash);
        //         console.log(pageLocation.href);
        //         return pageLocation.href; // return url string
        //     }
        // });
        this.removeCommentBox = commentBox('5710226380554240-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {
        console.log(this.state.id);
        return (
        
            <div className="commentbox" id={this.state.id} />
        
        );
    }
}
export default CommentsInPage;