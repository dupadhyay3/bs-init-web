/* eslint-disable no-unexpected-multiline */
import React from "react";
import { ToastContainer } from "react-toastify";
import { setAuthHeaders, registerIntercepts } from "apis/axios";
import spaceUsagesApi from "apis/space-usages";
import * as dayjs from "dayjs";
import * as updateLocale from "dayjs/plugin/updateLocale";
import * as weekday from "dayjs/plugin/weekday";
import _ from "lodash";

import { TOASTER_DURATION } from "constants/index";

import AddEntry from "./AddEntry";
import DatesInWeek from "./DatesInWeek";
import EditEntry from "./EditEntry";
import EntryCardDayView from "./EntryCardDayView";
import './style.scss';

const { useState, useEffect } = React;
dayjs.extend(updateLocale);
dayjs.extend(weekday);

const monthsAbbr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
dayjs.updateLocale("en", { monthShort: monthsAbbr });

// Day start from monday
dayjs.Ls.en.weekStart = 1;

const TimeReserving: React.FC<Iprops> = ({
  entries,
  userId,
}) => {
  const [dayInfo, setDayInfo] = useState<any[]>([]);
  const [newEntryView, setNewEntryView] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<number>(dayjs().weekday());
  const [weekDay, setWeekDay] = useState<number>(0);
  const [entryList, setEntryList] = useState<object>(entries);
  const [selectedFullDate, setSelectedFullDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [groupingEntryList, setGroupingEntryList] = useState<object>({});
  const [editEntryId, setEditEntryId] = useState<number>(0);
  const [editEntryColor, setEditEntryColor] = useState<string>("");
  const [allEmployeesEntries, setAllEmployeesEntries] = useState<object>({});

  const calendarTimes = () => {
    const product = (...a: any[][]) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));
    return product([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], [0]).map((k) => {
      const [i, m] = [k[0], k[1]]
      if (i>=24 && m > 0)
        return (null)

      let ii = i - 12
      ii = (i === 0 || ii === 0) ? 12 : (ii < 0) ? i : ii
      return ({
        id: `${i<10 ? 0 : '' }${i}:${m<10 ? 0 : ''}${m}`,
        name: `${ii < 10 ? 0 : '' }${ii}:${m<10 ? 0 : ''}${m} ${i < 12 || i == 24 ? 'AM' : 'PM'}`
      })
    }).filter((el) => el != null)
  }

  useEffect(() => {
    setAuthHeaders();
    registerIntercepts();
    const currentEmployeeEntries = {};
    currentEmployeeEntries[userId] = entries;
    setAllEmployeesEntries(currentEmployeeEntries);
  }, []);

  useEffect(() => {
    handleWeekInfo();
  }, [weekDay]);

  useEffect(() => {
    parseWeeklyViewData();
  }, [weekDay, entryList]);

  useEffect(() => {
    setSelectedFullDate(
      dayjs()
        .weekday(weekDay + selectDate)
        .format("YYYY-MM-DD")
    );
  }, [selectDate, weekDay]);

  const handleWeekInfo = () => {
    const daysInWeek = Array.from(Array(7).keys()).map((weekCounter) => {
      const [day, month, date, year] = dayjs()
        .weekday(weekCounter + weekDay)
        ["$d"].toString()
        .split(" ");
      const fullDate = dayjs()
        .weekday(weekCounter + weekDay)
        .format("YYYY-MM-DD");
      return {
        day: day,
        month: month,
        date: date,
        year: year,
        fullDate: fullDate
      };
    });
    setDayInfo(() => daysInWeek);
  };

  const fetchEntries = async (from: string, to: string) => {
    const res = await spaceUsagesApi.list(from, to, 1);
    if (res.status >= 200 && res.status < 300) {
      const ns = { ...allEmployeesEntries };
      ns[1] = { ...ns[1], ...res.data.entries };
      setAllEmployeesEntries(ns);
      setEntryList(ns[1]);
      return true;
    } else {
      return false;
    }
  };

  const handleDeleteEntry = async id => {
    const res = await spaceUsagesApi.destroy(id);
    if (!(res.status === 200)) return;
    const newValue = { ...entryList };
    newValue[selectedFullDate] = newValue[selectedFullDate].filter(e => e.id !== id);
    setAllEmployeesEntries({ ...allEmployeesEntries, [1]: newValue });
    setEntryList(newValue);
  };

  const handleNextWeek = () => {
    setWeekDay(p => p + 7);
    const from = dayjs()
      .weekday(weekDay + 7)
      .format("YYYY-MM-DD");
    const to = dayjs()
      .weekday(weekDay + 13)
      .format("YYYY-MM-DD");
    fetchEntries(from, to);
  };

  const handlePrevWeek = () => {
    setWeekDay(p => p - 7);
    const from = dayjs()
      .weekday(weekDay - 7)
      .format("YYYY-MM-DD");
    const to = dayjs()
      .weekday(weekDay - 1)
      .format("YYYY-MM-DD");
    fetchEntries(from, to);
  };

  const parseWeeklyViewData = () => {
    const weekArr = [];
    for (let weekCounter = 0; weekCounter < 7; weekCounter++) {
      const date = dayjs()
        .weekday(weekDay + weekCounter)
        .format("YYYY-MM-DD");

      if (!entryList[date]) continue;

      entryList[date].forEach(entry => {
        let entryAdded = false;
        weekArr.forEach(rowInfo => {
          if (
            rowInfo["projectId"] === entry["project_id"] &&
            !rowInfo["entries"][weekCounter] &&
            !entryAdded
          ) {
            rowInfo["entries"][weekCounter] = entry;
            entryAdded = true;
          }
          return rowInfo;
        });

        if (entryAdded) return;
        const newRow = [];
        newRow[weekCounter] = entry;
        weekArr.push({
          projectId: entry["project_id"],
          clientName: entry.client,
          projectName: entry.project,
          entries: newRow
        });
      });
    }

    // setWeeklyData(() => weekArr);
  };

  useEffect(() => {
    if (entryList[selectedFullDate]){
      setGroupingEntryList(_.groupBy(entryList[selectedFullDate], "space_code"))
    }
  }, [entryList, selectedFullDate]);

  return (
    <>
      <ToastContainer autoClose={TOASTER_DURATION} />
      <div className="mx-50 mt-6">
        <div className="bg-miru-alert-yellow-400 text-miru-alert-green-1000 px-1 flex justify-center font-semibold tracking-widest rounded-lg w-auto h-auto text-xs mt-3 mb-3 p-3">
          <b><i>Yes! We need your help. Be a part of the <i className="text-xl">A∝C</i>.</i></b>
        </div>
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-center bg-miru-han-purple-1000 h-10 w-full">
              <button
                onClick={() => {
                  setWeekDay(0);
                  setSelectDate(dayjs().weekday());
                }}
                className="flex items-center justify-center text-white tracking-widest border-2 rounded h-6 w-20 text-xs font-bold ml-4"
              >
              TODAY
              </button>
              <div className="flex">
                <button
                  onClick={handlePrevWeek}
                  className="text-white border-2 h-6 w-6 rounded-xl flex flex-col items-center justify-center"
                >
                  &lt;
                </button>
                {!!dayInfo.length && (
                  <p className="text-white mx-6 w-40">
                    {dayInfo[0]["date"]} {dayInfo[0].month} -{" "}
                    {dayInfo[6]["date"]} {dayInfo[6]["month"]}{" "}
                    {dayInfo[6]["year"]}
                  </p>
                )}
                <button
                  onClick={handleNextWeek}
                  className="text-white border-2 h-6 w-6 rounded-xl flex flex-col items-center justify-center"
                >
                  &gt;
                </button>
              </div>
              <div className="flex mr-12">
              </div>
            </div>
            <DatesInWeek
              view={"day"}
              dayInfo={dayInfo}
              selectDate={selectDate}
              setSelectDate={setSelectDate}
            />
          </div>
          {!editEntryId && newEntryView && (
            <AddEntry
              selectedEmployeeId={userId}
              fetchEntries={fetchEntries}
              setNewEntryView={setNewEntryView}
              selectedDateInfo={dayInfo[selectDate]}
              selectedFullDate={selectedFullDate}
              setEntryList={setEntryList}
              entryList={entryList}
              setEditEntryId={setEditEntryId}
              editEntryId={editEntryId}
              dayInfo={dayInfo}
            />
          )}
          {!newEntryView && (
            <button
              onClick={() => {setNewEntryView(true); setEditEntryId(0); }}
              className="h-14 w-full border-2 p-4 border-miru-han-purple-600 text-miru-han-purple-600 font-bold text-lg tracking-widest"
            >
                + NEW
            </button>
          )}
        </div>

        <div className="ac-calendar-view">
          <div className="ac-calendar">
            {calendarTimes().map((i) => (
              <div className="ac-cv-time-row"><div className="ac-cv-time"><span>{i.name}</span></div></div>
            ))}
          </div>
          {Object.entries(groupingEntryList).length > 0 ?
            <div className="ac-calendar-clone grid grid-cols-4 gap-0">
              {
                Object.entries(groupingEntryList).map(([spaceCode, value], listIndex) => (<EntryCardDayView
                  key={listIndex}
                  spaceCode={spaceCode}
                  spaceUsages={value}
                  setEditEntryId={setEditEntryId}
                  setEditEntryColor={setEditEntryColor}
                />))
              }
            </div>
            : ""}
        </div>

      </div>
      {editEntryId ? <EditEntry
        fetchEntries={fetchEntries}
        setNewEntryView={setNewEntryView}
        selectedDateInfo={dayInfo[selectDate]}
        selectedFullDate={selectedFullDate}
        setEntryList={setEntryList}
        entryList={entryList}
        setEditEntryId={setEditEntryId}
        editEntryId={editEntryId}
        dayInfo={dayInfo}
        handleDeleteEntry={handleDeleteEntry}
        editEntryColor={editEntryColor}
      /> : ""}
    </>
  );
};

interface Iprops {
  clients: [];
  projects: object;
  entries: object;
  isAdmin: boolean;
  userId: number;
  employees: [];
}

export default TimeReserving;