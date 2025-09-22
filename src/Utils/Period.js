import NLS          from "../Core/NLS";
import DateTime     from "../Utils/DateTime";



// Constants
const SELECT        = "select";
const TODAY         = "today";
const YESTERDAY     = "yesterday";
const LAST_7_DAYS   = "last7Days";
const LAST_15_DAYS  = "last15Days";
const LAST_30_DAYS  = "last30Days";
const LAST_60_DAYS  = "last60Days";
const LAST_90_DAYS  = "last90Days";
const LAST_120_DAYS = "last120Days";
const LAST_YEAR     = "lastYear";
const THIS_WEEK     = "thisWeek";
const THIS_MONTH    = "thisMonth";
const THIS_YEAR     = "thisYear";
const PAST_WEEK     = "pastWeek";
const PAST_MONTH    = "pastMonth";
const PAST_YEAR     = "pastYear";
const ALL_PERIOD    = "allPeriod";
const CUSTOM        = "custom";

const PERIODS_KEYS = {
    [SELECT]        : "SELECT",
    [TODAY]         : "TODAY",
    [YESTERDAY]     : "YESTERDAY",
    [LAST_7_DAYS]   : "LAST_7_DAYS",
    [LAST_15_DAYS]  : "LAST_15_DAYS",
    [LAST_30_DAYS]  : "LAST_30_DAYS",
    [LAST_60_DAYS]  : "LAST_60_DAYS",
    [LAST_90_DAYS]  : "LAST_90_DAYS",
    [LAST_120_DAYS] : "LAST_120_DAYS",
    [LAST_YEAR]     : "LAST_YEAR",
    [THIS_WEEK]     : "THIS_WEEK",
    [THIS_MONTH]    : "THIS_MONTH",
    [THIS_YEAR]     : "THIS_YEAR",
    [PAST_WEEK]     : "PAST_WEEK",
    [PAST_MONTH]    : "PAST_MONTH",
    [PAST_YEAR]     : "PAST_YEAR",
    [ALL_PERIOD]    : "ALL_PERIOD",
    [CUSTOM]        : "CUSTOM",
};
const PERIODS_COMPLETE = [
    SELECT,
    TODAY,
    YESTERDAY,
    LAST_7_DAYS,
    LAST_15_DAYS,
    LAST_30_DAYS,
    LAST_60_DAYS,
    LAST_90_DAYS,
    LAST_120_DAYS,
    LAST_YEAR,
    THIS_WEEK,
    THIS_MONTH,
    THIS_YEAR,
    PAST_WEEK,
    PAST_MONTH,
    PAST_YEAR,
    ALL_PERIOD,
    CUSTOM,
];
const PERIODS_SIMPLE = [
    TODAY,
    YESTERDAY,
    LAST_7_DAYS,
    LAST_15_DAYS,
    LAST_30_DAYS,
    LAST_60_DAYS,
    LAST_90_DAYS,
    LAST_120_DAYS,
    LAST_YEAR,
    THIS_WEEK,
    THIS_MONTH,
    THIS_YEAR,
    PAST_WEEK,
    PAST_MONTH,
];
const PERIODS_LAST = [
    LAST_7_DAYS,
    LAST_15_DAYS,
    LAST_30_DAYS,
    LAST_60_DAYS,
    LAST_90_DAYS,
    LAST_120_DAYS,
];
const PERIODS_LAST_TODAY = [
    TODAY,
    YESTERDAY,
    LAST_7_DAYS,
    LAST_15_DAYS,
    LAST_30_DAYS,
    LAST_60_DAYS,
    LAST_90_DAYS,
    LAST_120_DAYS,
];



/**
 * Returns the From Date
 * @param {string} value
 * @returns {string}
 */
function getFromDate(value) {
    const dateTime = DateTime.create();
    let   date     = null;

    switch (value) {
    case TODAY:
        date = dateTime;
        break;
    case YESTERDAY:
        date = dateTime.moveDay(-1);
        break;
    case LAST_7_DAYS:
        date = dateTime.moveDay(-7);
        break;
    case LAST_15_DAYS:
        date = dateTime.moveDay(-15);
        break;
    case LAST_30_DAYS:
        date = dateTime.moveDay(-30);
        break;
    case LAST_60_DAYS:
        date = dateTime.moveDay(-60);
        break;
    case LAST_90_DAYS:
        date = dateTime.moveDay(-90);
        break;
    case LAST_120_DAYS:
        date = dateTime.moveDay(-120);
        break;
    case LAST_YEAR:
        date = dateTime.moveYear(-1);
        break;
    case THIS_WEEK:
        date = dateTime.toWeekStart();
        break;
    case THIS_MONTH:
        date = dateTime.toMonthStart();
        break;
    case THIS_YEAR:
        date = dateTime.toYearStart();
        break;
    case PAST_WEEK:
        date = dateTime.toWeekStart().moveDay(-7);
        break;
    case PAST_MONTH:
        date = dateTime.moveMonth(-1).toMonthStart();
        break;
    case PAST_YEAR:
        date = dateTime.moveYear(-1).toYearStart();
        break;
    default:
    }

    return date !== null ? date.toString("dashesReverse") : "";
}

/**
 * Returns the To Date
 * @param {string} value
 * @returns {string}
 */
function getToDate(value) {
    const dateTime = DateTime.create();
    let   date     = null;

    switch (value) {
    case TODAY:
        date = dateTime;
        break;
    case YESTERDAY:
        date = dateTime.moveDay(-1);
        break;
    case LAST_7_DAYS:
        date = dateTime;
        break;
    case LAST_15_DAYS:
        date = dateTime;
        break;
    case LAST_30_DAYS:
        date = dateTime;
        break;
    case LAST_60_DAYS:
        date = dateTime;
        break;
    case LAST_90_DAYS:
        date = dateTime;
        break;
    case LAST_120_DAYS:
        date = dateTime;
        break;
    case LAST_YEAR:
        date = dateTime;
        break;
    case THIS_WEEK:
        date = dateTime.toWeekEnd();
        break;
    case THIS_MONTH:
        date = dateTime.toMonthEnd();
        break;
    case THIS_YEAR:
        date = dateTime;
        break;
    case PAST_WEEK:
        date = dateTime.toWeekEnd().moveDay(-7);
        break;
    case PAST_MONTH:
        date = dateTime.moveMonth(-1).toMonthEnd();
        break;
    case PAST_YEAR:
        date = dateTime.moveYear(-1).toYearEnd();
        break;
    case ALL_PERIOD:
        date = dateTime;
        break;
    default:
    }
    return date !== null ? date.toString("dashesReverse") : "";
}

/**
 * Returns the Name of the given Value
 * @param {(number|string)} value
 * @returns {string}
 */
function getName(value) {
    const key = PERIODS_KEYS[value];
    return key ? NLS.get(`PERIOD_${key}`) : "";
}

/**
 * Returns a Periods Select
 * @param {string[]=} periods
 * @returns {object[]}
 */
function getSelect(periods) {
    const entries = periods || PERIODS_COMPLETE;
    const result  = [];
    for (const key of entries) {
        const value = getName(key);
        result.push({ key, value });
    }
    return result;
}

/**
 * Returns a Simple Periods Select
 * @returns {object[]}
 */
function getSimpleSelect() {
    return getSelect(PERIODS_SIMPLE);
}

/**
 * Returns a Last Periods Select
 * @param {boolean=} withToday
 * @returns {object[]}
 */
function getLastSelect(withToday) {
    return withToday ? getSelect(PERIODS_LAST_TODAY) : getSelect(PERIODS_LAST);
}



// The Public API
export default {
    getFromDate,
    getToDate,

    getName,
    getSelect,
    getSimpleSelect,
    getLastSelect,

    SELECT,
    TODAY,
    YESTERDAY,
    LAST_7_DAYS,
    LAST_15_DAYS,
    LAST_30_DAYS,
    LAST_60_DAYS,
    LAST_90_DAYS,
    LAST_120_DAYS,
    LAST_YEAR,
    THIS_WEEK,
    THIS_MONTH,
    THIS_YEAR,
    PAST_WEEK,
    PAST_MONTH,
    ALL_PERIOD,
    CUSTOM,
};
