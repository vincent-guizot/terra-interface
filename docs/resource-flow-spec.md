# Resource Flow Architecture Specification — Terra Interface

> **Ecological Network & Circular Flow Specification**  
> **Homestead**: Vincent's Farm (300 m², West Java, Indonesia)  
> **Circularity Target**: $\ge 95.0\%$ Closed Loop  
> **Document Version**: 1.0.0 | **Status**: Architecture Specification

---

## 1. Ecological Closed-Loop Philosophy

In a self-sustaining home operating system, waste is simply an unharvested resource. Terra Interface tracks materials and energy as a **Directed Resource Flow Graph** where the output of one biological or physical node serves as the input to another.

```mermaid
graph TD
    %% 5 Closed Loops of Vincent's Farm
    subgraph "Loop 1: Water Microgrid"
        Rain["140 m² Roof Catchment (Z-06)"] -->|Vortex First-Flush| Cisterns["12,000 L HDPE Cisterns (Z-06)"]
        Cisterns -->|Sand & Biochar Gravity Tower| House["Domestic Dwelling (Z-07)"]
        Cisterns -->|Top-up Water| Ponds["Aquaponics Bio-Ponds (Z-02)"]
    end

    subgraph "Loop 2: Solar Energy Microgrid"
        Solar["5.2 kWp Bifacial PV (Z-05)"] -->|DC Current| Inverter["8 kW Hybrid Inverter (Z-05)"]
        Inverter -->|48V Storage| Battery["15.3 kWh LiFePO4 BMS (Z-05)"]
        Inverter -->|Clean AC Power| Pumps["Aeration & NFT Pumps (Z-01, Z-02)"]
        Inverter -->|Lighting & OS| Terminal["Home OS Terminal (Z-07)"]
    end

    subgraph "Loop 3: Aquaponic Nutrient Loop"
        Ponds -->|Fish Sludge & Ammonia| MBBR["Kaldnes K1 Moving Bed Bio-Filter (Z-02)"]
        MBBR -->|Nitrified Nitrates| NFT["Vertical NFT Hydroponics (Z-01)"]
        MBBR -->|Mineralised Effluent| Beds["Permaculture Raised Beds (Z-04)"]
        NFT -->|Clean Water Return| Ponds
    end

    subgraph "Loop 4: Biomass & Insect Bioconversion"
        House -->|Kitchen Scraps| BSF["5-Tray Stacked BSF Unit (Z-03)"]
        NFT -->|Crop Prunings & Trimmings| BSF
        BSF -->|Live 42% Protein Larvae| Chickens["Ayam KUB & Joper Coop (Z-03)"]
        BSF -->|Larvae Meal| Ponds
    end

    subgraph "Loop 5: Organic Soil Regeneration"
        Chickens -->|Deep-Litter Carbonaceous Manure| Compost["3-Bay Bokashi Compost (Z-04)"]
        BSF -->|Digested Insect Frass| Compost
        Compost -->|Thermophilic Humus + 10% Biochar| Beds
        Beds -->|Fresh Organic Vegetables & Papaya| House
        Chickens -->|Fresh Pastured Eggs| House
        Ponds -->|Harvested Tilapia & Catfish| House
```

---

## 2. The 5 Verified Circular Homestead Loops

### Loop 1: Rainwater Harvesting & Gravity Filtration
- **Collection Area**: 140 m² across residence roof and solar array shelter.
- **Pre-treatment**: Mechanical vortex diverter rejects first 2 mm of rain (clearing dust, pollen, and debris).
- **Storage**: 3x 4,000 L food-grade HDPE vertical tanks (12,000 L total buffer).
- **Filtration**: 4-stage gravity tower (gravel $\to$ washed silica sand $\to$ charged coconut biochar $\to$ 5-micron spun sediment filter).
- **Distribution**: Gravity-fed to domestic taps, evaporative greenhouse misting, and pond make-up.

### Loop 2: Solar Photovoltaic & Energy Microgrid
- **Generation**: 10x 520 Wp bifacial monocrystalline solar modules (5.2 kWp nominal).
- **Conversion**: Growatt 8 kW off-grid hybrid inverter (dual MPPT).
- **Storage**: 15.3 kWh LiFePO4 lithium battery bank (51.2V 300Ah) with active cell balancing.
- **Autonomy**: 36 hours of continuous homestead operation without grid support or sunlight.

### Loop 3: Aquaponic Nitrification & Plant Uptake
- **Biomass Input**: 450 Nile Tilapia (*Oreochromis niloticus*) + 120 African Catfish (*Clarias gariepinus*).
- **Biological Conversion**: Nitrosomonas and Nitrobacter bacteria in 150 L Kaldnes K1 media convert toxic un-ionized ammonia ($NH_3/NH_4^+$) into bio-available nitrate ($NO_3^-$).
- **Plant Uptake**: Vertical NFT kale and bok choy extract nitrates, returning purified water back to the fish tanks.

### Loop 4: Biomass Bioconversion via Black Soldier Fly (BSF)
- **Waste Input**: 8–12 kg/day of kitchen scraps, unmarketable crop leaves, and pond sediment.
- **Bioconversion**: Stacked 5-tray BSF unit digests organic matter in 12–14 days.
- **Output 1 (Protein)**: Live 5-instar prepupae (42% crude protein, 35% fat) harvested as live feed for chickens and tilapia.
- **Output 2 (Bio-fertilizer)**: Dry insect frass rich in chitin and beneficial microbes.

### Loop 5: Carbon-Negative Soil Regeneration
- **Raw Materials**: Poultry coop bedding (manure + pine shavings), BSF frass, shredded garden waste.
- **Inoculant**: Anaerobic Bokashi microbial mother culture + 10% activated biochar.
- **Curing**: 3-bay aerobic hot composting reaching 55–65°C for 14 days, followed by 30 days curing.
- **Application**: Applied to the 6 permaculture keyhole beds in Zone 4 to rebuild topsoil humus.

---

## 3. Resource Flow Ledger Schema

Flows are recorded in an append-only ledger to track mass/energy balances and detect leaks:

```prisma
model ResourceFlowLog {
  id               String   @id @default(uuid())
  sourceZoneId     String
  destinationZoneId String
  resourceType     String   // WATER, SOLAR_KWH, BIOMASS_KG, NITRATE_SOLUTION, COMPOST_KG
  plannedQuantity  Float
  actualQuantity   Float
  measurementUnit  String
  circularityScore Float    // % retained in system
  stewardName      String   @default("Vincent")
  timestamp        DateTime @default(now())

  @@index([resourceType, timestamp])
}
```

### Circularity Index Formula

$$\text{Circularity Index (\%)} = \left( 1 - \frac{\text{External Inputs (kg) + System Losses (kg)}}{\text{Total Biomass Cycled (kg)}} \right) \times 100$$

*Current Vincent's Farm Operational Baseline: **95.4%***.
