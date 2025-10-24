import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput = {
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
        direccion: "Junín 1787, C1113 Cdad. Autónoma de Buenos Aires",
        fechaInicio: new Date(2025, 9, 24, 18, 30),// 24/10/2025 18:30
        fechaFin: new Date(2025, 9, 24, 20, 30)// 24/10/2025 20:30
      },
      {
        nombre: "Jazz&Funk Jam",
        descripcion: "En Plaza Vicente Lopez va a ver un Jam de musica a las 19:45 hs\nSumate!!",
        imagenes: {
          create: [
            {
              url: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrDZb3XmcJpxqFPwkM3xQ4btq8RxDs-AvmhZdToNKyWw4LOcKup8ZRlDkK86I1kZoWZhbk1rKsXdRF4m_txUmjAwBuAm0up0k9AqSnebi8bHp0oELyWGkLRuc12uC5KRXJ3wgmjdg=s680-w680-h510-rw"
            }
          ]
        },
        direccion: "Montevideo 1301, C1426 Cdad. Autónoma de Buenos Aires",
        fechaInicio: new Date(2025, 9, 24, 18, 30),// 24/10/2025 18:30
        fechaFin: new Date(2025, 9, 24, 20, 30)// 24/10/2025 20:30
      },
      {
        nombre: "Siga la Vaca, Super promo",
        descripcion: "Hoy durante todo el día, promo especial 15% de descuento en Siga la Vaca, cualquier medio de pago!!",
        direccion: "Av. Alicia Moreau de Justo 1714, C1099 Cdad. Autónoma de Buenos Aires",
        fechaInicio: new Date(2025, 9, 24, 18, 30),// 24/10/2025 18:30
        fechaFin: new Date(2025, 9, 24, 20, 30)// 24/10/2025 20:30
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
