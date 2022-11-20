(function($) {
	var calendar = {
	
	    /**
	     * 农历1900-2100的润大小信息表
	     * @Array Of Property
	     * @return Hex 
	     */
	    lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
	      0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
	      0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
	      0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
	      0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
	      0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
	      0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
	      0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
	      0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
	      0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
	      0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
	      0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
	      0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
	      0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
	      0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
	      /**Add By JJonline@JJonline.Cn**/
	      0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
	      0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
	      0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
	      0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
	      0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
	      0x0d520
	    ], //2100
	
	    /**
	     * 公历每个月份的天数普通表
	     * @Array Of Property
	     * @return Number 
	     */
	    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	
	    /**
	     * 天干地支之天干速查表
	     * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
	     * @return Cn string 
	     */
	    Gan: ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"],
	
	    /**
	     * 天干地支之地支速查表
	     * @Array Of Property 
	     * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
	     * @return Cn string 
	     */
	    Zhi: ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c",
	      "\u4ea5"
	    ],
	
	    /**
	     * 天干地支之地支速查表<=>生肖
	     * @Array Of Property 
	     * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
	     * @return Cn string 
	     */
	    Animals: ["\u9f20", "\u725b", "\u864e", "\u5154", "\u9f99", "\u86c7", "\u9a6c", "\u7f8a", "\u7334", "\u9e21",
	      "\u72d7", "\u732a"
	    ],
	
	    /**
	     * 24节气速查表
	     * @Array Of Property 
	     * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
	     * @return Cn string 
	     */
	    solarTerm: ["\u5c0f\u5bd2", "\u5927\u5bd2", "\u7acb\u6625", "\u96e8\u6c34", "\u60ca\u86f0", "\u6625\u5206",
	      "\u6e05\u660e", "\u8c37\u96e8", "\u7acb\u590f", "\u5c0f\u6ee1", "\u8292\u79cd", "\u590f\u81f3", "\u5c0f\u6691",
	      "\u5927\u6691", "\u7acb\u79cb", "\u5904\u6691", "\u767d\u9732", "\u79cb\u5206", "\u5bd2\u9732", "\u971c\u964d",
	      "\u7acb\u51ac", "\u5c0f\u96ea", "\u5927\u96ea", "\u51ac\u81f3"
	    ],
	
	    /**
	     * 1900-2100各年的24节气日期速查表
	     * @Array Of Property 
	     * @return 0x string For splice
	     */
	    sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
	      '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
	      '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
	      '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
	      'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
	      '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
	      '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
	      '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
	      '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
	      '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
	      '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
	      '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
	      '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
	      '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
	      '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
	      '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
	      '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
	      '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
	      '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
	      '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
	      '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
	      '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
	      '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
	      '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
	      '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
	      '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
	      '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
	      '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
	      '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
	      '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
	      '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
	      '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
	      '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
	      '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
	      '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
	      '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
	      '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
	      '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
	      '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
	      '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
	      '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
	      '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
	      '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
	      '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
	      '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
	      '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
	      '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
	      '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
	      '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
	      '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
	      '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
	      '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
	      '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
	      '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
	      '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
	      '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
	      '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
	      '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
	      '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
	      '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
	      '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
	      '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
	      '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
	      '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
	      '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
	      '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
	      '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'
	    ],
	
	    /**
	     * 数字转中文速查表
	     * @Array Of Property 
	     * @trans ['日','一','二','三','四','五','六','七','八','九','十']
	     * @return Cn string 
	     */
	    nStr1: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d",
	      "\u5341"
	    ],
	
	    /**
	     * 日期转农历称呼速查表
	     * @Array Of Property 
	     * @trans ['初','十','廿','卅']
	     * @return Cn string 
	     */
	    nStr2: ["\u521d", "\u5341", "\u5eff", "\u5345"],
	
	    /**
	     * 月份转农历称呼速查表
	     * @Array Of Property 
	     * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
	     * @return Cn string 
	     */
	    nStr3: ["\u6b63", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341",
	      "\u51ac", "\u814a"
	    ],
	
	    /**
	     * 返回农历y年一整年的总天数
	     * @param lunar Year
	     * @return Number
	     * @eg:var count = calendar.lYearDays(1987) ;//count=387
	     */
	    lYearDays: function (y) {
	      var i, sum = 348;
	      for (i = 0x8000; i > 0x8; i >>= 1) {
	        sum += (calendar.lunarInfo[y - 1900] & i) ? 1 : 0;
	      }
	      return (sum + calendar.leapDays(y));
	    },
	
	    /**
	     * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
	     * @param lunar Year
	     * @return Number (0-12)
	     * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
	     */
	    leapMonth: function (y) { //闰字编码 \u95f0
	      return (calendar.lunarInfo[y - 1900] & 0xf);
	    },
	
	    /**
	     * 返回农历y年闰月的天数 若该年没有闰月则返回0
	     * @param lunar Year
	     * @return Number (0、29、30)
	     * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
	     */
	    leapDays: function (y) {
	      if (calendar.leapMonth(y)) {
	        return ((calendar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
	      }
	      return (0);
	    },
	
	    /**
	     * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
	     * @param lunar Year
	     * @return Number (-1、29、30)
	     * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
	     */
	    monthDays: function (y, m) {
	      if (m > 12 || m < 1) {
	        return -1
	      } //月份参数从1至12，参数错误返回-1
	      return ((calendar.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
	    },
	
	    /**
	     * 返回公历(!)y年m月的天数
	     * @param solar Year
	     * @return Number (-1、28、29、30、31)
	     * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
	     */
	    solarDays: function (y, m) {
	      if (m > 12 || m < 1) {
	        return -1
	      } //若参数错误 返回-1
	      var ms = m - 1;
	      if (ms == 1) { //2月份的闰平规律测算后确认返回28或29
	        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
	      } else {
	        return (calendar.solarMonth[ms]);
	      }
	    },
	
	    /**
	     * 农历年份转换为干支纪年
	     * @param  lYear 农历年的年份数
	     * @return Cn string
	     */
	    toGanZhiYear: function (lYear) {
	      var ganKey = (lYear - 3) % 10;
	      var zhiKey = (lYear - 3) % 12;
	      if (ganKey == 0) ganKey = 10; //如果余数为0则为最后一个天干
	      if (zhiKey == 0) zhiKey = 12; //如果余数为0则为最后一个地支
	      return calendar.Gan[ganKey - 1] + calendar.Zhi[zhiKey - 1];
	
	    },
	
	    /**
	     * 公历月、日判断所属星座
	     * @param  cMonth [description]
	     * @param  cDay [description]
	     * @return Cn string
	     */
	    toAstro: function (cMonth, cDay) {
	      var s =
	        "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
	      var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
	      return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5ea7"; //座
	    },
	
	    /**
	     * 传入offset偏移量返回干支
	     * @param offset 相对甲子的偏移量
	     * @return Cn string
	     */
	    toGanZhi: function (offset) {
	      return calendar.Gan[offset % 10] + calendar.Zhi[offset % 12];
	    },
	
	    /**
	     * 传入公历(!)y年获得该年第n个节气的公历日期
	     * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起 
	     * @return day Number
	     * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
	     */
	    getTerm: function (y, n) {
	      if (y < 1900 || y > 2100) {
	        return -1;
	      }
	      if (n < 1 || n > 24) {
	        return -1;
	      }
	      var _table = calendar.sTermInfo[y - 1900];
	      var _info = [
	        parseInt('0x' + _table.substr(0, 5)).toString(),
	        parseInt('0x' + _table.substr(5, 5)).toString(),
	        parseInt('0x' + _table.substr(10, 5)).toString(),
	        parseInt('0x' + _table.substr(15, 5)).toString(),
	        parseInt('0x' + _table.substr(20, 5)).toString(),
	        parseInt('0x' + _table.substr(25, 5)).toString()
	      ];
	      var _calday = [
	        _info[0].substr(0, 1),
	        _info[0].substr(1, 2),
	        _info[0].substr(3, 1),
	        _info[0].substr(4, 2),
	
	        _info[1].substr(0, 1),
	        _info[1].substr(1, 2),
	        _info[1].substr(3, 1),
	        _info[1].substr(4, 2),
	
	        _info[2].substr(0, 1),
	        _info[2].substr(1, 2),
	        _info[2].substr(3, 1),
	        _info[2].substr(4, 2),
	
	        _info[3].substr(0, 1),
	        _info[3].substr(1, 2),
	        _info[3].substr(3, 1),
	        _info[3].substr(4, 2),
	
	        _info[4].substr(0, 1),
	        _info[4].substr(1, 2),
	        _info[4].substr(3, 1),
	        _info[4].substr(4, 2),
	
	        _info[5].substr(0, 1),
	        _info[5].substr(1, 2),
	        _info[5].substr(3, 1),
	        _info[5].substr(4, 2),
	      ];
	      return parseInt(_calday[n - 1]);
	    },
	
	    /**
	     * 传入农历数字月份返回汉语通俗表示法
	     * @param lunar month
	     * @return Cn string
	     * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
	     */
	    toChinaMonth: function (m) { // 月 => \u6708
	      if (m > 12 || m < 1) {
	        return -1
	      } //若参数错误 返回-1
	      var s = calendar.nStr3[m - 1];
	      s += "\u6708"; //加上月字
	      return s;
	    },
	
	    /**
	     * 传入农历日期数字返回汉字表示法
	     * @param lunar day
	     * @return Cn string
	     * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
	     */
	    toChinaDay: function (d) { //日 => \u65e5
	      var s;
	      switch (d) {
	        case 10:
	          s = '\u521d\u5341';
	          break;
	        case 20:
	          s = '\u4e8c\u5341';
	          break;
	          break;
	        case 30:
	          s = '\u4e09\u5341';
	          break;
	          break;
	        default:
	          s = calendar.nStr2[Math.floor(d / 10)];
	          s += calendar.nStr1[d % 10];
	      }
	      return (s);
	    },
	
	    /**
	     * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
	     * @param y year
	     * @return Cn string
	     * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
	     */
	    getAnimal: function (y) {
	      return calendar.Animals[(y - 4) % 12]
	    },
	    /**
	    *	农历节日
	    */
	    Njieri: function (month, date) {
	      var Njieri = null
	      if ((month == '腊月') && (date == '三十')) {
	        Njieri = '除夕'
	      }
	      if ((month == '正月') && (date == '初一')) {
	        Njieri = '春节'
	      }
	      if ((month == '正月') && (date == '十五')) {
	        Njieri = '元宵节'
	      }
	      if ((month == '二月') && (date == '初二')) {
	        Njieri = '春龙节'
	      }
	      if ((month == '五月') && (date == '初六')) {
	        Njieri = '立夏节'
	      }
	      if ((month == '六月') && (date == '初六')) {
	        Njieri = '天贶节'
	      }
	      if ((month == '七月') && (date == '初七')) {
	        Njieri = '七夕节'
	      }
	      if ((month == '七月') && (date == '十五')) {
	        Njieri = '中元节'
	      }
	      if ((month == '八月') && (date == '十五')) {
	        Njieri = '中秋节'
	      }
	      if ((month == '九月') && (date == '初九')) {
	        Njieri = '重阳节'
	      }
	      if ((month == '腊月') && (date == '初八')) {
	        Njieri = '腊八节'
	      }
	      return Njieri;
	    },
	    /**
	     * 阳历节日
	     */
	    jieri: function (year,month, date) {
	      var jirri = null
	      if (month == 5) {
	        var thisWeek = new Date(year, month - 1, 1).getDay();
	        if (thisWeek == 0)
	          thisWeek = 7
	        var wuyueDay = 1 + 7 + (7 - thisWeek)
	        if ((month == 5) && (date == wuyueDay)) {
	          jirri = "母亲节";
	
	        }
	      }
	      if (month == 6) {
	        var thisWeek = new Date(year, month - 1, 1).getDay();
	        if (thisWeek == 0)
	          thisWeek = 7
	        var wuyueDay = 1 + 14 + (7 - thisWeek)
	        if ((month == 6) && (date == wuyueDay)) {
	          jirri = "父亲节";
	
	        }
	      }
	      if ((month == 1) && (date == 1)) {
	        jirri = "元旦";
	
	      }
	      if ((month == 3) && (date == 8)) {
	        jirri = "妇女节";
	
	      }
	      if ((month == 3) && (date == 12)) {
	        jirri = "植树节";
	
	      }
	
	      if ((month == 4) && (date == 5)) {
	        jirri = "清明节";
	
	      }
	
	      if ((month == 5) && (date == 1)) {
	        jirri = "劳动节";
	
	      }
	
	      if ((month == 5) && (date == 4)) {
	        jirri = "青年节";
	
	      }
	
	      if ((month == 6) && (date == 1)) {
	        jirri = "儿童节";
	
	      }
	
	      if ((month == 8) && (date == 1)) {
	        jirri = "建军节";
	
	      }
	      if ((month == 9) && (date == 10)) {
	        jirri = "教师节";
	
	      }
	
	      if ((month == 10) && (date == 1)) {
	        jirri = "国庆节";
	
	      }
	
	      if ((month == 12) && (date == 24)) {
	        jirri = "平安夜";
	
	      }
	
	      if ((month == 12) && (date == 25)) {
	        jirri = "圣诞节";
	
	      }
	      return jirri
	
	    },
	
	    /**
	     * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
	     * @param y  solar year
	     * @param m  solar month
	     * @param d  solar day
	     * @return JSON object
	     * @eg:console.log(calendar.solar2lunar(1987,11,01));
	     */
	    solar2lunar: function (y, m, d) { //参数区间1900.1.31~2100.12.31
	      //年份限定、上限
	      if (y < 1900 || y > 2100) {
	        return -1; // undefined转换为数字变为NaN
	      }
	      //公历传参最下限
	      if (y == 1900 && m == 1 && d < 31) {
	        return -1;
	      }
	      //未传参  获得当天
	      if (!y) {
	        var objDate = new Date();
	      } else {
	        var objDate = new Date(y, parseInt(m) - 1, d)
	      }
	      var i, leap = 0,
	        temp = 0;
	      //修正ymd参数
	      var y = objDate.getFullYear(),
	        m = objDate.getMonth() + 1,
	        d = objDate.getDate();
	      var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) /
	        86400000;
	      for (i = 1900; i < 2101 && offset > 0; i++) {
	        temp = calendar.lYearDays(i);
	        offset -= temp;
	      }
	      if (offset < 0) {
	        offset += temp;
	        i--;
	      }
	      // 是否是节日
	
	      var festival = calendar.jieri(y,m, d)
	      var isFestival = false
	      if (festival != null) {
	        isFestival = true
	      }
	      //是否今天
	      var isTodayObj = new Date(),
	        isToday = false;
	      if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
	        isToday = true;
	      }
	      //星期几
	      var nWeek = objDate.getDay(),
	        cWeek = calendar.nStr1[nWeek];
	      //数字表示周几顺应天朝周一开始的惯例
	      if (nWeek == 0) {
	        nWeek = 7;
	      }
	      //农历年
	      var year = i;
	      var leap = calendar.leapMonth(i); //闰哪个月
	      var isLeap = false;
	
	      //效验闰月
	      for (i = 1; i < 13 && offset > 0; i++) {
	        //闰月
	        if (leap > 0 && i == (leap + 1) && isLeap == false) {
	          --i;
	          isLeap = true;
	          temp = calendar.leapDays(year); //计算农历闰月天数
	        } else {
	          temp = calendar.monthDays(year, i); //计算农历普通月天数
	        }
	        //解除闰月
	        if (isLeap == true && i == (leap + 1)) {
	          isLeap = false;
	        }
	        offset -= temp;
	      }
	      // 闰月导致数组下标重叠取反
	      if (offset == 0 && leap > 0 && i == leap + 1) {
	        if (isLeap) {
	          isLeap = false;
	        } else {
	          isLeap = true;
	          --i;
	        }
	      }
	      if (offset < 0) {
	        offset += temp;
	        --i;
	      }
	      //农历月
	      var month = i;
	      //农历日
	      var day = offset + 1;
	      //天干地支处理
	      var sm = m - 1;
	      var gzY = calendar.toGanZhiYear(year);
	
	      // 当月的两个节气
	      // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
	      var firstNode = calendar.getTerm(y, (m * 2 - 1)); //返回当月「节」为几日开始
	      var secondNode = calendar.getTerm(y, (m * 2)); //返回当月「节」为几日开始
	
	      // 依据12节气修正干支月
	      var gzM = calendar.toGanZhi((y - 1900) * 12 + m + 11);
	      if (d >= firstNode) {
	        gzM = calendar.toGanZhi((y - 1900) * 12 + m + 12);
	      }
	
	      //传入的日期的节气与否
	      var isTerm = false;
	      var Term = null;
	      if (firstNode == d) {
	        isTerm = true;
	        Term = calendar.solarTerm[m * 2 - 2];
	      }
	      if (secondNode == d) {
	        isTerm = true;
	        Term = calendar.solarTerm[m * 2 - 1];
	      }
	      //日柱 当月一日与 1900/1/1 相差天数
	      var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
	      var gzD = calendar.toGanZhi(dayCyclical + d - 1);
	      //该日期所属的星座
	      var astro = calendar.toAstro(m, d);
	      var Njieri = calendar.Njieri((isLeap ? "\u95f0" : '') + calendar.toChinaMonth(month), calendar.toChinaDay(day));
	      var isNjieri = false;
	      if (Njieri != null) {
	        isNjieri = true
	      }
	      return {
	        'lYear': year,
	        'lMonth': month,
	        'lDay': day,
	        'Animal': calendar.getAnimal(y),
	        'IMonthCn': (isLeap ? "\u95f0" : '') + calendar.toChinaMonth(month),
	        'IDayCn': calendar.toChinaDay(day),
	        'cYear': y,
	        'cMonth': m,
	        'cDay': d,
	        'gzYear': gzY,
	        'gzMonth': gzM,
	        'gzDay': gzD,
	        'isToday': isToday,
	        'isLeap': isLeap,
	        'nWeek': nWeek,
	        'ncWeek': "\u661f\u671f" + cWeek,
	        'isTerm': isTerm,
	        'Term': Term,//节气
	        'astro': astro,//星座
	        'festival': festival,//阳历节日
	        'isFestival': isFestival,
	        'Njieri': Njieri,
	        'isNjieri': isNjieri
	      };
	    },
	
	    /**
	     * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
	     * @param y  lunar year
	     * @param m  lunar month
	     * @param d  lunar day
	     * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
	     * @return JSON object
	     * @eg:console.log(calendar.lunar2solar(1987,9,10));
	     */
	    lunar2solar: function (y, m, d, isLeapMonth) { //参数区间1900.1.31~2100.12.1
	      var isLeapMonth = !!isLeapMonth;
	      var leapOffset = 0;
	      var leapMonth = calendar.leapMonth(y);
	      var leapDay = calendar.leapDays(y);
	      if (isLeapMonth && (leapMonth != m)) {
	        return -1;
	      } //传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
	      if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
	        return -1;
	      } //超出了最大极限值 
	      var day = calendar.monthDays(y, m);
	      var _day = day;
	      //bugFix 2016-9-25 
	      //if month is leap, _day use leapDays method 
	      if (isLeapMonth) {
	        _day = calendar.leapDays(y, m);
	      }
	      if (y < 1900 || y > 2100 || d > _day) {
	        return -1;
	      } //参数合法性效验
	
	      //计算农历的时间差
	      var offset = 0;
	      for (var i = 1900; i < y; i++) {
	        offset += calendar.lYearDays(i);
	      }
	      var leap = 0,
	        isAdd = false;
	      for (var i = 1; i < m; i++) {
	        leap = calendar.leapMonth(y);
	        if (!isAdd) { //处理闰月
	          if (leap <= i && leap > 0) {
	            offset += calendar.leapDays(y);
	            isAdd = true;
	          }
	        }
	        offset += calendar.monthDays(y, i);
	      }
	      //转换闰月农历 需补充该年闰月的前一个月的时差
	      if (isLeapMonth) {
	        offset += day;
	      }
	      //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
	      var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
	      var calObj = new Date((offset + d - 31) * 86400000 + stmap);
	      console.log(calObj)
	      var cY = calObj.getUTCFullYear();
	      var cM = calObj.getUTCMonth() + 1;
	      var cD = calObj.getUTCDate();
	
	      return calendar.solar2lunar(cY, cM, cD);
	    },
		chaDate:function(y,m){
	    var panShu;
	    var myDate0 = new Date
	    if ((myDate0.getFullYear() == y) && (myDate0.getMonth()+1 == m) ){
	      panShu='1';
	    }
	    else{
	      panShu = '0';
	    }
	    riLi = []
	    shangY = []
	    xiaY = []
	    var dayNum = new Date(y, m, 0).getDate();
	// 		if(dayNum==0){
	// 			dayNum=7
	// 		}
	    var dayNumS = new Date(y, parseInt(m) - 1, 0).getDate();
	    var dayNumX = new Date(y, parseInt(m) + 1, 0).getDate();
	    var startWeek = new Date('' + y + ',' + m + ',1').getDay();
	    if(startWeek==0){
	    	startWeek=7
	    }
	    /*↓日、六在开头末尾↓*/
	//  for (var ij = startWeek - 1; ij >= 0; ij--) {
		/*↑日、六在开头末尾↑*/
		for (var ij = startWeek - 2; ij >= 0; ij--) {
				var sM=parseInt(m)-1
				var sY=y
				if(sM<=0){
					sM=12;
					sY=parseInt(sY)-1
				}
				//console.log(sY,sM)
				var riqi=calendar.solar2lunar(sY,sM,parseInt(dayNumS) - parseInt(ij))
	      shangY.push(riqi)
	    }
	    for (var ii = 1; ii <= dayNum; ii++) {
				var riqi=calendar.solar2lunar(y,m,ii)
	      riLi.push(riqi)
	    }
	    var shu = riLi.length + shangY.length;
	    if (shu % 7>0){
	      for (var ijj = 1; ijj <= 7 - shu % 7; ijj++) {
					var xM=parseInt(m)+1
					var xY=y
					if(xM>=13){
						xM=1;
						xY=parseInt(xY)+1
					}
					//console.log(xY,xM)
					var riqi=calendar.solar2lunar(xY,xM,ijj)
	        xiaY.push(riqi)
	      }
	    }
			var zhongshu=shangY.length+riLi.length +xiaY.length
			if(zhongshu<42){
				if(shangY.length==0){
					for (var ij = 6; ij >= 0; ij--) {
						var sM=parseInt(m)-1
						var sY=y
						if(sM<=0){
							sM=12;
							sY=parseInt(sY)-1
						}
						//console.log(sY,sM)
						var riqi=calendar.solar2lunar(sY,sM,parseInt(dayNumS) - parseInt(ij))
						shangY.push(riqi)
					}
				}
				else if(xiaY.length==0){
					for (var ijj = 1; ijj <= 7; ijj++) {
						var xM=parseInt(m)+1
						var xY=y
						if(xM>=13){
							xM=1;
							xY=parseInt(xY)+1
						}
						//console.log(xY,xM)
						var riqi=calendar.solar2lunar(xY,xM,ijj)
						xiaY.push(riqi)
					}
				}
				else{
					var kaiDay=xiaY[xiaY.length-1].cDay
					var jie=kaiDay+7
					for (var ijj = kaiDay+1; ijj <= jie; ijj++) {
						var xM=parseInt(m)+1
						var xY=y
						if(xM>=13){
							xM=1;
							xY=parseInt(xY)+1
						}
						//console.log(xY,xM)
						var riqi=calendar.solar2lunar(xY,xM,ijj)
						xiaY.push(riqi)
					}
				}
			}
			var riQiDate={lastMonth:shangY,sameMonth:riLi,nextMonth:xiaY}
			//console.log(riQiDate)
			return riQiDate;
	  },
	  };
	var xuanYear=null;
	var xuanMonth=null;;
	var xuanDate=null;;
	var todayXiang=null;
	var xuandayXiang=null;
	var BGtH=null;
	var BianHuan=0;
	var xuanYear1=null;
	var xuanMonth1=null;
	var xuanDate1=null;
	var today1Xiang1=null;
	var xuandayXiang1=null;
	var BGtH1=null;
	var BianHuan1=0;
	$.extend({
		starXian:function(obj,y,m){
			var year;
			var month;
			if(y==null || m==null){
				year=new Date().getFullYear();
				month=new Date().getMonth()+1;
			}
			else{
				year=y;
				month=m;
			}
			todayXiang=null;
			todayXiang=calendar.solar2lunar(year,month,new Date().getDate());
			var str=`<div id="xsw_dateX" class="xsw_dateX"><div class='tap'><div class='qian' > <div onclick='$.qianQ()' class='list'><<</div> <div onclick='$.qian()' class='list'><</div> </div> <div class='zhong'><select name='job' id='selectYear' onchange='$.select()'></select>年 <select id='selectMonth' onchange='$.select()'></select>月</div> <div class='hou' > <div onclick='$.hou()' class='list'>></div> <div onclick='$.houH()' class='list'>>></div> </div> </div><div class='tou'><div class='touList'>一</div><div class='touList'>二</div><div class='touList'>三</div><div class='touList'>四</div><div class='touList'>五</div><div class='touList' style='color:red'>六</div><div class='touList' style='color:red'>日</div></div><div class='dateMain' id='dateMain'> <div class='dateMain1' id='dateMain1'><div class='dateList' id='dateList'></div></div> <div id='BG' style='pointer-events: none;position: absolute;width: 100%;background-size:cover;opacity: 0.4;left: 0;right: 0;'></div>  </div><div id='xianQiTa'></div><div id='chaDian' onclick='$.kaiG(this)'>↓</div></div>`;
				/*↓日、六在开头末尾↓*/
				//var str=`<div  class='xsw_dateX'><div class='tap'><div class='qian' > <div onclick='$.qianQ()' class='list'><<</div> <div onclick='$.qian()' class='list'><</div> </div> <div class='zhong'><select name='job' id='selectYear' onchange='$.select()'></select>年 <select id='selectMonth' onchange='$.select()'></select>月</div> <div class='hou' > <div onclick='$.hou()' class='list'>></div> <div onclick='$.houH()' class='list'>>></div> </div> </div><div class='tou'><div class='touList' style='color:red'>日</div><div class='touList'>一</div><div class='touList'>二</div><div class='touList'>三</div><div class='touList'>四</div><div class='touList'>五</div><div class='touList' style='color:red'>六</div></div><div class='dateMain' id='dateMain'> <div class='dateMain1' id='dateMain1'><div class='dateList' id='dateList'></div></div> <div id='BG' style='pointer-events: none;position: absolute;width: 100%;background-size:cover;opacity: 0.4;left: 0;right: 0;'></div>  </div><div id='xianQiTa'></div><div id='chaDian' onclick='$.kaiG(this)'>↓</div></div>`;
				/*↑日、六在开头末尾↑*/
			$(obj).append(str)
			BGtH = $('#dateList').height() * 6 +'px';
			$.xianDate(year,month)
		},
		selectXian:function(year,month){
			$('#selectYear').html('');
			$('#selectMonth').html('');
			var stryear=''
			for(let y=1901;y<=2099;y++){
				stryear+=`<option value ="${y}">${y}</option>`;

			};
			var strmonth='';
			for(let m=1;m<=12;m++){
				strmonth+=`<option value ="${m}">${m}</option>`;
			};
			$('#selectYear').append(stryear)
			$('#selectMonth').append(strmonth)
			$('#selectYear').val(year)
			$('#selectMonth').val(month)
		},
		xianDate:function(y,m){
		if(y<=1900 ){
			y=2099
		}
		else if(y>=2100){
			y=1901
		}
		$.selectXian(y,m)
		var Tyear=new Date().getFullYear();
		var Tmonth=new Date().getMonth()+1;
		var Tdate=new Date().getDate();
		var dateArr=calendar.chaDate(y,m);
		$('#dateMain1').html('');
		$('#xianQiTa').html('');
		if(dateArr.sameMonth[0].Animal=='鼠'){
			$('#BG').css({'background':'url(shengXiao/shu.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		if(dateArr.sameMonth[0].Animal=='牛'){
			$('#BG').css({'background':'url(shengXiao/niu.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		if(dateArr.sameMonth[0].Animal=='虎'){
			$('#BG').css({'background':'url(shengXiao/hu.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		if(dateArr.sameMonth[0].Animal=='兔'){
			$('#BG').css({'background':'url(shengXiao/tu.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		if(dateArr.sameMonth[0].Animal=='龙'){
			$('#BG').css({'background':'url(shengXiao/long.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		if(dateArr.sameMonth[0].Animal=='蛇'){
			$('#BG').css({'background':'url(shengXiao/se.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		if(dateArr.sameMonth[0].Animal=='马'){
			$('#BG').css({'background':'url(shengXiao/ma.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		if(dateArr.sameMonth[0].Animal=='羊'){
			$('#BG').css({'background':'url(shengXiao/yang.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		if(dateArr.sameMonth[0].Animal=='猴'){
			$('#BG').css({'background':'url(shengXiao/hou.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		if(dateArr.sameMonth[0].Animal=='鸡'){
			$('#BG').css({'background':'url(shengXiao/ji.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		if(dateArr.sameMonth[0].Animal=='狗'){
			$('#BG').css({'background':'url(shengXiao/gou.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		if(dateArr.sameMonth[0].Animal=='猪'){
			$('#BG').css({'background':'url(shengXiao/zhu.png) no-repeat  center','height':BGtH,'background-size':'cover'})
		}
		var str='';
		for(let x=0;x<dateArr.lastMonth.length;x++){
			str+=`<div class='dateList shang' onclick='$.xianDate(${dateArr.lastMonth[x].cYear},${dateArr.lastMonth[x].cMonth})'><div>${dateArr.lastMonth[x].cDay}</div><div class='zi'>${dateArr.lastMonth[x].isFestival==true?dateArr.lastMonth[x].festival:(dateArr.lastMonth[x].isNjieri==true?dateArr.lastMonth[x].Njieri:( dateArr.lastMonth[x].isTerm==true?dateArr.lastMonth[x].Term:(dateArr.lastMonth[x].IDayCn=='初一'?dateArr.lastMonth[x].IMonthCn:dateArr.lastMonth[x].IDayCn)))}</div></div>`;
		};
		for(let x=0;x<dateArr.sameMonth.length;x++){
			str+=`<div class="dateList ${(dateArr.sameMonth[x].cYear==xuanYear && dateArr.sameMonth[x].cMonth==xuanMonth && dateArr.sameMonth[x].cDay==xuanDate)?'xuanZhong':''} ${(dateArr.sameMonth[x].cYear==Tyear && dateArr.sameMonth[x].cMonth==Tmonth && dateArr.sameMonth[x].cDay==Tdate)?'today':''}" onclick='$.xuanZHong(${dateArr.sameMonth[x].cYear},${dateArr.sameMonth[x].cMonth},${dateArr.sameMonth[x].cDay})'><div>${dateArr.sameMonth[x].cDay}</div><div class='zi'>${dateArr.sameMonth[x].isFestival==true?dateArr.sameMonth[x].festival:(dateArr.sameMonth[x].isNjieri==true?dateArr.sameMonth[x].Njieri:(dateArr.sameMonth[x].isTerm==true?dateArr.sameMonth[x].Term:(dateArr.sameMonth[x].IDayCn=='初一'?dateArr.sameMonth[x].IMonthCn:dateArr.sameMonth[x].IDayCn)))}</div></div>`
		};
		for(let x=0;x<dateArr.nextMonth.length;x++){
			str+=`<div class='dateList xia' onclick='$.xianDate(${dateArr.nextMonth[x].cYear},${dateArr.nextMonth[x].cMonth})'><div>${dateArr.nextMonth[x].cDay}</div><div class='zi'>${dateArr.nextMonth[x].isFestival==true?dateArr.nextMonth[x].festival:(dateArr.nextMonth[x].isNjieri==true?dateArr.nextMonth[x].Njieri:( dateArr.nextMonth[x].isTerm==true?dateArr.nextMonth[x].Term:(dateArr.nextMonth[x].IDayCn=='初一'?dateArr.nextMonth[x].IMonthCn:dateArr.nextMonth[x].IDayCn)))}</div></div>`;
		};
		var strC=`<div class="fttor ${(BianHuan==0 || BianHuan%2==0)?'hide':'zai'} " id='fttor'><div class='fttormain'><div class='left'><div class='tiShi'>今天:</div><div>生肖:${todayXiang.Animal}</div> <div>农历:${todayXiang.IMonthCn}${todayXiang.IDayCn}</div> <div>农历节日:${todayXiang.isNjieri==true?todayXiang.Njieri:'无'}</div> <div>节日:${todayXiang.isFestival==true?todayXiang.festival:'无'}</div> </div> <div class='zhong'><div class='today' onclick='$.today()'>回到今天</div><div class='dianjiH' onclick='$.dianjiH()'>去到点击</div></div> <div class='right'> <div class='tiShi'>选中:</div><div>生肖:${xuandayXiang!=null?xuandayXiang.Animal:'未选择'}</div> <div>农历:${xuandayXiang!=null?xuandayXiang.IMonthCn:'未选择'}${xuandayXiang!=null?xuandayXiang.IDayCn:''}</div> <div>农历节日:${xuandayXiang!=null?(xuandayXiang.isNjieri==true?xuandayXiang.Njieri:'无'):'未选择'}</div> <div>节日:${xuandayXiang!=null?(xuandayXiang.isFestival==true?xuandayXiang.festival:'无'):'未选择'}</div> </div></div> </div>`;
		$('#dateMain1').append(str)
		$('#xianQiTa').append(strC)
		//console.log(dateArr);
		},
		select:function(){
			//console.log(document.getElementById('selectYear').value,document.getElementById('selectMonth').value)
			$.xianDate($('#selectYear').val(),$('#selectMonth').val())
		},
		qian:function(){
			var yearQ=$('#selectYear').val();
			var monthQ=$('#selectMonth').val();
			monthQ=parseInt(monthQ)-1;
			if(monthQ<=0){
				monthQ=12
				yearQ=parseInt(yearQ)-1
			}
			if(yearQ<=1900){
				yearQ=2099
			}
			$.xianDate(yearQ,monthQ)
		},
		qianQ:function(){
			var yearQ=$('#selectYear').val();
			var monthQ=$('#selectMonth').val();
			yearQ=parseInt(yearQ)-1;
			if(yearQ<=1900){
				yearQ=2099
			}
			$.xianDate(yearQ,monthQ)
		},
		hou:function(){
			var yearH=$('#selectYear').val();
			var monthH=$('#selectMonth').val();
			monthH=parseInt(monthH)+1;
			if(monthH>=13){
				monthH=1
				yearH=parseInt(yearH)+1
			}
			if(yearH>=2100){
				yearH=1901
			}
			$.xianDate(yearH,monthH)
		},
		houH:function(){
			var yearH=$('#selectYear').val();
			var monthH=$('#selectMonth').val();
			yearH=parseInt(yearH)+1;
			if(yearH>=2100){
				yearH=1901
			}
			$.xianDate(yearH,monthH)
		},
		xuanZHong:function(y,m,d){
			if(xuanYear==y && xuanMonth==m && xuanDate==d){
				xuanYear=null;
				xuanMonth=null;
				xuanDate=null;
				xuandayXiang=null;
				date=000;
				$.xianDate(y,m)
				if(dataFuncton!=null){
					return dataFuncton('没选时间！')
				}
			}
			else{
				xuanYear=y;
				xuanMonth=m;
				xuanDate=d;
				xuandayXiang=null;
				xuandayXiang=calendar.solar2lunar(y,m,d);
				//console.log(xuandayXiang)
				$.xianDate(y,m)
				if(dataFuncton!=null){
					return dataFuncton(xuanYear+'-'+xuanMonth+'-'+xuanDate)
				}
			}
			
			//document.getElementById('xsw_date').setAttribute('data-date',xuanYear+'-'+xuanMonth+'-'+xuanDate);
		},
		today:function(){
			$.xianDate(new Date().getFullYear(),new Date().getMonth()+1)
			let thatYue=parseInt(new Date().getMonth())+1
			$(xsw_dateOBj).val(new Date().getFullYear()+'-'+ thatYue +'-'+new Date().getDate());
		},
		qingKOng:function(){
			xuanYear=null;
			xuanMonth=null;
			xuanDate=null;
			xuandayXiang=null;
			$(xsw_dateOBj).val('');
			console.log($('#selectYear').val(),$('#selectMonth').val())
			$.xianDate($('#selectYear').val(),$('#selectMonth').val())
		},
		quDIng:function(){
			$('#xsw_date').remove();
		},
		dianjiH:function(){
			if(xuanYear==null){
				alert('没有选择日期！')
			}
			else{
				$.xianDate(xuanYear,xuanMonth)
			}
		},
		kaiG:function(e){
			var div=document.getElementById('fttor')
			if(BianHuan%2==0){
				$('#fttor').removeClass('hide')
				$('#fttor').addClass('zai')
				$(e).html('↑')
			}
			else{
				$('#fttor').removeClass('zai')
				$('#fttor').addClass('hide')
				$(e).html('↓')
			}
			BianHuan=BianHuan+1
		},
	
		starXian1:function(obj,y,m){
					var year;
					var month;
					if(y==null || m==null){
						year=new Date().getFullYear();
						month=new Date().getMonth()+1;
					}
					else{
						year=y;
						month=m;
					}
					today1Xiang1=null;
					today1Xiang1=calendar.solar2lunar(year,month,new Date().getDate());
					var str=`<div id='xsw_date' class='xsw_date'><div class='tap'> <div class='left'><div onclick='$.qian1Q()' class='list'><</div><div style='cursor: pointer;color:red'  id='select1Year' onclick='$.xuanYear1()'></div>年<div onclick='$.hou1H()' class='list'>></div></div><div class='right'><div onclick='$.qian1()' class='list'><</div><div id='select1Month' onclick='$.xuanMonth1()' style='cursor: pointer;color:red' ></div>月<div  onclick='$.hou1()' class='list'>></div></div></div><div class='tou'><div class='touList'>一</div><div class='touList'>二</div><div class='touList'>三</div><div class='touList'>四</div><div class='touList'>五</div><div class='touList' style='color:red'>六</div><div class='touList' style='color:red'>日</div></div><div class='dateMain' id='dateMain0'> <div class='dateMain1' id='dateMain01'><div class='dateList' id='dateList1'></div></div> <div id='BG1' style='pointer-events: none;position: absolute;width: 100%;background-size:cover;opacity: 0.4;left: 0;right: 0;'></div> <div id='BG2'  style='position: absolute;width: 100%;background-color:#fff;;left: 0;right: 0;display: flex;justify-content: flex-start;align-items: flex-start;flex-wrap: wrap;'></div>  </div><div id='xianQiTa1'></div><div class='kongJIan'> <div class='left' onclick='$.qingKOng1()'>清空</div> <div class='zhongjian' onclick='$.today1()'>今天</div> <div class='right' onclick='$.quDIng1()'>确定</div> </div></div>`;
						/*↓日、六在开头末尾↓*/
						//var str=`<div  class='xsw_dateX'><div class='tap'><div class='qian1' > <div onclick='$.qian1Q()' class='list'><<</div> <div onclick='$.qian1()' class='list'><</div> </div> <div class='zhong'><select1 name='job' id='select1Year' onchange='$.select1()'></select1>年 <select1 id='select1Month' onchange='$.select1()'></select1>月</div> <div class='hou' > <div onclick='$.hou()' class='list'>></div> <div onclick='$.hou1H()' class='list'>>></div> </div> </div><div class='tou'><div class='touList' style='color:red'>日</div><div class='touList'>一</div><div class='touList'>二</div><div class='touList'>三</div><div class='touList'>四</div><div class='touList'>五</div><div class='touList' style='color:red'>六</div></div><div class='dateMain0' id='dateMain0'> <div class='dateMain01' id='dateMain01'><div class='dateList' id='dateList'></div></div> <div id='BG' style='pointer-events: none;position: absolute;width: 100%;background-size:cover;opacity: 0.4;left: 0;right: 0;'></div>  </div><div id='xianQiTa1'></div><div id='chaDian' onclick='$.kaiG1(this)'>↓</div></div>`;
						/*↑日、六在开头末尾↑*/
					$(obj).append(str)
					BGtH1 = $('#dateList1').height() * 6 +'px';
					$.xianDate1(year,month)
				},
				xuanYear1:function(){
					var xianZiaXuanYear=$('#select1Year').html()
					$('#BG2').html('');
					let strYear='';
					for(let x=1901;x<=2099;x++){
						strYear+=`<div id="${xianZiaXuanYear==x?'BG2XUanYear':''}" style='display: flex;justify-content: center;align-items: center;width: calc(100% / 3);height: calc(100% / 4);cursor: pointer;' onclick='$.xuanYear12(this)'><span>${x}</span>年</div>`
					}
					$('#BG2').css({'height':BGtH1,'overflow-y':'auto'})
					$('#BG2').append(strYear)
					$("#BG2").animate({scrollTop: $('#BG2XUanYear').position().top-$("#BG2").height()/4},100);
				},
				xuanYear12:function(obj){
					$('#BG2').html('');
					$('#BG2').css({'height':0})
					$.xianDate1($(obj).children('span').html(),$('#select1Month').html())
				},
				xuanMonth1:function(){
					var xianZiaXuanMonth=$('#select1Month').html()
					$('#BG2').html('');
					let strMonth='';
					for(let x=1;x<=12;x++){
						strMonth+=`<div id="${xianZiaXuanMonth==x?'BG2XUanMonth':''}" style='display: flex;justify-content: center;align-items: center;width: calc(100% / 4);height: calc(100% / 3);cursor: pointer;' onclick='$.xuanMonth12(this)'><span>${x}</span>月</div>`
					}
					$('#BG2').css({'height':BGtH1})
					$('#BG2').append(strMonth)
				},
				xuanMonth12:function(obj){
					$('#BG2').html('');
					$('#BG2').css({'height':0})
					$.xianDate1($('#select1Year').html(),$(obj).children('span').html())
				},
				BGGUan:function(){
					$('#BG2').html('');
					$('#BG2').css({'height':0})
				},
		xianDate1:function(y,m){
				if(y<=1900 ){
					y=2099
				}
				else if(y>=2100){
					y=1901
				}
				$('#select1Year').html(y)
				$('#select1Month').html(m)
				var Tyear=new Date().getFullYear();
				var Tmonth=new Date().getMonth()+1;
				var Tdate=new Date().getDate();
				var dateArr=calendar.chaDate(y,m);
				$('#dateMain01').html('');
				$('#xianQiTa1').html('');
				if(dateArr.sameMonth[0].Animal=='鼠'){
					$('#BG1').css({'background':'url(shengXiao/shu.png) no-repeat  center','height':BGtH1,'background-size':'cover'})
				}
				if(dateArr.sameMonth[0].Animal=='牛'){
					$('#BG1').css({'background':'url(shengXiao/niu.png) no-repeat  center','height':BGtH1,'background-size':'cover'})
				}
				if(dateArr.sameMonth[0].Animal=='虎'){
					$('#BG1').css({'background':'url(shengXiao/hu.png) no-repeat  center','height':BGtH1,'background-size':'cover'})
				}
				if(dateArr.sameMonth[0].Animal=='兔'){
					$('#BG1').css({'background':'url(shengXiao/tu.png) no-repeat  center','height':BGtH1,'background-size':'cover'})
				}
				if(dateArr.sameMonth[0].Animal=='龙'){
					$('#BG1').css({'background':'url(shengXiao/long.png) no-repeat  center','height':BGtH1,'background-size':'cover'})
				}
				if(dateArr.sameMonth[0].Animal=='蛇'){
					$('#BG1').css({'background':'url(shengXiao/se.png) no-repeat  center','height':BGtH1,'background-size':'cover'})
				}
				if(dateArr.sameMonth[0].Animal=='马'){
					$('#BG1').css({'background':'url(shengXiao/ma.png) no-repeat  center','height':BGtH1,'background-size':'cover'})
				}
				if(dateArr.sameMonth[0].Animal=='羊'){
					$('#BG1').css({'background':'url(shengXiao/yang.png) no-repeat  center','height':BGtH1,'background-size':'cover'})
				}
				if(dateArr.sameMonth[0].Animal=='猴'){
					$('#BG1').css({'background':'url(shengXiao/hou.png) no-repeat  center','height':BGtH1,'background-size':'cover'})
				}
				if(dateArr.sameMonth[0].Animal=='鸡'){
					$('#BG1').css({'background':'url(shengXiao/ji.png) no-repeat  center','height':BGtH1,'background-size':'cover'})
				}
				if(dateArr.sameMonth[0].Animal=='狗'){
					$('#BG1').css({'background':'url(shengXiao/gou.png) no-repeat   center','height':BGtH1,'background-size':'cover'})
				}
				if(dateArr.sameMonth[0].Animal=='猪'){
					$('#BG1').css({'background':'url(shengXiao/zhu.png) no-repeat  center','height':BGtH1,'background-size':'cover'})
				}
				var str='';
				for(let x=0;x<dateArr.lastMonth.length;x++){
					str+=`<div class='dateList shang' onclick='$.xianDate1(${dateArr.lastMonth[x].cYear},${dateArr.lastMonth[x].cMonth})'><div>${dateArr.lastMonth[x].cDay}</div><div class='zi'>${dateArr.lastMonth[x].isFestival==true?dateArr.lastMonth[x].festival:(dateArr.lastMonth[x].isNjieri==true?dateArr.lastMonth[x].Njieri:( dateArr.lastMonth[x].isTerm==true?dateArr.lastMonth[x].Term:(dateArr.lastMonth[x].IDayCn=='初一'?dateArr.lastMonth[x].IMonthCn:dateArr.lastMonth[x].IDayCn)))}</div></div>`;
				};
				for(let x=0;x<dateArr.sameMonth.length;x++){
					str+=`<div class="dateList ${(dateArr.sameMonth[x].cYear==xuanYear1 && dateArr.sameMonth[x].cMonth==xuanMonth1 && dateArr.sameMonth[x].cDay==xuanDate1)?'xuanZhong':''} ${(dateArr.sameMonth[x].cYear==Tyear && dateArr.sameMonth[x].cMonth==Tmonth && dateArr.sameMonth[x].cDay==Tdate)?'today':''}" onclick='$.xuanZHong1(${dateArr.sameMonth[x].cYear},${dateArr.sameMonth[x].cMonth},${dateArr.sameMonth[x].cDay})'><div>${dateArr.sameMonth[x].cDay}</div><div class='zi'>${dateArr.sameMonth[x].isFestival==true?dateArr.sameMonth[x].festival:(dateArr.sameMonth[x].isNjieri==true?dateArr.sameMonth[x].Njieri:(dateArr.sameMonth[x].isTerm==true?dateArr.sameMonth[x].Term:(dateArr.sameMonth[x].IDayCn=='初一'?dateArr.sameMonth[x].IMonthCn:dateArr.sameMonth[x].IDayCn)))}</div></div>`
				};
				for(let x=0;x<dateArr.nextMonth.length;x++){
					str+=`<div class='dateList xia' onclick='$.xianDate1(${dateArr.nextMonth[x].cYear},${dateArr.nextMonth[x].cMonth})'><div>${dateArr.nextMonth[x].cDay}</div><div class='zi'>${dateArr.nextMonth[x].isFestival==true?dateArr.nextMonth[x].festival:(dateArr.nextMonth[x].isNjieri==true?dateArr.nextMonth[x].Njieri:( dateArr.nextMonth[x].isTerm==true?dateArr.nextMonth[x].Term:(dateArr.nextMonth[x].IDayCn=='初一'?dateArr.nextMonth[x].IMonthCn:dateArr.nextMonth[x].IDayCn)))}</div></div>`;
				};
				var strC=`<div class="fttor ${(BianHuan1==0 || BianHuan1%2==0)?'hide':'zai'} " id='fttor'><div class='fttormain'><div class='left'><div class='tiShi'>今天:</div><div>生肖:${today1Xiang1.Animal}</div> <div>农历:${today1Xiang1.IMonthCn}${today1Xiang1.IDayCn}</div> <div>农历节日:${today1Xiang1.isNjieri==true?today1Xiang1.Njieri:'无'}</div> <div>节日:${today1Xiang1.isFestival==true?today1Xiang1.festival:'无'}</div> </div> <div class='zhong'><div class='today1' onclick='$.today1()'>回到今天</div><div class='dianjiH1' onclick='$.dianjiH1()'>去到点击</div></div> <div class='right'> <div class='tiShi'>选中:</div><div>生肖:${xuandayXiang1!=null?xuandayXiang1.Animal:'未选择'}</div> <div>农历:${xuandayXiang1!=null?xuandayXiang1.IMonthCn:'未选择'}${xuandayXiang1!=null?xuandayXiang1.IDayCn:''}</div> <div>农历节日:${xuandayXiang1!=null?(xuandayXiang1.isNjieri==true?xuandayXiang1.Njieri:'无'):'未选择'}</div> <div>节日:${xuandayXiang1!=null?(xuandayXiang1.isFestival==true?xuandayXiang1.festival:'无'):'未选择'}</div> </div></div> </div>`;
				$('#dateMain01').append(str)
				$('#xianQiTa1').append(strC)
				//console.log(dateArr);
				},
		select1:function(){
					//console.log(document.getElementById('select1Year').value,document.getElementById('select1Month').value)
					$.xianDate1($('#select1Year').val(),$('#select1Month').val())
				},
		qian1:function(){
					var yearQ=$('#select1Year').html();
					var monthQ=$('#select1Month').html();
					monthQ=parseInt(monthQ)-1;
					if(monthQ<=0){
						monthQ=12
						yearQ=parseInt(yearQ)-1
					}
					if(yearQ<=1900){
						yearQ=2099
					}
					$.xianDate1(yearQ,monthQ)
				},
		qian1Q:function(){
					var yearQ=$('#select1Year').html();
					var monthQ=$('#select1Month').html();
					yearQ=parseInt(yearQ)-1;
					if(yearQ<=1900){
						yearQ=2099
					}
					$.xianDate1(yearQ,monthQ)
				},
		hou1:function(){
					var yearH=$('#select1Year').html();
					var monthH=$('#select1Month').html();
					monthH=parseInt(monthH)+1;
					if(monthH>=13){
						monthH=1
						yearH=parseInt(yearH)+1
					}
					if(yearH>=2100){
						yearH=1901
					}
					$.xianDate1(yearH,monthH)
				},
		hou1H:function(){
					var yearH=$('#select1Year').html();
					var monthH=$('#select1Month').html();
					yearH=parseInt(yearH)+1;
					if(yearH>=2100){
						yearH=1901
					}
					$.xianDate1(yearH,monthH)
				},
		xuanZHong1:function(y,m,d){
					var xuanZHongJ;
					if(xuanYear1==y && xuanMonth1==m && xuanDate1==d){
						xuanYear1=null;
						xuanMonth1=null;
						xuanDate1=null;
						xuandayXiang1=null;
						date=000;
						$.xianDate1(y,m)
						xuanZHongJ=''
					}
					else{
						xuanYear1=y;
						xuanMonth1=m;
						xuanDate1=d;
						xuandayXiang1=null;
						xuandayXiang1=calendar.solar2lunar(y,m,d);
						//console.log(xuandayXiang1)
						xuanZHongJ=''
						$.xianDate1(y,m)
						xuanZHongJ=xuanYear1+'-'+xuanMonth1+'-'+xuanDate1
					}
					$(xsw_dateOBj).val(xuanZHongJ)
					//document.getElementById('xsw_date').setAttribute('data-date',xuanYear1+'-'+xuanMonth1+'-'+xuanDate1);
				},
		today1:function(){
					$('#BG2').html('');
					$('#BG2').css({'height':0})
					$.xianDate1(new Date().getFullYear(),new Date().getMonth()+1)
					let thatYue=parseInt(new Date().getMonth())+1
					$(xsw_dateOBj).val(new Date().getFullYear()+'-'+ thatYue +'-'+new Date().getDate());
				},
		qingKOng1:function(){
					$('#BG2').html('');
					$('#BG2').css({'height':0})
					xuanYear1=null;
					xuanMonth1=null;
					xuanDate1=null;
					xuandayXiang1=null;
					$(xsw_dateOBj).val('');
					$.xianDate1($('#select1Year').html(),$('#select1Month').html())
				},
		quDIng1:function(){
					$('#BG2').html('');
					$('#BG2').css({'height':0})
					$('#xsw_date').remove();
				},
		dianjiH1:function(){
					if(xuanYear1==null){
						alert('没有选择日期！')
					}
					else{
						$.xianDate1(xuanYear1,xuanMonth1)
					}
				},
		kaiG1:function(e){
					var div=document.getElementById('fttor')
					if(BianHuan1%2==0){
						$('#fttor').removeClass('hide')
						$('#fttor').addClass('zai')
						$(e).html('↑')
					}
					else{
						$('#fttor').removeClass('zai')
						$('#fttor').addClass('hide')
						$(e).html('↓')
					}
					BianHuan1=BianHuan1+1
				},
		
		colseThis:function(){
			if($('#xsw_date'))
				$('#xsw_date').remove();
		}
			
	});
	var dataFuncton=null;
	$.fn.extend({
		rili: function(options) {
			//console.log(this)
			$.starXian(this)
			if(options){
				if(options.date){
					dataFuncton=options.date
				}
			}
		}
	});
	(function(){
		for(let x=0;x<$('input').length;x++){
			if($('input').eq(x).attr('data-xswType')=='xsw_prickDate'){
				$('input').eq(x).addClass('xsw_prickDate')
			}
		}
	})()
	var kaiSHiX=null;
	var jieSHuX=null;
	var kaiSHiY=null;
	var jieSHuY=null;
	var xsw_dateOBj=null
	$('.xsw_prickDate').focus(function(options){
		xsw_dateOBj=null
		kaiSHiX=null
		jieSHuX=null
		kaiSHiY=null
		jieSHuY=null
		if($(this).val()!=''){
			var value=$(this).val().split('-')
			xuanYear1=value[0];
			xuanMonth1=value[1];
			xuanDate1=value[2];
		}
		else{
			xuanYear1=null;
			xuanMonth1=null;
			xuanDate1=null;
		}
		//console.log(xuanYear1,xuanMonth1)
		$.colseThis()
		let top=$(this).offset().top + $(this).height()+6 - $(window).scrollTop();
		let left=$(this).offset().left - $(window).scrollLeft();
		$.starXian1('body',xuanYear1,xuanMonth1)
		xsw_dateOBj=this
		//console.log(left,top)
		$('#xsw_date').css({'position':'fixed','left':left+'px','top':top+'px','z-index':'999999'}),
		kaiSHiY=top-($(this).height()+6);
		jieSHuY=top+$('#xsw_date').height()
		kaiSHiX=left;
		jieSHuX=left+$('#xsw_date').width()
		//console.log(kaiSHiY,jieSHuY,kaiSHiX,jieSHuX)
	})
	$(window).click(function(e){
		 var e = e || window.e;
		 //console.log(e)
		 //console.log('x',e.clientX,'y',e.clientY)
		 if(e.clientX>kaiSHiX && e.clientX<jieSHuX && e.clientY>kaiSHiY  && e.clientY<jieSHuY){}
		 else{
			$.colseThis()
		 }
	})
}(jQuery));
