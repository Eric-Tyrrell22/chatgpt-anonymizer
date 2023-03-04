import { anonymizeText } from '../openai/index.js';

import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager"; // ES Modules import
const client = new SecretsManagerClient();
const input = { "SecretId": "OPEN_AI_KEY" }
const command = new GetSecretValueCommand(input);

// explicitly not handling the error, so that this the lambda doesn't cache a bad value.
// Hopefully this forces it to rerun this portion.
const secret = await client.send(command);

export const handler = async(event) => {
    // probably rerturn an error here if failed to get secret.
    return anonymizeText( event.text, secret?.SecretString?.OPEN_AI_KEY );
};
