const PROVINCES = [
  'Western Cape',
  'Eastern Cape',
  'Northern Cape',
  'Free State',
  'KwaZulu-Natal',
  'Gauteng',
  'Limpopo',
  'Mpumalanga',
  'North West'
];

const GRADES = ['Grade 10', 'Grade 11', 'Grade 12', 'First Year', 'Second Year', 'Third Year+'];

const INDUSTRIES = [
  'Information Technology',
  'Engineering',
  'Healthcare',
  'Finance',
  'Education',
  'Hospitality',
  'Manufacturing',
  'Agriculture',
  'Construction',
  'Retail',
  'Marketing',
  'Legal'
];

const DEMAND_LEVELS = ['Low', 'Medium', 'High', 'Very High'];

const CAREER_GROWTH = ['Poor', 'Fair', 'Good', 'Excellent'];

const APPLICATION_STATUS = ['Draft', 'In Progress', 'Submitted', 'Accepted', 'Rejected'];

const DOCUMENT_STATUS = ['Required', 'Uploaded', 'Verified'];

const REQUIRED_DOCUMENTS = [
  'Certified ID Copy',
  'Grade 11 Results',
  'Grade 12 Results',
  'Final Matric Certificate',
  'Proof of Address',
  'Passport-sized Photograph',
  'Proof of Application Fee Payment',
  'Cover Letter'
];

const JWT_EXPIRY = process.env.JWT_EXPIRE || '7d';

const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || 5242880); // 5MB default

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

module.exports = {
  PROVINCES,
  GRADES,
  INDUSTRIES,
  DEMAND_LEVELS,
  CAREER_GROWTH,
  APPLICATION_STATUS,
  DOCUMENT_STATUS,
  REQUIRED_DOCUMENTS,
  JWT_EXPIRY,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES
};
