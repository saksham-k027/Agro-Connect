export const indianStates = [
  { value: "andhra-pradesh", label: "Andhra Pradesh" },
  { value: "arunachal-pradesh", label: "Arunachal Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chhattisgarh", label: "Chhattisgarh" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal-pradesh", label: "Himachal Pradesh" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya-pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "odisha", label: "Odisha" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "uttar-pradesh", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "west-bengal", label: "West Bengal" },
  { value: "delhi", label: "Delhi" },
  { value: "jammu-kashmir", label: "Jammu & Kashmir" },
  { value: "ladakh", label: "Ladakh" },
  { value: "puducherry", label: "Puducherry" },
];

export const stateCities: Record<string, string[]> = {
  "uttar-pradesh": [
    "Agra", "Aligarh", "Allahabad", "Bareilly", "Firozabad", "Ghaziabad", 
    "Gorakhpur", "Jhansi", "Kanpur", "Lucknow", "Mathura", "Meerut", 
    "Moradabad", "Muzaffarnagar", "Noida", "Saharanpur", "Varanasi"
  ],
  "maharashtra": [
    "Aurangabad", "Mumbai", "Nagpur", "Nashik", "Pune", "Solapur", 
    "Thane", "Vasai-Virar", "Kolhapur", "Sangli", "Malegaon", "Akola"
  ],
  "delhi": [
    "Central Delhi", "East Delhi", "New Delhi", "North Delhi", 
    "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", 
    "South East Delhi", "South West Delhi", "West Delhi"
  ],
  "gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", 
    "Junagadh", "Gandhinagar", "Anand", "Bharuch", "Mehsana", "Morbi"
  ],
  "karnataka": [
    "Bangalore", "Hubli-Dharwad", "Mysore", "Gulbarga", "Mangalore", 
    "Belgaum", "Davanagere", "Bellary", "Bijapur", "Shimoga", "Tumkur"
  ],
  "tamil-nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", 
    "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukkudi", "Dindigul"
  ],
  "west-bengal": [
    "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", 
    "Bardhaman", "Baharampur", "Habra", "Kharagpur", "Shantipur"
  ],
  "rajasthan": [
    "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", 
    "Bhilwara", "Alwar", "Bharatpur", "Pali", "Barmer", "Sikar"
  ],
  "punjab": [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", 
    "Mohali", "Firozpur", "Batala", "Pathankot", "Moga", "Abohar"
  ],
  "haryana": [
    "Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", 
    "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani"
  ],
  "bihar": [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", 
    "Bihar Sharif", "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra"
  ]
};

export const getCitiesForState = (stateValue: string): string[] => {
  return stateCities[stateValue] || [];
};