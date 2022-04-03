-- ユーザ作成
CREATE USER chat PASSWORD 'pass1234';
-- DB作成
CREATE DATABASE chat;
-- ユーザにDBの権限付与
GRANT ALL PRIVILEGES ON DATABASE chat TO chat;

\c chat

DROP TABLE IF EXISTS "migrate_version";
CREATE TABLE "public"."migrate_version" (
    "repository_id" character varying(250) NOT NULL,
    "repository_path" text,
    "version" integer,
    CONSTRAINT "migrate_version_pkey" PRIMARY KEY ("repository_id")
) WITH (oids = false);

INSERT INTO "migrate_version" ("repository_id", "repository_path", "version") VALUES
('users',	'.',	1);

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "name" text NOT NULL,
    "email" character varying(255) NOT NULL,
    "password" character varying(255) NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "token" character varying(255) NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id", "email")
) WITH (oids = false);

GRANT SELECT, UPDATE, INSERT ON "migrate_version" TO chat;
GRANT SELECT, UPDATE, INSERT ON "users" TO chat;
GRANT USAGE ON SEQUENCE users_id_seq TO chat;