import { PrismaClient, Prisma } from '@prisma/client'
import { create } from 'domain'

const prisma = new PrismaClient()

const user: Prisma.UserCreateInput = {
  email: "juan@gmail.com",
  nombre: "Juan",
  contrasenia: "Asd123123",
  mis_eventos: {
    create: [
      {
        nombre: "Afrika",
        descripcion: "Hoy, noche del mes en Afrika Club, no te la pierdas\nJunin 1787, a partir de las 22:30",
        imagenes: {
          create: [
            {

              url: "https://lh3.googleusercontent.com/p/AF1QipOvl8JNluUE7VeTDIs_od4sW2ZY6C330W-KHBwy=s680-w680-h510-rw" 
            },
            { 
              url: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noydtcHzXNvnQ0dJ33yWeUPA2N5bUXKWj_gnZb5vYLNMmB-XUxaWrvFzLUt6LTYDdQW2-tmsrL9w79QZOnURvDLHxRiDb2pNPYb9M63K14lK1_A_gZ968FbTwTcu4or_UAd1lMl=s680-w680-h510-rw"
            }
          ]
        },
        direccion: "calle 13",
        fechaInicio: "10/10/2020",
        fechaFin: "10/10/2020"
      },
    ]
  },
  favs: { create: [] }
}

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: 'Alice',
//     email: 'alice@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Join the Prisma Discord',
//           content: 'https://pris.ly/discord',
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: 'Nilu',
//     email: 'nilu@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Follow Prisma on Twitter',
//           content: 'https://www.twitter.com/prisma',
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: 'Mahmoud',
//     email: 'mahmoud@prisma.io',
//     posts: {
//       create: [
//         {
//           title: 'Ask a question about Prisma on GitHub',
//           content: 'https://www.github.com/prisma/prisma/discussions',
//           published: true,
//         },
//         {
//           title: 'Prisma on YouTube',
//           content: 'https://pris.ly/youtube',
//         },
//       ],
//     },
//   },
// ]

async function main() {
  console.log(`Start seeding ...`)
  // for (const u of userData) {
  //   const user = await prisma.user.create({
  //     data: u,
  //   })
  //   console.log(`Created user with id: ${user.id}`)
  // }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
