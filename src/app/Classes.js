/**
 * Game classes
 */
export default class Classes {

    /**
     * Returns the slug by class id
     *
     * @param classId
     * @return {*}
     */
    static getSlug(classId) {
        return SLUGS[classId];
    }


}

export const SLUGS = {
    1: "war", // War
    2: "paladin", // Paladin
    3: "hunter", // Hunter
    4: "rogue", // Rogue
    5: "priest", // Priest
    6: "dk", // Death Knight
    7: "shaman", // Shaman
    8: "mage", // Mage
    9: "warlock", // Warlock
    10: "monk", // Monk
    11: "druid", // Druid
    12: "dh", // Demon Hunter
};

/*
Death Knight	  196	,  31	, 59	,0. 77	,0. 12	,0. 23	,#C41F3B	Red †
Demon Hunter	 163	, 48	, 201	,0. 64	,0. 19	,0. 79	,#A330C 9	,Dark Magenta
Druid	 255	, 125	, 10	,1. 00	,0. 49	,0. 04	,#FF7D0A	Orange
Hunter	 169	, 210	, 113	,0. 67	,0. 83	,0. 45	,#A9D 271	,Green
Mage	 64	, 199	, 235	,0. 25	,0. 78	,0. 92	,#40C7EB	Light Blue
Monk	 0	, 255	, 150	,0. 00	,1. 00	,0. 59	,#00FF 96	,Spring Green
Paladin	 245	, 140	, 186	,0. 96	,0. 55	,0. 73	,#F58CBA	Pink
Priest	 255	, 255	, 255	,1. 00	,1. 00	,1. 00	,#FFFFFF	White*
Rogue	 255	, 245	, 105	,1. 00	,0. 96	,0. 41	,#FFF 569	,Yellow*
Shaman	 0	, 112	, 222	,0. 00	,0. 44	,0. 87	,#0070DE	Blue
Warlock	 135	, 135	, 237	,0. 53	,0. 53	,0. 93	,#8787ED	Purple
Warrior	 199	, 156	, 110	,0. 78	,0. 61	,0. 43	,#C79C6E	Tan
 */