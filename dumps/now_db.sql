--
-- PostgreSQL database dump
--

\restrict SAhiEDswUYIlmNdSB0Tjh8YeaCGHgVFXtPzej3aTXoSXc7TCCQl6zPhWUcREiMv

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: patricio
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre text NOT NULL
);


ALTER TABLE public.usuarios OWNER TO patricio;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: patricio
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO patricio;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: patricio
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: patricio
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: patricio
--

COPY public.usuarios (id, nombre) FROM stdin;
1	Patricio
\.


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: patricio
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: patricio
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict SAhiEDswUYIlmNdSB0Tjh8YeaCGHgVFXtPzej3aTXoSXc7TCCQl6zPhWUcREiMv

