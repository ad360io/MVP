/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
Local CSS
*/
import './CreateListingForm.component.css';

/*
Children Components
*/
import RequiredFormFields from './RequiredFormFields/RequiredFormFields.component';
import OptionalFormFields from './OptionalFormFields/OptionalFormFields.component';
import FormConfirmation from './FormConfirmation/FormConfirmation.component';
import FormSubmitButton from './FromSubmitButton/FormSubmitButton.component';

/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';

/*
React Bootstrap
*/
import { Alert } from 'react-bootstrap';

/*
Style classes for Material UI Components
*/
const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        float: 'left'
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    iconContainer: { // define styles for icon container
        transform: 'scale(1.3)',
        marginLeft: '3px',
        marginRight: '3px',
    },
    label: {
        // fontSize: '18px'
    }
});

// Steps for material UI stepper
function getSteps() {
    return ['Required Information', 'Optional Information', 'Confirmation'];
}


/**
 * Create Listing Form Component
 */
class CreateListingForm extends Component {

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return <RequiredFormFields modeFilter={this.props.modeFilter} />;
            case 1:
                return <OptionalFormFields modeFilter={this.props.modeFilter} />;
            case 2:
                return <FormConfirmation modeFilter={this.props.modeFilter} currencyFilter={this.props.currencyFilter} />;
            default:
                return 'Unknown step';
        }
    };

    decideFormTitle = () => {
        return (this.props.modeFilter === 'Advertiser'
            ? 'Request Content'
            : 'Create Content Listing'
        );
    };

    handleSubmitForm = () => {
        // hide back button, reset fields provide an option to create another listing
        if (this.props.modeFilter === 'Advertiser') {
            this.props.onAdvSubmit();
        } else {
            this.props.onPubSubmit();
        }

        window.scrollTo(0, 0);
    };

    handleStepperNext = () => {
        if (this.props.modeFilter === 'Advertiser') {
            this.props.advStepperNext();
        } else {
            this.props.pubStepperNext();
        }

        window.scrollTo(0, 0);
    };

    handleStepperBack = () => {
        if (this.props.modeFilter === 'Advertiser') {
            this.props.advStepperBack();
        } else {
            this.props.pubStepperBack();
        }

        window.scrollTo(0, 0);
    };

    onFormResetClick = () => {
        if (this.props.modeFilter === 'Advertiser') {
            this.props.resetAdvForm();
        } else {
            this.props.resetPubForm();
        }
    }

    isFormFilled = () => {
        if (this.props.modeFilter === 'Advertiser') {
            return this.props.advertiserForm.adFormat.length > 0
                && this.props.advertiserForm.medium.length > 0
                && this.props.advertiserForm.description.length > 0
                && this.props.advertiserForm.topic.length > 0
        }
        else {
            return typeof this.props.publisherForm.dateFrom !== 'undefined'
                && typeof this.props.publisherForm.dateTo !== 'undefined'
                && this.props.publisherForm.adFormat.length > 0
                && this.props.publisherForm.medium.length > 0
                && this.props.publisherForm.description.length > 0
                && this.props.publisherForm.topic.length > 0
                && this.props.publisherForm.price.length > 0
        }
    }

    getActiveStep = () => {
        if (this.props.modeFilter === 'Advertiser') {
            return this.props.advertiserActiveStep;
        } else {
            return this.props.publisherActiveStep;
        }
    }

    getSubmitted = () => {
        if (this.props.modeFilter === 'Advertiser') {
            return this.props.advertiserSubmitted;
        } else {
            return this.props.publisherSubmitted;
        }
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();

        console.log(this.props.advertiserSubmitted);
        console.log(this.props.publisherSubmitted);


        return <div className={classes.root + ' create-listing-form-container'}>
            <h2 className='create-listing-form-title'>{this.decideFormTitle()}</h2>
            <Stepper activeStep={this.getActiveStep()} orientation="vertical">
                {steps.map((label, index) => {
                    return (
                        <Step key={label}>
                            <StepLabel classes={{
                                iconContainer: classes.iconContainer,
                                label: classes.label
                            }}
                            >
                                {label}
                            </StepLabel>
                            <StepContent>
                                <div>{this.getStepContent(index)}</div>
                                <div className={classes.actionsContainer}>
                                    <div hidden={this.getActiveStep() === 0 && !this.isFormFilled()}>
                                        <div hidden={this.getSubmitted()}>
                                            <Button
                                                disabled={this.getActiveStep() === 0}
                                                onClick={this.handleStepperBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                        </div>

                                        <div hidden={this.getActiveStep() === steps.length - 1}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleStepperNext}
                                                className={classes.button}
                                                // disabled={!this.props.email_verifed}
                                            >
                                                Next
                                            </Button>
                                        </div>

                                        <div hidden={this.getActiveStep() !== steps.length - 1}>
                                            <FormSubmitButton
                                                onSubmit={this.handleSubmitForm}
                                                className={classes.button}
                                            />
                                        </div>

                                        <div hidden={!this.getSubmitted()}>
                                            Are you ready to create another listing?
                                            <Button
                                                variant='outlined'
                                                onClick={this.onFormResetClick}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                Yes!
                                            </Button>
                                        </div>

                                    </div>
                                    <Alert
                                        bsStyle='danger'
                                        hidden={this.isFormFilled()}
                                        style={{ marginLeft: '2%' }}
                                    >
                                        All information above is required to proceed to next step!
                                    </Alert>
                                </div>
                            </StepContent>
                        </Step>
                    );
                })}
            </Stepper>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
        advertiserForm: state.CreateListingFormReducer.advertiserForm,
        publisherForm: state.CreateListingFormReducer.publisherForm,
        advertiserActiveStep: state.CreateListingFormReducer.advertiserActiveStep,
        publisherActiveStep: state.CreateListingFormReducer.publisherActiveStep,
        advertiserSubmitted: state.CreateListingFormReducer.advertiserSubmitted,
        publisherSubmitted: state.CreateListingFormReducer.publisherSubmitted,
        email_verifed: state.ProfileReducer.profile.email_verifed
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetAdvForm: () => {
            dispatch({
                type: 'RESET_ADV_FORM'
            })
        },
        resetPubForm: () => {
            dispatch({
                type: 'RESET_PUB_FORM'
            })
        },
        advStepperNext: () => {
            dispatch({
                type: 'ADV_STEPPER_NEXT'
            })
        },
        advStepperBack: () => {
            dispatch({
                type: 'ADV_STEPPER_BACK'
            })
        },
        onAdvSubmit: () => {
            dispatch({
                type: 'ON_ADV_SUBMIT'
            })
        },
        pubStepperNext: () => {
            dispatch({
                type: 'PUB_STEPPER_NEXT'
            })
        },
        pubStepperBack: () => {
            dispatch({
                type: 'PUB_STEPPER_BACK'
            })
        },
        onPubSubmit: () => {
            dispatch({
                type: 'ON_PUB_SUBMIT'
            })
        }
    }
}


export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateListingForm))
