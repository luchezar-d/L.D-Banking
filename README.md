# L.D Banking App

A full-stack banking application with:
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Cloud Integration:** AWS EventBridge for event publishing
- **Error Monitoring:** Honeybadger for backend error tracking
- **Other Integrations:** Salesforce, KYC, Email notifications

---

## Features
- Modern, responsive UI/UX with fixed navbar, full-width header, mobile-friendly layouts, and a gradient footer.
- Users can apply for banking products (Loan, Flash Credit, Credit Card) via a web form.
- All applications are stored in MongoDB with required fields: `fullName`, `email`, `city`, `postalCode`, `productType`, `amount`, `status`, `kycResult`, `createdAt`.
- Backend validates all required fields and always sets status to `Offer Made` on creation.
- Application events are published to AWS EventBridge.
- Salesforce and KYC integrations (mocked or real, depending on your setup).
- Email notifications sent on offer creation.
- **Honeybadger integration:** All backend errors are automatically reported to Honeybadger, including request context (body, query, params, endpoint, and IDs) for easier debugging.
- **Amazon S3 KYC Document Upload:**
    - Users can upload KYC documents (images, PDFs) from the frontend KYC page.
    - Files are uploaded to a private S3 bucket using the AWS SDK v3.
    - The S3 file URL is stored in the `kycDocumentUrl` field of the Application in MongoDB.
    - All upload errors are logged to Honeybadger with full context for debugging.
    - S3 bucket name and credentials are configured via `.env`.

---

## Project Structure
```
my-banking-backend/
├── controllers/
│   └── applicationController.js
├── models/
│   └── Application.js
├── routes/
│   └── applications.js
├── utils/
│   ├── awsEventBridge.js
│   ├── email.js
│   ├── kyc.js
│   └── salesforce.js
├── publishLoanEvent.js
├── index.js
├── .env
├── package.json
├── ...
└── my-banking-frontend/
    ├── src/
    │   ├── pages/Apply.jsx
    │   ├── api/applications.js
    │   └── ...
    ├── tailwind.config.cjs
    ├── postcss.config.cjs
    ├── .env
    └── ...
```

---

## Environment Variables

### Backend (`my-banking-backend/.env`)
```
MONGO_URI=your_mongodb_connection_string
PORT=5001
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket_name
HONEYBADGER_API_KEY=your_honeybadger_api_key
NODE_ENV=production
BASE_URL=https://l-d-banking.onrender.com
```

### Frontend (`my-banking-frontend/.env`)
```
VITE_API_URL=https://l-d-banking.onrender.com/api
VITE_PROXY_API=http://localhost:5001
```

- On Render, set these variables in the "Environment" section for each service.
- For local development, use `VITE_API_URL=http://localhost:5001/api` in the frontend `.env`.

---

## Setup & Run

### Prerequisites
- Node.js & npm
- MongoDB Atlas or local MongoDB
- AWS account (EventBridge, S3)

### 1. Clone the repo
```
git clone https://github.com/luchezar-d/L.D-Banking.git
cd L.D-Banking/my-banking-backend
```

### 2. Install dependencies
```
npm install
cd my-banking-frontend
npm install
```

### 3. Configure environment variables
- See above for `.env` examples for backend and frontend.

### 4. Start the backend
```
npm start
```

### 5. Start the frontend (local dev)
```
cd my-banking-frontend
npm run dev
```

---

## API Endpoints
- `POST /api/apply` — Submit a new application
- `GET /api/applications` — List all applications
- `POST /api/offer/:id/accept` — Accept an offer (triggers KYC)
- `POST /api/offer/:id/upload` — Upload a KYC document (multipart/form-data, field: `kycDocument`)
- `GET /api/applications/:id` — Get application by ID

---

## AWS EventBridge
- Publishes a `LoanOfferMade` event for every new application.
- Event includes all application fields and is sent to the `LoanEventsBus`.

---

## Frontend Features
- Responsive, modern UI/UX with:
  - Fixed, full-width navbar (hamburger menu on mobile)
  - Header section fills viewport under navbar
  - Main content uses full width, with max-w constraints
  - Footer with gradient, social icons, contact info, and map
  - All pages are mobile-friendly and visually consistent
- Uses Tailwind CSS best practices and reusable styles
- API calls use environment-based URLs for cross-device compatibility

---

## Error Monitoring (Honeybadger)
- All backend errors are reported to Honeybadger with full request context
- Add your `HONEYBADGER_API_KEY` to backend `.env`

---

## Deployment (Render)
- Add all required environment variables in Render dashboard for both frontend and backend
- Frontend must use `VITE_API_URL=https://l-d-banking.onrender.com/api`
- Backend must use `BASE_URL=https://l-d-banking.onrender.com`
- Redeploy after updating environment variables

---

## Contributing
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## License
MIT
