import { PrismaClient, Prisma } from '@prisma/client'
import { create } from 'domain'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput = {
  email: "juan@gmail.com",
  nombre: "Juan",
  contrasenia_hash: "6a658017bee9ef325fab3047e5ab56a651667e55c12ad41a8d08b43ffe6eb0d8",
  numeroAvatar: 1,
  sal: "97476522bb1a131e07b02c632656d0e5",
  mis_eventos: {
    create: [
      {
        titulo: "Afrika",
        descripcion: "Hoy, noche del mes en Afrika Club, no te la pierdas\nJunin 1787, a partir de las 22:30",
        imagenes: {
          create: [
            {
              url: "https://lh3.googleusercontent.com/p/AF1QipOvl8JNluUE7VeTDIs_od4sW2ZY6C330W-KHBwy=s680-w680-h510-rw"
            },
            {
              url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIrBzEjcRmsmKPBCT7ExlJPhMygH_SCL--7A&s"
            }
          ]
        },
        fechaInicio: new Date("2025-11-01T22:30:00"),
        fechaFin: new Date("2025-11-02T02:00:00"),
        ubicacion: {
          create: {
            latitud: -34.588607,
            longitud: -58.39212360000001,
            direccion: "Junín 1787, Buenos Aires"
          }
        }
      },
      {
        titulo: "Jazz&Funk Jam",
        descripcion: "En Plaza Vicente Lopez va a ver un Jam de musica a las 19:45 hs\nSumate!!",
        imagenes: {
          create: [
            {
              url: "/uploads/Buenos_Aires_Plaza_Vicente_Lopez.jpg"
            }
          ]
        },
        fechaInicio: new Date("2025-11-02T19:45:00"),
        fechaFin: new Date("2025-11-02T23:00:00"),
        ubicacion: {
          create: {
            latitud: -34.59293554411339,
            longitud: -58.38951632380486,
            direccion: "Plaza Vicente López, Buenos Aires"
          }
        }
      },
      {
        titulo: "Siga la Vaca, Super promo",
        descripcion: "Hoy durante todo el día, promo especial 15% de descuento en Siga la Vaca, cualquier medio de pago!!",
        fechaInicio: new Date("2025-11-03T10:00:00"),
        fechaFin: new Date("2025-11-03T22:00:00"),
        ubicacion: {
          create: {
            latitud: -34.6186791,
            longitud: -58.3651279,
            direccion: "Av. Cabildo 500, Buenos Aires"
          }
        }
      }
    ]
  },
}

async function main() {
  console.log(`Start seeding ...`)
  // for (const u of userData) {
  const user = await prisma.user.create({
    data: userData,
  })
  console.log(`Created user with id: ${user.id}`)
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
