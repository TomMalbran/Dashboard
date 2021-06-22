import NLS          from "../Core/NLS";
import DateTime     from "../Utils/DateTime";



// Constants
const SELECT       = 0;
const LAST_7_DAYS  = 3;
const LAST_15_DAYS = 4;
const LAST_30_DAYS = 5;
const LAST_60_DAYS = 6;
const LAST_90_DAYS = 7;
const LAST_YEAR    = 8;
const THIS_WEEK    = 9;
const THIS_MONTH   = 10;
const THIS_YEAR    = 11;
const PAST_WEEK    = 12;
const PAST_MONTH   = 13;
const PAST_YEAR    = 14;
const ALL_PERIOD   = 2;
const CUSTOM       = 1;

const PERIODS_KEYS = {
    [SELECT]       : "SELECT",
    [LAST_7_DAYS]  : "LAST_7_DAYS",
    [LAST_15_DAYS] : "LAST_15_DAYS",
    [LAST_30_DAYS] : "LAST_30_DAYS",
    [LAST_60_DAYS] : "LAST_60_DAYS",
    [LAST_90_DAYS] : "LAST_90_DAYS",
    [LAST_YEAR]    : "LAST_YEAR",
    [THIS_WEEK]    : "THIS_WEEK",
    [THIS_MONTH]   : "THIS_MONTH",
    [THIS_YEAR]    : "THIS_YEAR",
    [PAST_WEEK]    : "PAST_WEEK",
    [PAST_MONTH]   : "PAST_MONTH",
    [PAST_YEAR]    : "PAST_YEAR",
    [ALL_PERIOD]   : "ALL_PERIOD",
    [CUSTOM]       : "CUSTOM",
};
const PERIODS_VALUES = {
    "select"      : SELECT,
    "las7Days"    : LAST_7_DAYS,
    "last15Days"  : LAST_15_DAYS,
    "last30Days"  : LAST_30_DAYS,
    "last60Days"  : LAST_60_DAYS,
    "last90Days"  : LAST_90_DAYS,
    "lasYear"     : LAST_YEAR,
    "thisWeek"    : THIS_WEEK,
    "thisMonth"   : THIS_MONTH,
    "thisYear"    : THIS_YEAR,
    "pastWeek"    : PAST_WEEK,
    "pastMonth"   : PAST_MONTH,
    "pastYear"    : PAST_YEAR,
    "allPeriod"   : ALL_PERIOD,
    "custom"      : CUSTOM,
};



/**
 * Returns the From Date
 * @param {(Number|String)} value
 * @returns {String}
 */
function getFromDate(value) {
    const dateTime = DateTime.create();
    let   date     = null;

    switch (Number(value)) {
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
 * @param {(Number|String)} value
 * @returns {String}
 */
function getToDate(value) {
    const dateTime = DateTime.create();
    let   date     = null;

    switch (Number(value)) {
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
 * @param {(Number|String)} value
 * @returns {String}
 */
function getName(value) {
    const key = PERIODS_KEYS[value];
    return key ? NLS.get(`PERIOD_${key}`) : "";
}

/**
 * Returns a Periods Select
 * @param {Number[]=} periods
 * @returns {Object[]}
 */
function getSelect(periods) {
    const entries = periods || Object.values(PERIODS_VALUES);
    const result  = [];
    for (const key of entries) {
        const value = getName(key);
        result.push({ key, value });
    }
    return result;
}



// The Public API
export default {
    getFromDate,
    getToDate,

    getName,
    getSelect,

    SELECT,
    LAST_7_DAYS,
    LAST_15_DAYS,
    LAST_30_DAYS,
    LAST_60_DAYS,
    LAST_90_DAYS,
    LAST_YEAR,
    THIS_WEEK,
    THIS_MONTH,
    THIS_YEAR,
    PAST_WEEK,
    PAST_MONTH,
    ALL_PERIOD,
    CUSTOM,
};
