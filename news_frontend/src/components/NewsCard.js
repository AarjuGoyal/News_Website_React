import React from 'react';
import Card from 'react-bootstrap/Card'
// import Modal from 'react-bootstrap/Modal'
// import ModalDialog from 'react-bootstrap/ModalDialog'

import ReactModal from 'react-modal'; 

import { Redirect} from 'react-router-dom';

import {MdShare} from "react-icons/md";

import { EmailShareButton, FacebookShareButton,TwitterShareButton, TwitterIcon, EmailIcon,
    FacebookIcon } from "react-share";
import ReactTooltip from 'react-tooltip';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Image from 'react-bootstrap/Image';

import SectionBadge from './Badge';
class NewsCard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
          showModal: false
        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

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
      renderRedirect = (URL) => {
        if (this.state.redirect) {
            if(!this.props.IsGuardianTimes)
            {
                console.log("Detaliled article page for NY times ", URL);
                var path = '/articleny?id=' + URL.DetailArticleURL;
            
                return <Redirect to={path} />
            }
            else
            {
                console.log("Detaliled article page for Guardian times ", URL);
                var path = "/articleguardian?id=" + URL.DetailArticleURL;

                return <Redirect to={path} />
            }
          
        }
    }
    
    render() 
	{
        const guardian_times = this.props.IsGuardianTimes;
        var Article = this.props.news_desc_card;
		if (!guardian_times)
		{
			const DefaultImgSrcNY = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";	
			var Title = Article.title;
			var Section = Article.section;
			var Description = Article.abstract;
			var PublishedDate = new Date(Article.published_date);
			var Date_String = Article.published_date.substring(0,10);

            var shareURL = Article.url;
			var ImgSrc = DefaultImgSrcNY;
            var DetailArticleURL = Article.url;
            if(Article.multimedia === null)
            {
                console.log("No images");

            }
            else
            {
                for(var i=0; i<Article.multimedia.length; i++)
			    {
                    if(Article.multimedia[i].width > 2000)
                    {
                        ImgSrc = Article.multimedia[i].url;
                        // console.log(ImgSrc);
                        break;
                    }
			    }
            }
						
		}
		else
		{
			const defaultImageGuardian = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
			// console.log(Article)
			var Title = Article.webTitle;
			var Section = Article.sectionId;
			var LongDescription = Article.blocks.body[0].bodyTextSummary;
			var Description = LongDescription.substring(0,350); 
			var PublishedDate = new Date(Article.webPublicationDate);
            var Date_String = Article.webPublicationDate.substring(0,10);
            
            var shareURL = Article.webUrl;
			var ImgSrc = defaultImageGuardian;
            var DetailArticleURL = Article.id;
            // console.log(Article.blocks)
            // console.log(Article.blocks.main)
            
            if(Article.blocks.main == null)
            {
                console.log("empty value");
            }
            else
            {
                var Images = Article.blocks.main.elements[0].assets;
                if(Object.keys(Images).length === 0)
                {
                    console.log("empty value");
                }
                else
                {
                    ImgSrc = Images[Images.length - 1].file;
                }
                
            }
			


		}
		
		return (
            <Card style={{margin: "1em auto", padding: "1em"}}>
                
                    <Row>
                        <Col xs={12} md={3}>
                        <a onClick={this.setRedirect} style={{cursor: "pointer"}}>
                            {this.renderRedirect({DetailArticleURL})}
                            <Image src={ImgSrc} className="news_card_image" thumbnail/>
                        </a>
                        </Col>
                        <Col xs={12} md={9} >
                           <Card.Title>
                            <a onClick={this.setRedirect} style={{cursor: "pointer", display:"inline-block"}}>
                                {this.renderRedirect({DetailArticleURL})}    
                                    {Title}
                            </a>
                            
                            <div onClick={this.handleOpenModal}
                                style = {{cursor: "pointer", display:"inline-block"}}><MdShare /></div>
                            </Card.Title>
                            <ReactModal 
                                isOpen={this.state.showModal}
                                className = "ShareModal"
                                overlayClassName="Overlay"
                                contentLabel="Minimal Modal Example">
                                <div style={{height: "30%"}}>   
                                <div onClick={this.handleCloseModal}
                                style={{position: "absolute",right:"1%", cursor: "pointer"}}
                                >&#10006;</div>
                                
                                <p style={{fontSize:"1.3em"}}>{Title}</p>

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
                                                    <FacebookShareButton data-tip="Facebook" url={shareURL} hashtag="CSCI_571_NewsApp">
                                                        <FacebookIcon size={64} round={true} />
                                                        <ReactTooltip />
                                                    </FacebookShareButton>
                                                </td>
                                                <td style={{textAlign: "center", width:"33%"}}>
                                                    <TwitterShareButton data-tip="Twitter" url={shareURL} hashtags={["CSCI_571_NewsApp"]}>
                                                        <TwitterIcon size={64} round={true}/>
                                                        <ReactTooltip />
                                                    </TwitterShareButton>
                                                </td>
                                                <td style={{textAlign: "center", width:"33%"}}>
                                                <EmailShareButton data-tip="Email" url={shareURL} subject={"#CSCI_571_NewsApp"}>
                                                    <EmailIcon size={64} round={true}/>
                                                </EmailShareButton>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                </ReactModal>
                    <Card.Body>      
                            <a onClick={this.setRedirect} style={{cursor: "pointer", display:"inline-block"}}>
                                {this.renderRedirect({DetailArticleURL})} 

                                <Card.Text>
                                    {Description}
                                </Card.Text>
                                
                                <Card.Text>
                                    {Date_String}
                                    {/* <SectionBadge section={Section}/> */}
                                {/* </Card.Text>
                                <Card.Text> */}
                                    {/* {Date_String} */}
                                    <SectionBadge section={Section}/>
                                </Card.Text>
                                
                                
                            </a>
                        
                    </Card.Body>
                    </Col>
                    </Row>
                
            </Card>

		);
	}	
}

export default NewsCard;