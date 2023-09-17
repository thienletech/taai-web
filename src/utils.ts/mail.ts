export const getMailtoHref = ({ email = 'admin@aichungkhoan.info', subject = '[User] User feedback', body = '' }) => {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
