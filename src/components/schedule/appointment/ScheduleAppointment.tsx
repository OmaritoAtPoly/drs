import FullCalendar, {
  DatesSetArg,
  EventClickArg,
  EventDropArg,
  EventInput,
} from "@fullcalendar/react";
import esLocale from "@fullcalendar/core/locales/es";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  DateClickArg,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { makeStyles, Paper } from "@material-ui/core";
import moment from "moment";
import React, { useRef } from "react";
import { formatDate } from "../../../utils/date";
import DatePicker from "../../inputs/DatePicker";
import HealthCentersPanel from "./HealthCentersPanel";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    padding: theme.spacing(1),
  },
  rightCol: {
    margin: theme.spacing(1),
    width: "80%",
  },
  item: {
    marginTop: theme.spacing(2),
  },
}));

interface Props {
  centerCode: string;
  centers: Schemas.ProfessionalHealthCenterResponse[];
  events: EventInput[];
  onSelectCenter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDateClick: (dateArg: DateClickArg) => void;
  onEventClick: (dateArg: EventClickArg) => void;
  handleOnEventDrop: (arg: EventDropArg) => void;
  handleOnEventResize: (arg: EventResizeDoneArg) => void;
  handleOnChangeDate: (date: Date) => void;
  handleOnCalendarSetDate: (arg: DatesSetArg) => void;
}

export default function ScheduleAppointment({
  centerCode,
  centers,
  events,
  onSelectCenter,
  onDateClick,
  onEventClick,
  handleOnEventDrop,
  handleOnEventResize,
  handleOnChangeDate,
  handleOnCalendarSetDate,
}: Props) {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calendarRef = useRef<any>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const onChangeDate = (date?: Date) => {
    setSelectedDate(date || new Date());
    handleOnChangeDate(date || new Date());
    if (calendarRef.current !== null) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(moment(date).format(formatDate.YYYY_MM_DD));
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <HealthCentersPanel
          centerCode={centerCode}
          centers={centers}
          onSelectCenter={onSelectCenter}
        />
        <div className={classes.item}>
          <DatePicker
            date={selectedDate}
            handleDateChange={onChangeDate}
            variant="static"
          />
        </div>
      </div>
      <Paper className={classes.rightCol}>
        <FullCalendar
          ref={calendarRef}
          locale={esLocale}
          nowIndicator
          editable
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay,listWeek",
          }}
          allDaySlot={false}
          slotDuration="00:10:00"
          slotLabelFormat={{
            hour: "numeric",
            minute: "2-digit",
            omitZeroMinute: false,
          }}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          datesSet={handleOnCalendarSetDate}
          events={events}
          initialView="timeGridWeek"
          dateClick={onDateClick}
          eventClick={onEventClick}
          eventDrop={handleOnEventDrop}
          eventResize={handleOnEventResize}
          selectable
        />
      </Paper>
    </div>
  );
}
