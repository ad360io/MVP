/*
Core Libs
*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';

/*
Material UI Components
*/
// import {Card, CardText, CardTitle} from 'material-ui/Card';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

/*
React Bootstrap
*/
//import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';
import {Button} from 'react-bootstrap';

/*
Placeholder Images
*/
import branded_content_ph from '../../../../assets/images/branded_content_placeholder.png';
import influencer_marketing_ph from '../../../../assets/images/influencer_marketing_placeholder.png';
import sponsorships_ph from '../../../../assets/images/sponsorships_placeholder.png';
import default_ph from '../../../../assets/images/pug_face.jpg';

/*
Local CSS
*/
import './ListingCard.component.css';


/**
 * Singleton of a Listing display
 *      requires a props of a single listing object.
 */
class ListingCard extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props)

        // Using window.innerWidth in state to acheive responsiveness
        this.state = {
            width: window.innerWidth,
            modalShow: false,
        }

        // Binding functions
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.decideCardWidth = this.decideCardWidth.bind(this);
        this.decideMarginLeft = this.decideMarginLeft.bind(this);
        this.decidePlaceholderImage = this.decidePlaceholderImage.bind(this);
        this.decideTitleDisplayText = this.decideTitleDisplayText.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.decideContactInfo = this.decideContactInfo.bind(this);
        this.decideDescription = this.decideDescription.bind(this);
        this.decidePriceTag = this.decidePriceTag.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({...this.state, width: window.innerWidth});
    }

    handleShowModal() {
        this.setState({...this.state, show: true});
    }

    handleHideModal() {
        this.setState({...this.state, show: false});
    }

    /**
     * Based on window width, change card width
     * to avoid too many white spaces on the card
     */
    decideCardWidth() {
        if (this.state.width >= 1550) {
            return '30%';
        } else if (this.state.width >= 1200) {
            return '45%';
        } else {
            return '80%';
        }
    }

    /**
     * On medium to small screens, save space from margin-left
     */
    decideMarginLeft() {
        if (this.state.width >= 1200) {
            return '2%';
        } else {
            return '7%';
        }
    }

    /**
     * Decide placeholder image based on the listing's genre
     */
    decidePlaceholderImage() {
        switch (this.props.listing.ad_format) {
            case 'Branded Content':
                return branded_content_ph;
            case 'Influencer Post':
                return influencer_marketing_ph;
            case 'Sponsorship':
                return sponsorships_ph;
            default:
                return default_ph;
        }
    }

    /**
     * To prevent text flowing over the listing card itself,
     * we can trim the title by calculating amount of space given
     * and replace the rest of title with '...'
     */
    decideTitleDisplayText() {
        // Each character in CardTitle is around 10-13px
        let cardWidthInPercent;
        let drawerSize = 300;

        if (this.state.width >= 1440) {
            // In 3 column mode, each card is 30% of the (full window width - drawer size)
            // To guarantee no visual bug, assume each character is 13px
            cardWidthInPercent = .3

        } else if (this.state.width >= 1200) {
            // In 2 column mode, each card is 45% of the full window width - drawer size
            cardWidthInPercent = .45
        } else {
            // Single column mode, each card is 80% of the full window width
            cardWidthInPercent = .8
        }

        // Drawer closes at small screen, take into account
        if (this.state.width <= 768) {
            drawerSize = 0;
        }

        // Get the count of original title
        // and the count of characters without overflowing
        // to detect if we need '...' at the end of title.
        const numberOfCharOriginal = this.props.listing.name.length;
        const numberOfCharAllowed = Math.floor((this.state.width - drawerSize) * cardWidthInPercent / 13);
        const dotDotDot = (numberOfCharAllowed < numberOfCharOriginal ? '...' : '')
        return this.props.listing.name.slice(0, numberOfCharAllowed) + dotDotDot;
    }

    decideContactInfo() {
        return this.props.listing.owner_name;
    }

    decideDescription() {
        if (this.props.modeFilter === 'Advertiser') {
            return this.props.listing.description;
        } else {
            return this.props.listing.description;
        }
    }

    decidePriceTag() {
        if (this.props.modeFilter === 'Advertiser') {
            return (this.props.listing.price ? this.props.listing.price : 0) + ' ' + this.props.listing.currency.toUpperCase();
        } else {
            return '';
        }
    }

    render() {
        return <NavLink to={'/listing/' + this.props.listing.id}>
            {this.props.viewModeFilter === 'Grid'
                ? <GridCardRenderer
                    width={this.decideCardWidth()}
                    marginLeft={this.decideMarginLeft()}
                    contactInfo={this.decideContactInfo()}
                    priceTag={this.decidePriceTag()}
                    title={this.decideTitleDisplayText()}
                    placeholderImage={this.decidePlaceholderImage()}
                    description={this.decideDescription()}
                    id={this.props.listing.id}
                    dateAdded={this.props.listing.date_added}
                />
                : <ListingCardRenderer
                    marginLeft={this.decideMarginLeft()}
                    contactInfo={this.decideContactInfo()}
                    priceTag={this.decidePriceTag()}
                    title={this.decideTitleDisplayText()}
                    placeholderImage={this.decidePlaceholderImage()}
                    description={this.decideDescription()}
                    dateAdded={this.props.listing.date_added}
                    id={this.props.listing.id}
                />
            }

            {/* <Modal show={this.state.show} onHide={this.handleHideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite to {this.props.listing.contentTopic}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Why you should get in touch with us?</h3>
                    <p>{this.props.listing.msg}</p>
                    <br/>
                    <h3>Our pricing</h3>
                    <p>{this.props.listing.pricing+' '+this.props.listing.currency.toUpperCase()}</p>
                    <br />
                    <h3>Additional Info</h3>
                    <FormGroup controlId='control-form-additional-info'>
                        <FormControl componentClass='textarea'
                            placeholder='Is there anything that you want them to know?'
                            maxLength={280}
                            rows={8}
                            style={{resize: 'vertical'}}/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled>Send Invite</Button>
                    <Button onClick={this.handleHideModal}>Close</Button>
                </Modal.Footer>
            </Modal> */}
        </NavLink>
    }
}

const GridCardRenderer = ({
                              width,
                              marginLeft,
                              contactInfo,
                              priceTag,
                              title,
                              placeholderImage,
                              description,
                              dateAdded,
                              id,
                          }) => (
    <Card className='grid-card-container noselect'
        style={{
            width,
            marginLeft,
        }}
    >
        <div className='poster-tag'>{title} </div>
        {/* <div className='poster-tag'>{contactInfo} </div> */}
        <div className='price-tag'>{priceTag}</div>

        <CardHeader
            title={title}
            subtitle={'Posted on: ' + dateAdded.slice(0, 10)}
            style={{paddingBottom: '0px'}}/>
        <img src={placeholderImage} className='grid-img' alt='listing-img'/>
        <CardContent className='grid-msg-container'>
            <span className="listing-msg">{description}</span>
        </CardContent>
        <Button
            bsStyle='primary'
            className='btn-contact-action'
        >
            Explore This Listing
        </Button>
    </Card>
);

const ListingCardRenderer = ({
                                 marginLeft,
                                 contactInfo,
                                 priceTag,
                                 title,
                                 placeholderImage,
                                 description,
                                 dateAdded,
                                 id,
                             }) => (
    <Card className='listing-card-container noselect'
          style={{
              width: '90%',
              // marginLeft,
              marginRight: '2%'
          }}
    >
        <div className='title-tag'>{title}</div>
        <div className='price-tag'>{priceTag}</div>

        <div className='listing-date'>
            Posted on {dateAdded.slice(0, 10)}
        </div>


        {/*<div*/}
            {/*title={title}*/}
            {/*subtitle={'Posted on: ' + dateAdded.slice(0, 10)}*/}
            {/*className='listing-card-title'*/}
            {/*style={{paddingBottom: '0px'}}*/}
        {/*/>*/}
        <img src={placeholderImage} className='listing-img' alt='listing-img'/>
        <CardContent className='listing-msg-container'>
            <span className="listing-msg">{description}</span>
        </CardContent>
    </Card>
)

ListingCard.propTypes = {
    listing: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        viewModeFilter: state.MarketplaceFilterReducer.viewModeFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingCard));
