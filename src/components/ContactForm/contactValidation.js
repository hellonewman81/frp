import {
  createValidator,
  required,
  email,
  requiredConditionally,
  weekdays,
  workhours,
  image
} from 'utils/validation';

const contactValidation = createValidator({
  question_1: [required],
  question_2: [required],
  name: [required],
  email: [required, email],
  phone: [required],
  preferred_contact: [required],
  preferred_outcome: [required],
  order_id: [required],
  reason_return: [required],
  reason_warranty: [required],
  date_fitted: [required],
  date_removed: [required],
  km_travelled: [required],
  part_description: [required],
  tracking_issue: [required],
  order_change: [required],
  delivery_firstname: [required],
  delivery_lastname: [required],
  delivery_phone: [required],
  delivery_address1: [required],
  delivery_city: [required],
  delivery_postcode: [required],
  delivery_state: [required],
  delivery_country: [required],
  change_orig_sku: [required],
  change_orig_qty: [required],
  wrong_item_action: [required],
  change_new_qty: [required],
  change_new_part_sku: [required],
  change_new_part_qty: [required],
  has_quote: [required],
  quote_id: [required],
  booking_date: [required, weekdays],
  booking_time: [required, workhours],
  service_change: [required],
  service_cancel: [required],
  reschedule_reason: [required],
  contact_date: [required, weekdays],
  contact_time: [required, workhours],
  service_update: [required],
  service_firstname: [required],
  service_lastname: [required],
  service_phone: [required],
  service_email: [required, email],
  // required conditional below
  part_number: [
    requiredConditionally({
      question_2: {
        test: 'equal',
        value: 'orderPartfits'
      }
    })
  ],
  comment: [
    requiredConditionally({
      question_2: {
        test: 'not-equal',
        value: 'orderPartfind'
      }
    })
  ],
  photo: [image(['image/gif', 'image/jpeg', 'image/png', 'image/x-bmp', 'image/bmp'], 10)],
  vehicle_make: [
    requiredConditionally({
      vehicle_unsure: {
        test: 'not-equal',
        value: true
      }
    })
  ],
  vehicle_model: [
    requiredConditionally({
      vehicle_unsure: {
        test: 'not-equal',
        value: true
      }
    })
  ],
  vehicle_year: [
    requiredConditionally({
      vehicle_unsure: {
        test: 'not-equal',
        value: true
      }
    })
  ],
  vehicle_series: [
    requiredConditionally({
      vehicle_unsure: {
        test: 'not-equal',
        value: true
      }
    })
  ],
  vehicle_body: [
    requiredConditionally({
      vehicle_unsure: {
        test: 'not-equal',
        value: true
      }
    })
  ],
  vehicle_engine: [
    requiredConditionally({
      vehicle_unsure: {
        test: 'not-equal',
        value: true
      }
    })
  ],
  vehicle_details: [required]
});
export default contactValidation;
