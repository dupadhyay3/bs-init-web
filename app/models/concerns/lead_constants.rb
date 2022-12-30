# frozen_string_literal: true

module LeadConstants
  extend ActiveSupport::Concern

  CodeOptionKlass = Struct.new(:name, :id)

  QUALITY_CODE_OPTIONS = [
    CodeOptionKlass.new("Hot", 0),
    CodeOptionKlass.new("Warm", 1),
    CodeOptionKlass.new("Cold", 2)
  ]

  STAGE_CODE_OPTIONS = [
    CodeOptionKlass.new("Open", 0),
    CodeOptionKlass.new("Qualified", 1),
    CodeOptionKlass.new("In Discussion", 2),
    CodeOptionKlass.new("Proposition", 3),
    CodeOptionKlass.new("Won", 4),
    CodeOptionKlass.new("Lost", 5),
  ]

  STATUS_CODE_OPTIONS = [
    # Open
    CodeOptionKlass.new("New", 0),
    CodeOptionKlass.new("Contacted", 1),

    # Qualified
    CodeOptionKlass.new("Qualified", 2),

    # Disqualified
    CodeOptionKlass.new("Lost", 3),
    CodeOptionKlass.new("Cannot Contact", 4),
    CodeOptionKlass.new("No Longer Interested", 5),
    CodeOptionKlass.new("Canceled", 6),
  ]

  INDUSTRY_CODE_OPTIONS = [
    CodeOptionKlass.new("Accounting", 0),
    CodeOptionKlass.new("Agriculture and Non-petrol Natural Resource Extraction", 1),
    CodeOptionKlass.new("Broadcasting Printing and Publishing", 2),
    CodeOptionKlass.new("Brokers", 3),
    CodeOptionKlass.new("Building Supply Retail", 4),
    CodeOptionKlass.new("Business Services", 5),
    CodeOptionKlass.new("Consulting", 6),
    CodeOptionKlass.new("Consumer Services", 7),
    CodeOptionKlass.new("Design, Direction and Creative Management", 8),
    CodeOptionKlass.new("Distributors, Dispatchers and Processors", 9),
    CodeOptionKlass.new("Doctor's Offices and Clinics", 10),
    CodeOptionKlass.new("Durable Manufacturing", 11),
    CodeOptionKlass.new("Eating and Drinking Places", 12),
    CodeOptionKlass.new("Entertainment Retail", 13),
    CodeOptionKlass.new("Equipment Rental and Leasing", 14),
    CodeOptionKlass.new("Financial", 15),
    CodeOptionKlass.new("Food and Tobacco Processing", 16),
    CodeOptionKlass.new("Inbound Capital Intensive Processing", 17),
    CodeOptionKlass.new("Inbound Repair and Services", 18),
    CodeOptionKlass.new("Insurance", 19),
    CodeOptionKlass.new("Legal Services", 20),
    CodeOptionKlass.new("Non-Durable Merchandise Retail", 21),
    CodeOptionKlass.new("Outbound Consumer Service", 22),
    CodeOptionKlass.new("Petrochemical Extraction and Distribution", 23),
    CodeOptionKlass.new("Service Retail", 24),
    CodeOptionKlass.new("SIG Affiliations", 25),
    CodeOptionKlass.new("Social Services", 26),
    CodeOptionKlass.new("Special Outbound Trade Contractors", 27),
    CodeOptionKlass.new("Specialty Realty", 28),
    CodeOptionKlass.new("Transportation", 29),
    CodeOptionKlass.new("Utility Creation and Distribution", 30),
    CodeOptionKlass.new("Vehicle Retail", 31),
    CodeOptionKlass.new("Wholesale", 32)
  ]

  PREFERRED_CONTACT_METHOD_CODE_OPTIONS = [
    CodeOptionKlass.new("Any", 0),
    CodeOptionKlass.new("Email", 1),
    CodeOptionKlass.new("Phone", 2),
    CodeOptionKlass.new("Fax", 3),
    CodeOptionKlass.new("Mail", 4)
  ]

  SOURCE_CODE_OPTIONS = [
    CodeOptionKlass.new("Other", 0),
    CodeOptionKlass.new("Public", 1),
    CodeOptionKlass.new("Company Business Site", 2),
    CodeOptionKlass.new("E-Mail Marketing", 3),
    CodeOptionKlass.new("Facebook", 4),
    CodeOptionKlass.new("Google", 5),
    CodeOptionKlass.new("Internal", 6),
    CodeOptionKlass.new("LinkedIn", 7),
    CodeOptionKlass.new("Partner", 8),
    CodeOptionKlass.new("Employee Referral", 9),
    CodeOptionKlass.new("External Referral", 10),
    CodeOptionKlass.new("Public Relations", 11),
    CodeOptionKlass.new("Seminar", 12),
    CodeOptionKlass.new("Trade Show", 13),
    CodeOptionKlass.new("Web", 14),
    CodeOptionKlass.new("Word of Mouth", 15)
  ]

  PRIORITY_CODE_OPTIONS = [
    CodeOptionKlass.new("Lowest", 0),
    CodeOptionKlass.new("Low", 1),
    CodeOptionKlass.new("Normal", 2),
    CodeOptionKlass.new("High", 3),
    CodeOptionKlass.new("Highest", 4)
  ]

  TECH_STACK_OPTIONS = [
    CodeOptionKlass.new("API Integration", 0),
    CodeOptionKlass.new("ASP .NET", 1),
    CodeOptionKlass.new("Android App", 2),
    CodeOptionKlass.new("AngularJS", 3),
    CodeOptionKlass.new("Beacon App", 4),
    CodeOptionKlass.new("CakePHP", 5),
    CodeOptionKlass.new("Codeigniter", 6),
    CodeOptionKlass.new("Content Management", 7),
    CodeOptionKlass.new("Custom Web", 8),
    CodeOptionKlass.new("DevOps", 9),
    CodeOptionKlass.new("DevOps Services", 10),
    CodeOptionKlass.new("Drupal", 11),
    CodeOptionKlass.new("Enterprise App", 12),
    CodeOptionKlass.new("Flutter App", 14),
    CodeOptionKlass.new("Full Stack Development", 15),
    CodeOptionKlass.new("HTML5", 16),
    CodeOptionKlass.new("Hybrid App", 17),
    CodeOptionKlass.new("IoT App", 18),
    CodeOptionKlass.new("Ionic", 19),
    CodeOptionKlass.new("Laravel", 20),
    CodeOptionKlass.new("Magento App", 21),
    CodeOptionKlass.new("Maintenance and Support", 22),
    CodeOptionKlass.new("Mean Stack Development", 23),
    CodeOptionKlass.new("Microsoft ", 24),
    CodeOptionKlass.new("Mobile App", 25),
    CodeOptionKlass.new("NodeJS", 26),
    CodeOptionKlass.new("PERL", 27),
    CodeOptionKlass.new("PHP", 28),
    CodeOptionKlass.new("Power BI", 29),
    CodeOptionKlass.new("Python", 30),
    CodeOptionKlass.new("QA", 31),
    CodeOptionKlass.new("React Native App", 33),
    CodeOptionKlass.new("ReactJS", 34),
    CodeOptionKlass.new("Ruby On Rails", 35),
    CodeOptionKlass.new("Shopify App", 36),
    CodeOptionKlass.new("Swift", 37),
    CodeOptionKlass.new("VueJS", 38),
    CodeOptionKlass.new("Wearable App", 39),
    CodeOptionKlass.new("Web Portal", 40),
    CodeOptionKlass.new("WebRTC Application", 41),
    CodeOptionKlass.new("Xamarin App", 42),
    CodeOptionKlass.new("iOS App", 43),
    CodeOptionKlass.new("iPad App", 44),
    CodeOptionKlass.new("iPhone App", 45)
  ]
end
