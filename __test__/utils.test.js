import {describe, expect, test} from "@jest/globals";
import WoWUtils from "@/app/utils/WoWUtils";

describe('Utilities test', function () {
    test("Date functions", ()=>{
        const middleDay = WoWUtils.getWeekNumber(new Date(2020, 4, 27));

        expect(WoWUtils.getWeekNumber(new Date(2020, 4, 25))).toBeLessThan(middleDay);
        expect(WoWUtils.getWeekNumber(new Date(2020, 4, 26))).toBeLessThan(middleDay);
        expect(WoWUtils.getWeekNumber(new Date(2020, 4, 27))).toEqual(middleDay);
        expect(WoWUtils.getWeekNumber(new Date(2020, 4, 28))).toEqual(middleDay);
        expect(WoWUtils.getWeekNumber(new Date(2020, 4, 29))).toEqual(middleDay);
        expect(WoWUtils.getWeekNumber(new Date(2020, 4, 30))).toEqual(middleDay);
        expect(WoWUtils.getWeekNumber(new Date(2020, 4, 31))).toEqual(middleDay);
        expect(WoWUtils.getWeekNumber(new Date(2020, 5, 1))).toEqual(middleDay);
        expect(WoWUtils.getWeekNumber(new Date(2020, 5, 2))).toEqual(middleDay);
        expect(WoWUtils.getWeekNumber(new Date(2020, 5, 3))).toBeGreaterThan(middleDay);
    });
});
