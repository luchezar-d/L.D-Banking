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

export async function publishLoanEvent(detailType, data) {
  const input = {
    Entries: [
      {
        Source: "loan.app",
        DetailType: detailType,
        Detail: JSON.stringify(data),
        EventBusName: "LoanEventsBus"
      }
    ]
  };

  try {
    const command = new PutEventsCommand(input);
    const response = await client.send(command);
    console.log("📤 Sent event to EventBridge:", JSON.stringify(input, null, 2));
    console.log("📥 Response from EventBridge:", JSON.stringify(response, null, 2));
    return response;
  } catch (err) {
    console.error("❌ Error publishing event to EventBridge:", err);
    throw err;
  }
}
