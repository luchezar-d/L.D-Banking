import emailjs from '@emailjs/browser';

export const sendEmail = (templateId, params) =>
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId,
    params,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );

export const sendInitialOfferEmail = ({ name, product, offerLink, email }) =>
  sendEmail(import.meta.env.VITE_EMAILJS_OFFER_TEMPLATE_ID, {
    user_name: name,
    product_name: product,
    offer_link: offerLink,
    to_email: email,
  });

export const sendKycConfirmationEmail = ({ name, product, email }) =>
  sendEmail(import.meta.env.VITE_EMAILJS_KYC_TEMPLATE_ID, {
    user_name: name,
    product_name: product,
    to_email: email,
  });
