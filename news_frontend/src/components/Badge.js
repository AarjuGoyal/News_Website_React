import React from 'react';
import Badge from 'react-bootstrap/Badge';
import MediaQuery from 'react-responsive';

class SectionBadge extends React.Component {
    constructor(props)
    {
        super(props);
    }
    render()
    {
        var SectionBackgroundColor = "#131061";
        var SectionName = "GUARDIAN";
        var SectionTextColor = "white";

        if(this.props.source != null)
        {
            // console.log("Section is not null ", this.props.section)
            console.log("SOURCE given as", this.props.source)
            if(!this.props.source)
            {
                SectionTextColor = "black";
                SectionName = "NYTIMES";
                SectionBackgroundColor = "#b4b3bd";
            }
        }
        else
        {
            // console.log("Source is null");
            console.log("SECTION given as", this.props.section)
            var Section = this.props.section;
            if(Section != null)
                Section = Section.toLowerCase();

            SectionBackgroundColor = "#808080";
            SectionName = "HEALTH";
            SectionTextColor = "white";
        }
        

        
		if(Section === "world")
		{
			SectionBackgroundColor = "#9933ff";
            SectionName = "WORLD";
            SectionTextColor = "white";
		}	
		else if(Section === "politics" || Section==="us" || Section==="u.s.")
		{
			SectionBackgroundColor = "#339966";
            SectionName = "POLITICS";
            SectionTextColor = "white";
		}	
		else if(Section === "business")
		{
			SectionBackgroundColor = "#3399ff";
            SectionName = "BUSINESS";
            SectionTextColor = "white";
		}
		else if(Section === "technology")
		{
			SectionBackgroundColor = "#dfff66";
            SectionName = "TECHNOLOGY";
            SectionTextColor = "black";
		}
		else if(Section ==="sports" || Section ==="sport")
		{
			SectionBackgroundColor = "#f5b942";
            SectionName = "SPORTS";
            SectionTextColor = "black";
        }
        
        return(
            // <span>
            // <Badge style= {{backgroundColor:SectionBackgroundColor,
            //                         color: SectionTextColor }} className="badge">
            //                         {SectionName}
            //                     </Badge>
            //                     </span>
           <>
                <MediaQuery minDeviceWidth={1224}>
                            <Badge style= {{backgroundColor:SectionBackgroundColor,
                                            position: "absolute",
                                            right: "5%",
                                            margin:"0.5em",
                                            color: SectionTextColor }}>
                                                        {SectionName}
                             </Badge>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={600}>
                    <Badge style= {{backgroundColor:SectionBackgroundColor,
                                    color: SectionTextColor,
                                    position: "relative",
                                    float: "right",
                                    margin:"0.5em" }} >
                                                        {SectionName}
                    </Badge>
                </MediaQuery>
            </>
        );
    }
}



export default SectionBadge;