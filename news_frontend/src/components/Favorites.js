import React from 'react';
import FavNewsCard from './FavNewsCards';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Favorites extends React.Component 
{
    constructor(props)
    {
        super(props);
        console.log("Favoties items")
        var bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems'))
        console.log(bookmarkedItems);

        this.state = {
            favorites: bookmarkedItems
        }
    }
    removeBookmark = (ArticleID, ArticleHeadline) =>
    {
        //console.log("Removing article ", ArticleID, "from the bookmark list");
        var remove_items = [];
        var bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems'));
        console.log("BOOKMARK" , bookmarkedItems);
        for(var i=0; i<bookmarkedItems.length; i++)
        {
            if(bookmarkedItems[i].ID === ArticleID)
            {
                 var remove_id = i;
                 console.log("remove_id is ", remove_id);
            }
        }
        //console.log("Removing items ", remove_id);
        //console.log("BOOKMARK" , bookmarkedItems);

        bookmarkedItems.splice(remove_id,1);
        console.log("BOOKMARK" , bookmarkedItems);
        localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarkedItems));
            // this.setState({ favorites: bookmarkedItems }, ()=> {window.location.reload(false);});
        this.setState({favorites: bookmarkedItems});
            
    }
    componentDidMount()
    {
        var bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems'))
        console.log("LOCALSTORAGE", bookmarkedItems);
        this.setState({favorites: bookmarkedItems});
    }
    render()
    {
        console.log("Favoties items")
        var bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems'))
        console.log(bookmarkedItems);
        if(this.state.favorites === null || this.state.favorites.length === 0)
            {
            return (
                <>
                <Container fluid>
            <ToastContainer autoClose={1000}/>
            <p style={{fontSize:"1em", textAlign: "center"}}>You have no saved articles</p>
            </Container>
            </>);
            }
        else
        {
        //     this.favArticles = {};
        //     var bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems'))
        // console.log(bookmarkedItems);

            // this.favArticles = this.state.favorites.map((item) =>
            // <FavNewsCard Article={item} remBM={this.removeBookmark}/>
            // );
            console.log("FAVORITE ITEM ARRAY", this.state.favorites);
            console.log("FAVORITE ITEMS", this.favArticles);
            
            return(
                <>
                <Container fluid>
                <ToastContainer autoClose={1000}/>
                <p style={{fontSize:"2em", color: "#700707"}}>Favorites</p>
				
                    <Row>
                        {this.state.favorites.map((item) => {return <FavNewsCard Article={item}  key = {item.ID} remBM={this.removeBookmark}/>}
            
                        )}
                    </Row>
                </Container>
                </>
            );
        }

         

        
    }
}

export default Favorites;