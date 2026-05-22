export interface Car {
  id: number;
  name: string;
  type: string;
  price: number;
  rating: number;
  trips: number;
  reviews: number;
  year: number;
  seats: number;
  agencyId: number;
  wilaya: string;
  img: string;
  tags: string[];
  wedding: boolean;
  badge: string;
  brand?: string;
}

export const CARS: Car[] = [
  { id: 1,  name: "Mercedes S-Class",        type: "luxury",  price: 15000, rating: 4.95, trips: 128, reviews: 94,  year: 2023, seats: 5,  agencyId: 1, wilaya: "16", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80", tags: ["instant","verified"],             wedding: false, badge: "فاخرة" },
  { id: 2,  name: "BMW 5 Series",            type: "luxury",  price: 12000, rating: 4.9,  trips: 87,  reviews: 72,  year: 2022, seats: 5,  agencyId: 2, wilaya: "31", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80", tags: ["verified"],                        wedding: false, badge: "فاخرة" },
  { id: 3,  name: "Toyota RAV4",             type: "suv",     price: 7000,  rating: 4.85, trips: 203, reviews: 181, year: 2023, seats: 7,  agencyId: 1, wilaya: "16", img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80", tags: ["instant","freeCancel","verified"], wedding: false, badge: "SUV" },
  { id: 4,  name: "Tesla Model 3",           type: "electric",price: 9000,  rating: 4.95, trips: 65,  reviews: 58,  year: 2024, seats: 5,  agencyId: 3, wilaya: "25", img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80", tags: ["instant","freeCancel"],           wedding: false, badge: "كهربائية" },
  { id: 5,  name: "Rolls-Royce Phantom",     type: "wedding", price: 80000, rating: 5.0,  trips: 42,  reviews: 42,  year: 2023, seats: 5,  agencyId: 6, wilaya: "15", img: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=600&q=80", tags: ["instant","verified"],             wedding: true,  badge: "زفاف" },
  { id: 6,  name: "Bentley Continental GT",  type: "wedding", price: 65000, rating: 4.98, trips: 38,  reviews: 37,  year: 2022, seats: 4,  agencyId: 6, wilaya: "15", img: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&q=80", tags: ["verified"],                        wedding: true,  badge: "زفاف" },
  { id: 7,  name: "Range Rover Vogue",       type: "wedding", price: 45000, rating: 4.9,  trips: 55,  reviews: 51,  year: 2023, seats: 5,  agencyId: 2, wilaya: "31", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80", tags: ["instant","freeCancel","verified"], wedding: true,  badge: "زفاف" },
  { id: 8,  name: "Volkswagen Golf",         type: "sedan",   price: 4500,  rating: 4.8,  trips: 175, reviews: 160, year: 2023, seats: 5,  agencyId: 4, wilaya: "23", img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80", tags: ["instant"],                         wedding: false, badge: "سيدان" },
  { id: 9,  name: "Dacia Duster",            type: "suv",     price: 3500,  rating: 4.75, trips: 310, reviews: 278, year: 2022, seats: 5,  agencyId: 5, wilaya: "19", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", tags: ["freeCancel"],                      wedding: false, badge: "SUV" },
  { id: 10, name: "Mercedes Classe E Cabrio",type: "wedding", price: 55000, rating: 4.92, trips: 29,  reviews: 28,  year: 2023, seats: 4,  agencyId: 1, wilaya: "16", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80", tags: ["instant","verified"],             wedding: true,  badge: "زفاف" },
  { id: 11, name: "Ford Transit Van",        type: "van",     price: 8000,  rating: 4.7,  trips: 145, reviews: 130, year: 2022, seats: 9,  agencyId: 1, wilaya: "16", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80", tags: ["instant","verified"],             wedding: false, badge: "فان" },
  { id: 12, name: "Mercedes Sprinter",       type: "van",     price: 11000, rating: 4.8,  trips: 98,  reviews: 90,  year: 2023, seats: 15, agencyId: 2, wilaya: "31", img: "https://images.unsplash.com/photo-1532634993-15f421e42ec0?w=600&q=80", tags: ["verified","freeCancel"],          wedding: false, badge: "فان" },
  { id: 13, name: "Renault Master Van",      type: "van",     price: 7500,  rating: 4.65, trips: 112, reviews: 100, year: 2022, seats: 9,  agencyId: 3, wilaya: "25", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80", tags: ["instant"],                         wedding: false, badge: "فان" },
  { id: 14, name: "Toyota HiAce",            type: "van",     price: 9500,  rating: 4.85, trips: 88,  reviews: 82,  year: 2023, seats: 12, agencyId: 5, wilaya: "19", img: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&q=80", tags: ["instant","verified"],             wedding: false, badge: "فان" },
  { id: 15, name: "Audi A6",                 type: "luxury",  price: 13500, rating: 4.88, trips: 72,  reviews: 65,  year: 2023, seats: 5,  agencyId: 3, wilaya: "25", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80", tags: ["instant","verified"],             wedding: false, badge: "فاخرة", brand: "Audi" },
  { id: 16, name: "Porsche Cayenne",         type: "suv",     price: 18000, rating: 4.92, trips: 45,  reviews: 40,  year: 2023, seats: 5,  agencyId: 1, wilaya: "16", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80", tags: ["instant","freeCancel","verified"], wedding: false, badge: "SUV",   brand: "Porsche" },
  { id: 17, name: "Hyundai Tucson",          type: "suv",     price: 5500,  rating: 4.7,  trips: 188, reviews: 170, year: 2022, seats: 5,  agencyId: 4, wilaya: "23", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80", tags: ["freeCancel"],                      wedding: false, badge: "SUV",   brand: "Hyundai" },
  { id: 18, name: "Renault Clio",            type: "sedan",   price: 2800,  rating: 4.6,  trips: 290, reviews: 260, year: 2022, seats: 5,  agencyId: 5, wilaya: "19", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80", tags: ["instant"],                         wedding: false, badge: "سيدان", brand: "Renault" },
  { id: 19, name: "Kia Sportage",            type: "suv",     price: 6000,  rating: 4.78, trips: 155, reviews: 140, year: 2023, seats: 5,  agencyId: 2, wilaya: "31", img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80", tags: ["instant","freeCancel"],           wedding: false, badge: "SUV",   brand: "Kia" },
  { id: 20, name: "Tesla Model Y",           type: "electric",price: 11000, rating: 4.97, trips: 38,  reviews: 35,  year: 2024, seats: 7,  agencyId: 3, wilaya: "25", img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80", tags: ["instant","verified"],             wedding: false, badge: "كهربائية", brand: "Tesla" },
  { id: 21, name: "Peugeot 308",            type: "sedan",   price: 3800,  rating: 4.65, trips: 210, reviews: 195, year: 2022, seats: 5,  agencyId: 6, wilaya: "15", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", tags: ["freeCancel"],                      wedding: false, badge: "سيدان", brand: "Peugeot" },
  { id: 22, name: "Lamborghini Urus",        type: "luxury",  price: 50000, rating: 5.0,  trips: 15,  reviews: 15,  year: 2023, seats: 4,  agencyId: 1, wilaya: "16", img: "https://images.unsplash.com/photo-1573950940509-d924ee3fd345?w=600&q=80", tags: ["instant","verified"],             wedding: false, badge: "فاخرة", brand: "Lamborghini" },
  { id: 23, name: "Chevrolet Tahoe",         type: "suv",     price: 14000, rating: 4.8,  trips: 62,  reviews: 58,  year: 2023, seats: 8,  agencyId: 2, wilaya: "31", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80", tags: ["instant","freeCancel","verified"], wedding: false, badge: "SUV",   brand: "Chevrolet" },
  { id: 24, name: "Nissan Patrol",           type: "4x4",     price: 13000, rating: 4.82, trips: 78,  reviews: 70,  year: 2023, seats: 8,  agencyId: 3, wilaya: "25", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", tags: ["instant","verified"],             wedding: false, badge: "4×4",   brand: "Nissan" },
  { id: 25, name: "Land Rover Defender",     type: "4x4",     price: 16000, rating: 4.88, trips: 52,  reviews: 48,  year: 2023, seats: 5,  agencyId: 1, wilaya: "16", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80", tags: ["instant","freeCancel","verified"], wedding: false, badge: "4×4",   brand: "Land Rover" },
  { id: 26, name: "Toyota Land Cruiser",     type: "4x4",     price: 14500, rating: 4.85, trips: 95,  reviews: 88,  year: 2022, seats: 7,  agencyId: 2, wilaya: "31", img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80", tags: ["verified"],                        wedding: false, badge: "4×4",   brand: "Toyota" },
  { id: 27, name: "Jeep Wrangler",           type: "4x4",     price: 11500, rating: 4.78, trips: 67,  reviews: 61,  year: 2022, seats: 5,  agencyId: 4, wilaya: "23", img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80", tags: ["instant"],                         wedding: false, badge: "4×4",   brand: "Jeep" },
  { id: 28, name: "Mitsubishi Pajero",       type: "4x4",     price: 9500,  rating: 4.7,  trips: 112, reviews: 100, year: 2022, seats: 7,  agencyId: 5, wilaya: "19", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80", tags: ["freeCancel"],                      wedding: false, badge: "4×4",   brand: "Mitsubishi" },
];

export const BRANDS: string[] = [
  "الكل", "Mercedes", "BMW", "Toyota", "Tesla", "Rolls-Royce", "Bentley",
  "Range Rover", "Volkswagen", "Dacia", "Ford", "Renault", "Audi", "Porsche",
  "Hyundai", "Kia", "Peugeot", "Lamborghini", "Chevrolet", "Nissan", "Jeep", "Mitsubishi",
];
