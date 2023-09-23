import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { getTimelines } from "../../features/quotidien/quotidienSlice";
import dayjs from "dayjs";
import { classNames } from "../common/Utils";

function MembreTimeline({ membreId }) {
  const dispatch = useDispatch();
  const { timelines, loading } = useSelector((state) => state.quotidien);
  React.useEffect(() => {
    dispatch(getTimelines());
  }, []);

  const [currentTimeline, setCurrentTimeline] = React.useState([]);
  React.useEffect(() => {
    if (timelines.length > 0) {
      setCurrentTimeline(
        timelines.filter((timeline) => timeline.membre === membreId)
      );
    }
  }, [timelines, membreId]);

  console.log(currentTimeline);

  if (currentTimeline.length === 0) {
    return (
      <div className="text-medium text-center mt-4">
        <p>Aucune action n'a été enregistrée pour ce membre.</p>
      </div>
    );
  }
  return (
    <>
      <div className="flow-root p-4">
        <ul role="list" className="-mb-8">
          {currentTimeline?.map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== currentTimeline.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={classNames(
                        "bg-gray-400",
                        "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                      )}
                    >
                      <HandThumbUpIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">{event.action} </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime={event.created_at}>
                        {dayjs(event.created_at).format("DD/MM/YYYY HH:mm")}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MembreTimeline;
