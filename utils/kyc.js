export const runKycCheck = async (app) => {
    console.log(`🔍 Running KYC for ${app.email}`);
    return { status: Math.random() > 0.5 ? 'approved' : 'rejected' };
};
