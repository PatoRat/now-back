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
        titulo: "Evento 1 - Roxy Live",
        descripcion: "Disfrutá de una noche increíble en Roxy Live, no te lo pierdas Av.Rivadavia 772, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/195/680/510"
            },
            {
              "url": "https://picsum.photos/seed/144/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-08T22:30:00"),
        fechaFin: new Date("2026-04-09T03:18:00"),
        ubicacion: {
          "create": {
            "latitud": -34.506303,
            "longitud": -58.483328,
            "direccion": "Av. Rivadavia 772"
          }
        }
      },
      {
        titulo: "Evento 2 - Espacio Cultural Konex",
        descripcion: "Disfrutá de una noche increíble en Espacio Cultural Konex, no te lo pierdas Sarmiento 3131, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/167/680/510"
            },
            {
              "url": "https://picsum.photos/seed/127/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-03-25T20:15:00"),
        fechaFin: new Date("2026-03-25T23:10:00"),
        ubicacion: {
          "create": {
            "latitud": -34.543832,
            "longitud": -58.47591,
            "direccion": "Sarmiento 3131"
          }
        }
      },
      {
        titulo: "Evento 3 - Roxy Live",
        descripcion: "Disfrutá de una noche increíble en Roxy Live, no te lo pierdas   Av.Rivadavia 772, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/146/680/510"
            },
            {
              "url": "https://picsum.photos/seed/131/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-03-04T22:15:00"),
        fechaFin: new Date("2026-03-05T00:21:00"),
        ubicacion: {
          "create": {
            "latitud": -34.580316,
            "longitud": -58.469957,
            "direccion": "Av. Rivadavia 772"
          }
        }
      },
      {
        titulo: "Evento 4 - Afrika Club",
        descripcion: "Disfrutá de una noche increíble en Afrika Club, no te lo pierdas Junín 1787, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/114/680/510"
            },
            {
              "url": "https://picsum.photos/seed/163/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-14T23:15:00"),
        fechaFin: new Date("2026-04-15T04:40:00"),
        ubicacion: {
          "create": {
            "latitud": -34.559016,
            "longitud": -58.498134,
            "direccion": "Jun\u00edn 1787"
          }
        }
      },
      {
        titulo: "Evento 5 - Bares de San Telmo",
        descripcion: "Disfrutá de una noche increíble en Bares de San Telmo, no te lo pierdas Defensa 600, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/103/680/510"
            },
            {
              "url": "https://picsum.photos/seed/198/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-22T22:15:00"),
        fechaFin: new Date("2026-04-23T02:48:00"),
        ubicacion: {
          "create": {
            "latitud": -34.54364,
            "longitud": -58.497508,
            "direccion": "Defensa 600"
          }
        }
      },
      {
        titulo: "Evento 6 - Niceto Club",
        descripcion: "Disfrutá de una noche increíble en Niceto Club, no te lo pierdas Niceto Vega 5510, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/116/680/510"
            },
            {
              "url": "https://picsum.photos/seed/113/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-03-21T20:00:00"),
        fechaFin: new Date("2026-03-21T23:00:00"),
        ubicacion: {
          "create": {
            "latitud": -34.578835,
            "longitud": -58.456649,
            "direccion": "Niceto Vega 5510"
          }
        }
      },
      {
        titulo: "Evento 7 - Bares de San Telmo",
        descripcion: "Disfrutá de una noche increíble en Bares de San Telmo, no te lo pierdas Defensa 600, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/134/680/510"
            },
            {
              "url": "https://picsum.photos/seed/196/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-15T20:15:00"),
        fechaFin: new Date("2026-04-15T22:51:00"),
        ubicacion: {
          "create": {
            "latitud": -34.54465,
            "longitud": -58.451766,
            "direccion": "Defensa 600"
          }
        }
      },
      {
        titulo: "Evento 8 - Ciudad Cultural Konex",
        descripcion: "Disfrutá de una noche increíble en Ciudad Cultural Konex, no te lo pierdas Sarmiento 3131, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/143/680/510"
            },
            {
              "url": "https://picsum.photos/seed/193/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-20T23:30:00"),
        fechaFin: new Date("2026-04-21T02:38:00"),
        ubicacion: {
          "create": {
            "latitud": -34.564048,
            "longitud": -58.456519,
            "direccion": "Sarmiento 3131"
          }
        }
      },
      {
        titulo: "Evento 9 - Bares de San Telmo",
        descripcion: "Disfrutá de una noche increíble en Bares de San Telmo, no te lo pierdas Defensa 600, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/181/680/510"
            },
            {
              "url": "https://picsum.photos/seed/160/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-12T21:00:00"),
        fechaFin: new Date("2026-04-13T02:15:00"),
        ubicacion: {
          "create": {
            "latitud": -34.514352,
            "longitud": -58.444123,
            "direccion": "Defensa 600"
          }
        }
      },
      {
        titulo: "Evento 10 - Planetario Galileo Galilei",
        descripcion: "Disfrutá de una noche increíble en Planetario Galileo Galilei, no te lo pierdas   Av.Sarmiento 1750, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/196/680/510"
            },
            {
              "url": "https://picsum.photos/seed/152/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-03T20:30:00"),
        fechaFin: new Date("2026-04-04T01:03:00"),
        ubicacion: {
          "create": {
            "latitud": -34.527806,
            "longitud": -58.427455,
            "direccion": "Av. Sarmiento 1750"
          }
        }
      },
      {
        titulo: "Evento 11 - Niceto Club",
        descripcion: "Disfrutá de una noche increíble en Niceto Club, no te lo pierdas Niceto Vega 5510, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/131/680/510"
            },
            {
              "url": "https://picsum.photos/seed/104/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-03-28T22:30:00"),
        fechaFin: new Date("2026-03-29T02:23:00"),
        ubicacion: {
          "create": {
            "latitud": -34.534187,
            "longitud": -58.408253,
            "direccion": "Niceto Vega 5510"
          }
        }
      },
      {
        titulo: "Evento 12 - La Bomba de Tiempo",
        descripcion: "Disfrutá de una noche increíble en La Bomba de Tiempo, no te lo pierdas Lima 1263, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/111/680/510"
            },
            {
              "url": "https://picsum.photos/seed/102/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-03-21T21:45:00"),
        fechaFin: new Date("2026-03-22T01:11:00"),
        ubicacion: {
          "create": {
            "latitud": -34.586574,
            "longitud": -58.416496,
            "direccion": "Lima 1263"
          }
        }
      },
      {
        titulo: "Evento 13 - La Bomba de Tiempo",
        descripcion: "Disfrutá de una noche increíble en La Bomba de Tiempo, no te lo pierdas Lima 1263, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/122/680/510"
            },
            {
              "url": "https://picsum.photos/seed/166/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-03T23:00:00"),
        fechaFin: new Date("2026-04-04T03:42:00"),
        ubicacion: {
          "create": {
            "latitud": -34.59985,
            "longitud": -58.435985,
            "direccion": "Lima 1263"
          }
        }
      },
      {
        titulo: "Evento 14 - Parque Centenario",
        descripcion: "Disfrutá de una noche increíble en Parque Centenario, no te lo pierdas   Av.Ángel Gallardo 520, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/159/680/510"
            },
            {
              "url": "https://picsum.photos/seed/122/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-17T23:45:00"),
        fechaFin: new Date("2026-04-18T03:02:00"),
        ubicacion: {
          "create": {
            "latitud": -34.581761,
            "longitud": -58.452021,
            "direccion": "Av. \u00c1ngel Gallardo 520"
          }
        }
      },
      {
        titulo: "Evento 15 - Café Tortoni",
        descripcion: "Disfrutá de una noche increíble en Café Tortoni, no te lo pierdas   Av.de Mayo 825, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/189/680/510"
            },
            {
              "url": "https://picsum.photos/seed/178/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-03T22:00:00"),
        fechaFin: new Date("2026-04-04T01:04:00"),
        ubicacion: {
          "create": {
            "latitud": -34.525259,
            "longitud": -58.42534,
            "direccion": "Av. de Mayo 825"
          }
        }
      },

    ]
  }
};
const userData2: Prisma.UserCreateInput = {
  email: "maria@gmail.com",
  nombre: "Maria",
  contrasenia_hash: "8f14e45fceea167a5a36dedd4bea2543b9a1e1e6b9f8d1f1a1b1c1d1e1f1a1b2",
  numeroAvatar: 3,
  sal: "a3f5c7e9b1d2468f9c0e1a2b3c4d5e6f",
  mis_eventos: {
    create: [
      {
        titulo: "Evento 16 - Parque Centenario",
        descripcion: "Disfrutá de una noche increíble en Parque Centenario, no te lo pierdas   Av.Ángel Gallardo 520, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/119/680/510"
            },
            {
              "url": "https://picsum.photos/seed/194/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-23T21:00:00"),
        fechaFin: new Date("2026-04-24T02:37:00"),
        ubicacion: {
          "create": {
            "latitud": -34.529198,
            "longitud": -58.464693,
            "direccion": "Av. \u00c1ngel Gallardo 520"
          }
        }
      },
      {
        titulo: "Evento 17 - Planetario Galileo Galilei",
        descripcion: "Disfrutá de una noche increíble en Planetario Galileo Galilei, no te lo pierdas   Av.Sarmiento 1750, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/144/680/510"
            },
            {
              "url": "https://picsum.photos/seed/187/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-03-27T23:30:00"),
        fechaFin: new Date("2026-03-28T01:37:00"),
        ubicacion: {
          "create": {
            "latitud": -34.564193,
            "longitud": -58.490189,
            "direccion": "Av. Sarmiento 1750"
          }
        }
      },
      {
        titulo: "Evento 18 - Parque Centenario",
        descripcion: "Disfrutá de una noche increíble en Parque Centenario, no te lo pierdas   Av.Ángel Gallardo 520, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/158/680/510"
            },
            {
              "url": "https://picsum.photos/seed/164/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-15T23:45:00"),
        fechaFin: new Date("2026-04-16T04:55:00"),
        ubicacion: {
          "create": {
            "latitud": -34.5475,
            "longitud": -58.48303,
            "direccion": "Av. \u00c1ngel Gallardo 520"
          }
        }
      },
      {
        titulo: "Evento 19 - Malba",
        descripcion: "Disfrutá de una noche increíble en Malba, no te lo pierdas   Av.Pres.Figueroa Alcorta 3415, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/179/680/510"
            },
            {
              "url": "https://picsum.photos/seed/126/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-03-27T23:30:00"),
        fechaFin: new Date("2026-03-28T04:05:00"),
        ubicacion: {
          "create": {
            "latitud": -34.564942,
            "longitud": -58.422383,
            "direccion": "Av. Pres. Figueroa Alcorta 3415"
          }
        }
      },
      {
        titulo: "Evento 20 - La Bomba de Tiempo",
        descripcion: "Disfrutá de una noche increíble en La Bomba de Tiempo, no te lo pierdas Lima 1263, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/176/680/510"
            },
            {
              "url": "https://picsum.photos/seed/168/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-03-17T21:30:00"),
        fechaFin: new Date("2026-03-18T03:28:00"),
        ubicacion: {
          "create": {
            "latitud": -34.545387,
            "longitud": -58.477429,
            "direccion": "Lima 1263"
          }
        }
      },
      {
        titulo: "Evento 21 - Palermo Soho",
        descripcion: "Disfrutá de una noche increíble en Palermo Soho, no te lo pierdas Honduras 5000, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/184/680/510"
            },
            {
              "url": "https://picsum.photos/seed/127/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-03-07T23:45:00"),
        fechaFin: new Date("2026-03-08T02:59:00"),
        ubicacion: {
          "create": {
            "latitud": -34.537174,
            "longitud": -58.408422,
            "direccion": "Honduras 5000"
          }
        }
      },
      {
        titulo: "Evento 22 - Bares de San Telmo",
        descripcion: "Disfrutá de una noche increíble en Bares de San Telmo, no te lo pierdas Defensa 600, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/115/680/510"
            },
            {
              "url": "https://picsum.photos/seed/139/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-03-29T22:45:00"),
        fechaFin: new Date("2026-03-30T02:14:00"),
        ubicacion: {
          "create": {
            "latitud": -34.52024,
            "longitud": -58.489,
            "direccion": "Defensa 600"
          }
        }
      },
      {
        titulo: "Evento 23 - Parque Centenario",
        descripcion: "Disfrutá de una noche increíble en Parque Centenario, no te lo pierdas  Av.Ángel Gallardo 520, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/168/680/510"
            },
            {
              "url": "https://picsum.photos/seed/157/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-22T22:15:00"),
        fechaFin: new Date("2026-04-23T02:59:00"),
        ubicacion: {
          "create": {
            "latitud": -34.508514,
            "longitud": -58.4268,
            "direccion": "Av. \u00c1ngel Gallardo 520"
          }
        }
      },
      {
        titulo: "Evento 24 - Teatro Colón",
        descripcion: "Disfrutá de una noche increíble en Teatro Colón, no te lo pierdas Cerrito 628, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/107/680/510"
            },
            {
              "url": "https://picsum.photos/seed/105/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-13T21:45:00"),
        fechaFin: new Date("2026-04-14T03:14:00"),
        ubicacion: {
          "create": {
            "latitud": -34.504499,
            "longitud": -58.418025,
            "direccion": "Cerrito 628"
          }
        }
      },
      {
        titulo: "Evento 25 - Afrika Club",
        descripcion: "Disfrutá de una noche increíble en Afrika Club, no te lo pierdas Junín 1787, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/101/680/510"
            },
            {
              "url": "https://picsum.photos/seed/163/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-09T21:30:00"),
        fechaFin: new Date("2026-04-10T02:57:00"),
        ubicacion: {
          "create": {
            "latitud": -34.563456,
            "longitud": -58.488351,
            "direccion": "Jun\u00edn 1787"
          }
        }
      },
      {
        titulo: "Evento 26 - Palermo Soho",
        descripcion: "Disfrutá de una noche increíble en Palermo Soho, no te lo pierdas Honduras 5000, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/173/680/510"
            },
            {
              "url": "https://picsum.photos/seed/176/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-25T20:45:00"),
        fechaFin: new Date("2026-04-26T01:25:00"),
        ubicacion: {
          "create": {
            "latitud": -34.577194,
            "longitud": -58.407156,
            "direccion": "Honduras 5000"
          }
        }
      },
      {
        titulo: "Evento 27 - Jockey Club",
        descripcion: "Disfrutá de una noche increíble en Jockey Club, no te lo pierdas  Av.del Libertador 4101, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/185/680/510"
            },
            {
              "url": "https://picsum.photos/seed/121/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-26T21:30:00"),
        fechaFin: new Date("2026-04-27T03:22:00"),
        ubicacion: {
          "create": {
            "latitud": -34.535517,
            "longitud": -58.411729,
            "direccion": "Av. del Libertador 4101"
          }
        }
      },
      {
        titulo: "Evento 28 - Café Tortoni",
        descripcion: "Disfrutá de una noche increíble en Café Tortoni, no te lo pierdas  Av.de Mayo 825, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/132/680/510"
            },
            {
              "url": "https://picsum.photos/seed/134/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-20T23:15:00"),
        fechaFin: new Date("2026-04-21T01:29:00"),
        ubicacion: {
          "create": {
            "latitud": -34.542388,
            "longitud": -58.409467,
            "direccion": "Av. de Mayo 825"
          }
        }
      },
      {
        titulo: "Evento 29 - Café Tortoni",
        descripcion: "Disfrutá de una noche increíble en Café Tortoni, no te lo pierdas  Av.de Mayo 825, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/167/680/510"
            },
            {
              "url": "https://picsum.photos/seed/193/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-03-04T23:30:00"),
        fechaFin: new Date("2026-03-05T02:27:00"),
        ubicacion: {
          "create": {
            "latitud": -34.587767,
            "longitud": -58.42035,
            "direccion": "Av. de Mayo 825"
          }
        }
      },
      {
        titulo: "Evento 30 - Ciudad Cultural Konex",
        descripcion: "Disfrutá de una noche increíble en Ciudad Cultural Konex, no te lo pierdas Sarmiento 3131, a partir de las 22:00",
        imagenes: {
          "create": [
            {
              "url": "https://picsum.photos/seed/143/680/510"
            },
            {
              "url": "https://picsum.photos/seed/163/680/510"
            }
          ]
        },
        fechaInicio: new Date("2026-04-19T20:45:00"),
        fechaFin: new Date("2026-04-20T01:53:00"),
        ubicacion: {
          "create": {
            "latitud": -34.519409,
            "longitud": -58.435578,
            "direccion": "Sarmiento 3131"
          }
        }
      },

    ]
  }
};


const userData3: Prisma.UserCreateInput = {
  email: "martin@gmail.com",
  nombre: "Martin",
  contrasenia_hash: "3a7bd3e2360a3d80b3f7d3c9e0f5b4c2d1e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
  numeroAvatar: 10,
  sal: "f0e1d2c3b4a5968778695a4b3c2d1e0f",
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

      },

    ]
  }
};




async function main() {
  console.log(`Start seeding ...`)
  const users = [userData, userData2, userData3];

  for (const u of users) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
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
