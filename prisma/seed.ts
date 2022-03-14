import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
const shawShank = await prisma.movie.upsert({
  where: {
    title: 'Shawshank Redemption',
  },
  update: {},
  create: {
    title: 'Shawshank Redemption',
    director: 'Frank Darabont',
    year: 1994,
  },
});

const jurasicPark = await prisma.movie.upsert({
  where: {
    title: 'Jurassic Park',
  },
  update: {},
  create: {
    title: 'Jurassic Park',
    director: 'Steven Spielberg',
    year: 1993,
  },
});

  const alice = await prisma.user.upsert({
    where: { email: 'alice@gigabolt.io' },
    update: {},
    create: {
      email: 'alice@gigabolt.io',
      name: 'Alice',
      reviews: {
        create: {
          content: 'Check out my full review on https://gigabolt.io',
          movie: {
            connect: {
              id: jurasicPark.id,
            }
          }
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      reviews: {
        create: [
          {
            content: 'This was great. Follow Gigabolt.io on https://twitter.com/gigabolt-io',
            movie: {
              connect: {
                id: shawShank.id,
              }
            }
          },
          {
            content: 'I hope they make more of these! Looking forward to the next one. Here\'s a teaser https://gigabolt.io',
            movie: {
              connect: {
                id: jurasicPark.id,
              }
            }
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })