CREATE TYPE card_category AS ENUM ('FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE');

CREATE TABLE "Cards" (
    "id" SERIAL PRIMARY KEY,
    "question" VARCHAR(255),
    "answer" VARCHAR(255),
    "tag" VARCHAR(255),
    "category" card_category DEFAULT 'FIRST'
);

CREATE TABLE "Learning" (
    "id" SERIAL PRIMARY KEY,
    "isValid" BOOLEAN DEFAULT false,
    "date" DATE DEFAULT CURRENT_DATE,
    "cardId" INTEGER REFERENCES "Cards"("id")
);