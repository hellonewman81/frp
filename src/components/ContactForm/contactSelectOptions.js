const contactSelectOptions = {
  question_1: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: 'I have a question about a new or existing order',
      value: 'order'
    },
    {
      label: 'I have a question about a return or warranty claim',
      value: 'claim'
    },
    {
      label: 'I have a question about a Sparesbox car service & repair quote or booking',
      value: 'service'
    }
  ],
  question_2: {
    order: [
      {
        label: 'Please select an option',
        value: ''
      },
      {
        label: 'Correct a mistake I made in my order',
        value: 'orderMistake'
      },
      {
        label: 'Find out where my order is (dispatch day & arrival day)',
        value: 'orderWhere'
      },
      {
        label: 'Reconfirm if this part fits my car',
        value: 'orderPartfits'
      },
      {
        label: 'I can’t find a specific item I would like to purchase on your website',
        value: 'orderPartfind'
      }
    ],
    claim: [
      {
        label: 'Please select an option',
        value: ''
      },
      {
        label: 'Lodge a return',
        value: 'claimReturn'
      },
      {
        label: 'Make a warranty claim',
        value: 'claimWarranty'
      }
    ],
    service: [
      {
        label: 'Please select an option',
        value: ''
      },
      {
        label: 'Get a quote for my car service or car repair',
        value: 'serviceQuote'
      },
      {
        label: 'Book in for a car service or car repair',
        value: 'serviceBook'
      },
      {
        label: 'Change or cancel my scheduled booking',
        value: 'serviceChange'
      },
      {
        label: 'Update more information for my car service or repair quote',
        value: 'serviceUpdate'
      },
      {
        label: 'I can’t find my car model in the service or repair quote form',
        value: 'serviceCarfind'
      }
    ]
  },
  preferredContact: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: 'Email',
      value: 'preferEmail'
    },
    {
      label: 'Phone',
      value: 'preferPhone'
    }
  ],
  preferredOutcome: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: 'Exchange',
      value: 'preferExchange'
    },
    {
      label: 'Refund',
      value: 'preferRefund'
    },
    {
      label: 'Store Credit',
      value: 'preferCredit'
    }
  ],
  reasonReturn: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: 'Item faulty',
      value: 'returnFaulty'
    },
    {
      label: 'It does not fit my page',
      value: 'returnNofit'
    },
    {
      label: 'Item is significantly different from described',
      value: 'returnWrongdescription'
    },
    {
      label: 'Item is damaged',
      value: 'returnDamaged'
    },
    {
      label: 'Change of mind',
      value: 'returnChangemind'
    }
  ],
  trackingIssue: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: 'When will my order be dispatched?',
      value: 'trackingDispatch'
    },
    {
      label: "I can't track my order or my tracking number doesn't work",
      value: 'trackingError'
    },
    {
      label: "My order is missing or hasn't arrived yet",
      value: 'trackingMissing'
    }
  ],
  orderChange: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: 'I would like to change my delivery address',
      value: 'orderAddress'
    },
    {
      label: 'I ordered the wrong item',
      value: 'orderWrongitem'
    },
    {
      label: 'I want to add more items',
      value: 'orderAdditems'
    }
  ],
  wrongItemAction: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: 'Update the quantity of the ordered item',
      value: 'wrongItemQty'
    },
    {
      label: 'Replace the ordered item with a new part',
      value: 'wrongItemPart'
    }
  ],
  yesNo: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: 'Yes',
      value: 'yes'
    },
    {
      label: 'No',
      value: 'no'
    }
  ],
  serviceChange: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: 'Cancel',
      value: 'cancel'
    },
    {
      label: 'Reschedule',
      value: 'reschedule'
    }
  ],
  serviceUpdate: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: 'Change contact details',
      value: 'contact'
    },
    {
      label: 'Change or request items on quote',
      value: 'items'
    }
  ],
  serviceCancelReason: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: "My page or I aren't available at the schedules time or in the near future",
      value: 'unavailable'
    },
    {
      optgroup: true,
      label: 'I want to service / repair my page elsewhere',
      options: [
        {
          label: 'Found a cheaper price',
          value: 'cheaperPrice'
        },
        {
          label: 'Somewhere else is more convenient',
          value: 'serviceConvenient'
        }
      ]
    },
    {
      optgroup: true,
      label: 'I decided not to carry out the repair or service',
      options: [
        {
          label: "Can't afford it",
          value: 'cantAfford'
        },
        {
          label: 'I believe I do not need the repair or service',
          value: 'serviceNotRequired'
        }
      ]
    },
    {
      label: 'Other',
      value: 'other'
    }
  ],
  deliveryCountry: [
    {
      label: 'Please select an option',
      value: ''
    },
    {
      label: 'American Samoa',
      value: 'AS'
    },
    {
      label: 'Australia',
      value: 'AU'
    },
    {
      label: 'Austria',
      value: 'AT'
    },
    {
      label: 'Bangladesh',
      value: 'BD'
    },
    {
      label: 'Belgium',
      value: 'BE'
    },
    {
      label: 'British Virgin Islands',
      value: 'VG'
    },
    {
      label: 'Brunei',
      value: 'BN'
    },
    {
      label: 'Bulgaria',
      value: 'BG'
    },
    {
      label: 'Cambodia',
      value: 'KH'
    },
    {
      label: 'Canada',
      value: 'CA'
    },
    {
      label: 'China',
      value: 'CN'
    },
    {
      label: 'Cook Islands',
      value: 'CK'
    },
    {
      label: 'Croatia',
      value: 'HR'
    },
    {
      label: 'Cyprus',
      value: 'CY'
    },
    {
      label: 'Czech Republic',
      value: 'CZ'
    },
    {
      label: 'Côte d’Ivoire',
      value: 'CI'
    },
    {
      label: 'Denmark',
      value: 'DK'
    },
    {
      label: 'Estonia',
      value: 'EE'
    },
    {
      label: 'Fiji',
      value: 'FJ'
    },
    {
      label: 'Finland',
      value: 'FI'
    },
    {
      label: 'France',
      value: 'FR'
    },
    {
      label: 'Germany',
      value: 'DE'
    },
    {
      label: 'Greece',
      value: 'GR'
    },
    {
      label: 'Guernsey',
      value: 'GG'
    },
    {
      label: 'Hong Kong SAR China',
      value: 'HK'
    },
    {
      label: 'Hungary',
      value: 'HU'
    },
    {
      label: 'India',
      value: 'IN'
    },
    {
      label: 'Indonesia',
      value: 'ID'
    },
    {
      label: 'Ireland',
      value: 'IE'
    },
    {
      label: 'Italy',
      value: 'IT'
    },
    {
      label: 'Japan',
      value: 'JP'
    },
    {
      label: 'Jersey',
      value: 'JE'
    },
    {
      label: 'Kiribati',
      value: 'KI'
    },
    {
      label: 'Laos',
      value: 'LA'
    },
    {
      label: 'Latvia',
      value: 'LV'
    },
    {
      label: 'Liechtenstein',
      value: 'LI'
    },
    {
      label: 'Lithuania',
      value: 'LT'
    },
    {
      label: 'Luxembourg',
      value: 'LU'
    },
    {
      label: 'Macau SAR China',
      value: 'MO'
    },
    {
      label: 'Malaysia',
      value: 'MY'
    },
    {
      label: 'Malta',
      value: 'MT'
    },
    {
      label: 'Mexico',
      value: 'MX'
    },
    {
      label: 'Monaco',
      value: 'MC'
    },
    {
      label: 'Myanmar (Burma)',
      value: 'MM'
    },
    {
      label: 'Nepal',
      value: 'NP'
    },
    {
      label: 'Netherlands',
      value: 'NL'
    },
    {
      label: 'New Caledonia',
      value: 'NC'
    },
    {
      label: 'New Zealand',
      value: 'NZ'
    },
    {
      label: 'North Korea',
      value: 'KP'
    },
    {
      label: 'Norway',
      value: 'NO'
    },
    {
      label: 'Pakistan',
      value: 'PK'
    },
    {
      label: 'Papua New Guinea',
      value: 'PG'
    },
    {
      label: 'Philippines',
      value: 'PH'
    },
    {
      label: 'Poland',
      value: 'PL'
    },
    {
      label: 'Portugal',
      value: 'PT'
    },
    {
      label: 'Romania',
      value: 'RO'
    },
    {
      label: 'Réunion',
      value: 'RE'
    },
    {
      label: 'Samoa',
      value: 'WS'
    },
    {
      label: 'Serbia',
      value: 'RS'
    },
    {
      label: 'Singapore',
      value: 'SG'
    },
    {
      label: 'Slovakia',
      value: 'SK'
    },
    {
      label: 'Slovenia',
      value: 'SI'
    },
    {
      label: 'Solomon Islands',
      value: 'SB'
    },
    {
      label: 'South Korea',
      value: 'KR'
    },
    {
      label: 'Spain',
      value: 'ES'
    },
    {
      label: 'Sri Lanka',
      value: 'LK'
    },
    {
      label: 'Sweden',
      value: 'SE'
    },
    {
      label: 'Switzerland',
      value: 'CH'
    },
    {
      label: 'São Tomé and Príncipe',
      value: 'ST'
    },
    {
      label: 'Taiwan',
      value: 'TW'
    },
    {
      label: 'Thailand',
      value: 'TH'
    },
    {
      label: 'Tonga',
      value: 'TO'
    },
    {
      label: 'Tuvalu',
      value: 'TV'
    },
    {
      label: 'U.K.',
      value: 'GB'
    },
    {
      label: 'U.S.',
      value: 'US'
    },
    {
      label: 'U.S. Virgin Islands',
      value: 'VI'
    },
    {
      label: 'Vanuatu',
      value: 'VU'
    },
    {
      label: 'Vatican City',
      value: 'VA'
    },
    {
      label: 'Vietnam',
      value: 'VN'
    }
  ]
};

export default contactSelectOptions;
