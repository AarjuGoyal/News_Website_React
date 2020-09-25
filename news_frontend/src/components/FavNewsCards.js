import React from 'react';
import Card from 'react-bootstrap/Card'

import ReactModal from 'react-modal'; 

import { Redirect} from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
import {FaTrashAlt} from "react-icons/fa";
import {MdShare} from "react-icons/md";
import { EmailShareButton, FacebookShareButton,TwitterShareButton, TwitterIcon, EmailIcon,
    FacebookIcon } from "react-share";

import { toast } from 'react-toastify';
import Col from 'react-bootstrap/Col';

import SectionBadge from './Badge';


class FavNewsCard extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        const Article = this.props.Article;
        console.log("Article recieved is ", Article);
        var Atitle = Article.Headline;
        var AImgSrc = Article.Img;
        var A_ArticleID = Article.ID;
        var ADate = Article.Date;
        var ASection = Article.Section;
        console.log("Section is ", ASection);
        var AshareURL = Article.share;
        var IsGuardianTimes = Article.isGuardian;

        
        this.state = {
            isOpen: false,
            isGuardian: IsGuardianTimes,
            title: Atitle,
            ImgSrc : AImgSrc,
            Date: ADate,
            Section: ASection,
            shareURL: AshareURL,
            ArticleID: A_ArticleID,
            shortHeadline: Atitle.substring(0,70) + '...'
        }



    }
    handleOpenModal () 
    {
        this.setState({ showModal: true });
    }
      
    handleCloseModal () {
        this.setState({ showModal: false });
    }
    setRedirect = () => 
      {
          this.setState({redirect: true});
          
    }
    renderRedirect = () => 
    {
          if (this.state.redirect) {
              if(!this.state.isGuardian)
              {
                  console.log("Detaliled article page for NY times ", this.state.ArticleID);
                  var path = '/articleny?id=' + this.state.ArticleID;
                  return <Redirect to={path} />
              }
              else
              {
                  console.log("Detaliled article page for Guardian times ", URL);
                  var path = "/articleguardian?id=" + this.state.ArticleID;
  
                  return <Redirect to={path} />
              }
            
          }
    }
    removeFavorite = () =>
    {
        console.log("Remove a favorite ");
        toast("Removing- " + this.state.title, {
            position: toast.POSITION.TOP_CENTER,
            className: 'foo-bar'
          });
        this.props.remBM(this.state.ArticleID, this.state.title);

    }
    
    render()
    {
        

        
        return (
            <Col xs={12} md={3}>
                <Card style={{marginTop:"1em",
                            marginLeft: "0.5em",
                            padding: "0.75em" }}> 
                    <Card.Title style={{fontSize:"1em", display:"inline-block"}}>
                        {this.state.shortHeadline}
                        <div onClick={this.handleOpenModal}
                            style = {{cursor: "pointer", display:"inline-block"}}><MdShare /></div>

                        <div onClick={this.removeFavorite}
                            style = {{cursor: "pointer", display:"inline-block"}}><FaTrashAlt /></div>
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
                                <p style={{fontSize:"1.3em", textAlign: "center"}}>{this.state.isGuardian ? "GUARDIAN TIMES": "NY TIMES"}</p>
                                <p style={{fontSize:"1.3em"}}>{this.state.title}</p>

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
                    <Card.Img src={this.state.ImgSrc} className = "news_deck_card_image" thumbnail/>
                    <br></br>
                    <Card.Body>
                        <span>
                        {this.state.Date}
                        </span>

                        <span  style={{position: "absolute" , right: "30%"}}>
                        <SectionBadge section={this.state.Section}/>
                        </span>

                        <span>
                        <SectionBadge source={this.state.isGuardian}/>
                        </span>
                        {" "}
                        
                    </Card.Body>
                    </a>
                </Card>
            </Col>
            
        )
    }
}
export default FavNewsCard;