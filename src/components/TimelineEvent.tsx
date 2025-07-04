import { MapPin, Tag, Maximize } from "lucide-react";

export function TimelineEvent({ event, onClick }) {
  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  const formatDate = (date) =>
    `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
  const formatDayOfWeek = (date) =>
    date.toLocaleDateString("default", { weekday: "long" });

  const formatDate2 = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getDate()}`;
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isLive = () => {
    const now = new Date();
    return now >= event.start_time && now <= event.end_time;
  };

  const formatTime24 = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  const isAM = (dateString: string) => {
    const date = new Date(dateString);
    return date.getHours() < 12;
  };

  return (
    <div className="relative mb-8 flex">
      <div>
        <p>{formatDate2(event.start_time)}</p>
        <p className="text-gray-500 font-semibold">
          {formatDayOfWeek(event.start_time)}
        </p>
      </div>
      {/* Timeline side (dot + dotted line) */}
      <div className="flex flex-col items-center mr-4 ms-10">
        {/* Dot */}
        <div className="w-4 h-4 bg-blue-500 border-4 border-white rounded-full z-10" />
        {/* Dotted vertical line */}
        <div
          className="flex-1 w-px bg-gray-400 opacity-30 mt-1"
          style={{ borderStyle: "dotted" }}
        />
      </div>

      {/* Main content wrapper */}
      <div className="flex-1">
        {/* Date badge */}
        {/* <div className="flex items-center mb-3">
          <div
            className="rounded-full px-4 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300 
        dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition duration-200 text-sm"
          >
            <span className="font-medium">
              {isToday(event.start_time)
                ? "today"
                : formatDate(event.start_time)}
            </span>
            <span className="ml-2">{formatDayOfWeek(event.start_time)}</span>
          </div>
        </div> */}

        {/* Event card */}
        <div className="flex-1 min-w-0">
          <div
            onClick={() => onClick()}
            className="hover:border hover:border-white/10 cursor-pointer font-semibold lg:pl-1 rounded-lg overflow-hidden shadow-lg flex items-start flex-row gap-4 dark:bg-gray-800 dark:bg-opacity-90 w-full max-w-full min-w-0 relative"
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              // border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* Event content */}
            <div className="p-2 sm:p-3 md:p-4 lg:p-2 flex-grow min-w-0 overflow-hidden">
              <h1 className="text-gray-500 mb-2 text-lg font-bold">
                {formatTime(event.start_time)}
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 break-words max-w-full text-gray-900 dark:text-gray-100">
                {event.name}
              </h2>

              {/* Event type with Tag icon */}
              <p className="flex items-center text-sm sm:text-base font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                <Tag className="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-300 flex-shrink-0" />
                {event.type}
              </p>

              {/* Event location with lucide-react icon */}
              <p className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-3 truncate">
                <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                {event.location}
              </p>

              {/* Going info */}
              <div className=" inline-block bg-green-500 text-white text-sm font-semibold px-2 py-1 rounded select-none">
                Going
              </div>
            </div>

            {/* Event image */}
            <div
              className="p-2 flex-shrink-0 overflow-hidden 
      w-[110px] h-[110px] 
      sm:w-[130px] sm:h-[130px] 
      md:w-[150px] md:h-[150px] 
      lg:w-[160px] lg:h-[160px] 
      xl:w-[140px] xl:h-[140px]"
            >
              <img
                src={event.image}
                alt="event"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
