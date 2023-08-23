export const roles = {
  ADMIN: 'Admin',
  INTERNAL: 'Internal',
  CUSTOMER: 'Customer',
};
export const jwtSecret = Buffer.from(process.env.JWTSECRET, 'hex');

export const basicToken = Buffer.from(
  `${process.env.RINGCENTRAL_CLIENT_ID}:${process.env.RINGCENTRAL_CLIENT_SECRET}`
).toString('base64');

export const symbolMap = {
  or: '$or',
  and: '$and',
  id: '_id',
  regex: '$regex',
};

export const projectStatus = {
  INPROGRESS: 'In Progress',
  DEPLOYED: 'Deployed',
  PENDING: 'Pending',
};
export const regexList = {
  ISNUMBER: /^[-+]?\d+(\.\d+)?$/,
  ISEMAIL: /^[\w.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  ISRCEMAIL: /^[A-Za-z0-9._%+-]+@ringcentral\.com$/,
};
export const projectRequestStatus = {
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  PENDING: 'Pending',
};
export const projectUpdateTypes = {
  DETAILS: 'details',
  CONNECTIVITY: 'connectivity',
};

export const PRESIGNED_SOW_EXPIRES_IN = 3600;
export const oneHourTimeStamp = 3600 * 1000;
export const sevenDaysTimeStamp = 7 * 24 * 60 * 60 * 1000;
export const accessDeniedMessage = 'AccessDenied';
export const allowedEmail = process.env.INTERNAL_EMAIL_DOMAIN || 'ringcentral.com';
