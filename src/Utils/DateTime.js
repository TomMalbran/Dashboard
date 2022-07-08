import NLS          from "../Core/NLS";
import Utils        from "../Utils/Utils";



/** The times in seconds */
const MINUTE_SECS = 60;
const HOUR_SECS   = 3600;
const DAY_SECS    = 24 * 3600;
const WEEK_SECS   = 7 * 24 * 3600;


/** The formats used in toString */
const FORMATS = {
    time           : "DATE_TIME",
    dayTime        : "DATE_DAY_TIME",
    dayMonth       : "DATE_DAY_MONTH",
    dayMonthShort  : "DATE_DAY_MONTH_SHORT",
    dayMonthMedium : "DATE_DAY_MONTH_MEDIUM",
    dayMonthYear   : "DATE_DAY_MONTH_YEAR",
    dayYearShort   : "DATE_DAY_YEAR_SHORT",
    dayYearMedium  : "DATE_DAY_YEAR_MEDIUM",
    monthYear      : "DATE_MONTH_YEAR",
    reduced        : "DATE_REDUCED",
    complete       : "DATE_COMPLETE",
    shortComplete  : "DATE_SHORT_COMPLETE",
    dashes         : "DATE_DASHES",
    dashesReverse  : "DATE_DASHES_REVERSE",
    dashesTime     : "DATE_DASHES_TIME",
    dashesHour     : "DATE_DASHES_HOUR",
    slashes        : "DATE_SLASHES",
    slashesDay     : "DATE_SLASHES_DAY",
    sortable       : "DATE_SORTABLE",

    minAgo         : "DATE_MIN_AGO",
    minsAgo        : "DATE_MINS_AGO",
    hourAgo        : "DATE_HOUR_AGO",
    hoursAgo       : "DATE_HOURS_AGO",
    dayAgo         : "DATE_DAY_AGO",
    daysAgo        : "DATE_DAYS_AGO",
    inMin          : "DATE_IN_MIN",
    inMins         : "DATE_IN_MINS",
    inHour         : "DATE_IN_HOUR",
    inHours        : "DATE_IN_HOURS",
    inDay          : "DATE_IN_DAY",
    inDays         : "DATE_IN_DAYS",
    tomorrow       : "DATE_TOMORROW_AT",
    today          : "DATE_TODAY_AT",
    yesterday      : "DATE_YESTERDAY_AT",
    thisWeek       : "DATE_THIS_WEEK_AT",
    thisYear       : "DATE_THIS_YEAR_AT",
    otherYear      : "DATE_OTHER_YEAR_AT",
};



/**
 * The DateHour class, a Date object with lots of added functions
 * @constructor
 * @param {(Number|Date)} date
 * @param {Boolean=}      inMiliseconds
 */
class DateHour {
    constructor(date, inMiliseconds) {
        if (date && !(date instanceof Date)) {
            this.date = new Date(parseInt(date, 10) * (!inMiliseconds ? 1000 : 1));
        } else if (date) {
            this.date = new Date(date);
        } else {
            this.date = new Date();
        }
    }

    /**
     * Returns a Copy of DateHour
     * @returns {DateHour}
     */
    copy() {
        return new DateHour(this.date);
    }

    /**
     * Creates a new DateHour with the given data and the current saved date
     * @param {Number=} year
     * @param {Number=} month
     * @param {Number=} day
     * @param {Number=} hours
     * @param {Number=} mins
     * @param {Number=} secs
     * @param {Number=} milis
     * @returns {DateHour}
     */
    createDay(year, month, day, hours, mins, secs, milis) {
        return new DateHour(this.toDate(year, month, day, hours, mins, secs, milis));
    }


    /**
     * Returns the full year of the saved date
     * @returns {Number}
     */
    get year() {
        return this.date.getFullYear();
    }

    /**
     * Returns the month number of the saved date starting on 1
     * @returns {Number}
     */
    get month() {
        return this.date.getMonth() + 1;
    }

    /**
     * Returns the day number of the saved date
     * @returns {Number}
     */
    get day() {
        return this.date.getDate();
    }

    /**
     * Returns the week day number of the saved date
     * @returns {Number}
     */
    get weekDay() {
        return this.date.getDay();
    }

    /**
     * Returns the hours of the saved date
     * @returns {Number}
     */
    get hours() {
        return this.date.getHours();
    }

    /**
     * Returns the hours and minutes number of the saved date as hours
     * @returns {Number}
     */
    get asHours() {
        return this.hours + this.minutes / 60;
    }

    /**
     * Returns the minutes of the saved date
     * @returns {Number}
     */
    get minutes() {
        return this.date.getMinutes();
    }

    /**
     * Returns the seconds of the saved date
     * @returns {Number}
     */
    get seconds() {
        return this.date.getSeconds();
    }

    /**
     * Returns the time in seconds
     * @returns {Number}
     */
    get time() {
        return Math.round(this.date.getTime() / 1000);
    }



    /**
     * Returns a new Date using the current saved date
     * @param {Number=} year
     * @param {Number=} month
     * @param {Number=} day
     * @param {Number=} hours
     * @param {Number=} mins
     * @param {Number=} secs
     * @param {Number=} milis
     * @returns {Date}
     */
    toDate(year, month, day, hours, mins, secs, milis) {
        return new Date(
            (year  || year  === 0) ? year      : this.year,
            (month || month === 0) ? month - 1 : this.month - 1,
            (day   || day   === 0) ? day       : this.day,
            (hours || hours === 0) ? hours     : this.hours,
            (mins  || mins  === 0) ? mins      : this.minutes,
            (secs  || secs  === 0) ? secs      : this.seconds,
            (milis || milis === 0) ? milis     : this.date.getMilliseconds(),
        );
    }

    /**
     * Returns a new DateHour with the same day, but at 0 hours, 0 minutes, 0 seconds and 0 miliseconds
     * @param {Number=} hours
     * @returns {DateHour}
     */
    toDayStart(hours) {
        return this.createDay(undefined, undefined, undefined, hours !== undefined ? hours : 0, 0, 0, 0);
    }

    /**
     * Returns a new DateHour with the same day, but at 23 hours, 59 minutes, 59 seconds and 0 miliseconds
     * @returns {DateHour}
     */
    toDayEnd() {
        return this.createDay(undefined, undefined, undefined, 23, 59, 29, 0);
    }

    /**
     * Returns a new DateHour at the start of the week, depending on the week day given
     * @param {Number=} weekDay
     * @returns {DateHour}
     */
    toWeekStart(weekDay = 0) {
        let thisDate = this.moveDay(0);
        while (thisDate.weekDay !== weekDay) {
            thisDate = thisDate.moveDay(-1);
        }
        return thisDate;
    }

    /**
     * Returns a new DateHour at the end of the week, depending on the week day given
     * @param {Number=} weekDay
     * @returns {DateHour}
     */
    toWeekEnd(weekDay) {
        return this.moveDay(7).toWeekStart(weekDay).moveDay(-1);
    }

    /**
     * Returns a new DateHour at the start of the month
     * @returns {DateHour}
     */
    toMonthStart() {
        return this.changeDay(1);
    }

    /**
     * Returns a new DateHour at the end of the month
     * @returns {DateHour}
     */
    toMonthEnd() {
        return this.changeDay(this.getMonthDays());
    }

    /**
     * Returns a new DateHour at the start of the year
     * @returns {DateHour}
     */
    toYearStart() {
        return this.changeMonth(1, 1);
    }

    /**
     * Returns a new DateHour at the end of the year
     * @returns {DateHour}
     */
    toYearEnd() {
        return this.changeMonth(12, getMonthDays(12, this.year));
    }



    /**
     * Returns the date as a string depending on the given format
     * @param {String} type
     * @returns {String}
     */
    toString(type) {
        if (FORMATS[type]) {
            return NLS.get(FORMATS[type])
                .replace("{d}",  this.day.toString())
                .replace("{d0}", parseTime(this.day))
                .replace("{dn}", this.getDayName())
                .replace("{d3}", this.getDayName(3))
                .replace("{m}",  this.month.toString())
                .replace("{m0}", parseTime(this.month))
                .replace("{mn}", this.getMonthName())
                .replace("{m3}", this.getMonthName(3))
                .replace("{y}",  this.year.toString())
                .replace("{h}",  parseTime(this.hours))
                .replace("{i}",  parseTime(this.minutes));
        }
        return "";
    }

    /**
     * Returns the date as a string choosing the format depending on the date
     * @returns {String}
     */
    toDateString() {
        let format;
        if (this.isToday) {
            format = "today";
        } else if (this.isYesterday) {
            format = "yesterday";
        } else if (this.isTomorrow) {
            format = "tomorrow";
        } else if (this.isThisWeek) {
            format = "thisWeek";
        } else if (this.isThisYear) {
            format = "thisYear";
        } else {
            format = "otherYear";
        }
        return this.toString(format);
    }

    /**
     * Returns the date as a string choosing the format depending on the date
     * @returns {String}
     */
    toTimeString() {
        const today = new DateHour().time;
        const time  = this.time;
        const diff1 = time - today;
        const diff2 = today - time;
        const diff  = diff1 > 0 ? diff1 : diff2;
        const dmin  = Math.round(diff / MINUTE_SECS);
        const dhour = Math.round(diff / HOUR_SECS);
        const dday  = Math.round(diff / DAY_SECS);
        let   format;

        // In the Future
        if (diff1 > 0) {
            if (diff1 < HOUR_SECS * 2) {
                format = dmin === 1  ? "inMin"  : "inMins";
            } else if (diff1 < DAY_SECS * 2) {
                format = dhour === 1 ? "inHour" : "inHours";
            } else if (diff1 < DAY_SECS * 3) {
                format = dday === 1  ? "inDay"  : "inDays";
            }
        // In the Past
        } else if (diff2 > 0) {
            if (diff2 < HOUR_SECS * 2) {
                format = dmin === 1  ? "minAgo"  : "minsAgo";
            } else if (diff2 < DAY_SECS * 2) {
                format = dhour === 1 ? "hourAgo" : "hoursAgo";
            } else if (diff2 < DAY_SECS * 3) {
                format = dday === 1  ? "dayAgo"  : "daysAgo";
            }
        }

        // Show the result in mins or hours since the time
        if (format) {
            return NLS.get(FORMATS[format])
                .replace("{i}", dmin.toString())
                .replace("{h}", dhour.toString())
                .replace("{d}", dday.toString());
        }

        // Show the result as a date and time
        return this.toDateString();
    }

    /**
     * Gives a string format to the Date depending on date
     * @returns {String}
     */
    toLongString() {
        if (this.isToday) {
            return this.toString("today");
        }
        if (this.isThisYear) {
            return this.toString("thisYear");
        }
        return this.toString("otherYear");
    }

    /**
     * Gives a string format to the Date depending on date
     * @returns {String}
     */
    toMediumString() {
        if (this.isThisYear) {
            return this.toString("dayMonthMedium");
        }
        return this.toString("dayYearMedium");
    }

    /**
     * Gives a string format to the Date depending on date
     * @returns {String}
     */
    toShortString() {
        if (this.isToday) {
            return this.toString("time");
        }
        if (this.isThisYear) {
            return this.toString("dayMonthShort");
        }
        return this.toString("dayYearShort");
    }

    /**
     * Returns the name of the day of the saved date or Today/Yesterday/Tomorrow
     * @returns {String}
     */
    toDayString() {
        let result;
        if (this.isYesterday) {
            result = NLS.get("DATE_YESTERDAY");
        } else if (this.isToday) {
            result = NLS.get("DATE_TODAY");
        } else if (this.isTomorrow) {
            result = NLS.get("DATE_TOMORROW");
        } else {
            result = this.toString("reduced");
        }
        return result;
    }

    /**
     * Knowing that the current day is at the start of the week, it returns a string that represents it
     * @returns {String}
     */
    toWeekString() {
        const thisWeek = new DateHour().toWeekStart(this.weekDay);
        const lastWeek = thisWeek.moveDay(-7);
        const nextWeek = thisWeek.moveDay(+7);

        if (this.isEqualDayTo(lastWeek)) {
            return NLS.get("DATE_LAST_WEEK");
        }
        if (this.isEqualDayTo(thisWeek)) {
            return NLS.get("DATE_THIS_WEEK");
        }
        if (this.isEqualDayTo(nextWeek)) {
            return NLS.get("DATE_NEXT_WEEK");
        }
        return NLS.format(
            "DATE_PARSED_WEEK",
            this.toString("slashesDay"),
            this.moveDay(6).toString("slashesDay"),
        );
    }

    /**
     * Parses the duration between the current DateHour and the given one
     * @param {DateHour} otherDate
     * @returns {String}
     */
    parseDuration(otherDate) {
        return NLS.format("DATE_DURATION", this.toString("time"), otherDate.toString("time"));
    }



    /**
     * Returns a color depending on the amount of expired hours
     * @param {Number} greenHours
     * @param {Number} yellowHours
     * @returns {String}
     */
    getExpiredColor(greenHours, yellowHours) {
        const hours = this.getHoursDiff();
        if (hours < greenHours) {
            return "green";
        }
        if (hours < yellowHours) {
            return "yellow";
        }
        return "red";
    }

    /**
     * Returns a text class depending on the amount of expired hours
     * @param {Number} greenHours
     * @param {Number} yellowHours
     * @returns {String}
     */
    getExpiredClass(greenHours, yellowHours) {
        const color = this.getExpiredColor(greenHours, yellowHours);
        return `text-${color}`;
    }



    /**
     * Returns true if the day is Suterday or Sunday
     * @returns {Boolean}
     */
    get isWeekend() {
        return this.weekDay === 0 || this.weekDay === 6;
    }

    /**
     * Returns true if the saved date is the same as today date
     * @returns {Boolean}
     */
    get isToday() {
        return this.isEqualDayTo(new DateHour());
    }

    /**
     * Returns true if the saved date is the same as yesterday date
     * @returns {Boolean}
     */
    get isYesterday() {
        return this.isNextDay(-1);
    }

    /**
     * Returns true if the saved date is the same as tomorrows date
     * @returns {Boolean}
     */
    get isTomorrow() {
        return this.isNextDay(1);
    }

    /**
     * Returns true if the Current Day is during this week
     * @returns {Boolean}
     */
    get isThisWeek() {
        return this.isEqualWeekTo(new DateHour().toDayStart());
    }

    /**
     * Returns true if the year of the saved date is the same as the current year
     * @returns {Boolean}
     */
    get isThisYear() {
        return this.year === new DateHour().year;
    }



    /**
     * Returns true if the time of the saved date is the same as the time of the given day
     * @param {DateHour} otherDate
     * @returns {Boolean}
     */
    isEqualTimeTo(otherDate) {
        return this.time === otherDate.time;
    }

    /**
     * Returns true if the year, the month and the date are the same between the saved and the given date
     * @param {DateHour} otherDate
     * @returns {Boolean}
     */
    isEqualDayTo(otherDate) {
        return (
            this.year  === otherDate.year  &&
            this.month === otherDate.month &&
            this.day   === otherDate.day
        );
    }

    /**
     * Returns true if the week is the same between the saved and the given date
     * @param {DateHour} otherDate
     * @returns {Boolean}
     */
    isEqualWeekTo(otherDate) {
        return this.getWeek() === otherDate.getWeek();
    }

    /**
     * Returns true if the year and the month are the same between the saved and the given date
     * @param {DateHour} otherDate
     * @returns {Boolean}
     */
    isEqualMonthTo(otherDate) {
        return this.year === otherDate.year && this.month === otherDate.month;
    }

    /**
     * Returns true if the year is the same between the saved and the given date
     * @param {DateHour} otherDate
     * @returns {Boolean}
     */
    isEqualYearTo(otherDate) {
        return this.year === otherDate.year;
    }

    /**
     * Returns true if the given day is greater than the Current Day
     * @param {DateHour} otherDate
     * @returns {Boolean}
     */
    isGreaterThan(otherDate) {
        return this.time > otherDate.time;
    }

    /**
     * Returns true if the Current Day is in the Past
     * @param {Number=} hours
     * @returns {Boolean}
     */
    isPastDay(hours = 0) {
        return this.time < new DateHour().time - (hours * 3600);
    }

    /**
     * Returns true if the Current Day is in the Future
     * @param {Number=} hours
     * @returns {Boolean}
     */
    isFutureDay(hours = 0) {
        return this.time > new DateHour().time + (hours * 3600);
    }

    /**
     * Returns true if the Current Day is the same as the same date plus the given amount of days
     * @param {Number} amount
     * @returns {Boolean}
     */
    isNextDay(amount) {
        const otherDate = new DateHour().moveDay(amount);
        return this.isEqualDayTo(otherDate);
    }

    /**
     * Returns max day between the Current and the given one
     * @param {DateHour} otherDate
     * @returns {DateHour}
     */
    max(otherDate) {
        return this.isGreaterThan(otherDate) ? this : otherDate;
    }

    /**
     * Returns min day between the saved and the given one
     * @param {DateHour} otherDate
     * @returns {DateHour}
     */
    min(otherDate) {
        return this.isGreaterThan(otherDate) ? otherDate : this;
    }



    /**
     * Changes the day to the given one
     * @param {DateHour} otherDate
     * @returns {DateHour}
     */
    changeToDay(otherDate) {
        return this.createDay(otherDate.year, otherDate.month, otherDate.day);
    }

    /**
     * Creates a new DateHour as amount of years ahead the saved date
     * @param {Number}  amount
     * @param {Number=} month
     * @param {Number=} day
     * @returns {DateHour}
     */
    moveYear(amount, month, day) {
        return this.createDay(this.year + amount, month, day);
    }

    /**
     * Creates a new DateHour with the given year and the saved date
     * @param {Number}  year
     * @param {Number=} month
     * @param {Number=} day
     * @returns {DateHour}
     */
    changeYear(year, month, day) {
        return this.createDay(year, month, day);
    }

    /**
     * Creates a new DateHour as amount of months ahead of the saved date
     * @param {Number}  amount
     * @param {Number=} day
     * @returns {DateHour}
     */
    moveMonth(amount, day) {
        return this.createDay(undefined, this.month + amount, day);
    }

    /**
     * Creates a new DateHour with the given month and day and the saved date
     * @param {Number}  month
     * @param {Number=} day
     * @returns {DateHour}
     */
    changeMonth(month, day) {
        return this.createDay(undefined, month, day);
    }

    /**
     * Creates a new DateHour as amount of days ahead of the saved date
     * @param {Number} amount
     * @returns {DateHour}
     */
    moveDay(amount) {
        return this.createDay(undefined, undefined, this.day + amount);
    }

    /**
     * Creates a new DateHour with the given day and the saved date
     * @param {Number} day
     * @returns {DateHour}
     */
    changeDay(day) {
        return this.createDay(undefined, undefined, day);
    }

    /**
     * Creates a new DateHour as the given amount of hours ahead of the saved date
     * @param {Number}  amount
     * @param {Number=} minutes
     * @returns {DateHour}
     */
    moveHours(amount, minutes) {
        return this.createDay(undefined, undefined, undefined, this.hours + amount, minutes);
    }

    /**
     * Creates a new DateHour with the given hours and minutes and the saved date
     * @param {Number}  hours
     * @param {Number=} minutes
     * @returns {DateHour}
     */
    changeHours(hours, minutes) {
        return this.createDay(undefined, undefined, undefined, hours, minutes);
    }

    /**
     * Creates a new DateHour as the given amount of minutes ahead of the saved date
     * @param {Number} minutes
     * @returns {DateHour}
     */
    moveMins(minutes) {
        return this.createDay(undefined, undefined, undefined, undefined, this.minutes + minutes);
    }

    /**
     * Creates a new DateHour with the given minutes and the saved date
     * @param {Number} minutes
     * @returns {DateHour}
     */
    changeMins(minutes) {
        return this.createDay(undefined, undefined, undefined, undefined, minutes);
    }

    /**
     * Creates a new DateHour with the given minutes ahead of the saved date
     * @param {Number} time
     * @returns {DateHour}
     */
    addTime(time) {
        return new DateHour(this.time + time);
    }



    /**
     * Returns the name of the day of the saved date
     * @param {Number=} amount
     * @returns {String}
     */
    getDayName(amount) {
        const name = dayToName(this.weekDay);
        return amount ? name.substr(0, amount) : name;
    }

    /**
     * Returns the day difference between the Current Day and the given one
     * @param {DateHour=} otherDate
     * @returns {Number}
     */
    getDaysDiff(otherDate) {
        const other = otherDate || new DateHour();
        return Math.floor(Math.abs(this.time - other.time) / DAY_SECS);
    }

    /**
     * Returns the hour difference between the Current Day and the given one
     * @param {DateHour=} otherDate
     * @returns {Number}
     */
    getHoursDiff(otherDate) {
        const other = otherDate || new DateHour();
        return Math.floor(Math.abs(this.time - other.time) / HOUR_SECS);
    }



    /**
     * Returns the number of the week for the current day
     * @param {Number=} weekDay
     * @returns {Number}
     */
    getWeek(weekDay = 0) {
        const actualDay = this.getWeekStart(weekDay);
        const startDay  = actualDay.createDay(undefined, 1, 1);

        return Math.ceil((actualDay.time - startDay.time) / WEEK_SECS);
    }

    /**
     * Returns the date with the first day of the week
     * @param {Number=} weekDay
     * @returns {DateHour}
     */
    getWeekStart(weekDay = 0) {
        const day = this.day - this.weekDay + weekDay;
        return this.createDay(undefined, undefined, day);
    }

    /**
     * Returns the amount of weeks in a month
     * @param {Number=} weekDay
     * @returns {Number}
     */
    getWeeksAmount(weekDay = 0) {
        const startDay  = this.createDay(undefined, undefined, 1);
        const endDay    = this.createDay(undefined, undefined, this.getMonthDays());
        const startWeek = startDay.getWeek(weekDay);
        const endWeek   = endDay.getWeek(weekDay);

        if (startWeek > endWeek) {
            return endWeek + 1;
        }
        return endWeek - startWeek + 1;
    }



    /**
     * Returns the name of the month of the saved date
     * @param {Number=} amount
     * @returns {String}
     */
    getMonthName(amount) {
        const name = monthToName(this.month);
        return amount ? name.substr(0, amount) : name;
    }

    /**
     * Returns the month difference between the saved and the given dates
     * @param {DateHour} otherDate
     * @returns {Number}
     */
    getMonthDiff(otherDate) {
        return 12 * (this.year - otherDate.year) + this.month - otherDate.month;
    }

    /**
     * Returns the first day of the month of the saved date
     * @returns {Number}
     */
    getMonthStart() {
        const date = new Date(this.year, this.month, 1, this.hours, this.minutes);
        return date.getDate();
    }

    /**
     * Returns the amount of Days in the month of the saved date
     * @returns {Number}
     */
    getMonthDays() {
        return getMonthDays(this.month, this.year);
    }



    /**
     * Returns the amount of years between the saved date and the given date (or today) AKA the age
     * @param {DateHour} otherDate
     * @returns {Number}
     */
    getAge(otherDate) {
        const date = otherDate || new DateHour();
        return date.year - this.year - (this.changeYear(date.year).isGreaterThan(date) ? 1 : 0);
    }



    /**
     * Returns a data structure with the required information to create a week calendar interface
     * @param {Number}  hourStart - Starting hour of the day
     * @param {Object=} events    - The events
     * @returns {{title: String, names: String[], hours: Object[]}}
     */
    getDayData(hourStart, events) {
        const result = { title : this.toDayString(), names : [], hours : [] };
        const day    = this.copy();

        this.getDaysData(result, day, hourStart, 2, events);
        return result;
    }

    /**
     * Returns a data structure with the required information to create a week calendar interface
     * @param {Number}  weekDay   - Starting day of the week
     * @param {Number}  hourStart - Starting hour of the day
     * @param {Object=} events    - The events
     * @returns {{title: String, names: String[], hours: Object[]}}
     */
    getWeekData(weekDay, hourStart, events) {
        const result = { title : this.toWeekString(), names : [], hours : [] };
        const day    = this.toWeekStart(weekDay);

        this.getDaysData(result, day, hourStart, 7, events);
        return result;
    }

    /**
     * Parses the names and hours structure for the days and week calendar interfaces
     * @param {Object}   result
     * @param {DateHour} dateTime
     * @param {Number}   hourStart
     * @param {Number}   dayAmount
     * @param {Object=}  events
     * @returns {Object}
     */
    getDaysData(result, dateTime, hourStart, dayAmount, events) {
        let currDate = dateTime;

        // First all the day names
        for (let i = 0; i < dayAmount; i += 1) {
            result.names.push({
                number : parseTime(currDate.day),
                name   : currDate.getDayName(3),
            });
            currDate = currDate.moveDay(1);
        }

        // Then all the hours for each day
        for (let j = hourStart; j < 24; j += 1) {
            result.hours.push({ hour : j, days : [] });

            currDate = currDate.moveDay(-dayAmount);
            for (let i = 0; i < dayAmount; i += 1) {
                result.hours[j - hourStart].days.push({
                    isToday   : currDate.isToday,
                    isWeekend : currDate.isWeekend,
                    events    : events ? events[currDate.toDayStart(j).time] || [] : [],
                });
                currDate = currDate.moveDay(1);
            }
        }
        return result;
    }

    /**
     * Returns a data structure with the required information to create a month calendar interface
     * @param {Number}    weekDay    - Starting day of the week
     * @param {Boolean}   fullWeeks  - True to always show 6 weeks, false to show the amount of weeks of the month
     * @param {Number=}   dayLetters - Amount of letters to use for the week days names
     * @param {DateHour=} currentDay - The selected day
     * @param {Object=}   events     - The events
     * @returns {{title: String, names: String[], weeks: Object[]}}
     */
    getMonthData(weekDay, fullWeeks, dayLetters, currentDay, events) {
        const result   = { title : this.toString("monthYear"), names : [], weeks : [] };
        const lastDay  = fullWeeks ? 6 * 7 : this.getWeeksAmount() * 7;
        let   currDate = this.toMonthStart().toWeekStart(weekDay);
        let   month    = currDate.month;
        let   week     = -1;

        const addToWeek = (data) => {
            if (week < 0 || result.weeks[week].days.length % 7 === 0) {
                week += 1;
                result.weeks[week] = {
                    key  : week,
                    time : data.time,
                    days : [],
                };
            }
            result.weeks[week].days.push(data);
        };

        // First all the day names
        for (let i = 0; i < 7; i += 1) {
            result.names.push(currDate.getDayName(dayLetters));
            currDate = currDate.moveDay(1);
        }

        // Then all the days in the weeks
        currDate = currDate.moveDay(-7);
        for (let i = 0; i < lastDay; i += 1) {
            const isDay = this.isEqualMonthTo(currDate);
            let   name  = currDate.day.toString();

            if (month !== currDate.month || i === 0) {
                name  = currDate.toString("dayMonth");
                month = currDate.month;
            }

            addToWeek({
                key       : i,
                isDay     : isDay,
                day       : currDate,
                name      : name,
                time      : currDate.time,
                isToday   : isDay && currDate.isToday,
                isWeekend : isDay && currDate.isWeekend,
                isCurrent : isDay && currentDay && currentDay.isEqualDayTo(currDate),
                events    : events ? events[currDate.toDayStart().time] || [] : [],
            });
            currDate = currDate.moveDay(1);
        }

        return result;
    }
}




/**
 * Creates a new DateHour
 * @param {(Number|Date)=} date
 * @param {Boolean=}       inMiliseconds
 * @returns {DateHour}
 */
function create(date, inMiliseconds) {
    return new DateHour(date, inMiliseconds);
}

/**
 * Creates a new DateHour from a slash separated string (YYYY/MM/DD or DD/MM/YYYY or DD/MM)
 * @param {String}   userDate
 * @param {String=}  userTime
 * @param {Boolean=} useTimezone
 * @returns {DateHour}
 */
function fromString(userDate, userTime = "", useTimezone = false) {
    let date = userDate;
    let time = userTime;
    if (date.includes(" ")) {
        const parts = date.split(" ");
        date = parts[0];
        time = parts[1];
    }

    const separator = date.includes("/") ? "/" : "-";
    const dateParts = date.split(separator);
    let   day       = new Date();

    if (dateParts.length === 3) {
        const part0 = parseInt(dateParts[0], 10);
        const part1 = parseInt(dateParts[1], 10);
        const part2 = parseInt(dateParts[2], 10);
        if (dateParts[0].length === 4) {
            day = new Date(part0, part1 - 1, part2);
        } else {
            day = new Date(part2, part1 - 1, part0);
        }
    } else if (dateParts.length === 2) {
        const part0 = parseInt(dateParts[0], 10);
        const part1 = parseInt(dateParts[1], 10);
        day = new Date(day.getFullYear(), part1 - 1, part0);
    }

    if (time) {
        const timeParts = time.split(":");
        if (timeParts[0]) {
            const hours = parseInt(timeParts[0], 10);
            day.setHours(hours);
        }
        if (timeParts[1]) {
            const minutes = parseInt(timeParts[1], 10);
            day.setMinutes(minutes);
        }
        if (timeParts[2]) {
            const seconds = parseInt(timeParts[2], 10);
            day.setSeconds(seconds);
        }

        if (useTimezone) {
            const minutes = day.getMinutes() - (day.getTimezoneOffset() - 180);
            day.setMinutes(minutes);
        }
    }

    return new DateHour(day);
}

/**
 * Formats the give date
 * @param {(Number|Date|String)} date
 * @param {String}               format
 * @param {Boolean=}             useTimezone
 * @returns {String}
 */
function formatDate(date, format, useTimezone = false) {
    if (Utils.isString(date)) {
        return fromString(String(date), "", useTimezone).toString(format);
    }
    return new DateHour(date).toString(format);
}

/**
 * Formats the give date and time
 * @param {String}   date
 * @param {String}   time
 * @param {String}   format
 * @param {Boolean=} useTimezone
 * @returns {String}
 */
function formatDateTime(date, time, format, useTimezone = false) {
    return fromString(date, time, useTimezone).toString(format);
}

/**
 * Formats the give date
 * @param {(Number|Date|String)} date
 * @param {String}               format
 * @returns {String}
 */
function formatIf(date, format) {
    if (date) {
        return formatDate(date, format);
    }
    return "";
}

/**
 * Formats the give date as a String
 * @param {(Number|Date)} date
 * @returns {String}
 */
function formatString(date) {
    if (date) {
        return new DateHour(date).toDateString();
    }
    return "";
}

/**
 * Formats the give date as a Time String
 * @param {(Number|Date)} date
 * @returns {String}
 */
function formatTime(date) {
    if (date) {
        return new DateHour(date).toTimeString();
    }
    return "";
}

/**
 * Formats the given date as a Long String
 * @param {(Number|Date)} date
 * @returns {String}
 */
function formatLong(date) {
    if (date) {
        return new DateHour(date).toLongString();
    }
    return "";
}

/**
 * Formats the given date as a Medium String
 * @param {(Number|Date)} date
 * @returns {String}
 */
function formatMedium(date) {
    if (date) {
        return new DateHour(date).toMediumString();
    }
    return "";
}

/**
 * Formats the given date as a Short String
 * @param {(Number|Date)} date
 * @returns {String}
 */
function formatShort(date) {
    if (date) {
        return new DateHour(date).toShortString();
    }
    return "";
}

/**
 * Returns a text class depending on the amount of expired hours
 * @param {(Number|Date)} date
 * @param {Number}        greenHours
 * @param {Number}        yellowHours
 * @returns {String}
 */
function getExpiredColor(date, greenHours, yellowHours) {
    if (date) {
        return new DateHour(date).getExpiredColor(greenHours, yellowHours);
    }
    return "red";
}



/**
 * Returns the Week Day as a Name
 * @param {Number} day
 * @returns {String}
 */
function dayToName(day) {
    const days = NLS.get("DATE_DAY_NAMES");
    return days[day] || "";
}

/**
 * Returns the Week Day as a Name
 * @param {Number} day
 * @returns {String}
 */
function dayToShortName(day) {
    const days = NLS.get("DATE_DAY_SHORTS");
    return days[day] || "";
}

/**
 * Returns the month name for a given month
 * @param {Number=} month - A possible month number (starting from 1)
 * @returns {String}
 */
function monthToName(month) {
    const months = NLS.get("DATE_MONTH_NAMES");
    return months[month - 1] || "";
}

/**
 * Returns the amount of Days in the month of the saved date
 * @param {Number} month
 * @param {Number} year
 * @returns {Number}
 */
function getMonthDays(month, year) {
    const days   = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    let   result = days[month - 1] || null;

    // If month is February, check Leap Years
    if (month === 2 && (((year % 4) === 0 && (year % 100) !== 0) || (year % 400) === 0)) {
        result = 29;
    }
    return result;
}

/**
 * Returns number as a String with a 0 infront
 * @param {Number} time
 * @returns {String}
 */
function parseTime(time) {
    return time < 10 ? `0${time}` : String(time);
}



// The Public API
export default {
    create,
    fromString,
    formatDate,
    formatDateTime,
    formatIf,
    formatString,
    formatTime,
    formatLong,
    formatMedium,
    formatShort,
    getExpiredColor,

    dayToName,
    dayToShortName,
    monthToName,
    getMonthDays,
};
