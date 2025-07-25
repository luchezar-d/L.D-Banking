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
    // ...removed debug log...
    return response;
  } catch (err) {
    
    throw err;
  }
}
