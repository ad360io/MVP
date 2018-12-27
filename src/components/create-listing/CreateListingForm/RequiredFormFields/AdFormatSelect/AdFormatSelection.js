import React from "react";
import SelectButtonGroup from "./SelectButtonGroup.component";
import {ButtonGroup, Button} from "react-bootstrap";

export class AdFormatSelection extends React.Component {

    renderMediumList = (list, mediumFormat, onChange) => (
        <div>
            <p className='ad-format-selector-title'>Select Medium</p>
            <ButtonGroup justified >
                { list.slice(0, list.length / 2).map((item, index) => (
                    <Button
                        className='btn-ad-format-selector'
                        href="#"
                        onClick={() => onChange({mediumFormat: item})}
                        active={mediumFormat === item}
                        key={`${item}${index}`}
                    >
                        {item}
                    </Button>
                ))}
            </ButtonGroup>
            <ButtonGroup justified style={{ marginBottom: '25px' }}>
                { list.slice(list.length / 2).map((item, index) => (
                    <Button
                        className='btn-ad-format-selector'
                        href="#"
                        onClick={() => onChange({mediumFormat: item})}
                        active={mediumFormat === item}
                        key={`${item}${index}`}
                    >
                        {item}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );

    render () {
        const {adFormat, mediumFormat, onChange} = this.props;

        let list = {
            'Branded Content':   ['Written Piece', 'Audio Piece', 'Video Piece', 'Email', 'Webinar', 'Other'],
            'Influencer Post':   ['Tweet', 'Instagram', 'Twitch', 'Youtube', 'Facebook', 'Twitter', 'NicoNico', 'Other'],
            'Sponsorship':       ['Event', 'Individual', 'Website', 'Artistic Creation', 'Email Newsletter', 'Other'],
            'Patron Journalism': ['Written Piece', 'Audio Piece', 'Video Piece', 'Other'],
        };

        return (
             <div>
                <div className='ad-format-selector-title'>Select Ad Format</div>
                {/*<SelectButtonGroup stringList={this.getMediumStringList()} />*/}
                <ButtonGroup style={{ marginBottom: '25px' }} justified >
                    {
                        Object.keys(list).map((item, index) => (
                            <Button
                                className='btn-ad-format-selector'
                                href="#"
                                onClick={() => onChange({adFormat: item})}
                                active={ adFormat === item }
                                key={item + "_" + index}
                            >
                                {item}
                            </Button>
                        ))
                    }
                </ButtonGroup>

                { adFormat && this.renderMediumList(list[adFormat], mediumFormat, onChange)}
            </div>
        )
    }
}
