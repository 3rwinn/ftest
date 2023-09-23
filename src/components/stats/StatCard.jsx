import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { classNames } from "../../utils/helpers";

// {classNames(
//   active
//     ? "bg-gray-100 text-gray-900"
//     : "text-gray-700",
//   "block px-4 py-2 text-sm cursor-pointer"
// )}

function StatCard({
  icon = (
    <InformationCircleIcon className="h-6 w-6 text-ctamp" aria-hidden="true" />
  ),
  title,
  value,
  bgColor = "bg-white",
  reverse = false,
}) {
  return (
    <div className={`${bgColor} overflow-hidden shadow rounded-lg`}>
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt
                className={classNames(
                  reverse ? "text-white" : "text-gray-500",
                  "text-sm font-medium truncate"
                )}
              >
                {title}
              </dt>
              <dd>
                <div
                  className={classNames(
                    reverse ? "text-white" : "text-gray-900",
                    "text-lg font-medium"
                  )}
                >
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
