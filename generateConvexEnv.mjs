import { exportJWK, exportPKCS8, generateKeyPair } from "jose";

console.log(`
==========================
Convex JWT Environment Variables
==========================

Copy and paste the following environment variables into your Convex dashboard at:

https://dashboard.convex.dev/t/<username>/<project>/<deployment-name>/settings/environment-variables

--------------------------
`);

const keys = await generateKeyPair("RS256", {
  extractable: true,
});
const privateKey = await exportPKCS8(keys.privateKey);
const publicKey = await exportJWK(keys.publicKey);
const jwks = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] });

process.stdout.write(
  `JWT_PRIVATE_KEY="${privateKey.trimEnd().replace(/\n/g, " ")}"\n`
);
process.stdout.write(`JWKS=${jwks}\n`);
process.stdout.write(`SITE_URL=http://localhost:5173\n`);

console.log(`
--------------------------
`);
