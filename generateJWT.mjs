import { generateKeyPair } from "jose/util/generate_key_pair";
import { exportJWK, exportPKCS8 } from "jose/key/export";
import { randomUUID } from "crypto";

const SITE_URL = "http://localhost:5173";

async function main() {
  // Generate RSA key pair
  const { publicKey, privateKey } = await generateKeyPair("RS256", {
    modulusLength: 2048,
  });

  // Export public key as JWK
  const jwk = await exportJWK(publicKey);
  jwk.use = "sig";
  jwk.kid = randomUUID();

  // Export private key as PEM
  const privatePem = await exportPKCS8(privateKey);

  // JWKS format
  const jwks = { keys: [jwk] };

  // Print instructions and env variables
  console.log(`
==========================
Convex JWT Environment Variables
==========================

Copy and paste the following environment variables into your Convex dashboard at:

https://dashboard.convex.dev/t/<username>/<project>/<deployment-name>/settings/environment-variables

--------------------------
JWKS=
${JSON.stringify(jwks)}

JWT_PRIVATE_KEY=
${privatePem.trim()}

SITE_URL=${SITE_URL}

--------------------------
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
