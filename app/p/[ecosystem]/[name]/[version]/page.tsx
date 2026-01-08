import { ScoreCard } from "@/components/score-card";
import { Tab } from "@/components/tab";
import { VulTable } from "@/components/vul-table";
import { getInsight } from "@/lib/client";
import {
  AwardIcon,
  BookMarkedIcon,
  BugIcon,
  EarthIcon,
  Github,
  GlobeIcon,
  InfoIcon,
} from "lucide-react";
import Image from "next/image";

export default async function Page({ params }: { params: any }) {
  const { ecosystem, name, version } = await params;
  const db: any = await getInsight({ ecosystem, name, version });
  console.log(db);
  if (db == undefined) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto pt-8 px-4">
      <nav className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-slate-400 text-sm">POWERED BY</p>
          <Image
            src="/logo.png"
            alt="powered by safedep"
            width={100}
            height={100}
            className="w-36"
          />
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded flex items-center gap-2 font-medium text-sm">
          <Github />
          Install GitHub App
        </button>
      </nav>

      <main className="bg-primary-foreground border-2 border-border rounded h-full mt-8">
        <div className="bg-slate-50 flex flex-col py-4 px-5 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1 border-2 border-border rounded w-fit">
                <Github />
              </div>
              <p className="font-medium text-xl">
                {db.packageVersion.package.name}@{db.packageVersion.version}
              </p>
            </div>
            <p className="text-slate-500 ">
              Analyzed at{" "}
              <span className="text-foreground">24 Oct 2025, 10:06</span>
            </p>
            <p className="text-slate-500 ">
              Source{" "}
              <span className="text-foreground">
                https://registry.npmjs.org/next/-/next-15.5.4.tgz
              </span>
            </p>
            <p className="text-slate-500 ">
              SHA256{" "}
              <span className="text-foreground font-mono">
                5188d186e94a8d5470af6ed2725d209d8b2abc29cc7d6bedd58a748efd7e89f9
              </span>
            </p>
            <p className="text-slate-500 ">
              Confidence{" "}
              <span className="text-foreground">
                5188d186e94a8d5470af6ed2725d209d8b2abc29cc7d6bedd58a748efd7e89f9
              </span>
            </p>
          </div>
          <div className="grid sm:grid-cols-5 grid-cols-2 gap-2">
            {db.packageVersion.version && (
              <ScoreCard
                name="Version"
                icon={<InfoIcon className="w-5 h-5" />}
                value={db.packageVersion.version}
              />
            )}
            {db.insight.vulnerabilities && (
              <ScoreCard
                name="Vulnerabilities"
                icon={<BugIcon className="w-5 h-5 text-red-700" />}
                value={db.insight.vulnerabilities.length}
              />
            )}
            {db.insight.projectInsights && (
              <ScoreCard
                name="OpenSSF Scorecard"
                icon={<BookMarkedIcon className="w-5 h-5" />}
                value={
                  db.insight.projectInsights[0].scorecard.score.toFixed(1) +
                  "/10"
                }
              />
            )}
            {db.insight.licenses && (
              <ScoreCard
                icon={<AwardIcon className="w-5 h-5" />}
                name="License"
                value={db.insight.licenses.licenses[0].licenseId}
              />
            )}
            <ScoreCard
              name="Ecosystem"
              icon={<EarthIcon className="w-5 h-5" />}
              value={db.packageVersion.package.ecosystem.split("_")[1]}
            />
          </div>
        </div>
        <Tab db={db} />
      </main>
    </div>
  );
}
