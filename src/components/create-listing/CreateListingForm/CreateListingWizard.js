import React, {Fragment} from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import FormSubmitButton from "./FromSubmitButton/FormSubmitButton.component";
import {Alert} from "react-bootstrap";
import RequiredFormFields from "./RequiredFormFields/RequiredFormFields.component";
import OptionalFormFields from "./OptionalFormFields/OptionalFormFields.component";
import FormConfirmation from './FormConfirmation/FormConfirmation.component';
import {connect} from "react-redux";

import {withStyles} from "@material-ui/core";
import {Functionize} from "./functionize";

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // float: 'left'
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
        fontSize: '18px'
    },
    text: {
        fontSize: '1rem'
    }
});

class CreateListingWizard extends React.Component {

    currentForm;

    constructor(props) {
        super(props);
        this.state = {
            activeStep: props.steps[0],
            formInfo: null
        }
    }

    back = () => {
        const { activeStep } = this.state;
        const { steps } = this.props;

        let index = steps.indexOf(activeStep);
        if(index > 0) this.setState({activeStep: steps[index - 1]});
    };

    next = () => {
        const { activeStep } = this.state;
        const { steps, onCreate } = this.props;

        if(activeStep.onChange) activeStep.onChange(this.currentForm);
        let index = steps.indexOf(activeStep);

        if(index + 1 < steps.length) {
            this.setState({ activeStep: steps[index + 1] })
        } else {
            onCreate();
        }
    };

    render () {
        const { activeStep, formInfo } = this.state;
        const { classes, steps, success, loading, onReset, title, modeFilter, currencyFilter} = this.props;

        return (
            <div className={classes.root + ' create-listing-form-container'}>
                <h2 className='create-listing-form-title'>{title}</h2>
                <Stepper activeStep={ success ? steps.length : steps.indexOf(activeStep)} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepLabel classes={{
                                iconContainer: classes.iconContainer,
                                label: classes.label
                            }}
                            >
                                {step.title}
                            </StepLabel>
                            <StepContent>
                                <div>
                                    { React.cloneElement(step.render({formInfo}), {
                                        modeFilter, currencyFilter
                                    })}
                                </div>

                                <Functionize
                                    refState={(formInfo) => this.setState({formInfo})}
                                    render={({valid}) => (
                                        <div className={classes.actionsContainer}>
                                            {valid && (
                                                <div>
                                                    { steps.indexOf(activeStep) !== 0 && (
                                                        <Button
                                                            onClick={() => this.back()}
                                                            className={classes.button}
                                                        >
                                                            Back
                                                        </Button>
                                                    )}

                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => this.next()}
                                                        className={classes.button}
                                                        disabled={!valid || loading}
                                                    >
                                                        {steps.indexOf(activeStep) + 1 === steps.length ? `Confirm` : `Next`}
                                                    </Button>
                                                </div>
                                            )}

                                            {!valid && steps.indexOf(activeStep) === 0 && (
                                                <Alert
                                                    bsStyle='danger'
                                                    style={{marginLeft: '2%'}}
                                                >
                                                    All information above is required to proceed to next step!
                                                </Alert>
                                            )}


                                        </div>

                                    )}
                                />
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>

                {success && (
                    <Fragment>
                        <Alert bsStyle='success'>Congratulations! Your listing is successfully created.</Alert>

                        <div>
                            Are you ready to create another listing?
                            <Button
                                variant='outlined'
                                onClick={() => this.setState({ activeStep: steps[0]}, () => onReset())}
                                style={{marginLeft: '10px'}}
                            >
                                Yes!
                            </Button>
                        </div>
                    </Fragment>
                )}
            </div>
        )
    }
}

export default withStyles(styles)(CreateListingWizard)
