import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import { EmailShareButton, FacebookShareButton,TwitterShareButton, TwitterIcon, EmailIcon,
    FacebookIcon } from "react-share";
import CommentsInPage from './commentInPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip'
import {FaRegBookmark, FaBookmark} from "react-icons/fa";
import { IconContext } from "react-icons";

import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/button';
import MediaQuery from 'react-responsive';

function BookMarkIcon(props)
{
    const isBookMarked = props.isBookMarked;
    console.log(isBookMarked);
    if(isBookMarked)
    {
        
        return (
            <IconContext.Provider value={{ color: "#de1437", className: "marked_bookmark", cursor:"pointer" }}>
                <div>
                    <FaBookmark size={25} data-tip="Bookmark" />
                </div>
            </IconContext.Provider>
        );
    }
    else
    {
        
        return (
            <IconContext.Provider value={{ color: "#de1437", className: "marked_bookmark" }}>
                <div>
                    <FaRegBookmark size={25} data-tip="Bookmark"/>
                </div>
            </IconContext.Provider>
        );
    }
}

function MoreInfo(props) {
    const [open, setOpen] = useState(false);
  const content = props.content
    return (
      <>
        
        <Collapse in={open}>
          <div id="example-collapse-text">
          {content}
          </div>
        </Collapse>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          style={{backgroundColor:"#007bff00", border: "none", position:"relative", float:"right"}}
        >
          {open ?  <i class="arrow up"></i> : <i class="arrow down"></i>}
        </Button>
      </>
    );
  }
  

class DetailedArticle extends React.Component
{
    constructor(props)
    {
        super(props);
        var bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems'));
        var bookmark_flag = 0
        if(bookmarkedItems === null)
        {
            console.log("not bookmarked");
                this.state = {
            isBookMarked: false
            }
        }
        else
        {
            for(var i=0; i<bookmarkedItems.length; i++)
            {
                if(bookmarkedItems[i].ID == this.props.ArticleID)
                {
                    bookmark_flag = 1;
                    break;
                }
            }
            if(bookmark_flag === 1)
            {
                console.log("Alreeady bookmarked item");
                this.state = {
                    isBookMarked: true
                }  
            }
            else
            {
                console.log("not bookmarked");
                    this.state = {
                isBookMarked: false
                }
            }
        }
        
        
        
        // if(localStorage.getItem())

    }
    
    render()
    {
        const changeBookMark = () => {
            if(this.state.isBookMarked)
            {
                toast("Removing- " + headline, {
                    position: toast.POSITION.TOP_CENTER,
                    className: 'foo-bar'
                  });;
            }
            else
            {
                toast("Saving- " + headline, {
                    position: toast.POSITION.TOP_CENTER,
                    className: 'foo-bar'
                  });
            }
            console.log("Hi ");
            var bookmarkedItems = JSON.parse(localStorage.getItem('bookmarkedItems'));
            if(!this.state.isBookMarked)
            {
                var Item = {};
                    Item["ID"] = ArticleID;
                    Item["Img"] = ImgSrc;
                    Item["Headline"] = headline;
                    Item["Date"] = date_format;
                    Item["Section"] = section;
                    Item["share"] = shareURL;
                    Item["isGuardian"] = guardian_times;
                console.log(Item);
                if(bookmarkedItems == null)
                {
                    localStorage.setItem("bookmarkedItems", JSON.stringify([Item]))
                    
                }
                else
                {
                    bookmarkedItems.push(Item);
                    localStorage.setItem("bookmarkedItems", JSON.stringify(bookmarkedItems))
                }
            }
            else
            {
                var remove_items = [];
                for(var i=0; i<bookmarkedItems.length; i++)
                {
                    if(bookmarkedItems[i].ID == ArticleID)
                    {
                        remove_items.push(i)   
                    }
                }
                for(var j=0; j<remove_items.length; j++)
                {
                    bookmarkedItems.splice(remove_items[j]);

                }
                localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarkedItems));
            }
            
            
            this.setState({ isBookMarked: !this.state.isBookMarked});
        }
        const guardian_times = this.props.IsGuardianTimes;
        const DefaultImgSrcNY = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        const defaultImageGuardian = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";

        if(!guardian_times)
        {
            console.log("hello there");
        
            var articleDetail = this.props.message[0];
            var headline = articleDetail.headline.main;
            var publsihed_date = new Date(articleDetail.pub_date);
            var description = articleDetail.abstract;
            var date_format = articleDetail.pub_date.substring(0,10);
            var shareURL = articleDetail.web_url;

            var section = articleDetail.section_name;
            console.log("value of share URL is ", shareURL);

            var ArticleID = this.props.ArticleID;
            console.log("value for NY times article ID ", ArticleID);
            var ImgSrc = DefaultImgSrcNY;
            for(var i=0; i<articleDetail.multimedia.length; i++)
			{
				if(articleDetail.multimedia[i].width > 2000)
				{
					ImgSrc = articleDetail.multimedia[i].url;
					console.log(ImgSrc);
					break;
				}
            }
            if(ImgSrc.substring(0,4) != 'http')
            {
                console.log("Image is reference");
                ImgSrc = "https://nytimes.com/" + ImgSrc; 
            }
        }
        else
        {
            console.log("Guardian Times detailed article");
            var articleDetail = this.props.message.content;
            var headline = articleDetail.webTitle;
            var publsihed_date = new Date(articleDetail.webPublicationDate)
            var description = articleDetail.blocks.body[0].bodyTextSummary;
            var date_format = articleDetail.webPublicationDate.substring(0,10);
            var shareURL = articleDetail.webUrl;
            console.log("value of share URL is ", shareURL);
            var section = articleDetail.sectionId;
            var ArticleID = this.props.ArticleID;
            console.log("ID for guardian times article ", ArticleID);
            var ImgSrc = defaultImageGuardian;
            var Images = articleDetail.blocks.main.elements[0].assets;
            if(Object.keys(Images).length === 0 )
            {
                console.log("empty value");
            }
            else
            {
                ImgSrc = Images[Images.length - 1].file;
            }
            
        }
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            var month = month[publsihed_date.getMonth()];
            var day = publsihed_date.getDay();
            var year = publsihed_date.getFullYear();
            var date_string = day + " " + month + " " + year;

            const length_para = 60;
            var expand = 0;
            var description_lines = description.split('.');
            var short_description = "";
            var long_description = "";
            if(description_lines.length >= 4)
            {
                expand = 1;
                short_description = description_lines[0] + "." + description_lines[1] + "." + description_lines[2] + "." + description_lines[3] + "." ;
                for(var i=4; i<=description_lines.length; i++)
                {
                    long_description = long_description + description_lines[i] + ".";
                }
            }
            else
            {
                short_description = description;
            }
            console.log("Description: ", description, " Short description ", short_description, " long des ription ", long_description);

        return(
            <>
                {/* <ArticleResNavBar /> */}
                <ToastContainer autoClose={2000}/>
                <Card style={{width: "97%",
                padding: "1em",
                margin: "1em auto" }}>      
                    <Card.Body>
                        <Card.Title>{headline}</Card.Title>
                        <Card.Text>
                        {date_format}
                        <MediaQuery minDeviceWidth={1224}>

                            <div style={{
                                position:"absolute",
                                right: "10%" , 
                                display: "inline-block"

                            }}>
                            
                            <FacebookShareButton data-tip="Facebook" url={shareURL} hashtag="CSCI_571_NewsApp">
                                <FacebookIcon size={26} round={true} />
                                <ReactTooltip />
                            </FacebookShareButton>
                            
                            
                            <TwitterShareButton data-tip="Twitter" url={shareURL} hashtags={["CSCI_571_NewsApp"]}>
                                <TwitterIcon size={26} round={true}/>
                                <ReactTooltip />
                            </TwitterShareButton>
                            <EmailShareButton data-tip="Email" url={shareURL} subject={"#CSCI_571_NewsApp"}>
                                <EmailIcon size={26} round={true}/>
                            </EmailShareButton>
                        
                            </div>
                            
                            <div style={{
                                position:"absolute",
                                right: "5%" ,
                                display: "inline-block"
                            }}>
                                {/* <FaRegBookmark className="Bookmark" size={25} data-tip="Bookmark" onClick={changeBookMark}/> */}
                                <div onClick={changeBookMark}>
                                <BookMarkIcon isBookMarked={this.state.isBookMarked} title={headline}/>
                                </div>
                            </div>
                            
                        </MediaQuery>

                        <MediaQuery maxDeviceWidth={600}>

                            <div style={{
                                position:"absolute",
                                right: "18%" , 
                                display: "inline-block"

                            }}>
                            
                            <FacebookShareButton data-tip="Facebook" url={shareURL} hashtag="CSCI_571_NewsApp">
                                <FacebookIcon size={26} round={true} />
                                <ReactTooltip />
                            </FacebookShareButton>
                            
                            
                            <TwitterShareButton data-tip="Twitter" url={shareURL} hashtags={["CSCI_571_NewsApp"]}>
                                <TwitterIcon size={26} round={true}/>
                                <ReactTooltip />
                            </TwitterShareButton>
                            <EmailShareButton data-tip="Email" url={shareURL} subject={"#CSCI_571_NewsApp"}>
                                <EmailIcon size={26} round={true}/>
                            </EmailShareButton>
                        
                            </div>
                            
                            <div style={{
                                position:"absolute",
                                right: "10%" ,
                                display: "inline-block"
                            }}>
                                {/* <FaRegBookmark className="Bookmark" size={25} data-tip="Bookmark" onClick={changeBookMark}/> */}
                                <div onClick={changeBookMark}>
                                <BookMarkIcon isBookMarked={this.state.isBookMarked} title={headline}/>
                                </div>
                            </div>
                            
                        </MediaQuery>
                        </Card.Text>

                        <Card.Img src={ImgSrc} />
                        <Card.Text>
                        {short_description}
                        {expand ? <MoreInfo content={long_description} />: <></>}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <CommentsInPage id={ArticleID}/>
            </>
        );
    }
}
export default DetailedArticle;