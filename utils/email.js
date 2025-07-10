export const sendOfferEmail = async (application) => {
    console.log(`📧 Sending offer email to ${application.email} for ${application.productType}`);
    // Here you could add actual Nodemailer logic
    return true;
};
