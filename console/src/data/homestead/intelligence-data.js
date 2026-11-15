// Master Data for Vincent's Farm (300 m² Homestead, West Java, Indonesia)
export const intelligenceData = {
  circScore: 94.2,
  insights: [{
    id: "ins-1",
    category: "Resource Synergy",
    title: "Surplus Solar Window Approaching (11:30 - 14:00)",
    body: "Predicted solar generation will exceed storage capacity by 4.2 kWh today. Terra OS recommends auto-triggering the deep well water pump to top off Cistern #3 and running the food dehydrator for sliced oyster mushrooms.",
    severity: "Positive Opportunity",
    badgeColor: "#10B981",
    actionText: "Auto-Dispatch Solar Surplus"
  }, {
    id: "ins-2",
    category: "Biological Balance",
    title: "Nitrate Accumulation in Pond Alpha (44 ppm)",
    body: "Nitrifying bio-filter efficiency is high, but vegetative uptake is trailing slightly. Recommended action: Increase recirculation diverter valve to the Kangkung and Mint gravel beds by 20% to achieve equilibrium.",
    severity: "Optimization",
    badgeColor: "#0284C7",
    actionText: "Divert Effluent to Grow Beds"
  }, {
    id: "ins-3",
    category: "Microclimate & Pests",
    title: "Monsoon Moisture Advisory (88% RH Forecast)",
    body: "High ambient humidity forecast for next 48h. To prevent powdery mildew on indeterminant tomatoes in Zone 4, schedule organic neem oil & horsetail decoction spray before 16:00.",
    severity: "Preventative",
    badgeColor: "#F59E0B",
    actionText: "Schedule Organic Foliar Spray"
  }],
  predictions: [{
    metric: "Weekly Harvest Projection",
    value: "32.4 kg",
    confidence: "94%",
    change: "+11% vs last week"
  }, {
    metric: "Solar Autonomy Next 7 Days",
    value: "100%",
    confidence: "98%",
    change: "Zero grid dependency"
  }, {
    metric: "Water Reserve Longevity",
    value: "30.5 Days",
    confidence: "91%",
    change: "Stable reserve"
  }, {
    metric: "Tilapia Weight Gain Rate",
    value: "+38g / week",
    confidence: "89%",
    change: "Optimal FCR 1.25"
  }],
  recommendations: [{
    title: "Crop Rotation in Keyhole Bed #2",
    zone: "Zone 4",
    impact: "High",
    reason: "Following heavy feeder brassicas, sow bush beans (Phaseolus vulgaris) to fix nitrogen and restore soil biology without chemical inputs."
  }, {
    title: "Supplemental Calcium via Eggshell Vinegar",
    zone: "Zone 1 & 4",
    impact: "Medium",
    reason: "Apply fermented water-soluble calcium (WCA) derived from homestead eggshells to blossom-end of tomatoes to avoid blossom-end rot."
  }, {
    title: "Adjust Brooder Ventilation Louver",
    zone: "Zone 3",
    impact: "Low",
    reason: "Evening temps dropping to 22°C; reduce airflow by 15% between 22:00 and 05:00 to keep pullets stress-free."
  }],
  quickPrompts: ["How is the closed-loop nutrient cycle performing today?", "What is the best harvest date for Tilapia Batch B-24?", "How can I maximize solar energy utilization before the afternoon rain?", "Explain the nitrogen flow from fish waste to lettuce beds."]
};
