import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";

const client = new EventBridgeClient({
  region: "eu-west-1"
});

async function publishLoanEvent() {
  const event = {
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

  const result = await client.send(new PutEventsCommand(event));
  console.log("Published:", JSON.stringify(result, null, 2));
}

publishLoanEvent();
