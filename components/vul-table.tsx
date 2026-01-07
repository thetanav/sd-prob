import {
  BanIcon,
  CircleArrowDownIcon,
  CircleDashedIcon,
  CircleFadingArrowUp,
  CircleFadingArrowUpIcon,
  Octagon,
  OctagonXIcon,
} from "lucide-react";

export const VulTable = ({ id, summary, risk, published, modified }: any) => {
  return (
    <tr>
      <td className="text-left font-regular text-sm text-foreground p-3">
        {id}
      </td>
      <td className="text-left font-regular text-sm text-foreground p-3">
        {summary}
      </td>
      <td className="text-left font-medium text-sm text-foreground p-3">
        {risk && (
          <>
            {risk == "RISK_LOW" && (
              <span className="rounded text-cyan-700 bg-cyan-50 px-1.5 py-0.5 flex gap-1.5 items-center justify-center w-fit text-xs">
                <CircleArrowDownIcon className="w-4" />
                Low
              </span>
            )}
            {risk == "RISK_MEDIUM" && (
              <span className="rounded text-yellow-700 bg-yellow-50 px-1.5 py-0.5 flex gap-1.5 items-center justify-center w-fit text-xs">
                <BanIcon className="w-4" />
                Medium
              </span>
            )}
            {risk == "RISK_HIGH" && (
              <span className="rounded text-pink-700 bg-pink-50 px-1.5 py-0.5 flex gap-1.5 items-center justify-center w-fit text-xs">
                <CircleFadingArrowUpIcon className="w-4" />
                High
              </span>
            )}
            {risk == "RISK_CRITICAL" && (
              <span className="rounded text-red-700 bg-red-50 px-1.5 py-0.5 flex gap-1.5 items-center justify-center w-fit text-xs">
                <OctagonXIcon className="w-4" />
                Critical
              </span>
            )}
            {risk == "RISK_UNSPECIFIED" && (
              <span className="rounded text-neutral-700 bg-neutral-50 px-1.5 py-0.5 flex gap-1.5 items-center justify-center w-fit text-xs">
                <CircleDashedIcon className="w-4" />
                Unspecified
              </span>
            )}
          </>
        )}
      </td>
      <td className="text-left font-regular text-sm text-foreground p-3">
        {new Date(published).toLocaleDateString()}
      </td>
      <td className="text-left font-regular text-sm text-foreground p-3">
        {new Date(modified).toLocaleDateString()}
      </td>
    </tr>
  );
};
