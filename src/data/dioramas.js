// src/data/dioramas.js — World Tour diorama configs
// Each location just lists its sprites (no bg). Layout is computed algorithmically.
// sprites[]: { file, title, desc }

const P = "/assets/Places";

export const dioramaData = {
  // === ASIA ===
  taiwan: {
    title: "TAIWAN", bgColor: "#2F6B56",
    basePath: `${P}/Asia/TAIWAN`,
    sprites: [
      { file: "BUILDING.png", title: "Taipei 101", desc: "Once the world's tallest building, an icon of modern Taiwan." },
      { file: "FOOD.png", title: "Taiwanese Cuisine", desc: "From bubble tea to beef noodle soup, Taiwan is a food lover's paradise." },
      { file: "FLAG.png", title: "Flag of Taiwan", desc: "The flag of the Republic of China." }
    ]
  },
  japan: {
    title: "JAPAN", bgColor: "#3B2040",
    basePath: `${P}/Asia/JAPAN`,
    sprites: [
      { file: "ARCHITECT.png", title: "Japanese Architecture", desc: "Traditional shrines and temples blending with futuristic cityscapes." },
      { file: "FOOD.png", title: "Japanese Cuisine", desc: "Sushi, ramen, and tempura — Japanese food is an art form." },
      { file: "FLAG.png", title: "Flag of Japan", desc: "The Hinomaru — the circle of the sun." }
    ]
  },
  korea: {
    title: "SOUTH KOREA", bgColor: "#1A3A5C",
    basePath: `${P}/Asia/KOREA`,
    sprites: [
      { file: "BUILDING.png", title: "Korean Palace", desc: "Historic palaces that survived centuries of history." },
      { file: "BIMBIMBAO.png", title: "Bibimbap", desc: "A signature Korean mixed rice dish with vegetables and gochujang." },
      { file: "Flag_of_South_Korea.png", title: "Taegeukgi", desc: "The South Korean flag with yin-yang and trigrams." }
    ]
  },
  china: {
    title: "CHINA", bgColor: "#8B1A1A",
    basePath: `${P}/Asia/CHINA`,
    sprites: [
      { file: "ARCHITECTURE.png", title: "Chinese Architecture", desc: "From the Great Wall to the Forbidden City — millennia of grandeur." },
      { file: "FOOD.png", title: "Chinese Cuisine", desc: "From dim sum to Peking duck — one of the world's greatest culinary traditions." },
      { file: "Flag_of_China.png", title: "Flag of China", desc: "The five-starred red flag of the People's Republic." }
    ]
  },
  hongkong: {
    title: "HONG KONG", bgColor: "#1A2A4A",
    basePath: `${P}/Asia/HONGKONG`,
    sprites: [
      { file: "hong-kong-building-architecture-building-high-rise-buildings-in-hong-kong-eb4f4349fd9a20ab77cf9b515a0837a2.png", title: "Hong Kong Skyline", desc: "One of the most iconic skylines in the world, along Victoria Harbour." },
      { file: "DIMSUM.png", title: "Dim Sum", desc: "A Cantonese tradition of small steamed dishes served with tea." },
      { file: "Flag_of_Hong_Kong.svg.png", title: "Flag of Hong Kong", desc: "The Bauhinia blakeana flower emblem." },
      { file: "HK_Taxi_Review_1.webp", title: "Hong Kong Taxi", desc: "The iconic red Toyota Crown Comfort taxis that are a symbol of Hong Kong's streets." }
    ]
  },
  macao: {
    title: "MACAO", bgColor: "#2A4A3A",
    basePath: `${P}/Asia/MACAO`,
    sprites: [
      { file: "BUILDING.png", title: "Ruins of St. Paul's", desc: "The iconic facade of the 17th-century Portuguese church." },
      { file: "FOOD.png", title: "Macanese Cuisine", desc: "A unique fusion of Portuguese and Chinese culinary traditions." },
      { file: "FLAG.png", title: "Flag of Macao", desc: "The lotus flower flag of Macao SAR." }
    ]
  },
  india: {
    title: "INDIA", bgColor: "#B85C1A",
    basePath: `${P}/Asia/INDIA`,
    sprites: [
      { file: "BUILDING.png", title: "Taj Mahal", desc: "A monument to eternal love and one of the New Seven Wonders of the World." },
      { file: "FOOD.png", title: "Indian Cuisine", desc: "A world of curries, naan, biryani, and aromatic spices." },
      { file: "FLAG.png", title: "Flag of India", desc: "The tricolor with the Ashoka Chakra." }
    ]
  },
  indonesia: {
    title: "INDONESIA", bgColor: "#2E5A38",
    basePath: `${P}/Asia/INDONESIA`,
    sprites: [
      { file: "BUILDING.png", title: "Indonesian Architecture", desc: "From Borobudur to traditional Joglo houses across the archipelago." },
      { file: "FOOD.png", title: "Indonesian Cuisine", desc: "Nasi goreng, satay, and rendang — a paradise of flavors." },
      { file: "Flag_of_Indonesia.svg.png", title: "Flag of Indonesia", desc: "The red and white Sang Merah Putih." }
    ]
  },
  vietnam: {
    title: "VIETNAM", bgColor: "#2A5A2A",
    basePath: `${P}/Asia/VIETNAM`,
    sprites: [
      { file: "BUILDING.png", title: "Vietnamese Landmark", desc: "Ancient pagodas and French colonial architecture blend together." },
      { file: "FOOD.png", title: "Vietnamese Cuisine", desc: "Pho, banh mi, and spring rolls — fresh and full of flavor." },
      { file: "Flag_of_Vietnam.svg.png", title: "Flag of Vietnam", desc: "The golden star on red." }
    ]
  },
  cambodia: {
    title: "CAMBODIA", bgColor: "#5A3A1A",
    basePath: `${P}/Asia/CAMBODIA`,
    sprites: [
      { file: "Royal_Palace.png", title: "Royal Palace", desc: "The stunning Royal Palace complex in Phnom Penh, a masterpiece of Khmer architecture." },
      { file: "pngtreekhmerfoodcambodianlunchdietphotopngimage_16475167.png", title: "Khmer Cuisine", desc: "Traditional Cambodian dishes featuring rice, fish, and fresh herbs." },
      { file: "Flag_of_Cambodia.svg.png", title: "Flag of Cambodia", desc: "The Angkor Wat-bearing flag of the Kingdom." }
    ]
  },
  laos: {
    title: "LAOS", bgColor: "#2A4A2A",
    basePath: `${P}/Asia/LAOS`,
    sprites: [
      { file: "PAGODA.png", title: "Pha That Luang", desc: "The golden stupa — the most important national monument of Laos." },
      { file: "FOOD.png", title: "Lao Cuisine", desc: "Sticky rice, laap, and tam mak hoong — simple yet deeply flavorful." },
      { file: "FLAG.png", title: "Flag of Laos", desc: "The white circle on blue and red stripes." }
    ]
  },
  mongolia: {
    title: "MONGOLIA", bgColor: "#4A5A3A",
    basePath: `${P}/Asia/Mongolia`,
    sprites: [
      { file: "building.png", title: "Mongolian Ger", desc: "The portable felt dwelling of the nomadic Mongolian herders." },
      { file: "noodle.png", title: "Mongolian Noodles", desc: "Hearty noodle soups and dumplings for the harsh steppe winters." },
      { file: "flag.png", title: "Flag of Mongolia", desc: "The Soyombo symbol on red and blue." }
    ]
  },
  north_korea: {
    title: "NORTH KOREA", bgColor: "#2A2A3A",
    basePath: `${P}/Asia/North_Korea`,
    sprites: [
      { file: "building.png", title: "Pyongyang Architecture", desc: "Monumental socialist architecture unlike anywhere else on Earth." },
      { file: "cold_noodle.png", title: "Naengmyeon", desc: "Cold buckwheat noodles — a signature dish of Pyongyang." },
      { file: "flag.png", title: "Flag of DPRK", desc: "The red star flag of the Democratic People's Republic." }
    ]
  },

  // === EUROPE ===
  france: {
    title: "FRANCE", bgColor: "#1A2A5A",
    basePath: `${P}/Europe/France`,
    sprites: [
      { file: "eiffel_tower.png", title: "Eiffel Tower", desc: "The iron lady of Paris — the most visited paid monument in the world." },
      { file: "louvre_museum.png", title: "Louvre Museum", desc: "The world's largest art museum and home to the Mona Lisa." },
      { file: "croissant.png", title: "Croissant", desc: "The iconic buttery French pastry, a breakfast staple." }
    ]
  },
  uk: {
    title: "UNITED KINGDOM", bgColor: "#1A1A3A",
    basePath: `${P}/Europe/United_Kingdom`,
    sprites: [
      { file: "big_ben.png", title: "Big Ben", desc: "The famous clock tower at the Houses of Parliament in London." },
      { file: "afternoon_tea_tradition.png", title: "Afternoon Tea", desc: "A quintessentially British tradition since the 1840s." },
      { file: "europian_robin.png", title: "European Robin", desc: "Britain's beloved national bird with its distinctive red breast." }
    ]
  },
  germany: {
    title: "GERMANY", bgColor: "#3A3A1A",
    basePath: `${P}/Europe/Germany`,
    sprites: [
      { file: "brandenburg_gate.png", title: "Brandenburg Gate", desc: "Berlin's most famous landmark, a symbol of German reunification." },
      { file: "bratwurst.png", title: "Bratwurst", desc: "Germany's beloved grilled sausage, a street food icon." }
    ]
  },
  italy: {
    title: "ITALY", bgColor: "#3A2A1A",
    basePath: `${P}/Europe/Italy`,
    sprites: [
      { file: "colosseum.png", title: "Colosseum", desc: "The ancient Roman amphitheatre — once home to gladiator battles." },
      { file: "pizza.png", title: "Pizza", desc: "Born in Naples, now loved worldwide — the ultimate comfort food." }
    ]
  },
  spain: {
    title: "SPAIN", bgColor: "#5A1A1A",
    basePath: `${P}/Europe/Spain`,
    sprites: [
      { file: "sagrada_familia.png", title: "Sagrada Familia", desc: "Gaudí's unfinished masterpiece basilica in Barcelona." },
      { file: "flamenco.png", title: "Flamenco", desc: "A passionate art form combining guitar, song, dance, and emotion." },
      { file: "paella.png", title: "Paella", desc: "Spain's famous rice dish from Valencia, rich with saffron." },
      { file: "golden_eagle.png", title: "Golden Eagle", desc: "A majestic bird of prey soaring over the Iberian Peninsula." },
      { file: "spanish_fighting_bull.png", title: "Spanish Bull", desc: "The iconic symbol of Spain's controversial bullfighting tradition." }
    ]
  },

  // === AMERICAS ===
  canada: {
    title: "CANADA", bgColor: "#FF0000",
    basePath: `${P}/Americas/Canada`,
    sprites: [
      { file: "png-transparent-red-maple-leaf-art-leaf-autumn-transparency-and-translucency-autumn-leaf-leaf-maple-leaf-leaves-thumbnail.png", title: "Maple Leaf", desc: "The national symbol of Canada, representing its vast forests." },
      { file: "png-transparent-welcome-to-the-world-of-beavers-the-beaver-transparency-beaver-mammal-animals-carnivoran-thumbnail.png", title: "Beaver", desc: "Canada's national animal, known for its industrious dam-building." }
    ]
  },
  usa: {
    title: "UNITED STATES", bgColor: "#3C3B6E",
    basePath: `${P}/Americas/United states`,
    sprites: [
      { file: "png-transparent-statue-of-liberty-statue-of-liberty-new-york-harbor-staten-island-ferry-colossus-of-rhodes-the-new-colossus-statue-of-liberty-background-poster-stone-carving-united-states-thumbnail.png", title: "Statue of Liberty", desc: "A symbol of freedom and democracy in New York Harbor." },
      { file: "png-transparent-bald-eagle-eagle-with-transparency-free-animals-bald-eagle-fauna-thumbnail.png", title: "Bald Eagle", desc: "The national bird and animal of the United States." }
    ]
  },
  mexico: {
    title: "MEXICO", bgColor: "#006847",
    basePath: `${P}/Americas/Mexico`,
    sprites: [
      { file: "Taco.png", title: "Mexican Tacos", desc: "A world-renowned staple of Mexican cuisine." },
      { file: "Sombrero_.png", title: "Sombrero", desc: "A wide-brimmed hat that is an icon of Mexican culture." }
    ]
  },
  jamaica: {
    title: "JAMAICA", bgColor: "#009B3A",
    basePath: `${P}/Americas/Jamaica`,
    sprites: [
      { file: "Jerk chicken.png", title: "Jerk Chicken", desc: "A spicy and flavorful traditional Jamaican dish." },
      { file: "png-transparent-hummingbird-transparency-bird-animals-fauna-tail-thumbnail.png", title: "Doctor Bird", desc: "The national bird of Jamaica, a beautiful hummingbird." }
    ]
  },
  colombia: {
    title: "COLOMBIA", bgColor: "#FCD116",
    basePath: `${P}/Americas/Colombia`,
    sprites: [
      { file: "png-transparent-coffee-beans-coffee-bean-cafe-coffee-beans-food-coffee-cocoa-bean-thumbnail.png", title: "Colombian Coffee", desc: "Colombia is world-famous for its high-quality coffee beans." },
      { file: "png-transparent-duck-bird-goose-duck-animals-fauna-wildlife-thumbnail.png", title: "Tropical Bird", desc: "One of the many diverse bird species found in Colombia." }
    ]
  },
  peru: {
    title: "PERU", bgColor: "#D91023",
    basePath: `${P}/Americas/Peru`,
    sprites: [
      { file: "png-transparent-inca-trail-to-machu-picchu-sacred-valley-aguas-calientes-peru-inca-empire-machu-picchu-background-location-aguas-calientes-peru-trekking-thumbnail.png", title: "Machu Picchu", desc: "The stunning 15th-century Inca citadel set high in the Andes." }
    ]
  },
  brazil: {
    title: "BRAZIL", bgColor: "#009739",
    basePath: `${P}/Americas/Brazil`,
    sprites: [
      { file: "png-transparent-jesus-depiction-of-jesus-christianity-jesus-christ-jesus-christ-png-christian-art-robe-thumbnail.png", title: "Christ the Redeemer", desc: "The iconic statue of Jesus Christ in Rio de Janeiro." },
      { file: "png-transparent-tiger-icon-tiger-cat-tiger-mammal-animals-cat-like-mammal-thumbnail.png", title: "Jaguar", desc: "The largest cat species in the Americas, a symbol of the Amazon." },
      { file: "png-transparent-snow-leopard-felidae-leopard-mammal-image-file-formats-animals-thumbnail.png", title: "Snow Leopard", desc: "A high-altitude predator (Note: usually found in Asia, but featured in this collection)." }
    ]
  },
  chile: {
    title: "CHILE", bgColor: "#0039A6",
    basePath: `${P}/Americas/Chile`,
    sprites: [
      { file: "png-transparent-moai-statues-moai-rano-raraku-rapa-iti-orongo-siem-reap-easter-island-chile-holidays-islands-stone-thumbnail.png", title: "Moai Statues", desc: "Ancient stone monoliths on Easter Island (Rapa Nui)." },
      { file: "png-transparent-brown-hedgehog-background-lesions-in-laboratory-animals-dog-llama-pet-hedgehog-mammal-animals-desktop-wallpaper-thumbnail.png", title: "Hedgehog", desc: "A small spiny mammal (Note: featured in this collection)." }
    ]
  },
  argentina: {
    title: "ARGENTINA", bgColor: "#74ACDF",
    basePath: `${P}/Americas/Argentina`,
    sprites: [
      { file: "png-transparent-modern-dance-performing-arts-painting-country-western-dance-painting-adult-painting-performing-arts-thumbnail.png", title: "Tango", desc: "A passionate dance and music genre that originated in the Rio de la Plata." },
      { file: "png-transparent-apple-pie-treacle-tart-cuban-pastry-biscuit-cookie-biscuit-baked-goods-food-baking-thumbnail.png", title: "Argentine Pastries", desc: "Traditional sweet treats enjoyed across the country." }
    ]
  },

  // === AFRICA ===
  egypt: {
    title: "EGYPT", bgColor: "#5A4A1A",
    basePath: `${P}/Africa/Egypt`,
    sprites: [
      { file: "Egypt_Landmark.png", title: "Great Pyramids", desc: "The last surviving Wonder of the Ancient World." },
      { file: "Egyptian_Stew.png", title: "Egyptian Cuisine", desc: "A hearty, spiced stew reflecting the rich culinary heritage of the Nile." }
    ]
  },
  south_africa: {
    title: "SOUTH AFRICA", bgColor: "#2A3A2A",
    basePath: `${P}/Africa/South_Africa`,
    sprites: [
      { file: "Voortrekker_Monument.png", title: "Voortrekker Monument", desc: "A massive granite structure commemorating the pioneer history." },
      { file: "Yellow_Rice.png", title: "Cape Malay Yellow Rice", desc: "A fragrant, sweet and savoury rice dish with raisins, a staple of South African cuisine." }
    ]
  },
  nigeria: {
    title: "NIGERIA", bgColor: "#1A3A1A",
    basePath: `${P}/Africa/Nigeria`,
    sprites: [
      { file: "Nigerian_Dwarf_Goat.png", title: "Nigerian Dwarf Goat", desc: "A small domestic goat breed originating from West Africa." },
      { file: "Fried_Rice.png", title: "Nigerian Fried Rice", desc: "A popular celebratory dish of seasoned rice with vegetables and plantains." }
    ]
  },
  morocco: {
    title: "MOROCCO", bgColor: "#5A3A2A",
    basePath: `${P}/Africa/Morocco`,
    sprites: [
      { file: "Koutobia_mosque_minaret.png", title: "Koutoubia Mosque", desc: "The largest mosque in Marrakesh with its iconic minaret." },
      { file: "Tajine.png", title: "Tagine", desc: "A slow-cooked stew named after the conical clay pot it's made in." },
      { file: "Camel.png", title: "Camel", desc: "The ship of the desert, essential to Moroccan life for centuries." }
    ]
  },
  kenya: {
    title: "KENYA", bgColor: "#3A4A2A",
    basePath: `${P}/Africa/Kenya`,
    sprites: [
      { file: "Hippopotamus_.png", title: "Hippopotamus", desc: "One of Africa's most dangerous animals, found in Kenya's rivers." },
      { file: "Kenyan_Ugali.png", title: "Ugali", desc: "A staple cornmeal dish eaten across East Africa." }
    ]
  },
  ethiopia: {
    title: "ETHIOPIA", bgColor: "#4A3A2A",
    basePath: `${P}/Africa/Ethiopia`,
    sprites: [
      { file: "Rock_City_.png", title: "Rock-Hewn Churches", desc: "Lalibela's medieval churches carved directly from volcanic rock." },
      { file: "Ethiopiam_Injera_Flatbread.png", title: "Injera", desc: "A spongy sourdough flatbread — the foundation of every Ethiopian meal." }
    ]
  },

  // === OCEANIA ===
  australia: {
    title: "AUSTRALIA", bgColor: "#2A4A5A",
    basePath: `${P}/Oceania/Australia`,
    sprites: [
      { file: "sydney_opera_house.png", title: "Sydney Opera House", desc: "An architectural masterpiece and UNESCO World Heritage Site." },
      { file: "uluru_ayers_rock.png", title: "Uluru", desc: "A sacred sandstone monolith in the heart of the Australian outback." },
      { file: "koala.png", title: "Koala", desc: "An adorable marsupial that sleeps up to 22 hours a day." },
      { file: "kangaroo.png", title: "Kangaroo", desc: "Australia's iconic marsupial, found nowhere else on Earth." }
    ]
  },
  new_zealand: {
    title: "NEW ZEALAND", bgColor: "#1A4A3A",
    basePath: `${P}/Oceania/New_Zealand`,
    sprites: [
      { file: "hobbiton.png", title: "Hobbiton", desc: "The real-life movie set from The Lord of the Rings in Matamata." },
      { file: "kiwi_bird.png", title: "Kiwi Bird", desc: "A flightless nocturnal bird — New Zealand's national icon." },
      { file: "silver_fern.png", title: "Silver Fern", desc: "New Zealand's beloved national symbol, the ponga fern." }
    ]
  }
};
