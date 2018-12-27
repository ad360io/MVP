/*
Core Libs
*/
import React, {Fragment} from 'react';
/*
Bootstrap
*/
import {FormControl, FormGroup} from 'react-bootstrap';
/*
Material UI
*/
import Checkbox from '@material-ui/core/Checkbox';
/*
Local CSS
*/
import './OptionalFormFields.component.css'
import FormControlLabel from "@material-ui/core/FormControlLabel";


class OptionalFormField extends React.Component {

    render() {
        const { modeFilter, formInfo } = this.props;

        formInfo && formInfo({valid: true});

        return (
            <div>
                { modeFilter === 'Publisher' && (
                    <FormGroup controlId='control-form-image'>
                        <p className='control-label'>
                            Content Samples and Inspiration (optional)
                        </p>
                        <FormControl type='file' />
                    </FormGroup>
                )}

                { modeFilter === 'Advertiser' && (
                    <Fragment>
                        <FormGroup controlId='control-form-additional'>
                            <p className='control-label noselect'>
                                Additional Services (optional)
                            </p>

                            <FormControlLabel
                                control={
                                    <Checkbox color="default"/>
                                }
                                label="Banner"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox color="default"/>
                                }
                                label="Fullscreen Overlay"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox color="default"/>
                                }
                                label="Custom Art"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox color="default"/>
                                }
                                label="Other"
                            />
                        </FormGroup>

                        <FormGroup controlId='control-form-referral'>
                            <p className='control-label'>
                                Referral URI (optional)
                            </p>
                            <FormControl type='text' />
                        </FormGroup>
                    </Fragment>
                )}
            </div>
        )
    }
}

export default OptionalFormField;
