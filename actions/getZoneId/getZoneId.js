const { getInput } = require("@actions/core");
const fs = require("fs");

const host = getInput("host");
const cfToken = getInput("cf-token");

async function getZones() {
  const response = await fetch(`https://api.cloudflare.com/client/v4/zones`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfToken}`,
    },
  });

  if (!response.ok) {
    return "Error fetching zones";
  }
  const data = await response.json();
  return data && data.result
    ? data.result.map((zone) => {
        return {
          id: zone.id,
          name: zone.name,
        };
      })
    : [];
}

// cut host to be only domain and tld
const domain = host.split(".").slice(-2).join(".");

getZones().then((zones) => {
  const zone = zones.find((zone) => zone.name === domain);
  if (zone) {
    console.log(`Zone ID for ${domain} is ${zone.id}`);
    fs.appendFileSync(process.env.GITHUB_ENV, `RT_ZONE_ID=${zone.id}\n`);
  } else {
    console.log(`Zone ${domain} not found.`);
  }
});
