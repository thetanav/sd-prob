import { createPromiseClient, Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { InsightService } from "@buf/safedep_api.connectrpc_es/safedep/services/insights/v2/insights_connect.js";
import { Ecosystem } from "@buf/safedep_api.bufbuild_es/safedep/messages/package/v1/ecosystem_pb.js";

function authenticationInterceptor(token: string, tenant: string): Interceptor {
  return (next) => async (req) => {
    req.header.set("authorization", token);
    req.header.set("x-tenant-id", tenant);
    return await next(req);
  };
}

export async function getInsight({
  ecosystem,
  name,
  version,
}: {
  ecosystem: string;
  name: string;
  version: string;
}) {
  // Validate environment variables
  const token = process.env.SAFEDEP_API_KEY;
  if (!token) {
    console.error("SAFEDEP_API_KEY is required");
    return;
  }

  const tenantId = process.env.SAFEDEP_TENANT_ID;
  if (!tenantId) {
    console.error("SAFEDEP_TENANT_ID is required");
    return;
  }

  if (!Object.values(Ecosystem).includes(ecosystem.toUpperCase())) {
    console.error("Invalid ecosystem");
    return;
  }

  // Create transport with authentication
  const transport = createConnectTransport({
    baseUrl: "https://api.safedep.io",
    httpVersion: "1.1",
    interceptors: [authenticationInterceptor(token, tenantId)],
  });

  // Create client and make API call
  const client = createPromiseClient(InsightService, transport);
  const res = await client.getPackageVersionInsight({
    packageVersion: {
      package: {
        ecosystem: Ecosystem[ecosystem.toUpperCase() as keyof typeof Ecosystem],
        name,
      },
      version,
    },
  });

  return res.toJson();
}
