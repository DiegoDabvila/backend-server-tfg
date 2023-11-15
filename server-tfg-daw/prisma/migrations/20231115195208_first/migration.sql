-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieDirector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surnames" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "MovieDirector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentedMovie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "directorId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "RentedMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnMovies" (
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "asignnationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expirationTime" INTEGER NOT NULL DEFAULT 4320,

    CONSTRAINT "UsersOnMovies_pkey" PRIMARY KEY ("userId","movieId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "RentedMovie" ADD CONSTRAINT "RentedMovie_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "MovieDirector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnMovies" ADD CONSTRAINT "UsersOnMovies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnMovies" ADD CONSTRAINT "UsersOnMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "RentedMovie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
