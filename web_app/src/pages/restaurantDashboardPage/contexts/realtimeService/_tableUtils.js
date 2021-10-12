import { DateTime } from 'luxon';

export const parseTable = (table) => {
    table['last_course_datetime'] = new DateTime.fromISO(table['last_course_datetime'], {zone: 'utc'});
    return table;
}

export const parseTables = (_tables) => {
    let tables = {};
    _tables.forEach((table) => {
        tables[table.id] = parseTable(table);
    });
    return tables;
}