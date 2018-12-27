import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import Divider from '@material-ui/core/Divider';
import {Cancel} from "@material-ui/icons";

import DetailedImageSlider from "./DetailedImageSlider/DetailedImageSlider.component";
import MakeOfferSection from "./MakeOfferSection/MakeOfferSection.component";

export class DetailedRequestListing extends React.Component {
    render() {
        const { item, decideImage, pathToOwnerProfile, allApis, onBack, modeFilter } = this.props;

        return (
            <div className='detailed-listing-renderer'>
                <div className='cancel-button' onClick={() => onBack()}>
                    <Cancel/>
                </div>

                <div className='detailed-image-container'>
                    <Card>
                        <CardContent>
                            <DetailedImageSlider imageSrc={decideImage(item.images, item.ad_format)} />
                        </CardContent>
                    </Card>
                    <div className='detailed-listing-action-section'>
                        {/* <a className='detailed-listing-action'>Save this listing</a>
                        <Divider /> */}
                        <a className='detailed-listing-action'>Add to watch list</a>
                        <Divider />
                    </div>
                </div>

                <Card className='listing-concrete-details-container'>
                    <CardHeader
                        title={item.name}
                    />

                    <Divider />

                    <CardContent className='listing-details-text'>
                        <div className='details-text'>
                            <p>Ad Format: {item.ad_format} {item.classtype}</p>

                            <p>Marketing Medium: {item.medium}</p>

                            <p>Ask Date: {item.date_added.slice(0, 10)}</p>
                        </div>

                        <MakeOfferSection listing={item} {...{ allApis, modeFilter }} />

                        <div className='details-text' style={{ marginTop: '24px' }}>{item.description}</div>
                    </CardContent>
                </Card>

                <div className='poster-info-container'>
                    <Card>
                        <CardHeader
                            title={`Advertiser`}
                        />
                        <CardContent>
                            <p>$PUBLISHER_NAME</p>
                        </CardContent>
                    </Card>
                    <div className='detailed-listing-action-section'>
                        <a className='detailed-listing-action'>Add advertiser to favorites</a>
                        <Divider />
                        <a className='detailed-listing-action'>Contact this advertiser</a>
                        <Divider />
                    </div>
                </div>
            </div>
        )
    }
}
