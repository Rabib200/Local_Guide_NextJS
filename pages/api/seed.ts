import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUsers() {
  try {
    await prisma.user.createMany({
      data: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "1234567890",
          city: "New York",
          password: "password123",
        },
        {
          firstName: "Alice",
          lastName: "Smith",
          email: "alice@example.com",
          phone: "9876543210",
          city: "London",
          password: "password456",
        },
        // Add more users as needed
      ],
    });
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

seedUsers();

// // models/TourDestinationPlan.ts
// async function seedTourDestinations() {
//   try {
//     await prisma.tourDestinationPlan.createMany({
//       data: [
//         {
//           destinationName: "Paris",
//           description: "Explore the beautiful city of Paris",
//           duration: "5 days",
//           assignedTourGuide: "Alice",
//         },
//         {
//           destinationName: "Rome",
//           description: "Discover the historic city of Rome",
//           duration: "4 days",
//           assignedTourGuide: "Bob",
//         },
//         // Add more tour destinations as needed
//       ],
//     });
//   } catch (error) {
//     console.error("Error seeding tour destinations:", error);
//   }
// }

// seedTourDestinations();

// // models/TourGuide.ts
// async function seedTourGuides() {
//   try {
//     await prisma.tourGuide.createMany({
//       data: [
//         {
//           firstName: "Alice",
//           lastName: "Smith",
//           email: "alice@example.com",
//           phone: "9876543210",
//           city: "London",
//           password: "password123",
//           // Add more variables as needed
//         },
//         {
//           firstName: "Bob",
//           lastName: "Johnson",
//           email: "bob@example.com",
//           phone: "1234567890",
//           city: "New York",
//           password: "password456",
//           // Add more variables as needed
//         },
//         // Add more tour guides as needed
//       ],
//     });
//   } catch (error) {
//     console.error("Error seeding tour guides:", error);
//   }
// }

// seedTourGuides();
