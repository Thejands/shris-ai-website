import type { DomainUseCase } from '../types';

export const DOMAINS: DomainUseCase[] = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    badge: 'High-Intent Property Qualification',
    tagline: 'Turn property enquiries into verified site visits in seconds.',
    description: 'Shris AI calls inbound property leads within 15 seconds, qualifies budget, configuration, and purchase timeline, and books site visits directly onto your sales team’s calendars.',
    agentName: 'Aarav (Real Estate AI)',
    agentRole: 'Senior Property Qualification Specialist',
    agentAvatar: '🏢',
    industryProblem: '80% of portal property leads go cold within 30 minutes. Sales teams waste 6+ hours daily calling unqualified numbers.',
    workflowSteps: [
      'Portal lead webhook triggers Shris AI call in <15s',
      'AI conducts natural 2-way conversation in preferred language',
      'Extracts budget, configuration (2/3/4 BHK), location preference & loan readiness',
      'Live calendar check & instant site-visit slot confirmation',
      'Syncs structured lead data to Salesforce / LeadSquared & triggers WhatsApp brochure'
    ],
    sampleConversation: [
      {
        speaker: 'agent',
        message: 'Hello Mr. Sharma! This is Aarav from Prestige Group. I noticed you checked our 3 BHK apartments at Falcon City. Are you exploring for self-use or investment?',
        timestamp: '00:04',
        intentTag: 'Initial Engagement'
      },
      {
        speaker: 'customer',
        message: 'Hi Aarav, looking for self-use. What is the possession date and current starting price for the 3 BHK corner units?',
        timestamp: '00:11'
      },
      {
        speaker: 'agent',
        message: 'The premium corner units start at ₹1.45 Cr with possession scheduled for March 2026. Would you like to tour our experience centre this Saturday at 11:30 AM or 3:00 PM?',
        timestamp: '00:18',
        intentTag: 'Value Proposition & Slot Pitch'
      },
      {
        speaker: 'customer',
        message: 'Saturday 11:30 AM works well. Please send the location and floor plan on my WhatsApp.',
        timestamp: '00:24'
      },
      {
        speaker: 'agent',
        message: 'Slot locked for Saturday 11:30 AM with our Senior Relationship Manager, Rohit. I have also dispatched the floor plan and directions to your WhatsApp right now.',
        timestamp: '00:30',
        intentTag: 'Booking Confirmation & Workflow Trigger'
      }
    ],
    extractedEntities: [
      { label: 'Requirement', value: '3 BHK Corner Unit', confidence: 0.99, icon: '🏠' },
      { label: 'Budget Range', value: '₹1.40 Cr – ₹1.60 Cr', confidence: 0.98, icon: '💰' },
      { label: 'Purpose', value: 'End User (Self-Use)', confidence: 0.99, icon: '🎯' },
      { label: 'Site Visit Slot', value: 'Saturday, 11:30 AM IST', confidence: 1.0, icon: '📅' },
      { label: 'Lead Score', value: '94/100 (Hot Prospect)', confidence: 0.96, icon: '🔥' }
    ],
    actionsExecuted: [
      { system: 'Salesforce CRM', action: 'Lead status updated to "Qualified - Site Visit"', status: 'completed', time: '00:31' },
      { system: 'Google Calendar', action: 'Event scheduled with RM Rohit & Lead', status: 'completed', time: '00:31' },
      { system: 'WhatsApp Business API', action: 'Brochure PDF & Google Maps pin sent', status: 'completed', time: '00:32' }
    ],
    impactMetrics: [
      { metric: '< 15s', label: 'Speed to first outbound call' },
      { metric: '3.4x', label: 'Increase in verified site visits' },
      { metric: '72%', label: 'Reduction in cost per qualified lead' }
    ],
    audioSample: {
      duration: '0:32',
      accent: 'Indian English (Neutral Corporate)',
      sampleRate: '24kHz HD'
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    badge: 'Clinical Coordination & Reminders',
    tagline: 'Automate high-volume appointment desks and patient reminders.',
    description: 'Ensure zero missed appointments with proactive voice confirmations, diagnostic coordination, and post-discharge check-ins while strictly maintaining patient privacy.',
    agentName: 'Dr. Priya (Care Desk AI)',
    agentRole: 'Patient Care Coordination Specialist',
    agentAvatar: '🩺',
    industryProblem: 'Hospital call centres face 40% unanswered patient queries and 28% OPD no-show rates, directly affecting clinical utilization.',
    workflowSteps: [
      'EHR scheduled event triggers 24-hour reminder call',
      'AI verifies patient identity and explains pre-consultation fasting guidelines',
      'Patient can reschedule or confirm instantly via voice',
      'Real-time doctor schedule lock in Hospital Management System (HMS)',
      'Automated SMS & WhatsApp summary with clinic room & token number'
    ],
    sampleConversation: [
      {
        speaker: 'agent',
        message: 'Namaste Mrs. Verma. This is Priya calling from Apollo Specialty Hospitals regarding your cardiology follow-up with Dr. Sen tomorrow at 10:00 AM.',
        timestamp: '00:03',
        intentTag: 'Identity & Appointment Context'
      },
      {
        speaker: 'customer',
        message: 'Yes Priya. Is it possible to move it to 2:30 PM? I have a meeting in the morning.',
        timestamp: '00:09'
      },
      {
        speaker: 'agent',
        message: 'Dr. Sen has an available OPD slot tomorrow at 2:45 PM. Shall I confirm that for you?',
        timestamp: '00:15',
        intentTag: 'Slot Availability & Negotiation'
      },
      {
        speaker: 'customer',
        message: 'Yes, 2:45 PM is perfect. Do I need any new blood tests before coming?',
        timestamp: '00:20'
      },
      {
        speaker: 'agent',
        message: 'Your previous lipid panel is already on file. Please bring your current medication list. Your token for 2:45 PM is confirmed and sent to your phone.',
        timestamp: '00:27',
        intentTag: 'Instruction & Confirmation'
      }
    ],
    extractedEntities: [
      { label: 'Patient Name', value: 'Mrs. Sunita Verma', confidence: 1.0, icon: '👤' },
      { label: 'Physician', value: 'Dr. R. K. Sen (Cardiology)', confidence: 0.99, icon: '🩺' },
      { label: 'Original Slot', value: 'Tomorrow 10:00 AM', confidence: 1.0, icon: '⏰' },
      { label: 'Rescheduled Slot', value: 'Tomorrow 02:45 PM', confidence: 1.0, icon: '✅' },
      { label: 'Action Required', value: 'Bring Medication List', confidence: 0.97, icon: '📋' }
    ],
    actionsExecuted: [
      { system: 'Hospital HMS / EHR', action: 'Slot updated to 2:45 PM, Token #18 generated', status: 'completed', time: '00:28' },
      { system: 'Doctor OPD Portal', action: 'Calendar updated in real-time', status: 'completed', time: '00:28' },
      { system: 'SMS Gateway', action: 'Appointment slip & Token SMS delivered', status: 'completed', time: '00:29' }
    ],
    impactMetrics: [
      { metric: '84%', label: 'Reduction in OPD no-show rate' },
      { metric: '0s', label: 'Patient queue hold time' },
      { metric: '100%', label: 'HIPAA & Data Privacy compliant' }
    ],
    audioSample: {
      duration: '0:29',
      accent: 'Warm & Empathetic (English / Hindi)',
      sampleRate: '24kHz HD'
    }
  },
  {
    id: 'bfsi',
    name: 'BFSI & Fintech',
    badge: 'Banking & Lending Operations',
    tagline: 'Automate loan enquiries, onboarding verification, and renewal alerts.',
    description: 'Scale banking interactions with high-accuracy intent detection for loan qualification, KYC verification checkpoints, EMI payment reminders, and policy renewal conversations.',
    agentName: 'Vikram (BFSI AI)',
    agentRole: 'Lending & Verification Specialist',
    agentAvatar: '💳',
    industryProblem: 'Manual calling for loan documentation and payment reminders costs financial institutions millions with poor agent efficiency.',
    workflowSteps: [
      'Customer applies on digital lending app or web portal',
      'Shris AI initiates verification call to validate eligibility & income band',
      'Explains interest rate tiers and required KYC documents',
      'Collects consent for credit assessment and sends upload link',
      'Updates Core Banking / Loan Origination System (LOS)'
    ],
    sampleConversation: [
      {
        speaker: 'agent',
        message: 'Good afternoon Mr. Reddy. This is Vikram from Axis Capital. I am following up on your pre-approved business loan application of ₹25 Lakhs.',
        timestamp: '00:04',
        intentTag: 'Application Check'
      },
      {
        speaker: 'customer',
        message: 'Hi Vikram. What is the tenure and interest rate being offered for this amount?',
        timestamp: '00:10'
      },
      {
        speaker: 'agent',
        message: 'We offer flexible tenures from 24 to 60 months with reducing rates starting at 11.25% p.a. Your pre-approval requires only 6 months GST returns for instant sanction.',
        timestamp: '00:17',
        intentTag: 'Rate Quotation & Eligibility'
      },
      {
        speaker: 'customer',
        message: 'That sounds competitive. Send me the secure document upload link.',
        timestamp: '00:23'
      },
      {
        speaker: 'agent',
        message: 'I have dispatched your encrypted document portal link via SMS. Once uploaded, your dedicated relationship manager Anil will finalize the disbursement.',
        timestamp: '00:29',
        intentTag: 'Disbursement Pipeline Handoff'
      }
    ],
    extractedEntities: [
      { label: 'Applicant', value: 'K. S. Reddy', confidence: 1.0, icon: '👤' },
      { label: 'Loan Amount', value: '₹25,00,000 (Pre-Approved)', confidence: 0.99, icon: '💰' },
      { label: 'Offered Rate', value: '11.25% p.a. (Reducing)', confidence: 0.98, icon: '📊' },
      { label: 'Doc Required', value: '6 Months GST Returns', confidence: 0.99, icon: '📑' },
      { label: 'Intent Grade', value: 'Tier 1 (High Likelihood)', confidence: 0.97, icon: '⭐' }
    ],
    actionsExecuted: [
      { system: 'Core Loan Origination System', action: 'Stage advanced to "Docs Pending Upload"', status: 'completed', time: '00:30' },
      { system: 'Secure SMS Gateway', action: 'Tokenized 1-time upload link sent', status: 'completed', time: '00:30' },
      { system: 'Internal RM Slack', action: 'Lead summary pushed to Commercial Lending Desk', status: 'completed', time: '00:31' }
    ],
    impactMetrics: [
      { metric: '5.2x', label: 'Loan application completion rate' },
      { metric: '68%', label: 'Lower customer acquisition cost' },
      { metric: '100%', label: 'Strict audit trail logging' }
    ],
    audioSample: {
      duration: '0:31',
      accent: 'Professional Corporate (Bilingual)',
      sampleRate: '24kHz HD'
    }
  },
  {
    id: 'education',
    name: 'Education & EdTech',
    badge: 'Admissions & Academic Counselling',
    tagline: 'Engage every student and parent enquiry with personalized voice guidance.',
    description: 'Transform admission funnels by immediately answering course queries, eligibility criteria, campus tour schedules, and fee payment deadlines.',
    agentName: 'Ananya (Admissions AI)',
    agentRole: 'Academic Counselling Advisor',
    agentAvatar: '🎓',
    industryProblem: 'Institutes lose 65% of potential students during peak admissions due to delayed response times and overwhelmed counselling desks.',
    workflowSteps: [
      'Inquiry received from university website or admission portal',
      'AI calls student, clarifies academic background and desired specialization',
      'Explains eligibility, scholarships, and entrance test dates',
      'Schedules 1-on-1 Dean counselling or campus visit',
      'Updates CRM with student profile & dispatches syllabus booklet'
    ],
    sampleConversation: [
      {
        speaker: 'agent',
        message: 'Hi Rhea! This is Ananya from Plaksha University admissions. You recently enquired about our B.Tech in AI & Data Science. Have you appeared for JEE or SAT?',
        timestamp: '00:04',
        intentTag: 'Academic Profile Verification'
      },
      {
        speaker: 'customer',
        message: 'Hi Ananya, I took JEE Mains and scored 94 percentile. Are there merit scholarships available?',
        timestamp: '00:11'
      },
      {
        speaker: 'agent',
        message: 'Congratulations on 94 percentile! That qualifies you for our 35% Academic Excellence Scholarship. Our next interactive campus open house is this Sunday. Would you like an invite for you and your parents?',
        timestamp: '00:19',
        intentTag: 'Scholarship Match & Campus Invitation'
      },
      {
        speaker: 'customer',
        message: 'Yes please! We would love to attend.',
        timestamp: '00:23'
      },
      {
        speaker: 'agent',
        message: 'Awesome! Your family pass for Sunday at 10:00 AM has been emailed, and I have attached the scholarship brochure on your WhatsApp.',
        timestamp: '00:29',
        intentTag: 'Event Registration & Deliverables'
      }
    ],
    extractedEntities: [
      { label: 'Student', value: 'Rhea Nambiar', confidence: 1.0, icon: '🎓' },
      { label: 'Program', value: 'B.Tech AI & Data Science', confidence: 0.99, icon: '💻' },
      { label: 'Test Score', value: 'JEE Mains 94th Percentile', confidence: 0.98, icon: '📈' },
      { label: 'Scholarship', value: '35% Academic Excellence Eligible', confidence: 0.99, icon: '🏅' },
      { label: 'Open House Pass', value: 'Confirmed (Sunday 10 AM)', confidence: 1.0, icon: '🎟️' }
    ],
    actionsExecuted: [
      { system: 'HubSpot Admissions CRM', action: 'Lead tagged "High Merit - Open House Confirmed"', status: 'completed', time: '00:30' },
      { system: 'Eventbrite / Calendar', action: 'Family Open House pass generated', status: 'completed', time: '00:30' },
      { system: 'WhatsApp API', action: 'Curriculum & Scholarship breakdown delivered', status: 'completed', time: '00:31' }
    ],
    impactMetrics: [
      { metric: '91%', label: 'Enquiry to conversation connection' },
      { metric: '4.1x', label: 'Higher campus open house attendance' },
      { metric: '24/7', label: 'Instant response during peak season' }
    ],
    audioSample: {
      duration: '0:30',
      accent: 'Youthful & Encouraging (English)',
      sampleRate: '24kHz HD'
    }
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & D2C',
    badge: 'Voice-First Customer Support & Retention',
    tagline: 'Deliver zero-wait order resolution, returns, and abandoned cart follow-ups.',
    description: 'Empower retail brands with proactive order tracking, COD order confirmation, address verification, and automated returns coordination over human-like voice calls.',
    agentName: 'Kavya (Retail AI)',
    agentRole: 'E-Commerce Experience Assistant',
    agentAvatar: '🛍️',
    industryProblem: 'High RTO (Return to Origin) on COD orders and cart drop-offs cost D2C brands up to 35% in wasted logistics and lost margin.',
    workflowSteps: [
      'COD order placed or high-value cart abandoned',
      'AI calls within 60 seconds to confirm delivery address & availability',
      'Handles payment method switch (COD to Prepaid) with instant discount link',
      'Updates Shopify / Magento / WMS in real-time',
      'Sends instant tracking WhatsApp update'
    ],
    sampleConversation: [
      {
        speaker: 'agent',
        message: 'Hello Tanmay! This is Kavya from Urban Nomad. I am calling to confirm your Cash-on-Delivery order for the Horizon Leather Backpack for delivery in Mumbai.',
        timestamp: '00:03',
        intentTag: 'COD Verification'
      },
      {
        speaker: 'customer',
        message: 'Hi Kavya. Can I pay online right now if there is an extra discount?',
        timestamp: '00:08'
      },
      {
        speaker: 'agent',
        message: 'Absolutely! If you convert to UPI payment right now, you receive an instant 10% cashback of ₹450. Shall I send the one-click payment link to your WhatsApp?',
        timestamp: '00:16',
        intentTag: 'Payment Conversion Incentive'
      },
      {
        speaker: 'customer',
        message: 'Yes, send it over.',
        timestamp: '00:19'
      },
      {
        speaker: 'agent',
        message: 'Payment link sent! Once completed, your order will be prioritized for express dispatch by tomorrow morning.',
        timestamp: '00:25',
        intentTag: 'Conversion & Logistics Trigger'
      }
    ],
    extractedEntities: [
      { label: 'Customer', value: 'Tanmay Mehta', confidence: 1.0, icon: '👤' },
      { label: 'Order Item', value: 'Horizon Leather Backpack', confidence: 0.99, icon: '🎒' },
      { label: 'Payment Mode', value: 'COD → Prepaid UPI (Converted)', confidence: 1.0, icon: '💳' },
      { label: 'Cashback Applied', value: '₹450 (10% Instant)', confidence: 0.99, icon: '🎁' },
      { label: 'Dispatch Tier', value: 'Express Priority', confidence: 0.98, icon: '⚡' }
    ],
    actionsExecuted: [
      { system: 'Shopify Storefront', action: 'Order payment status transitioned to "Prepaid Pending"', status: 'completed', time: '00:26' },
      { system: 'Razorpay Payment Gateway', action: 'Tokenized 10% discounted payment link sent', status: 'completed', time: '00:26' },
      { system: 'Shiprocket Logistics', action: 'Fulfillment tag set to "Priority Express Air"', status: 'completed', time: '00:27' }
    ],
    impactMetrics: [
      { metric: '58%', label: 'Reduction in COD Return-to-Origin' },
      { metric: '31%', label: 'COD to Prepaid conversion rate' },
      { metric: '4.8/5', label: 'Customer CSAT score' }
    ],
    audioSample: {
      duration: '0:27',
      accent: 'Friendly & Modern (Bilingual)',
      sampleRate: '24kHz HD'
    }
  },
  {
    id: 'travel',
    name: 'Travel & Hospitality',
    badge: 'Concierge, Bookings & Guest Reminders',
    tagline: 'From reservation confirmation to VIP concierge, automate guest journeys.',
    description: 'Deliver 5-star voice experiences for airlines, luxury resorts, and tour operators with instant booking confirmations, dietary preferences, and cancellation handling.',
    agentName: 'Kabir (Hospitality AI)',
    agentRole: 'Guest Relations & Concierge Specialist',
    agentAvatar: '✈️',
    industryProblem: 'Hospitality front desks are overloaded during check-in surges, leading to missed airport transfer requests and poor guest reviews.',
    workflowSteps: [
      'Reservation confirmed in Opera PMS / Sabre',
      'AI calls guest 48 hours prior to arrival to confirm itinerary',
      'Captures flight arrival time, airport pickup requirements & dietary preferences',
      'Coordinates with concierge and kitchen teams',
      'Dispatches digital key & check-in QR code'
    ],
    sampleConversation: [
      {
        speaker: 'agent',
        message: 'Good evening Mr. Alvares! Kabir calling from The Oberoi Grand. We are excited to welcome you this Friday. Would you like us to arrange airport luxury pickup from Terminal 2?',
        timestamp: '00:04',
        intentTag: 'Concierge Outreach'
      },
      {
        speaker: 'customer',
        message: 'Hello Kabir. Yes please, my flight lands at 4:15 PM on Friday. Also, we will need a baby crib in the suite.',
        timestamp: '00:12'
      },
      {
        speaker: 'agent',
        message: 'Noted! A Mercedes E-Class chauffeur will meet you at Terminal 2 Arrival Gate 4 with your name placard. A sanitized wooden crib is also assigned to your Luxury Suite.',
        timestamp: '00:21',
        intentTag: 'Custom Requirement Confirmation'
      },
      {
        speaker: 'customer',
        message: 'Wonderful, thank you so much.',
        timestamp: '00:24'
      },
      {
        speaker: 'agent',
        message: 'It is our absolute pleasure. Chauffeur details and fast-track digital check-in have been dispatched to your email and WhatsApp.',
        timestamp: '00:30',
        intentTag: 'Workflow Fulfillment'
      }
    ],
    extractedEntities: [
      { label: 'Guest', value: 'Marcus Alvares', confidence: 1.0, icon: '👤' },
      { label: 'Arrival Time', value: 'Friday, 04:15 PM (T2 Gate 4)', confidence: 0.99, icon: '✈️' },
      { label: 'Transport', value: 'Chauffeur Luxury Pickup (E-Class)', confidence: 1.0, icon: '🚗' },
      { label: 'Room Amenity', value: 'Sanitized Baby Crib Assigned', confidence: 0.99, icon: '🛏️' },
      { label: 'VIP Status', value: 'Platinum Guest (Fast-Track)', confidence: 0.98, icon: '👑' }
    ],
    actionsExecuted: [
      { system: 'Opera PMS', action: 'Special requests tagged: "Airport Transfer + Baby Crib"', status: 'completed', time: '00:31' },
      { system: 'Concierge Dispatch Desk', action: 'Driver assigned for 04:00 PM T2 pickup', status: 'completed', time: '00:31' },
      { system: 'WhatsApp Concierge', action: 'Digital key pass & chauffeur contact delivered', status: 'completed', time: '00:32' }
    ],
    impactMetrics: [
      { metric: '98%', label: 'Special request fulfillment accuracy' },
      { metric: '42%', label: 'Increase in ancillary transport & dining revenue' },
      { metric: '< 30s', label: 'Digital check-in duration' }
    ],
    audioSample: {
      duration: '0:32',
      accent: 'Polished & Courteous (International English)',
      sampleRate: '24kHz HD'
    }
  }
];

export const OTHER_INDUSTRIES = [
  { name: 'Logistics & Supply Chain', description: 'Driver dispatch coordination, delivery status updates, address validation, and demurrage alerts.', icon: '🚚' },
  { name: 'Automotive & Dealerships', description: 'Test drive scheduling, service maintenance reminders, warranty renewal, and trade-in valuations.', icon: '🚗' },
  { name: 'Recruitment & Staffing', description: 'First-round candidate screening, skill pre-qualification, salary expectation alignment, and interview scheduling.', icon: '👥' },
  { name: 'Debt Collections & Recovery', description: 'Empathetic EMI reminder calls, restructured payment negotiation, payment link dispatch, and compliance logging.', icon: '📑' },
  { name: 'Telecom & Utilities', description: 'Outage notifications, plan upgrade recommendations, broadband technician dispatch, and bill dispute handling.', icon: '📡' },
  { name: 'Field Services & Home Repair', description: 'Technician slot booking, quote confirmation, parts arrival notification, and post-service quality check calls.', icon: '🔧' },
  { name: 'SaaS & B2B Sales', description: 'Demo request qualification, inbound enrichment, trial expiration reminders, and executive outreach.', icon: '⚡' },
  { name: 'Healthcare Diagnostics', description: 'Home blood sample collection coordination, report readiness notification, and fasting requirement checks.', icon: '🔬' }
];
