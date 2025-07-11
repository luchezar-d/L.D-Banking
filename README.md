# L.D Banking App

A full-stack banking application with:
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Cloud Integration:** AWS EventBridge for event publishing
- **Other Integrations:** Salesforce, KYC, Email notifications

---

## Features
- Users can apply for banking products (Loan, Flash Credit, Credit Card) via a web form.
- All applications are stored in MongoDB with required fields: `fullName`, `email`, `city`, `postalCode`, `productType`, `amount`, `status`, `kycResult`, `createdAt`.
- Backend validates all required fields and always sets status to `Offer Made` on creation.
- Application events are published to AWS EventBridge.
- Salesforce and KYC integrations (mocked or real, depending on your setup).
- Email notifications sent on offer creation.

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
    └── ...
```

---

## Setup & Run

### Prerequisites
- Node.js & npm
- MongoDB Atlas or local MongoDB
- AWS account (EventBridge)

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

### 3. Environment Variables
Create a `.env` file in `my-banking-backend/`:
```
MONGO_URI=your_mongodb_connection_string
PORT=5001
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
```

### 4. Start the backend
```
npm start
```

### 5. Start the frontend
```
cd my-banking-frontend
npm run dev
```

---

## API Endpoints
- `POST /api/apply` — Submit a new application
- `GET /api/applications` — List all applications
- `POST /api/offer/:id/accept` — Accept an offer (triggers KYC)
- `GET /api/applications/:id` — Get application by ID

---

## AWS EventBridge
- Publishes a `LoanOfferMade` event for every new application.
- Event includes all application fields and is sent to the `LoanEventsBus`.

---

## Frontend
- Located in `my-banking-frontend/`
- Main form: `src/pages/Apply.jsx`
- Uses Vite, React, Tailwind CSS

---

## Best Practices
- Secrets are stored in `.env` (never commit this file)
- All required fields are validated on the backend
- Git is set up with `.gitignore` to protect secrets and node_modules

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
