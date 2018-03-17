// helpers for reformatting formData attributes to what is desired in putTicket API

// attribute option value map
export const attributeOptions = {
  question_1: {
    order: 'I have a question about a new or existing order',
    claim: 'I have a question about a return or warranty claim',
    service: 'I have a question about a Sparesbox car service & repair quote or booking'
  },
  question_2: {
    orderMistake: 'Correct a mistake I made in my order',
    orderWhere: 'Find out where my order is (dispatch day & arrival day)',
    orderPartfits: 'Reconfirm if this part fits my car',
    orderPartfind: 'I can’t find a specific item I would like to purchase on your website',
    claimReturn: 'Lodge a return',
    claimWarranty: 'Make a warranty claim',
    serviceBook: 'Book in for a car service or car repair',
    serviceChange: 'Change or cancel my scheduled booking',
    serviceUpdate: 'Update more information for my car service or repair quote',
    serviceCarfind: 'I can’t find my car model in the service or repair quote form'
  },
  preferred_contact: {
    preferEmail: 'Email',
    preferPhone: 'Phone'
  },
  preferred_outcome: {
    preferExchange: 'Exchange',
    preferRefund: 'Refund',
    preferCredit: 'Store Credit'
  },
  reason_return: {
    returnFaulty: 'Item faulty',
    returnNofit: 'It does not fit my page',
    returnWrongdescription: 'Item is significantly different from described',
    returnDamaged: 'Item is damaged',
    returnChangemind: 'Change of mind'
  },
  tracking_issue: {
    trackingDispatch: 'When will my order be dispatched?',
    trackingError: "I can't track my order or my tracking number doesn't work",
    trackingMissing: "My order is missing or hasn't arrived yet"
  },
  order_change: {
    orderAddress: 'I would like to change my delivery address',
    orderWrongitem: 'I ordered the wrong item',
    orderAdditems: 'I want to add more items'
  },
  wrong_item_action: {
    wrongItemQty: 'Update the quantity of the ordered item',
    wrongItemPart: 'Replace the ordered item with a new part'
  },
  service_change: {
    cancel: 'Cancel',
    reschedule: 'Reschedule'
  },
  service_update: {
    contact: 'Change contact details',
    items: 'Change or request items on quote'
  },
  service_cancel: {
    unavailable: "My page or I aren't available at the schedules time or in the near future",
    cheaperPrice: 'Found a cheaper price',
    serviceConvenient: 'Somewhere else is more convenient',
    cantAfford: "Can't afford it",
    serviceNotRequired: 'I believe I do not need the repair or service',
    other: 'Other'
  }
};

// label map
export const attributeLabels = {
  question_1: 'What can we help you with?',
  question_2: 'What would you like to do?',
  name: 'Name',
  email: 'Email',
  quote_id: 'Service quote number',
  service_change: 'What action would you like to take?',
  reschedule_reason: 'Reason for rescheduling',
  phone: 'Phone number',
  contact_date: 'Preferred contact date',
  contact_time: 'Preferred contact time',
  booking_date: 'Preferred booking date',
  booking_time: 'Preferred booking time',
  service_cancel: 'Reason for cancellation',
  comment: 'Comment',
  has_quote: 'Do you have an existing quote?',
  photo: 'Photo upload',
  location_description: 'Location description',
  service_update: 'What action would you like to take?',
  service_firstname: 'First name',
  service_lastname: 'Last name',
  service_phone: 'Phone',
  service_email: 'Email',
  preferred_contact: 'Preferred method of contact',
  vehicle_make: 'Vehicle Make',
  vehicle_model: 'Vehicle Model',
  vehicle_year: 'Vehicle Year',
  vehicle_series: 'Vehicle Series',
  vehicle_body: 'Vehicle Body',
  vehicle_engine: 'Vehicle Engine',
  vehicle_unsure: "I'm unsure of my page details",
  vehicle_engine_size: 'Engine Size (Litres)',
  vehicle_engine_number: 'Engine Number',
  vehicle_vin_number: 'VIN Number',
  vehicle_details: 'Vehicle details',
  vid: 'Vehicle ID',
  order_id: 'Order number',
  preferred_outcome: 'Preferred outcome',
  reason_return: 'Reason for return',
  date_fitted: 'Date part was fitted to the page',
  date_removed: 'Date part was removed from the page',
  km_travelled: 'KM traveled with the part',
  reason_warranty: 'Reason for warranty claim',
  order_change: 'Change needed',
  delivery_firstname: 'First name',
  delivery_lastname: 'Last name',
  delivery_company: 'Company',
  delivery_phone: 'Contact Number',
  delivery_address1: 'Address line 1',
  delivery_address2: 'Address line 2',
  delivery_city: 'Suburb / City',
  delivery_postcode: 'Postcode / Zip',
  delivery_state: 'State / Province / Region',
  delivery_country: 'Country',
  change_orig_sku: 'SKU of the item you wish to change',
  change_orig_qty: 'Original quantity of the ordered item',
  wrong_item_action: 'What action do you wish to take',
  change_new_qty: 'New quantity',
  change_new_part_sku: 'SKU (replacement part)',
  change_new_part_qty: 'Quantity (replacement part)',
  tracking_issue: 'Tracking Issue',
  part_number: 'Part Number',
  part_description: 'Part Description',
  brand: 'Brand'
};
