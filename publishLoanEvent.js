
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import dotenv from 'dotenv';
dotenv.config();

const client = new EventBridgeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const input = {
  Entries: [
    {
      Source: "loan.app",
      DetailType: "LoanOfferMade",
      Detail: JSON.stringify({
        loanId: "abc123",
        amount: 5000,
        status: "Offer Made"
      }),
      EventBusName: "LoanEventsBus"
    }
  ]
};

(async () => {
  try {
    const command = new PutEventsCommand(input);
    const response = await client.send(command);
    console.log("✅ Published event:", JSON.stringify(response, null, 2));
  } catch (err) {
    console.error("❌ Failed to publish event:", err);
  }
})();
