"use client";

import { useState } from "react";
import { VulTable } from "./vul-table";

export const Tab = ({ db }: any) => {
  const [tab, setTab] = useState(0);

  return (
    <main>
      <div className="border-t-2 border-b-2 border-border py-3 px-5 flex gap-2 bg-background">
        <button
          onClick={() => setTab(0)}
          className={`text-foreground py-1.5 px-4 rounded transition-colors ${
            tab == 0 && "bg-white shadow-xs"
          }`}>
          Overview
        </button>
        <button
          onClick={() => setTab(1)}
          className={`text-foreground py-1.5 px-4 rounded transition-colors ${
            tab == 1 && "bg-white shadow-xs"
          }`}>
          Vulnerabilities
        </button>
        <button
          onClick={() => setTab(2)}
          className={`text-foreground py-1.5 px-4 rounded transition-colors ${
            tab == 2 && "bg-white shadow-xs"
          }`}>
          Versions
        </button>
        <button
          onClick={() => setTab(3)}
          className={`text-foreground py-1.5 px-4 rounded transition-colors ${
            tab == 3 && "bg-white shadow-xs"
          }`}>
          License
        </button>
      </div>
      <div className="w-full h-auto">
        {tab == 0 && (
          <div>
            <div className="max-w-3xl mx-auto border-l-4 border-primary p-6 pr-0 space-y-2 my-12">
              <h3 className="text-xl font-medium">Summary</h3>
              <p className="text-slate-500 text-base w-full">
                This analysis was performed using vet and SafeDep Cloud
                Malicious Package Analysis. Integrate with GitHub using
                vet-action GitHub Action.
                <br />
                <span className="text-slate-500 font-bold">Note:</span> This
                report is updated by a verification record
              </p>
              <p className="text-slate-500">
                Multiple files flagged for potential data exfiltration, XSS, and
                RCE vulnerabilities. High confidence of malicious intent due to
                combined factors.
              </p>
            </div>
            <div className="max-w-3xl mx-auto border-l-4 border-border p-6 pr-0 space-y-2 my-12">
              <h3 className="text-xl font-medium">Verification Record</h3>
              <p className="text-slate-500 text-base">
                Manual analysis confirmed that the package is clean.
              </p>
            </div>
            <div className="max-w-3xl mx-auto border-l-4 border-border p-6 pr-0 space-y-6 my-12">
              <h3 className="text-xl font-medium">Details</h3>
              <p className="text-slate-500 text-base">
                <span className="text-slate-500 font-bold">Note:</span> This
                report is updated by a verification record
              </p>
              <p className="text-slate-500">
                The package exhibits multiple concerning behaviors. Several
                files match the 'sys_net_recon_exfil' YARA rule, suggesting
                potential system and network information exfiltration.
                Additionally, the code constructs javascript: URLs and assigns
                them to formAction attributes, which can lead to XSS or RCE if
                user-controlled data is involved. Furthermore, dynamic code
                execution is possible via formatDynamicImportPath if the
                cacheHandlers configuration is compromised. These factors,
                combined, indicate malicious intent.
              </p>
            </div>
          </div>
        )}
        {tab == 1 && (
          <div>
            <table className="w-full table-auto">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left font-medium text-sm text-muted-foreground p-3">
                    Vulnerability ID
                  </th>
                  <th className="text-left font-medium text-sm text-muted-foreground p-3">
                    Summary
                  </th>
                  <th className="text-left font-medium text-sm text-muted-foreground p-3">
                    Risk
                  </th>
                  <th className="text-left font-medium text-sm text-muted-foreground p-3">
                    Published
                  </th>
                  <th className="text-left font-medium text-sm text-muted-foreground p-3">
                    Modified
                  </th>
                </tr>
              </thead>
              <tbody>
                {db.insight.vulnerabilities ? (
                  db.insight.vulnerabilities.map((vul: any) => (
                    <VulTable
                      key={vul.id.value || null}
                      id={vul.id.value || null}
                      summary={vul.summary || null}
                      risk={(vul.severities && vul.severities[0].risk) || null}
                      published={vul.publishedAt || null}
                      modified={vul.modifiedAt || null}
                    />
                  ))
                ) : (
                  <p className="text-foreground p-3 w-full text-center">
                    No Data
                  </p>
                )}
              </tbody>
            </table>
          </div>
        )}
        {tab == 2 && (
          <div>
            <table className="w-full table-auto">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left font-medium text-sm text-muted-foreground p-3">
                    Version
                  </th>
                  <th className="text-left font-medium text-sm text-muted-foreground p-3">
                    Published On
                  </th>
                  <th className="text-left font-medium text-sm text-muted-foreground p-3">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {db.insight.availableVersions ? (
                  db.insight.availableVersions.reverse().map((version: any) => (
                    <tr key={version.version}>
                      <td className="text-left font-regular text-sm text-foreground p-3">
                        <p className="text-xs text-gray-700 bg-gray-100 rounded p-1 w-fit">
                          {version.version}
                        </p>
                      </td>
                      <td className="text-left font-regular text-sm text-foreground p-3">
                        {new Date(version.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="text-left font-regular text-sm text-primary p-3">
                        View Version
                      </td>
                    </tr>
                  ))
                ) : (
                  <p className="text-foreground p-3 w-full text-center">
                    No Data
                  </p>
                )}
              </tbody>
            </table>
          </div>
        )}
        {tab == 3 && (
          <div>
            <table className="w-full table-auto">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left font-medium text-sm text-muted-foreground p-3">
                    License ID
                  </th>
                  <th className="text-left font-medium text-sm text-muted-foreground p-3">
                    License Name
                  </th>
                  <th className="text-left font-medium text-sm text-muted-foreground p-3">
                    Reference URL
                  </th>
                </tr>
              </thead>
              <tbody>
                {db.insight.licenses ? (
                  db.insight.licenses.licenses.map((license: any) => (
                    <tr key={license.licenseId}>
                      <td className="text-left font-regular text-sm text-foreground p-3">
                        {license.licenseId}
                      </td>
                      {license.licenseName && (
                        <td className="text-left font-regular text-sm text-foreground p-3">
                          {license.licenseName}
                        </td>
                      )}
                      {license.referenceURL && (
                        <td className="text-left font-regular text-sm text-primary p-3">
                          <a href={license.referenceURL} target="_blank">
                            View Version
                          </a>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <p className="text-foreground p-3 w-full text-center">
                    No Data
                  </p>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};
