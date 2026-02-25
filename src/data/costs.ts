// Cost data version 1.0
// All costs in USD per month

export interface CountryCosts {
  country: string;
  flag: string;
  confidence: "low" | "medium" | "high";
  rent: {
    room: [number, number];
    studio: [number, number];
    "1br": [number, number];
    "2br": [number, number];
  };
  food: {
    budget: [number, number];
    comfortable: [number, number];
    premium: [number, number];
  };
  transport: [number, number];
  utilities: [number, number];
  internet: [number, number];
  health: [number, number];
  fun: {
    budget: [number, number];
    comfortable: [number, number];
    premium: [number, number];
  };
}

export const costsData: Record<string, CountryCosts> = {
  thailand: {
    country: "Thailand",
    flag: "🇹🇭",
    confidence: "high",
    rent: {
      room: [150, 300],
      studio: [300, 500],
      "1br": [400, 800],
      "2br": [600, 1200],
    },
    food: {
      budget: [150, 250],
      comfortable: [300, 450],
      premium: [500, 800],
    },
    transport: [30, 80],
    utilities: [40, 80],
    internet: [20, 40],
    health: [50, 150],
    fun: {
      budget: [50, 100],
      comfortable: [150, 300],
      premium: [400, 700],
    },
  },
  vietnam: {
    country: "Vietnam",
    flag: "🇻🇳",
    confidence: "high",
    rent: {
      room: [100, 200],
      studio: [250, 400],
      "1br": [350, 600],
      "2br": [500, 900],
    },
    food: {
      budget: [100, 200],
      comfortable: [250, 400],
      premium: [450, 700],
    },
    transport: [20, 60],
    utilities: [30, 60],
    internet: [15, 30],
    health: [40, 120],
    fun: {
      budget: [40, 80],
      comfortable: [120, 250],
      premium: [350, 600],
    },
  },
  portugal: {
    country: "Portugal",
    flag: "🇵🇹",
    confidence: "high",
    rent: {
      room: [400, 600],
      studio: [600, 900],
      "1br": [800, 1300],
      "2br": [1100, 1800],
    },
    food: {
      budget: [200, 350],
      comfortable: [400, 600],
      premium: [700, 1000],
    },
    transport: [40, 80],
    utilities: [80, 150],
    internet: [30, 50],
    health: [80, 200],
    fun: {
      budget: [80, 150],
      comfortable: [200, 400],
      premium: [500, 900],
    },
  },
  spain: {
    country: "Spain",
    flag: "🇪🇸",
    confidence: "high",
    rent: {
      room: [350, 550],
      studio: [550, 850],
      "1br": [750, 1200],
      "2br": [1000, 1700],
    },
    food: {
      budget: [200, 350],
      comfortable: [400, 550],
      premium: [650, 950],
    },
    transport: [50, 90],
    utilities: [70, 140],
    internet: [35, 55],
    health: [70, 180],
    fun: {
      budget: [80, 160],
      comfortable: [220, 420],
      premium: [520, 900],
    },
  },
  mexico: {
    country: "Mexico",
    flag: "🇲🇽",
    confidence: "high",
    rent: {
      room: [200, 350],
      studio: [350, 550],
      "1br": [500, 900],
      "2br": [700, 1300],
    },
    food: {
      budget: [150, 280],
      comfortable: [350, 500],
      premium: [600, 900],
    },
    transport: [30, 70],
    utilities: [40, 80],
    internet: [25, 45],
    health: [50, 150],
    fun: {
      budget: [60, 120],
      comfortable: [180, 350],
      premium: [450, 800],
    },
  },
  canada: {
    country: "Canada",
    flag: "🇨🇦",
    confidence: "medium",
    rent: {
      room: [600, 900],
      studio: [1000, 1500],
      "1br": [1400, 2200],
      "2br": [1800, 3000],
    },
    food: {
      budget: [300, 450],
      comfortable: [500, 750],
      premium: [850, 1200],
    },
    transport: [80, 150],
    utilities: [100, 180],
    internet: [60, 100],
    health: [100, 300],
    fun: {
      budget: [100, 200],
      comfortable: [300, 500],
      premium: [600, 1000],
    },
  },
  japan: {
    country: "Japan",
    flag: "🇯🇵",
    confidence: "high",
    rent: {
      room: [400, 700],
      studio: [600, 1000],
      "1br": [900, 1500],
      "2br": [1300, 2200],
    },
    food: {
      budget: [250, 400],
      comfortable: [450, 650],
      premium: [750, 1100],
    },
    transport: [70, 130],
    utilities: [80, 150],
    internet: [40, 70],
    health: [80, 200],
    fun: {
      budget: [80, 160],
      comfortable: [250, 450],
      premium: [550, 950],
    },
  },
  uae: {
    country: "UAE",
    flag: "🇦🇪",
    confidence: "medium",
    rent: {
      room: [500, 800],
      studio: [900, 1400],
      "1br": [1300, 2000],
      "2br": [1800, 3000],
    },
    food: {
      budget: [300, 450],
      comfortable: [550, 800],
      premium: [900, 1400],
    },
    transport: [100, 200],
    utilities: [100, 200],
    internet: [60, 100],
    health: [150, 400],
    fun: {
      budget: [100, 200],
      comfortable: [350, 600],
      premium: [750, 1300],
    },
  },
  estonia: {
    country: "Estonia",
    flag: "🇪🇪",
    confidence: "medium",
    rent: {
      room: [300, 450],
      studio: [450, 700],
      "1br": [600, 1000],
      "2br": [850, 1400],
    },
    food: {
      budget: [200, 320],
      comfortable: [380, 550],
      premium: [600, 900],
    },
    transport: [40, 80],
    utilities: [80, 150],
    internet: [25, 45],
    health: [60, 150],
    fun: {
      budget: [60, 120],
      comfortable: [180, 350],
      premium: [420, 750],
    },
  },
};

export const countries = Object.keys(costsData).map((key) => ({
  value: key,
  label: costsData[key].country,
  flag: costsData[key].flag,
}));

export type Lifestyle = "budget" | "comfortable" | "premium";
export type HousingType = "room" | "studio" | "1br" | "2br";
export type TravelerType = "solo" | "couple";
export type WorkStyle = "remote" | "local" | "student";

export interface CostBreakdown {
  rent: number;
  food: number;
  transport: number;
  utilities: number;
  internet: number;
  health: number;
  fun: number;
}

export function calculateCosts(
  country: string,
  lifestyle: Lifestyle,
  stayLength: number,
  housingType: HousingType,
  travelerType: TravelerType,
  _workStyle: WorkStyle
): { total: number; breakdown: CostBreakdown; confidence: "low" | "medium" | "high" } {
  const data = costsData[country];
  if (!data) {
    return {
      total: 0,
      breakdown: { rent: 0, food: 0, transport: 0, utilities: 0, internet: 0, health: 0, fun: 0 },
      confidence: "low",
    };
  }

  // Lifestyle multipliers
  const lifestyleMultiplier = {
    budget: 0.85,
    comfortable: 1.0,
    premium: 1.35,
  }[lifestyle];

  // Helper to get midpoint
  const mid = (range: [number, number]) => (range[0] + range[1]) / 2;

  // Base calculations
  let rent = mid(data.rent[housingType]);
  let food = mid(data.food[lifestyle]);
  let transport = mid(data.transport);
  let utilities = mid(data.utilities);
  let internet = mid(data.internet);
  let health = mid(data.health);
  let fun = mid(data.fun[lifestyle]);

  // Apply lifestyle multiplier to flexible categories
  food *= lifestyleMultiplier;
  fun *= lifestyleMultiplier;

  // Short-term premium (1-2 months)
  if (stayLength <= 2) {
    rent *= 1.1;
  }

  // Couple adjustments
  if (travelerType === "couple") {
    food *= 1.65;
    fun *= 1.65;
    transport *= 1.25;
    health *= 1.5;
  }

  // Round all values
  const breakdown: CostBreakdown = {
    rent: Math.round(rent),
    food: Math.round(food),
    transport: Math.round(transport),
    utilities: Math.round(utilities),
    internet: Math.round(internet),
    health: Math.round(health),
    fun: Math.round(fun),
  };

  const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  return { total, breakdown, confidence: data.confidence };
}
