
// server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Room = require('./models/Room');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const roomData = [
  {
    title: 'Cozy Single Room',
    description: 'A comfortable room perfect for solo travelers.',
    price: 2500,
    image: 'https://media.istockphoto.com/id/173587041/photo/hotel-bedroom.jpg?s=612x612&w=0&k=20&c=mzbT-i0sbivf2hK4aAJi0mdYVTUca8o5vij0bJq97Ks=',
    roomType: 'Single',
    beds: 1,
    guests: 1,
    amenities: ['WiFi', 'AC', 'Breakfast'],
  },
  {
    title: 'Spacious Double Room',
    description: 'Ideal for couples or friends, with a double bed and a great view.',
    price: 4500,
    image: 'https://media.istockphoto.com/id/1444437242/photo/side-view-of-elegant-bedroom-interior-with-double-bed-television-set-night-table-and-seaview.jpg?s=612x612&w=0&k=20&c=rvg5KUXPKIMY4I1g0by2Rpr0Cj4sCo-228M5LU-OPmE=',
    roomType: 'Double',
    beds: 1,
    guests: 2,
    amenities: ['WiFi', 'AC', 'Breakfast', 'TV'],
  },
  {
    title: 'Luxury Suite',
    description: 'Our top-tier room with a separate living area and a spacious bathroom.',
    price: 8000,
    image: 'https://media.istockphoto.com/id/2177329299/photo/stylish-bedroom-interior-with-large-bed-mirror-and-lamp.jpg?s=2048x2048&w=is&k=20&c=obkvk4aP0ImmzQBQtBjmMeuuWsB7MYXmTpTPTOvrFFs=',
    roomType: 'Suite',
    beds: 2,
    guests: 4,
    amenities: ['WiFi', 'AC', 'Breakfast', 'TV', 'Mini-Bar', 'Jacuzzi'],
  },
  {
    title: 'Family Suite',
    description: 'Perfect for families, with two large beds and an extra sofa.',
    price: 6500,
    image: 'https://media.istockphoto.com/id/2155429903/photo/modern-bright-bed-room-interiors-3d-rendering-illustration-computer-generated-image.jpg?s=612x612&w=0&k=20&c=RnkjOu0oTi8V02V2P3fHUeV0NbEoHnA9RJVe3qjh8RY=',
    roomType: 'Suite',
    beds: 2,
    guests: 5,
    amenities: ['WiFi', 'AC', 'TV', 'Coffee Maker'],
  },
  {
    title: 'Standard Double Room',
    description: 'A no-frills room with all the basics for a comfortable stay.',
    price: 3800,
    image: 'https://media.istockphoto.com/id/1082390010/photo/chinese-living-room-interior.jpg?s=612x612&w=0&k=20&c=PfD7z5D6iGrOU2YWalNp1hw_FgX5e6mwMkigTXQAqd0=',
    roomType: 'Double',
    beds: 1,
    guests: 2,
    amenities: ['WiFi', 'AC'],
  },
  {
    title: 'Single with City View',
    description: 'A cozy single room with a stunning view of the city.',
    price: 3000,
    image: 'https://media.istockphoto.com/id/493527752/photo/young-man-looking-out-at-city-skyline.jpg?s=2048x2048&w=is&k=20&c=1OR-T1U_RPApJHgU-8b1dne8NuYc0BthdQWsdC6k4Yw=',
    roomType: 'Single',
    beds: 1,
    guests: 1,
    amenities: ['WiFi', 'AC'],
  },
  {
    title: 'Executive Suite',
    description: 'Designed for business travelers, includes a dedicated workspace.',
    price: 9500,
    image: 'https://media.istockphoto.com/id/2149664000/photo/hotel-room-with-a-view.jpg?s=612x612&w=0&k=20&c=MjJTQ7J5PAcOfDCyU_ODnSp0fyzyIATP3ZYbaKZzZCQ=',
    roomType: 'Suite',
    beds: 1,
    guests: 2,
    amenities: ['WiFi', 'AC', 'Breakfast', 'TV', 'Desk'],
  },
  // --- New Rooms Added Below ---
  {
    title: 'Deluxe Corner Room',
    description: 'A spacious corner room with floor-to-ceiling windows and panoramic views.',
    price: 7000,
    image: 'https://media.istockphoto.com/id/1815808691/photo/luxury-bedroom-suite-in-resort-high-rise-hotel-with-cushion.jpg?s=612x612&w=0&k=20&c=wmYZMUx0cvzGCDg9Di3HT-6NMDvPVhycuAxrQzFfKiM=',
    roomType: 'Double',
    beds: 1,
    guests: 2,
    amenities: ['WiFi', 'AC', 'Mini-Bar', 'City View'],
  },
  {
    title: 'Twin Beds Room',
    description: 'Two separate beds for friends or family members traveling together.',
    price: 4200,
    image: 'https://media.istockphoto.com/id/2157081712/photo/luxury-studio-apartment-with-a-free-layout-in-a-loft-style-in-white-scheme-bedroom-interior.jpg?s=612x612&w=0&k=20&c=0lh9HZ32GjgTdfzLLow4NUhrF8W39cmIokgt3OxvlQc=',
    roomType: 'Double',
    beds: 2,
    guests: 2,
    amenities: ['WiFi', 'AC', 'Breakfast'],
  },
  {
    title: 'Premier King Suite',
    description: 'An elegant suite with a king-sized bed and lounge area.',
    price: 10500,
    image: 'https://media.istockphoto.com/id/2021707621/photo/night-scene-modern-style-luxury-black-master-bedroom-with-city-view-3d-render.jpg?s=612x612&w=0&k=20&c=D4_n5-lvzP9HiC-MXI8f5qYM9R7CH6EbF2Xyq9V8b_o=',
    roomType: 'Suite',
    beds: 1,
    guests: 2,
    amenities: ['WiFi', 'AC', 'Breakfast', 'Mini-Bar', 'Jacuzzi'],
  },
  {
    title: 'Accessible Room',
    description: 'Designed for accessibility with extra space and modified facilities.',
    price: 3500,
    image: 'https://media.istockphoto.com/id/1385185506/photo/side-view-of-luxury-hotel-room-with-two-beds-chair-and-potted-plant.jpg?s=612x612&w=0&k=20&c=sO6nXqY-aFsST-dLFLiP3fzlsDOU-R1hQ-PetQ-_kKI=',
    roomType: 'Single',
    beds: 1,
    guests: 1,
    amenities: ['WiFi', 'AC', 'Accessible Bathroom'],
  },
  {
    title: 'Budget Single Room',
    description: 'A compact room with all the basic needs for a short stay.',
    price: 2000,
    image: 'https://media.istockphoto.com/id/1677784097/photo/modern-hotel-apartment-with-bathroom.jpg?s=612x612&w=0&k=20&c=m0F_aYhVCFBD2vBndhAocZYomknURxZUU6dZqXWYEQE=',
    roomType: 'Single',
    beds: 1,
    guests: 1,
    amenities: ['WiFi'],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding.');
    
    // Clear existing data
    await Room.deleteMany({});
    await User.deleteMany({});
    console.log('Existing data deleted.');

    // Add a new admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
        username: 'admin',
        email: 'admin@stayhotel.com',
        password: hashedPassword,
        role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created.');

    // Insert room data
    await Room.insertMany(roomData);
    console.log('Database seeded successfully with 12 rooms! 🏨');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();