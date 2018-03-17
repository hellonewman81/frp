import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues, change, untouch } from 'redux-form';
import { Alert, Button } from 'reactstrap';
import includes from 'array-includes';
import entries from 'object.entries';
import { getLsItem } from 'helpers/sbLocalStorage';
import { loadVehicleOptions } from 'redux/modules/page';
import { putTicket } from 'redux/modules/contact';
import { FieldSelect, FieldInput } from 'helpers/reduxFormRenderComponents';
import VehicleMiniForm from 'components/VehicleMiniForm/VehicleMiniForm';
import contactValidation from './contactValidation';
import contactSelectOptions from './contactSelectOptions';
import { attributeOptions, attributeLabels } from './formDataAttributes';
import {
  showPhone,
  showPreferredContact,
  showOrderId,
  showPreferredOutcome,
  showReturnVehicleDetails,
  showReturnDetails,
  showPartDetails
} from './contactFormFlow';

// root fields for form submit
const rootFormFields = ['name', 'email', 'phone'];

// initialize customer name / email if logged in
let initialValues = {};
let lsdl = getLsItem('lsDataLayer');
if (lsdl && typeof lsdl === 'string') {
  lsdl = JSON.parse(lsdl);
}

if (lsdl && lsdl.user && lsdl.user.loggedin === 'true') {
  initialValues = {
    name: lsdl.user.name,
    email: lsdl.user.email
  };
}

function filterRegisteredFields(fields) {
  const registered = {};

  if (typeof fields !== 'object') {
    return registered;
  }

  const fieldArray = entries(fields);

  fieldArray.forEach(field => {
    if (field[1].count) {
      registered[field[0]] = true;
    }
  });

  return registered;
}

@reduxForm({
  form: 'contactQuestions',
  validate: contactValidation,
  enableReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues
})
@connect(
  (state, props) => ({
    values: getFormValues(props.form)(state),
    vehicle: state.vehicle,
    contact: state.contact,
    registeredFields: filterRegisteredFields(state.form[props.form].registeredFields)
  }),
  dispatch => ({
    resetField: fieldName => {
      dispatch(change('contactQuestions', fieldName, ''));
      dispatch(untouch('contactQuestions', fieldName, ''));
    },
    loadSelectOptions: postBody => {
      dispatch(loadVehicleOptions(postBody)).catch(e => console.log(e));
    },
    postPutTicket: postBody => dispatch(putTicket(postBody)).catch(e => console.log(e))
  })
)
export default class ContactForm extends Component {
  static propTypes = {
    resetField: PropTypes.func.isRequired,
    loadSelectOptions: PropTypes.func.isRequired,
    postPutTicket: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    registeredFields: PropTypes.objectOf(PropTypes.any),
    // form: PropTypes.string.isRequired,
    values: PropTypes.objectOf(PropTypes.any),
    vehicle: PropTypes.objectOf(PropTypes.any),
    contact: PropTypes.objectOf(PropTypes.any)
  };

  static defaultProps = {
    values: undefined,
    vehicle: undefined,
    contact: undefined,
    registeredFields: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      // submitted: false
    };

    this.submitForm = this.submitForm.bind(this);
  }

  // submit to putTicket microservice
  submitForm(values, registeredFields) {
    const valuesArray = entries(values);
    const formData = new FormData();

    valuesArray.forEach(field => {
      // only append registered fields
      if (registeredFields[field[0]]) {
        if (field[0] === 'photo' && field[1]) {
          formData.append(field[0], field[1][0]);
        } else if (includes(rootFormFields, field[0])) {
          // append root fields directly
          formData.append(field[0], field[1]);
        } else {
          // apply the attribute map to the field value
          const label = attributeLabels[field[0]];
          const value = attributeOptions[field[0]]
            ? attributeOptions[field[0]][field[1]]
            : field[1];
          formData.append(field[0], JSON.stringify({ label, value }));
        }
      }
    });

    // get vid from page options and always append if set
    const { vid } = this.props.vehicle.options;
    if (vid) {
      formData.append('vid', JSON.stringify({ label: attributeLabels.vid, value: vid }));
    }

    this.props.postPutTicket(formData);
  }

  render() {
    const {
      invalid,
      pristine,
      submitting,
      values,
      resetField,
      handleSubmit,
      registeredFields,
      contact
    } = this.props;

    const { submitted, submitting: formSubmitting } = contact;

    const noSubmit =
      values &&
      ((values.question_1 === 'service' &&
        (values.question_2 === 'serviceQuote' ||
          (values.question_2 === 'serviceBook' && values.has_quote === 'no'))) ||
        (values.question_1 === 'order' &&
          values.question_2 === 'orderMistake' &&
          values.order_change === 'orderAdditems'));

    return (
      <div className="mb-3">
        {!submitted ? (
          <div>
            <Field
              name="question_1"
              label="What can we help you with?"
              component={FieldSelect}
              selectOptions={contactSelectOptions.question_1}
              onChange={() => resetField('question_2')}
            />

            {values &&
              values.question_1 && (
                <div>
                  <Field
                    name="question_2"
                    label="What would you like to do?"
                    component={FieldSelect}
                    selectOptions={contactSelectOptions.question_2[values.question_1]}
                  />

                  {values.question_2 && (
                    <div>
                      {values.question_2 === 'serviceQuote' ? (
                        <a href="/service/book-car-service" className="btn btn-success btn-lg">
                          Get Quote
                        </a>
                      ) : (
                        <div>
                          <Field name="name" label="Name" component={FieldInput} type="text" />
                          <Field name="email" label="Email" component={FieldInput} type="text" />
                        </div>
                      )}

                      {includes(showPhone, values.question_2) && (
                        <Field
                          name="phone"
                          label="Phone number"
                          component={FieldInput}
                          type="text"
                        />
                      )}

                      {includes(showPreferredContact, values.question_2) && (
                        <Field
                          name="preferred_contact"
                          label="Preferred method of contact"
                          component={FieldSelect}
                          selectOptions={contactSelectOptions.preferredContact}
                        />
                      )}

                      {includes(showOrderId, values.question_2) && (
                        <Field
                          name="order_id"
                          label="Order number"
                          component={FieldInput}
                          type="text"
                        />
                      )}

                      {includes(showPreferredOutcome, values.question_2) && (
                        <Field
                          name="preferred_outcome"
                          label="Preferred outcome"
                          component={FieldSelect}
                          selectOptions={contactSelectOptions.preferredOutcome}
                        />
                      )}

                      {values.question_2 === 'claimReturn' && (
                        <Field
                          name="reason_return"
                          label="Reason for return"
                          component={FieldSelect}
                          selectOptions={contactSelectOptions.reasonReturn}
                          smallText={
                            'Please choose your reason for return and your preferred outcome. ' +
                            'Please be very detailed in your reasoning for the return and if ' +
                            'your item is damaged, please upload photos to show the damage. If ' +
                            "it doesn't fit your car; please tell us what car you have below."
                          }
                        />
                      )}

                      {values.question_2 === 'claimWarranty' && (
                        <Field
                          name="reason_warranty"
                          label="Reason for warranty claim"
                          component={FieldInput}
                          smallText={
                            'Please be very detailed in your reasoning and explanation for the ' +
                            'warranty and if your item is damaged, please upload photos to show ' +
                            "the damage. If it doesn't fit your car; please tell us what car " +
                            'you have below.'
                          }
                          type="textarea"
                        />
                      )}

                      {((values.question_2 === 'claimReturn' &&
                        includes(showReturnVehicleDetails, values.reason_return)) ||
                        values.question_2 === 'claimWarranty') && (
                        <div>
                          <Field
                            name="date_fitted"
                            label="Date part was fitted to the vehicle"
                            component={FieldInput}
                            type="date"
                            placeholder="yyyy-mm-dd  (i.e. 2018-02-28)"
                          />
                          <Field
                            name="date_removed"
                            label="Date part was removed from the vehicle"
                            component={FieldInput}
                            type="date"
                            placeholder="yyyy-mm-dd  (i.e. 2018-02-28)"
                          />
                          <Field
                            name="km_travelled"
                            label="KM traveled with the part"
                            component={FieldInput}
                            type="number"
                          />
                          <VehicleMiniForm {...this.props} />
                        </div>
                      )}

                      {((values.question_2 === 'claimReturn' &&
                        includes(showReturnDetails, values.reason_return)) ||
                        values.question_2 === 'claimWarranty') && (
                        <div>
                          <Field
                            name="comment"
                            label="Comment"
                            component={FieldInput}
                            smallText="Please provide as many details as possible"
                            type="textarea"
                          />
                          <Field
                            name="photo"
                            label="Photo upload"
                            component={FieldInput}
                            type="file"
                          />
                        </div>
                      )}

                      {includes(showPartDetails, values.question_2) && (
                        <div>
                          <Field
                            name="part_number"
                            label="Part Number"
                            component={FieldInput}
                            type="text"
                          />

                          {values.question_2 === 'orderPartfind' && (
                            <div>
                              <Field
                                name="part_description"
                                label="Part Description"
                                component={FieldInput}
                                type="text"
                              />

                              <Field
                                name="brand"
                                label="Brand"
                                component={FieldInput}
                                type="text"
                              />

                              <Field
                                name="comment"
                                label="Comment"
                                component={FieldInput}
                                type="textarea"
                              />
                            </div>
                          )}

                          <VehicleMiniForm {...this.props} />
                        </div>
                      )}

                      {values.question_2 === 'orderWhere' && (
                        <Field
                          name="tracking_issue"
                          label="Tracking Issue"
                          component={FieldSelect}
                          selectOptions={contactSelectOptions.trackingIssue}
                        />
                      )}

                      {values.question_2 === 'orderMistake' && (
                        <div>
                          <Field
                            name="order_change"
                            label="Change needed"
                            component={FieldSelect}
                            selectOptions={contactSelectOptions.orderChange}
                          />

                          {values.order_change === 'orderAddress' && (
                            <div>
                              <legend>New delivery address</legend>
                              <Field
                                name="delivery_firstname"
                                label="First name"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="delivery_lastname"
                                label="Last name"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="delivery_company"
                                label="Company"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="delivery_phone"
                                label="Contact Number"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="delivery_address1"
                                label="Address line 1"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="delivery_address2"
                                label="Address line 2"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="delivery_city"
                                label="Suburb / City"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="delivery_postcode"
                                label="Postcode / Zip"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="delivery_state"
                                label="State / Province / Region"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="delivery_country"
                                label="Country"
                                component={FieldSelect}
                                type="select"
                                selectOptions={contactSelectOptions.deliveryCountry}
                              />
                            </div>
                          )}

                          {values.order_change === 'orderWrongitem' && (
                            <div>
                              <Field
                                name="preferred_outcome"
                                label="Preferred outcome"
                                component={FieldSelect}
                                selectOptions={contactSelectOptions.preferredOutcome}
                              />

                              <Field
                                name="change_orig_sku"
                                label="SKU of the item you wish to change"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="change_orig_qty"
                                label="Original quantity of the ordered item"
                                component={FieldInput}
                                type="number"
                              />

                              <Field
                                name="wrong_item_action"
                                label="What action do you wish to take"
                                component={FieldSelect}
                                type="select"
                                selectOptions={contactSelectOptions.wrongItemAction}
                              />

                              {values.wrong_item_action === 'wrongItemQty' && (
                                <Field
                                  name="change_new_qty"
                                  label="New quantity"
                                  component={FieldInput}
                                  type="number"
                                />
                              )}

                              {values.wrong_item_action === 'wrongItemPart' && (
                                <div>
                                  <Field
                                    name="change_new_part_sku"
                                    label="SKU (replacement part)"
                                    component={FieldInput}
                                    type="text"
                                  />
                                  <Field
                                    name="change_new_part_qty"
                                    label="Quantity (replacement part)"
                                    component={FieldInput}
                                    type="number"
                                  />
                                </div>
                              )}
                            </div>
                          )}

                          {values.order_change === 'orderAdditems' && (
                            <Alert color="warning">
                              <p>
                                {'If you have not received a tracking number yet. Please call ' +
                                  'the Sparesbox team during opening hours displayed above to ' +
                                  'confirm your order has not yet been dispatched and if not ' +
                                  'then we will arrange a cancellation so you can create a ' +
                                  'new order with the new items included.'}
                              </p>
                              <p>
                                {'If you have received a tracking number your goods' +
                                  'are on the way and you need to create a new order.'}
                              </p>
                            </Alert>
                          )}
                        </div>
                      )}

                      {values.question_2 === 'serviceBook' && (
                        <div>
                          <Field
                            name="has_quote"
                            label="Do you have an existing quote?"
                            component={FieldSelect}
                            selectOptions={contactSelectOptions.yesNo}
                          />

                          {values.has_quote === 'no' && (
                            <a href="/service/book-car-service" className="btn btn-success btn-lg">
                              Get Quote
                            </a>
                          )}

                          {values.has_quote === 'yes' && (
                            <div>
                              <Field
                                name="phone"
                                label="Phone number"
                                component={FieldInput}
                                type="text"
                              />

                              <Field
                                name="quote_id"
                                label="Service quote number"
                                component={FieldInput}
                                type="text"
                                smallText={
                                  '    Find this on the PDF document attached to your ' +
                                  'quote email'
                                }
                              />

                              <Field
                                name="booking_date"
                                label="Preferred booking date"
                                component={FieldInput}
                                type="date"
                                placeholder="yyyy-mm-dd  (i.e. 2018-02-28)"
                              />
                              <Field
                                name="booking_time"
                                label="Preferred booking time"
                                component={FieldInput}
                                type="time"
                                placeholder="--:--  (i.e. 09:00, 13:35 etc)"
                              />

                              <Field
                                name="photo"
                                label="Photo of location"
                                component={FieldInput}
                                type="file"
                              />

                              <Field
                                name="location_description"
                                label="Location description"
                                component={FieldInput}
                                type="textarea"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {values.question_2 === 'serviceChange' && (
                        <div>
                          <Field
                            name="quote_id"
                            label="Service quote number"
                            component={FieldInput}
                            type="text"
                            smallText="Find this on the PDF document attached to your quote email"
                          />

                          <Field
                            name="service_change"
                            label="What action would you like to take?"
                            component={FieldSelect}
                            selectOptions={contactSelectOptions.serviceChange}
                          />

                          {values.service_change === 'cancel' && (
                            <div>
                              <Field
                                name="service_cancel"
                                label="Reason for cancellation"
                                component={FieldSelect}
                                selectOptions={contactSelectOptions.serviceCancelReason}
                              />

                              {values.service_cancel === 'other' && (
                                <Field
                                  name="comment"
                                  label="Comment"
                                  component={FieldInput}
                                  smallText="Please provide as many details as possible"
                                  type="textarea"
                                />
                              )}
                            </div>
                          )}

                          {values.service_change === 'reschedule' && (
                            <div>
                              <Field
                                name="reschedule_reason"
                                label="Reason for rescheduling"
                                component={FieldInput}
                                type="textarea"
                                smallText="Please leave a comment"
                              />

                              <Field
                                name="phone"
                                label="Phone number"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="contact_date"
                                label="Preferred contact date"
                                component={FieldInput}
                                type="date"
                                placeholder="yyyy-mm-dd  (i.e. 2018-02-28)"
                              />
                              <Field
                                name="contact_time"
                                label="Preferred contact time"
                                component={FieldInput}
                                type="time"
                                placeholder="--:--  (i.e. 09:00, 13:35 etc)"
                              />

                              <Field
                                name="booking_date"
                                label="Preferred service booking date"
                                component={FieldInput}
                                type="date"
                                placeholder="yyyy-mm-dd  (i.e. 2018-02-28)"
                              />
                              <Field
                                name="booking_time"
                                label="Preferred service booking time"
                                component={FieldInput}
                                type="time"
                                placeholder="--:--  (i.e. 09:00, 13:35 etc)"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {values.question_2 === 'serviceUpdate' && (
                        <div>
                          <Field
                            name="quote_id"
                            label="Service quote number"
                            component={FieldInput}
                            type="text"
                            smallText="Find this on the PDF document attached to your quote email"
                          />

                          <Field
                            name="contact_date"
                            label="Preferred contact date"
                            component={FieldInput}
                            type="date"
                            placeholder="yyyy-mm-dd  (i.e. 2018-02-28)"
                          />
                          <Field
                            name="contact_time"
                            label="Preferred contact time"
                            component={FieldInput}
                            type="time"
                            placeholder="--:--  (i.e. 09:00, 13:35 etc)"
                          />

                          <Field
                            name="service_update"
                            label="What action would you like to take?"
                            component={FieldSelect}
                            selectOptions={contactSelectOptions.serviceUpdate}
                          />

                          {values.service_update === 'contact' && (
                            <div>
                              <legend>New service contact details</legend>
                              <Field
                                name="service_firstname"
                                label="First name"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="service_lastname"
                                label="Last name"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="service_phone"
                                label="Phone"
                                component={FieldInput}
                                type="text"
                              />
                              <Field
                                name="service_email"
                                label="Email"
                                component={FieldInput}
                                type="text"
                              />
                            </div>
                          )}

                          {values.service_update === 'items' && (
                            <Field
                              name="comment"
                              label="Comment"
                              component={FieldInput}
                              smallText="Please provide as many details as possible"
                              type="textarea"
                            />
                          )}
                        </div>
                      )}

                      {values.question_2 === 'serviceCarfind' && (
                        <VehicleMiniForm {...this.props} />
                      )}
                    </div>
                  )}
                </div>
              )}

            {!noSubmit && (
              <Button
                color="primary"
                onClick={handleSubmit(() => this.submitForm(values, registeredFields))}
                disabled={pristine || invalid || submitting || formSubmitting}
              >
                {(formSubmitting || submitting) && (
                  <span>
                    <i className="fa fa-cog fa-spin" />{' '}
                  </span>
                )}
                Submit Form
              </Button>
            )}
          </div>
        ) : (
          <Alert color="success">
            <p>
              {"We've received your message and our Team of Experts will respond as soon " +
                'as possible. Thank you for contacting us!'}
            </p>
          </Alert>
        )}
      </div>
    );
  }
}
