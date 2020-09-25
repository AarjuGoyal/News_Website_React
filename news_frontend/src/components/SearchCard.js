import React from 'react';
import Card from 'react-bootstrap/Card'

import ReactModal from 'react-modal'; 

import { Redirect} from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
// import {FaShareAlt} from "react-icons/fa";
import {MdShare} from "react-icons/md";

import { EmailShareButton, FacebookShareButton,TwitterShareButton, TwitterIcon, EmailIcon,
    FacebookIcon } from "react-share";

import SectionBadge from './Badge';
import Col from 'react-bootstrap/Col';

class SearchCard extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        const DefaultImgSrc = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"


        const Article = this.props.Article;
        console.log("Article recieved is ", Article);
        var Atitle = Article.headline.main;
        
        var AImgSrc = DefaultImgSrc;
        
        var Images = Article.multimedia;
        if(Images === null)
        {
            console.log("No images");

        }
        else
        {
            for(var i=0; i<Article.multimedia.length; i++)
            {
                if(Images[i].width > 2000)
                {
                    AImgSrc = Images[i].url;
                    // console.log(ImgSrc);
                    AImgSrc = " https://www.nytimes.com/" + AImgSrc;
                    break;
                }
            }
        }
        
        var A_ArticleID = Article.web_url;
        var ADate = Article.pub_date.substring(0,10);
        var ASection = Article.section_name;


        this.state = {
            isOpen: false,
    
            title: Atitle.substring(0,70) + '...',
            FullHeadline: Atitle,
            ImgSrc : AImgSrc,
            Date: ADate,
            Section: ASection,
            ArticleID: A_ArticleID
        }

    }
    handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }
      setRedirect = () => 
      {
          this.setState({redirect: true});
          
      }
        renderRedirect = () => {
          if (this.state.redirect) {
            //   if(!this.props.IsGuardianTimes)
            //   {
            //       console.log("Detaliled article page for NY times ", this.state.ArticleID);
            //       var path = '/articleny?id=' + this.state.ArticleID;
            //       // return <Link 
            //       //         to={{pathname: path,
            //       //         state: {weburl: URL}
            //       //         }}
            //       //         />
  
            //       return <Redirect to={path} />
            //   }
            //   else
            //   {
            //       console.log("Detaliled article page for Guardian times ", URL);
            //       var path = "/articleguardian?id=" + this.state.ArticleID;

  
            //       return <Redirect to={path} />
            //   }

            console.log("Detaliled article page for NY times ", this.state.ArticleID);
                  var path = '/articleny?id=' + this.state.ArticleID;
                  // return <Link 
                  //         to={{pathname: path,
                  //         state: {weburl: URL}
                  //         }}
                  //         />
  
                  return <Redirect to={path} />
            
          }
      }
    render()
    {
        
    ;

        
        return (
            <Col xs={12} md={3}>
                <Card style={{marginTop:"1em",
                            marginLeft: "1em" }}> 
                    <Card.Title style={{fontSize:"1em", display:"inline-block"}}>
                        {this.state.title}
                        <div onClick={this.handleOpenModal}
                            style = {{cursor: "pointer", display:"inline-block"}}><MdShare /></div>
                    </Card.Title>
                    <div>
                                
                                <ReactModal 
                                isOpen={this.state.showModal}
                                className = "ShareModal"
                                overlayClassName="Overlay"
                                contentLabel="Minimal Modal Example">
                                <div style={{height: "30%"}}>   
                                <div onClick={this.handleCloseModal}
                                style={{position: "absolute",right:"1%", cursor: "pointer"}}
                                >&#10006;</div>
                                
                                <p style={{fontSize:"1.3em"}}>{this.state.FullHeadline}</p>

                                </div>
                                <hr/>
                                
                                <div style={{height: "70%"}}>
                                    <div>
                                        <p style={{textAlign: "center", fontSize: "1.3em"}}>Share Via</p>
                                    </div>
                                    <table style={{border:"2 px solid black",width:"100%"}}>
                                        <tbody>
                                            <tr>
                                                <td style={{textAlign: "center", width:"33%"}}>
                                                    <FacebookShareButton data-tip="Facebook" url={this.state.shareURL} hashtag="CSCI_571_NewsApp">
                                                        <FacebookIcon size={64} round={true} />
                                                        <ReactTooltip />
                                                    </FacebookShareButton>
                                                </td>
                                                <td style={{textAlign: "center", width:"33%"}}>
                                                    <TwitterShareButton data-tip="Twitter" url={this.state.shareURL} hashtags={["CSCI_571_NewsApp"]}>
                                                        <TwitterIcon size={64} round={true}/>
                                                        <ReactTooltip />
                                                    </TwitterShareButton>
                                                </td>
                                                <td style={{textAlign: "center", width:"33%"}}>
                                                <EmailShareButton data-tip="Email" url={this.state.shareURL} subject={"#CSCI_571_NewsApp"}>
                                                    <EmailIcon size={64} round={true}/>
                                                </EmailShareButton>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                </ReactModal>
                    </div>
                    <a onClick={this.setRedirect} style={{cursor: "pointer"}}>
                    {this.renderRedirect()}
                    <Card.Img src={this.state.ImgSrc} className = "news_deck_card_image"/>
                    
                    <Card.Body>
                        {this.state.Date}
                        <SectionBadge section={this.state.Section} />
                    </Card.Body>
                    </a>
                </Card>
            </Col>
            
        )
    }
}
export default SearchCard;