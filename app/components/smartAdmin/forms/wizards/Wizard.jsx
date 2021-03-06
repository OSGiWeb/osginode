import React, {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'



export default class Wizard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let self = this;
        let element = $(findDOMNode(self));
        var stepsCount = $('[data-smart-wizard-tab]').length;

        var currentStep = 1;

        var validSteps = [];

        var $form = element.closest('form');

        var $prev = $('[data-smart-wizard-prev]', element);

        var $next = $('[data-smart-wizard-next]', element);

        function setStep(step) {
            currentStep = step;
            $('[data-smart-wizard-pane=' + step + ']', element).addClass('active').siblings('[data-smart-wizard-pane]').removeClass('active');
            $('[data-smart-wizard-tab=' + step + ']', element).addClass('active').siblings('[data-smart-wizard-tab]').removeClass('active');

            $prev.toggleClass('disabled', step == 1)

            // Invoke call back to set current step
            const { onCurruntStepChange } = self.props;
            if (onCurruntStepChange !== undefined) { // for some wizard instance 'onCurruntStepChange()' call back function is not defined 
                onCurruntStepChange(currentStep);
            }

        }


        element.on('click', '[data-smart-wizard-tab]', function (e) {
            setStep(parseInt($(this).data('smartWizardTab')));
            e.preventDefault();
        });

        $next.on('click', function (e) {
            if ($form.data('validator')) {
                if (!$form.valid()) {
                    validSteps = _.without(validSteps, currentStep);
                    $form.data('validator').focusInvalid();
                    return false;
                } else {
                    validSteps = _.without(validSteps, currentStep);
                    validSteps.push(currentStep);
                    element.find('[data-smart-wizard-tab=' + currentStep + ']')
                        .addClass('complete')
                        .find('.step')
                        .html('<i class="fa fa-check"></i>');
                }
            }
            if (currentStep < stepsCount) {
                setStep(currentStep + 1);
            } else {
                if (validSteps.length < stepsCount) {
                    var steps = _.range(1, stepsCount + 1)

                    _(steps).forEach(function (num) {
                        if (validSteps.indexOf(num) == -1) {
                            setStep(num);
                            return false;
                        }
                    })
                } else {
                    var data = {};
                    _.each($form.serializeArray(), function (field) {
                        data[field.name] = field.value
                    });
                    if (_.isFunction(self.props.onComplete)) {
                        self.props.onComplete(data)
                    }
                }
            }

            e.preventDefault();
        });

        $prev.on('click', function (e) {
            if (!$prev.hasClass('disabled') && currentStep > 0) {
                setStep(currentStep - 1);
            }
            e.preventDefault();
        });


        setStep(currentStep);
    }

    render() {
        let {children, ...props} = this.props;
        return (
            <div {...props}>
                {children}
            </div>
        )
    }
}

Wizard.propTypes = {
    onCurruntStepChange: PropTypes.func
};




// let Wizard = React.createClass({
//     componentDidMount: function () {
//         let self = this;
//         let element = $(findDOMNode(self));
//         var stepsCount = $('[data-smart-wizard-tab]').length;

//         var currentStep = 1;

//         var validSteps = [];

//         var $form = element.closest('form');

//         var $prev = $('[data-smart-wizard-prev]', element);

//         var $next = $('[data-smart-wizard-next]', element);

//         function setStep(step) {
//             currentStep = step;
//             $('[data-smart-wizard-pane=' + step + ']', element).addClass('active').siblings('[data-smart-wizard-pane]').removeClass('active');
//             $('[data-smart-wizard-tab=' + step + ']', element).addClass('active').siblings('[data-smart-wizard-tab]').removeClass('active');

//             $prev.toggleClass('disabled', step == 1)

//             // const { onCurruntStepChange } = this.props;
//             // onCurruntStepChange(currentStep);
//         }


//         element.on('click', '[data-smart-wizard-tab]', function (e) {
//             setStep(parseInt($(this).data('smartWizardTab')));
//             e.preventDefault();
//         });

//         $next.on('click', function (e) {
//             if ($form.data('validator')) {
//                 if (!$form.valid()) {
//                     validSteps = _.without(validSteps, currentStep);
//                     $form.data('validator').focusInvalid();
//                     return false;
//                 } else {
//                     validSteps = _.without(validSteps, currentStep);
//                     validSteps.push(currentStep);
//                     element.find('[data-smart-wizard-tab=' + currentStep + ']')
//                         .addClass('complete')
//                         .find('.step')
//                         .html('<i class="fa fa-check"></i>');
//                 }
//             }
//             if (currentStep < stepsCount) {
//                 setStep(currentStep + 1);
//             } else {
//                 if (validSteps.length < stepsCount) {
//                     var steps = _.range(1, stepsCount + 1)

//                     _(steps).forEach(function (num) {
//                         if (validSteps.indexOf(num) == -1) {
//                             setStep(num);
//                             return false;
//                         }
//                     })
//                 } else {
//                     var data = {};
//                     _.each($form.serializeArray(), function (field) {
//                         data[field.name] = field.value
//                     });
//                     if (_.isFunction(self.props.onComplete)) {
//                         self.props.onComplete(data)
//                     }
//                 }
//             }

//             e.preventDefault();
//         });

//         $prev.on('click', function (e) {
//             if (!$prev.hasClass('disabled') && currentStep > 0) {
//                 setStep(currentStep - 1);
//             }
//             e.preventDefault();
//         });


//         setStep(currentStep);
//     },
//     render: function () {
//         let {children, ...props} = this.props;
// return (
//     <div {...props}>
//         {children}
//     </div>
// )
//     }
// });

// export default Wizard